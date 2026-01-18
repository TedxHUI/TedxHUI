import { supabase } from "../lib/supabase";

export interface Ticket {
  id?: string;
  full_name: string;
  email: string;
  ticket_type?: string;
  status: "confirmed" | "checked_in" | "cancelled";
  payment_reference: string;
  checked_in_at?: string;
  created_at?: string;
}

export const ticketService = {
  // 1. Generate unique ticket (Post-payment)
  async registerTicket(
    ticketData: Omit<Ticket, "id" | "status" | "created_at">,
  ) {
    // Check for duplicate payment reference
    const { data: existing } = await supabase
      .from("tickets")
      .select("id")
      .eq("payment_reference", ticketData.payment_reference)
      .maybeSingle();

    if (existing) {
      throw new Error(
        "A ticket with this payment reference already exists. If you believe this is an error, please contact support.",
      );
    }

    const { data, error } = await supabase
      .from("tickets")
      .insert([
        {
          ...ticketData,
          status: "confirmed",
        },
      ])
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        // Unique constraint violation
        throw new Error(
          "This payment has already been processed. Please check your email for confirmation.",
        );
      }
      throw new Error(`Failed to register ticket: ${error.message}`);
    }
    return data;
  },

  // 2. Validate ticket (Check-in)
  async validateTicket(ticketId: string) {
    const { data, error } = await supabase
      .from("tickets")
      .select("*")
      .eq("id", ticketId)
      .single();

    if (error) throw error;
    if (!data) throw new Error("Ticket not found");

    return data;
  },

  // 3. Track attendee check-in
  async checkInAttendee(ticketId: string) {
    const { data, error } = await supabase
      .from("tickets")
      .update({
        status: "checked_in",
        checked_in_at: new Date().toISOString(),
      })
      .eq("id", ticketId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 4. Get ticket by payment reference
  async getTicketByReference(reference: string) {
    const { data, error } = await supabase
      .from("tickets")
      .select("*")
      .eq("payment_reference", reference)
      .single();

    if (error) throw error;
    return data;
  },

  // 5. Get all tickets (for Admin Dashboard)
  async getAllTickets() {
    const { data, error } = await supabase
      .from("tickets")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as Ticket[];
  },

  // 6. Cancel a ticket
  async cancelTicket(id: string) {
    const { data, error } = await supabase
      .from("tickets")
      .update({ status: "cancelled" })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 7. Delete a ticket record
  async deleteTicket(id: string) {
    const { error } = await supabase.from("tickets").delete().eq("id", id);
    if (error) throw error;
  },
};

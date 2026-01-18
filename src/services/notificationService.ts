import { supabase } from "../lib/supabase";

export interface Notification {
  id?: string;
  user_email: string;
  type:
    | "ticket_confirmation"
    | "event_reminder"
    | "merchandise_order"
    | "announcement";
  status: "pending" | "sent" | "failed";
  subject: string;
  content: string;
  created_at?: string;
}

export const notificationService = {
  // 1. Send an actual email via Resend
  async sendEmail(to: string, subject: string, content: string) {
    // This function is now handled by a Database Trigger.
    // When a notification is inserted into the 'notifications' table,
    // Supabase will automatically call the Resend API.
    return { success: true, message: "Queued in database for trigger" };
  },

  // 2. Queue and Send a notification
  async queueNotification(
    notification: Omit<Notification, "id" | "status" | "created_at">
  ) {
    // First, try to send the actual email
    try {
      await this.sendEmail(
        notification.user_email,
        notification.subject,
        notification.content
      );
    } catch (e) {
      console.error("Email sending failed, but still queueing in DB", e);
    }

    // Still save to database for records
    const { data, error } = await supabase
      .from("notifications")
      .insert([
        {
          ...notification,
          status: "sent",
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 2. Get user notifications
  async getUserNotifications(email: string) {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_email", email)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  // 3. Send important announcements to all ticket holders or selected emails
  async broadcastAnnouncement(
    subject: string,
    content: string,
    targetEmails?: string[]
  ) {
    let emails: string[] = [];

    if (targetEmails && targetEmails.length > 0) {
      emails = Array.from(new Set(targetEmails));
    } else {
      // First get all unique emails from tickets
      const { data: tickets, error: ticketError } = await supabase
        .from("tickets")
        .select("email")
        .in("status", ["confirmed", "checked_in"]);

      if (ticketError) throw ticketError;
      emails = Array.from(new Set(tickets.map((t) => t.email)));
    }

    if (emails.length === 0) return [];

    // Send emails in batches or one by one (Resend supports multiple recipients but for tracking individual status we do one by one or queue)
    // For simplicity in this demo, we send them and record them
    const results = await Promise.allSettled(
      emails.map(async (email) => {
        try {
          await this.sendEmail(email, subject, content);
          return { email, success: true };
        } catch (e) {
          console.error(`Failed to send broadcast to ${email}:`, e);
          return { email, success: false };
        }
      })
    );

    const notifications = emails.map((email, index) => {
      const result = results[index];
      return {
        user_email: email,
        type: "announcement",
        status:
          result.status === "fulfilled" && result.value.success
            ? "sent"
            : "failed",
        subject,
        content,
      };
    });

    const { data, error } = await supabase
      .from("notifications")
      .insert(notifications)
      .select();

    if (error) throw error;
    return data;
  },

  // 4. Get all notifications (for Admin Dashboard)
  async getAllNotifications() {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },
};

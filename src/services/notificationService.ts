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
    const apiKey = process.env.REACT_APP_RESEND_API_KEY;
    if (!apiKey) {
      console.error("Missing REACT_APP_RESEND_API_KEY in .env");
      return;
    }

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: "TEDxHUI <notifications@tedxhui.com>",
          to: [to],
          subject: subject,
          html: `<div>${content}</div>`,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to send email:", error);
      throw error;
    }
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

  // 3. Send important announcements to all ticket holders
  async broadcastAnnouncement(subject: string, content: string) {
    // First get all unique emails from tickets
    const { data: tickets, error: ticketError } = await supabase
      .from("tickets")
      .select("email")
      .eq("status", "confirmed");

    if (ticketError) throw ticketError;

    const emails = Array.from(new Set(tickets.map((t) => t.email)));

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

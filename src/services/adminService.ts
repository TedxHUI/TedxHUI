import { supabase } from "../lib/supabase";

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  approved: boolean;
  created_at: string;
}

export const adminService = {
  // Get all pending admin requests
  async getPendingAdmins(): Promise<AdminUser[]> {
    const { data, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("approved", false)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get all approved admins
  async getApprovedAdmins(): Promise<AdminUser[]> {
    const { data, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("approved", true)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Approve an admin
  async approveAdmin(userId: string): Promise<void> {
    const { error } = await supabase
      .from("admin_users")
      .update({ approved: true })
      .eq("id", userId);

    if (error) throw error;
  },

  // Reject/delete an admin request
  async rejectAdmin(userId: string): Promise<void> {
    // First delete from admin_users
    const { error: adminError } = await supabase
      .from("admin_users")
      .delete()
      .eq("id", userId);

    if (adminError) throw adminError;

    // Note: The auth user will remain, but they won't be in admin_users
    // so they won't have admin access
  },
};

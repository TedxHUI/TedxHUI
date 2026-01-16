import { supabase } from "../lib/supabase";

export const analyticsService = {
  // 1. Total event registrations
  async getRegistrationStats() {
    const { count, error } = await supabase
      .from("tickets")
      .select("*", { count: "exact", head: true })
      .eq("status", "confirmed");

    if (error) throw error;
    return count;
  },

  // 2. Attendance tracking (checked-in vs total)
  async getAttendanceStats() {
    const { data, error } = await supabase.from("tickets").select("status");

    if (error) throw error;

    const total = data.length;
    const checkedIn = data.filter((t) => t.status === "checked_in").length;

    return {
      total,
      checkedIn,
      attendanceRate: total > 0 ? (checkedIn / total) * 100 : 0,
    };
  },

  // 3. (Removed ticket type breakdown as requested)

  // 4. Merchandise performance
  async getMerchandiseStats() {
    const { data, error } = await supabase
      .from("orders")
      .select("total_price, payment_status")
      .eq("payment_status", "paid");

    if (error) throw error;

    const totalRevenue = data.reduce(
      (sum, order) => sum + Number(order.total_price),
      0
    );
    const totalOrders = data.length;

    return {
      totalRevenue,
      totalOrders,
    };
  },
};

import { supabase } from "../lib/supabase";

export interface Merchandise {
  id: string;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  image_url: string; // Keep for backward compatibility/primary image
  image_urls: string[]; // Support multiple images
}

export interface Order {
  id?: string;
  user_email: string;
  merchandise_id: string;
  quantity: number;
  total_price: number;
  payment_status: "pending" | "paid" | "failed";
  payment_reference: string;
}

export const merchandiseService = {
  // 1. Get all merchandise
  async getAllMerchandise() {
    const { data, error } = await supabase
      .from("merchandise")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as Merchandise[];
  },

  // Add new merchandise
  async addMerchandise(merchData: Omit<Merchandise, "id">) {
    const { data, error } = await supabase
      .from("merchandise")
      .insert([merchData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update existing merchandise
  async updateMerchandise(id: string, merchData: Partial<Merchandise>) {
    const { data, error } = await supabase
      .from("merchandise")
      .update(merchData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete merchandise
  async deleteMerchandise(id: string) {
    const { error } = await supabase.from("merchandise").delete().eq("id", id);
    if (error) throw error;
  },

  // Upload image to storage
  async uploadImage(file: File) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 9)}.${fileExt}`;
    const filePath = fileName;

    const { error: uploadError } = await supabase.storage
      .from("merchandise-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      if (uploadError.message === "Bucket not found") {
        throw new Error(
          'Storage bucket "merchandise-images" not found. Please run the SQL provided or create the bucket manually in Supabase.',
        );
      }
      throw uploadError;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("merchandise-images").getPublicUrl(filePath);

    return publicUrl;
  },

  // Check stock availability
  async checkStock(merchandiseId: string, quantity: number) {
    const { data, error } = await supabase
      .from("merchandise")
      .select("stock_quantity, sold_count")
      .eq("id", merchandiseId)
      .single();

    if (error) throw new Error("Failed to check stock availability");

    const available = (data.stock_quantity || 0) - (data.sold_count || 0);
    return available >= quantity;
  },

  // 2. Create an order (Post-payment initialization)
  async createOrder(orderData: Omit<Order, "id">) {
    // Check for duplicate payment reference
    const { data: existing } = await supabase
      .from("orders")
      .select("id")
      .eq("payment_reference", orderData.payment_reference)
      .maybeSingle();

    if (existing) {
      throw new Error(
        "An order with this payment reference already exists. If you believe this is an error, please contact support.",
      );
    }

    // Check stock availability
    const stockAvailable = await this.checkStock(
      orderData.merchandise_id,
      orderData.quantity,
    );

    if (!stockAvailable) {
      throw new Error(
        "Sorry, this item is out of stock or doesn't have enough quantity available.",
      );
    }

    const { data, error } = await supabase
      .from("orders")
      .insert([orderData])
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        // Unique constraint violation
        throw new Error(
          "This payment has already been processed. Please check your email for confirmation.",
        );
      }
      throw new Error(`Failed to create order: ${error.message}`);
    }
    return data;
  },

  // 3. Update order status after payment confirmation
  async confirmOrderPayment(id: string) {
    const { data, error } = await supabase
      .from("orders")
      .update({ payment_status: "paid" })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 4. Get all orders (for Admin Dashboard)
  async getAllOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        *,
        merchandise:merchandise_id (
          name,
          price
        )
      `,
      )
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },
};

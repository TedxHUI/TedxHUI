import {
  LayoutDashboard,
  Megaphone,
  Package,
  RefreshCw,
  Shield,
  ShoppingBag,
  Ticket as TicketIcon,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { AdminsTab } from "../components/admin/AdminsTab";
import { BroadcastTab } from "../components/admin/BroadcastTab";
import { MerchandiseTab } from "../components/admin/MerchandiseTab";
import { OrdersTab } from "../components/admin/OrdersTab";
import { OverviewTab } from "../components/admin/OverviewTab";
import { TicketsTab } from "../components/admin/TicketsTab";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { useToast } from "../hooks/use-toast";
import { supabase } from "../lib/supabase";
import { analyticsService } from "../services/analyticsService";
import {
  Merchandise,
  merchandiseService,
  Order,
} from "../services/merchandiseService";
import {
  Notification,
  notificationService,
} from "../services/notificationService";
import { Ticket, ticketService } from "../services/ticketService";

interface DashboardStats {
  regCount: number;
  attendance: {
    total: number;
    checkedIn: number;
    attendanceRate: number;
  };
  merchStats: {
    totalRevenue: number;
    totalOrders: number;
  };
}

interface OrderWithMerch extends Order {
  created_at: string;
  merchandise?: {
    name: string;
    price: number;
  };
}

interface AdminTicket extends Ticket {
  created_at: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState("");
  const [validating, setValidating] = useState(false);
  const [broadcast, setBroadcast] = useState({ subject: "", content: "" });
  const [broadcasting, setBroadcasting] = useState(false);
  const [sendingReminders, setSendingReminders] = useState(false);
  const [merchandise, setMerchandise] = useState<Merchandise[]>([]);
  const [tickets, setTickets] = useState<AdminTicket[]>([]);
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [orders, setOrders] = useState<OrderWithMerch[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [ticketSearch, setTicketSearch] = useState("");
  const [orderSearch, setOrderSearch] = useState("");
  const [merchSearch, setMerchSearch] = useState("");
  const [broadcastSearch, setBroadcastSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "confirmed" | "checked_in"
  >("all");
  const [orderStatusFilter, setOrderStatusFilter] = useState<
    "all" | "pending" | "paid" | "failed"
  >("all");
  const [editingMerch, setEditingMerch] = useState<Merchandise | null>(null);
  const [newMerch, setNewMerch] = useState({
    name: "",
    description: "",
    price: 0,
    stock_quantity: 0,
    image_url: "",
    image_urls: [] as string[],
  });
  const [isAddingMerch, setIsAddingMerch] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [configStatus, setConfigStatus] = useState({
    bucketExists: false,
    resendKeySet: typeof process !== 'undefined' ? !!process.env.REACT_APP_RESEND_API_KEY : false,
    checking: true,
  });
  const { toast } = useToast();

  const handleEditMerch = (item: Merchandise) => {
    setEditingMerch(item);
    setNewMerch({
      name: item.name,
      description: item.description,
      price: item.price,
      stock_quantity: item.stock_quantity,
      image_url: item.image_url,
      image_urls: item.image_urls || [],
    });
    setSelectedFiles([]);
    setImagePreviews([]);
    setIsDialogOpen(true);
  };

  const cancelEdit = () => {
    setEditingMerch(null);
    setNewMerch({
      name: "",
      description: "",
      price: 0,
      stock_quantity: 0,
      image_url: "",
      image_urls: [],
    });
    setSelectedFiles([]);
    setImagePreviews([]);
    setIsDialogOpen(false);
  };

  const checkConfig = async () => {
    try {
      const { data: buckets } = await supabase.storage.listBuckets();
      const exists = buckets?.some(
        (b: { id: string }) => b.id === "merchandise-images",
      );
      setConfigStatus((prev) => ({
        ...prev,
        bucketExists: !!exists,
        checking: false,
      }));
    } catch (error) {
      console.error("Error checking bucket:", error);
      setConfigStatus((prev) => ({ ...prev, checking: false }));
    }
  };

  const fetchMerchandise = async () => {
    try {
      const data = await merchandiseService.getAllMerchandise();
      setMerchandise(data);
    } catch (error) {
      console.error("Error fetching merchandise:", error);
    }
  };

  const fetchTickets = async () => {
    try {
      const data = await ticketService.getAllTickets();
      setTickets(data as AdminTicket[]);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const data = await merchandiseService.getAllOrders();
      setOrders(data as OrderWithMerch[]);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const data = await notificationService.getAllNotifications();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.full_name.toLowerCase().includes(ticketSearch.toLowerCase()) ||
      ticket.email.toLowerCase().includes(ticketSearch.toLowerCase()) ||
      (ticket.id || "").toLowerCase().includes(ticketSearch.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || ticket.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.user_email.toLowerCase().includes(orderSearch.toLowerCase()) ||
      (order.id || "").toLowerCase().includes(orderSearch.toLowerCase()) ||
      (order.merchandise?.name || "")
        .toLowerCase()
        .includes(orderSearch.toLowerCase());

    const matchesStatus =
      orderStatusFilter === "all" || order.payment_status === orderStatusFilter;

    return matchesSearch && matchesStatus;
  });

  const filteredMerchandise = merchandise.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(merchSearch.toLowerCase()) ||
      item.description.toLowerCase().includes(merchSearch.toLowerCase());

    return matchesSearch;
  });

  const filteredNotifications = notifications.filter((n) => {
    const matchesSearch =
      n.subject.toLowerCase().includes(broadcastSearch.toLowerCase()) ||
      n.content.toLowerCase().includes(broadcastSearch.toLowerCase()) ||
      n.user_email.toLowerCase().includes(broadcastSearch.toLowerCase());

    return matchesSearch;
  });

  const getChartData = () => {
    // Ticket Status Data
    const ticketStats = [
      {
        name: "Checked In",
        value: tickets.filter((t) => t.status === "checked_in").length,
        color: "#22c55e",
      },
      {
        name: "Pending",
        value: tickets.filter((t) => t.status === "confirmed").length,
        color: "#3b82f6",
      },
    ];

    // Order Revenue by Date (last 7 days)
    const last7Days = [...Array(7)]
      .map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().split("T")[0];
      })
      .reverse();

    const revenueData = last7Days.map((date) => {
      const dayOrders = orders.filter(
        (o) => o.payment_status === "paid" && o.created_at.startsWith(date),
      );
      const total = dayOrders.reduce(
        (sum, o) => sum + Number(o.total_price),
        0,
      );
      return {
        date: new Date(date).toLocaleDateString([], {
          month: "short",
          day: "numeric",
        }),
        revenue: total,
      };
    });

    // Registration Trend (last 7 days)
    const registrationTrend = last7Days.map((date) => {
      const dayRegs = tickets.filter((t) => t.created_at.startsWith(date));
      return {
        date: new Date(date).toLocaleDateString([], {
          month: "short",
          day: "numeric",
        }),
        count: dayRegs.length,
      };
    });

    // Ticket Type Breakdown
    const ticketTypeStats = [
      {
        name: "Standard",
        value: tickets.filter((t) => t.ticket_type === "standard").length,
        color: "#3b82f6",
      },
      {
        name: "VIP",
        value: tickets.filter((t) => t.ticket_type === "vip").length,
        color: "#8b5cf6",
      },
      {
        name: "VVIP",
        value: tickets.filter((t) => t.ticket_type === "vvip").length,
        color: "#f59e0b",
      },
    ].filter((t) => t.value > 0);

    // Merchandise Sales Breakdown
    const merchSalesData = merchandise
      .map((item) => {
        const itemOrders = orders.filter(
          (o) => o.merchandise_id === item.id && o.payment_status === "paid",
        );
        const totalSold = itemOrders.reduce((sum, o) => sum + o.quantity, 0);
        return {
          name: item.name,
          value: totalSold,
        };
      })
      .filter((item) => item.value > 0);

    // Recent Activity Feed
    const combinedActivity: {
      id: string;
      type: "registration" | "checkin" | "order";
      title: string;
      description: string;
      time: Date;
      status: string;
    }[] = [
      ...tickets.map((t) => ({
        id: `reg-${t.id}`,
        type: "registration" as const,
        title: "New Registration",
        description: `${t.full_name} registered for the event`,
        time: t.created_at ? new Date(t.created_at) : new Date(),
        status: t.status,
      })),
      ...tickets
        .filter((t) => t.checked_in_at)
        .map((t) => ({
          id: `in-${t.id}`,
          type: "checkin" as const,
          title: "Attendee Check-in",
          description: `${t.full_name} has arrived`,
          time: new Date(t.checked_in_at!),
          status: "success",
        })),
      ...orders.map((o) => ({
        id: `ord-${o.id}`,
        type: "order" as const,
        title: "New Merch Order",
        description: `${o.user_email} bought ${o.merchandise?.name || "merch"}`,
        time: o.created_at ? new Date(o.created_at) : new Date(),
        status: o.payment_status,
      })),
    ].sort((a, b) => b.time.getTime() - a.time.getTime());

    return {
      ticketStats,
      revenueData,
      registrationTrend,
      merchSalesData,
      ticketTypeStats,
      recentActivity: combinedActivity.slice(0, 8),
    };
  };

  const {
    ticketStats,
    revenueData,
    registrationTrend,
    merchSalesData,
    ticketTypeStats,
    recentActivity,
  } = getChartData();

  const exportAttendeesCSV = () => {
    if (tickets.length === 0) return;

    const headers = [
      "Full Name",
      "Email",
      "Ticket ID",
      "Status",
      "Check-in Time",
      "Registration Date",
    ];
    const csvData = tickets.map((t) => [
      t.full_name,
      t.email,
      t.id,
      t.status,
      t.checked_in_at ? new Date(t.checked_in_at).toLocaleString() : "-",
      new Date(t.created_at).toLocaleString(),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...csvData.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `TEDxHUI_Attendees_${new Date().toISOString().split("T")[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchStats = useCallback(async () => {
    try {
      const [regCount, attendance, merchStats] = await Promise.all([
          analyticsService.getRegistrationStats(),
          analyticsService.getAttendanceStats(),
          analyticsService.getMerchandiseStats(),
        ]);

        setStats({
          regCount: regCount || 0,
          attendance,
          merchStats,
        });
        await Promise.all([
          fetchMerchandise(),
          fetchTickets(),
          fetchOrders(),
          fetchNotifications(),
          checkConfig(),
        ]);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  }, []); 

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const handleBulkCheckIn = async () => {
    if (selectedTickets.length === 0) return;
    setLoading(true);
    try {
      const promises = selectedTickets.map((id) =>
        ticketService.checkInAttendee(id),
      );
      await Promise.all(promises);
      toast({
        title: "Bulk Check-in Successful",
        description: `Checked in ${selectedTickets.length} attendees.`,
      });
      setSelectedTickets([]);
      fetchStats();
    } catch (error) {
      console.error("Bulk check-in error:", error);
      toast({
        title: "Error",
        description: "Failed to perform bulk check-in.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBulkEmail = async (subject: string, content: string) => {
    if (selectedTickets.length === 0) return;
    setLoading(true);
    try {
      const selectedEmails = tickets
        .filter((t) => t.id && selectedTickets.includes(t.id))
        .map((t) => t.email);

      await notificationService.broadcastAnnouncement(
        subject,
        content,
        selectedEmails,
      );

      toast({
        title: "Emails Sent",
        description: `Sent emails to ${selectedEmails.length} attendees.`,
      });
      setSelectedTickets([]);
      fetchNotifications();
    } catch (error) {
      console.error("Bulk email error:", error);
      toast({
        title: "Error",
        description: "Failed to send bulk emails.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPayment = async (orderId: string) => {
    try {
      await merchandiseService.confirmOrderPayment(orderId);
      toast({
        title: "Payment Confirmed",
        description: "The order has been marked as paid.",
      });
      fetchStats();
    } catch (error) {
      console.error("Confirm payment error:", error);
      toast({
        title: "Error",
        description: "Failed to confirm payment.",
        variant: "destructive",
      });
    }
  };

  const handleCancelTicket = async (id: string) => {
    if (!window.confirm("Are you sure you want to cancel this ticket?")) return;
    try {
      await ticketService.cancelTicket(id);
      toast({
        title: "Ticket Cancelled",
        description: "The ticket has been marked as cancelled.",
      });
      fetchStats();
    } catch (error) {
      console.error("Cancel ticket error:", error);
      toast({
        title: "Error",
        description: "Failed to cancel ticket.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTicket = async (id: string) => {
    if (
      !window.confirm(
        "Are you sure you want to PERMANENTLY delete this record? This cannot be undone.",
      )
    )
      return;
    try {
      await ticketService.deleteTicket(id);
      toast({
        title: "Record Deleted",
        description: "The attendee record has been removed.",
      });
      fetchStats();
    } catch (error) {
      console.error("Delete ticket error:", error);
      toast({
        title: "Error",
        description: "Failed to delete attendee record.",
        variant: "destructive",
      });
    }
  };

  const handleValidate = async (id?: string) => {
    const targetId = id || searchId;
    if (!targetId.trim()) return;
    setValidating(true);
    try {
      const ticket = await ticketService.validateTicket(targetId);
      if (ticket.status === "checked_in") {
        toast({
          title: "Already Checked In",
          description: `${ticket.full_name} already checked in at ${new Date(
            ticket.checked_in_at!,
          ).toLocaleString()}`,
          variant: "default",
        });
      } else {
        await ticketService.checkInAttendee(targetId);
        toast({
          title: "Check-in Successful",
          description: `Welcome, ${ticket.full_name}!`,
          variant: "default",
        });
        fetchStats(); // Refresh stats
      }
    } catch (error) {
      toast({
        title: "Invalid Ticket",
        description: "The ticket ID provided is not valid.",
        variant: "destructive",
      });
    } finally {
      setValidating(false);
    }
  };

  const handleBroadcast = async () => {
    if (!broadcast.subject || !broadcast.content) {
      toast({
        title: "Missing Content",
        description:
          "Please provide both a subject and content for the announcement.",
        variant: "destructive",
      });
      return;
    }

    setBroadcasting(true);
    try {
      await notificationService.broadcastAnnouncement(
        broadcast.subject,
        broadcast.content,
      );
      toast({
        title: "Broadcast Successful",
        description: "Announcement has been queued for all ticket holders.",
      });
      setBroadcast({ subject: "", content: "" });
      fetchNotifications();
    } catch (error) {
      console.error("Broadcast error:", error);
      toast({
        title: "Broadcast Failed",
        description: "Failed to send announcements. Please try again.",
        variant: "destructive",
      });
    } finally {
      setBroadcasting(false);
    }
  };

  const handleSendReminders = async () => {
    setSendingReminders(true);
    try {
      await notificationService.broadcastAnnouncement(
        "Reminder: TEDxHUI 2026 is approaching!",
        "Don't forget to join us for an inspiring day of ideas worth spreading. See you there!",
      );
      toast({
        title: "Reminders Sent",
        description: "Event reminders have been queued for all attendees.",
      });
      fetchNotifications();
    } catch (error) {
      console.error("Reminder error:", error);
      toast({
        title: "Error",
        description: "Failed to send reminders.",
        variant: "destructive",
      });
    } finally {
      setSendingReminders(false);
    }
  };

  const removeSelectedFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddMerch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddingMerch(true);
    try {
      let finalImageUrl = newMerch.image_url;
      let finalImageUrls = [...newMerch.image_urls];

      if (selectedFiles.length > 0) {
        const uploadPromises = selectedFiles.map((file) =>
          merchandiseService.uploadImage(file),
        );
        const uploadedUrls = await Promise.all(uploadPromises);

        if (!finalImageUrl && uploadedUrls.length > 0) {
          finalImageUrl = uploadedUrls[0];
          finalImageUrls = [...finalImageUrls, ...uploadedUrls];
        } else {
          finalImageUrls = [...finalImageUrls, ...uploadedUrls];
        }
      }

      if (!finalImageUrl) {
        throw new Error("Please upload at least one image");
      }

      const merchData = {
        ...newMerch,
        image_url: finalImageUrls[0] || finalImageUrl,
        image_urls: finalImageUrls,
      };

      if (editingMerch) {
        await merchandiseService.updateMerchandise(editingMerch.id, merchData);
        toast({
          title: "Success",
          description: "Merchandise updated successfully.",
        });
      } else {
        await merchandiseService.addMerchandise(merchData);
        toast({
          title: "Success",
          description: "Merchandise added successfully.",
        });
      }

      cancelEdit();
      fetchMerchandise();
    } catch (error) {
      console.error("Error saving merchandise:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to save merchandise.",
        variant: "destructive",
      });
    } finally {
      setIsAddingMerch(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setSelectedFiles((prev) => [...prev, ...files]);

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDeleteMerch = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await merchandiseService.deleteMerchandise(id);
      toast({
        title: "Success",
        description: "Merchandise deleted successfully.",
      });
      fetchMerchandise();
    } catch (error) {
      console.error("Error deleting merchandise:", error);
      toast({
        title: "Error",
        description: "Failed to delete merchandise.",
        variant: "destructive",
      });
    }
  };

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8 bg-gray-50 min-h-screen mt-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-glancyr">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm">
            Manage your event, tickets, and merchandise.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {!configStatus.checking && (
            <div className="flex gap-2 text-xs">
              <span
                className={`px-2 py-1 rounded-full ${
                  configStatus.bucketExists
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                Bucket: {configStatus.bucketExists ? "OK" : "Missing"}
              </span>
              <span
                className={`px-2 py-1 rounded-full ${
                  configStatus.resendKeySet
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                Resend: {configStatus.resendKeySet ? "OK" : "No Key"}
              </span>
            </div>
          )}
          <Button
            onClick={fetchStats}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white border w-full justify-start overflow-x-auto h-auto p-1 gap-1">
          <TabsTrigger
            value="overview"
            className="flex items-center gap-2 py-2 px-4"
          >
            <LayoutDashboard className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="tickets"
            className="flex items-center gap-2 py-2 px-4"
          >
            <TicketIcon className="w-4 h-4" />
            Tickets
          </TabsTrigger>
          <TabsTrigger
            value="merchandise"
            className="flex items-center gap-2 py-2 px-4"
          >
            <Package className="w-4 h-4" />
            Merchandise
          </TabsTrigger>
          <TabsTrigger
            value="orders"
            className="flex items-center gap-2 py-2 px-4"
          >
            <ShoppingBag className="w-4 h-4" />
            Orders
          </TabsTrigger>
          <TabsTrigger
            value="broadcast"
            className="flex items-center gap-2 py-2 px-4"
          >
            <Megaphone className="w-4 h-4" />
            Broadcast
          </TabsTrigger>
          <TabsTrigger
            value="admins"
            className="flex items-center gap-2 py-2 px-4"
          >
            <Shield className="w-4 h-4" />
            Admins
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab
            stats={stats}
            registrationTrend={registrationTrend}
            recentActivity={recentActivity}
            revenueData={revenueData}
            ticketStats={ticketStats}
            merchSalesData={merchSalesData}
            ticketTypeStats={ticketTypeStats}
          />
        </TabsContent>

        <TabsContent value="tickets">
          <TicketsTab
            searchId={searchId}
            setSearchId={setSearchId}
            handleValidate={() => handleValidate()}
            validating={validating}
            tickets={tickets}
            ticketSearch={ticketSearch}
            setTicketSearch={setTicketSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            filteredTickets={filteredTickets}
            exportAttendeesCSV={exportAttendeesCSV}
            selectedTickets={selectedTickets}
            setSelectedTickets={setSelectedTickets}
            handleBulkCheckIn={handleBulkCheckIn}
            handleBulkEmail={handleBulkEmail}
            handleCheckIn={(id) => handleValidate(id)}
            handleCancelTicket={handleCancelTicket}
            handleDeleteTicket={handleDeleteTicket}
          />
        </TabsContent>

        <TabsContent value="merchandise">
          <MerchandiseTab
            merchandise={merchandise}
            filteredMerchandise={filteredMerchandise}
            merchSearch={merchSearch}
            setMerchSearch={setMerchSearch}
            editingMerch={editingMerch}
            newMerch={newMerch}
            setNewMerch={setNewMerch}
            isAddingMerch={isAddingMerch}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            handleFileChange={handleFileChange}
            imagePreviews={imagePreviews}
            setSelectedFiles={setSelectedFiles}
            setImagePreviews={setImagePreviews}
            handleAddMerch={handleAddMerch}
            handleEditMerch={handleEditMerch}
            handleDeleteMerch={handleDeleteMerch}
            removeSelectedFile={removeSelectedFile}
            cancelEdit={cancelEdit}
          />
        </TabsContent>

        <TabsContent value="orders">
          <OrdersTab
            orders={orders}
            orderSearch={orderSearch}
            setOrderSearch={setOrderSearch}
            orderStatusFilter={orderStatusFilter}
            setOrderStatusFilter={setOrderStatusFilter}
            filteredOrders={filteredOrders}
            handleConfirmPayment={handleConfirmPayment}
          />
        </TabsContent>

        <TabsContent value="broadcast">
          <BroadcastTab
            broadcast={broadcast}
            setBroadcast={setBroadcast}
            broadcasting={broadcasting}
            handleBroadcast={handleBroadcast}
            handleSendReminders={handleSendReminders}
            sendingReminders={sendingReminders}
            notifications={notifications}
            filteredNotifications={filteredNotifications}
            broadcastSearch={broadcastSearch}
            setBroadcastSearch={setBroadcastSearch}
          />
        </TabsContent>

        <TabsContent value="admins">
          <AdminsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;

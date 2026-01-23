import { Check, RefreshCw, Shield, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react"; // Added useCallback
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../hooks/use-toast";
import { supabase } from "../../lib/supabase";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  approved: boolean;
  created_at: string;
}

export const AdminsTab = () => {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Wrap fetchAdmins in useCallback to stabilize the function reference
  const fetchAdmins = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("admin_users")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAdmins(data as AdminUser[]);
    } catch (error) {
      console.error("Error fetching admins:", error);
      toast({
        title: "Error",
        description: "Failed to load admin users.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  
  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  const handleToggleApproval = async (
    adminId: string,
    currentStatus: boolean,
  ) => {
    if (adminId === user?.id) {
      toast({
        title: "Action Denied",
        description: "You cannot change your own approval status.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("admin_users")
        .update({ approved: !currentStatus })
        .eq("id", adminId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Admin account ${!currentStatus ? "activated" : "paused"}.`,
      });

      setAdmins((prev) =>
        prev.map((a) =>
          a.id === adminId ? { ...a, approved: !currentStatus } : a,
        ),
      );
    } catch (error) {
      console.error("Error updating admin:", error);
      toast({
        title: "Error",
        description: "Failed to update admin status.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold font-glancyr">Admin Management</h2>
          <p className="text-gray-500">
            Activate or pause administrative accounts.
          </p>
        </div>
        <Button onClick={fetchAdmins} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <Shield size={14} className="text-gray-500" />
                    </div>
                    {admin.full_name || "Unknown"}
                    {admin.id === user?.id && (
                      <span className="text-xs text-gray-400">(You)</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={admin.approved ? "default" : "outline"}
                    className={
                      admin.approved
                        ? "bg-blue-600"
                        : "text-amber-600 border-amber-600"
                    }
                  >
                    {admin.approved ? "Active" : "Paused"}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-500 text-sm">
                  {new Date(admin.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant={admin.approved ? "outline" : "default"}
                    onClick={() =>
                      handleToggleApproval(admin.id, admin.approved)
                    }
                    disabled={admin.id === user?.id}
                    className={
                      admin.approved
                        ? "text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                        : "bg-green-600 hover:bg-green-700"
                    }
                  >
                    {admin.approved ? (
                      <>
                        <X className="w-4 h-4 mr-2" /> Pause Admin
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4 mr-2" /> Activate Admin
                      </>
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {admins.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-gray-500"
                >
                  No admins found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
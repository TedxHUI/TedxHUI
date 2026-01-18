import React from "react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { LogOut, Clock } from "lucide-react";

const PendingApproval = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
          <Clock className="w-10 h-10 text-yellow-600" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Approval Pending</h1>
          <p className="text-gray-500">
            Your account has been created but requires administrator approval
            before you can access the dashboard.
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-700">
          <p>
            Please contact an existing administrator to approve your account
            request.
          </p>
        </div>

        <div className="pt-4">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full flex items-center gap-2 justify-center"
          >
            <LogOut size={16} />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PendingApproval;

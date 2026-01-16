import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Search } from "lucide-react";

interface OrdersTabProps {
  orders: any[];
  orderSearch: string;
  setOrderSearch: (search: string) => void;
  orderStatusFilter: "all" | "pending" | "paid" | "failed";
  setOrderStatusFilter: (filter: "all" | "pending" | "paid" | "failed") => void;
  filteredOrders: any[];
  handleConfirmPayment: (orderId: string) => void;
}

export const OrdersTab: React.FC<OrdersTabProps> = ({
  orders,
  orderSearch,
  setOrderSearch,
  orderStatusFilter,
  setOrderStatusFilter,
  filteredOrders,
  handleConfirmPayment,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <CardTitle>Merchandise Orders</CardTitle>
          <CardDescription>
            Track all product purchases and payment status.
          </CardDescription>
        </div>
        <div className="flex gap-2 text-sm">
          <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-100 font-medium">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            {orders.filter((o) => o.payment_status === "paid").length} Paid
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full border border-yellow-100 font-medium">
            <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
            {orders.filter((o) => o.payment_status === "pending").length}{" "}
            Pending
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by email, product, or order ID..."
              className="pl-10"
              value={orderSearch}
              onChange={(e) => setOrderSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={orderStatusFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setOrderStatusFilter("all")}
            >
              All
            </Button>
            <Button
              variant={orderStatusFilter === "paid" ? "default" : "outline"}
              size="sm"
              onClick={() => setOrderStatusFilter("paid")}
            >
              Paid
            </Button>
            <Button
              variant={orderStatusFilter === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => setOrderStatusFilter("pending")}
            >
              Pending
            </Button>
          </div>
        </div>

        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow>
                <TableHead className="font-bold">Order ID</TableHead>
                <TableHead className="font-bold">Customer Email</TableHead>
                <TableHead className="font-bold">Product</TableHead>
                <TableHead className="font-bold text-center">Qty</TableHead>
                <TableHead className="font-bold">Total Price</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="text-right font-bold">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow
                    key={order.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <TableCell className="font-mono text-[10px] uppercase">
                      {order.id?.split("-")[0]}...
                    </TableCell>
                    <TableCell className="text-sm">
                      {order.user_email}
                    </TableCell>
                    <TableCell className="font-medium text-sm">
                      {order.merchandise?.name || "Unknown Product"}
                    </TableCell>
                    <TableCell className="text-center">
                      {order.quantity}
                    </TableCell>
                    <TableCell className="font-bold text-sm">
                      ₦{order.total_price?.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.payment_status === "paid"
                            ? "default"
                            : "secondary"
                        }
                        className={
                          order.payment_status === "paid"
                            ? "bg-green-100 text-green-700 hover:bg-green-100 border-green-200 shadow-none text-[10px]"
                            : order.payment_status === "failed"
                            ? "bg-red-50 text-red-700 hover:bg-red-50 border-red-100 shadow-none text-[10px]"
                            : "bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-100 shadow-none text-[10px]"
                        }
                      >
                        {order.payment_status === "paid"
                          ? "Paid"
                          : order.payment_status === "failed"
                          ? "Failed"
                          : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-[11px] text-gray-500">
                      <div className="flex items-center justify-end gap-2">
                        {order.payment_status === "pending" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-[10px] border-green-200 text-green-700 hover:bg-green-50"
                            onClick={() => handleConfirmPayment(order.id)}
                          >
                            Confirm Payment
                          </Button>
                        )}
                        <span>
                          {new Date(order.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-32 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Search className="w-8 h-8 text-gray-200" />
                      <p className="text-sm font-medium">
                        No orders found matching your search.
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setOrderSearch("");
                          setOrderStatusFilter("all");
                        }}
                      >
                        Clear filters
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

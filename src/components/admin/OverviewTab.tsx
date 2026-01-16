import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import {
  Users,
  CheckCircle,
  ShoppingBag,
  DollarSign,
  Activity,
  Clock,
  ArrowUpRight,
  Package,
  Ticket as TicketIcon,
} from "lucide-react";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell as ReCell,
  AreaChart,
  Area,
} from "recharts";

interface OverviewTabProps {
  stats: any;
  registrationTrend: any[];
  recentActivity: any[];
  revenueData: any[];
  ticketStats: any[];
  merchSalesData: any[];
  ticketTypeStats: any[];
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  stats,
  registrationTrend,
  recentActivity,
  revenueData,
  ticketStats,
  merchSalesData,
  ticketTypeStats,
}) => {
  return (
    <div className="space-y-6">
      {/* Analytics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-none shadow-sm bg-gradient-to-br from-blue-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Registrations
            </CardTitle>
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <Users className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.regCount || 0}</div>
            <p className="text-xs text-blue-600 mt-1 font-medium">
              Confirmed attendees
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-gradient-to-br from-green-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Checked In</CardTitle>
            <div className="p-2 bg-green-100 rounded-lg text-green-600">
              <CheckCircle className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {stats?.attendance?.checkedIn || 0}
            </div>
            <p className="text-xs text-green-600 mt-1 font-medium">
              {stats?.attendance?.attendanceRate.toFixed(1)}% attendance rate
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-gradient-to-br from-purple-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Merch Orders</CardTitle>
            <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
              <ShoppingBag className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {stats?.merchStats?.totalOrders || 0}
            </div>
            <p className="text-xs text-purple-600 mt-1 font-medium">
              Successful purchases
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-gradient-to-br from-orange-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
              <DollarSign className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ₦{stats?.merchStats?.totalRevenue?.toLocaleString() || 0}
            </div>
            <p className="text-xs text-orange-600 mt-1 font-medium">
              From merchandise sales
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Registration Trend
            </CardTitle>
            <CardDescription>
              Daily ticket registrations for the last 7 days.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={registrationTrend}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EB0028" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#EB0028" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#888" }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#888" }}
                />
                <ReTooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#EB0028"
                  fillOpacity={1}
                  fill="url(#colorCount)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest events from your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentActivity.length > 0 ? (
                recentActivity.map((item) => (
                  <div key={item.id} className="flex gap-4 items-start">
                    <div
                      className={`p-2 rounded-full mt-0.5 ${
                        item.type === "registration"
                          ? "bg-blue-50 text-blue-600"
                          : item.type === "checkin"
                          ? "bg-green-50 text-green-600"
                          : "bg-purple-50 text-purple-600"
                      }`}
                    >
                      {item.type === "registration" ? (
                        <Users className="w-3.5 h-3.5" />
                      ) : item.type === "checkin" ? (
                        <CheckCircle className="w-3.5 h-3.5" />
                      ) : (
                        <ShoppingBag className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <p className="text-sm font-bold text-gray-800 leading-none">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-1">
                        {item.description}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        {item.time.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        • {item.time.toLocaleDateString()}
                      </p>
                    </div>
                    <ArrowUpRight className="w-3 h-3 text-gray-300" />
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <p className="text-sm">No activity yet.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-primary" />
              Merchandise Sales
            </CardTitle>
            <CardDescription>
              Quantity sold per merchandise item.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] pt-4">
            {merchSalesData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <ReBarChart data={merchSalesData} layout="vertical">
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={true}
                    vertical={false}
                    stroke="#f0f0f0"
                  />
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#888" }}
                    width={100}
                  />
                  <ReTooltip
                    cursor={{ fill: "#f8fafc" }}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar
                    dataKey="value"
                    fill="#3b82f6"
                    radius={[0, 4, 4, 0]}
                    barSize={30}
                  />
                </ReBarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <Package className="w-8 h-8 mb-2 opacity-20" />
                <p className="text-sm">No sales data available.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TicketIcon className="w-4 h-4 text-primary" />
              Ticket Types
            </CardTitle>
            <CardDescription>Breakdown by category.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex flex-col items-center justify-center">
            {ticketTypeStats.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={ticketTypeStats}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {ticketTypeStats.map((entry, index) => (
                        <ReCell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ReTooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  {ticketTypeStats.map((s) => (
                    <div key={s.name} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: s.color }}
                      />
                      <span className="text-[10px] font-medium text-gray-600 uppercase">
                        {s.name}
                      </span>
                      <span className="text-xs font-bold">{s.value}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-gray-400 text-sm">No ticket data</div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              Revenue Growth
            </CardTitle>
            <CardDescription>
              Daily merchandise revenue for the last 7 days.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <ReBarChart data={revenueData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#888" }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#888" }}
                  tickFormatter={(value) => `₦${value}`}
                />
                <ReTooltip
                  cursor={{ fill: "#f8fafc" }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar
                  dataKey="revenue"
                  fill="#EB0028"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
              </ReBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

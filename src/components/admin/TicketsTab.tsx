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
import { Checkbox } from "../ui/checkbox";
import {
  Search,
  CheckCircle,
  Download,
  Mail,
  MoreVertical,
  CheckSquare,
  Trash2,
  UserX,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";

interface TicketsTabProps {
  searchId: string;
  setSearchId: (id: string) => void;
  handleValidate: () => void;
  validating: boolean;
  tickets: any[];
  ticketSearch: string;
  setTicketSearch: (search: string) => void;
  statusFilter: "all" | "confirmed" | "checked_in";
  setStatusFilter: (filter: "all" | "confirmed" | "checked_in") => void;
  filteredTickets: any[];
  exportAttendeesCSV: () => void;
  selectedTickets: string[];
  setSelectedTickets: (ids: string[]) => void;
  handleBulkCheckIn: () => void;
  handleBulkEmail: (subject: string, content: string) => void;
  handleCheckIn: (id: string) => void;
  handleCancelTicket: (id: string) => void;
  handleDeleteTicket: (id: string) => void;
}

export const TicketsTab: React.FC<TicketsTabProps> = ({
  searchId,
  setSearchId,
  handleValidate,
  validating,
  tickets,
  ticketSearch,
  setTicketSearch,
  statusFilter,
  setStatusFilter,
  filteredTickets,
  exportAttendeesCSV,
  selectedTickets,
  setSelectedTickets,
  handleBulkCheckIn,
  handleBulkEmail,
  handleCheckIn,
  handleCancelTicket,
  handleDeleteTicket,
}) => {
  const [emailDialog, setEmailDialog] = React.useState({
    open: false,
    subject: "",
    content: "",
  });

  const toggleTicketSelection = (id: string) => {
    if (selectedTickets.includes(id)) {
      setSelectedTickets(selectedTickets.filter((tid) => tid !== id));
    } else {
      setSelectedTickets([...selectedTickets, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedTickets.length === filteredTickets.length) {
      setSelectedTickets([]);
    } else {
      setSelectedTickets(filteredTickets.map((t) => t.id));
    }
  };

  return (
    <div className="grid gap-6">
      {/* Ticket Validation Section */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            Ticket Validation
          </CardTitle>
          <CardDescription>
            Scan or enter ticket ID to check in attendees.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Enter Ticket ID or Payment Reference"
                className="pl-10"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleValidate()}
              />
            </div>
            <Button onClick={handleValidate} disabled={validating}>
              {validating ? "Validating..." : "Check In"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Attendees Table */}
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <CardTitle>Registered Attendees</CardTitle>
            <CardDescription>
              Manage and view all registered participants.
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            {selectedTickets.length > 0 && (
              <div className="flex items-center gap-2 mr-4 bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
                <span className="font-bold text-primary">
                  {selectedTickets.length} Selected
                </span>
                <div className="h-4 w-px bg-primary/20 mx-1" />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs px-2 hover:bg-primary/10 text-primary"
                  onClick={handleBulkCheckIn}
                >
                  Bulk Check-in
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs px-2 hover:bg-primary/10 text-primary flex items-center gap-1"
                  onClick={() => setEmailDialog({ ...emailDialog, open: true })}
                >
                  <Mail className="w-3 h-3" />
                  Email
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs px-2 hover:bg-red-50 text-red-600"
                  onClick={() => setSelectedTickets([])}
                >
                  Cancel
                </Button>
              </div>
            )}
            <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-100 font-medium">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              {tickets.filter((t) => t.status === "checked_in").length} Checked
              In
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100 font-medium">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              {tickets.filter((t) => t.status === "confirmed").length} Pending
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by name, email, or ID..."
                className="pl-10"
                value={ticketSearch}
                onChange={(e) => setTicketSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("all")}
              >
                All
              </Button>
              <Button
                variant={statusFilter === "confirmed" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("confirmed")}
              >
                Pending
              </Button>
              <Button
                variant={statusFilter === "checked_in" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("checked_in")}
              >
                Checked In
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={exportAttendeesCSV}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="rounded-md border overflow-x-auto">
            <div className="min-w-[800px]">
              <Table>
                <TableHeader className="bg-gray-50/50">
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={
                          selectedTickets.length === filteredTickets.length &&
                          filteredTickets.length > 0
                        }
                        onCheckedChange={toggleSelectAll}
                      />
                    </TableHead>
                    <TableHead className="font-bold">Attendee Name</TableHead>
                    <TableHead className="font-bold">Email Address</TableHead>
                    <TableHead className="font-bold">Ticket ID</TableHead>
                    <TableHead className="font-bold">Status</TableHead>
                    <TableHead className="font-bold">
                      Check-in Details
                    </TableHead>
                    <TableHead className="text-right font-bold">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.length > 0 ? (
                    filteredTickets.map((ticket) => (
                      <TableRow
                        key={ticket.id}
                        className={`hover:bg-gray-50/50 transition-colors ${
                          selectedTickets.includes(ticket.id)
                            ? "bg-primary/5"
                            : ""
                        }`}
                      >
                        <TableCell>
                          <Checkbox
                            checked={selectedTickets.includes(ticket.id)}
                            onCheckedChange={() =>
                              toggleTicketSelection(ticket.id)
                            }
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex flex-col">
                            <span>{ticket.full_name}</span>
                            <span className="text-[10px] text-gray-400 font-normal md:hidden">
                              {ticket.email}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-500 hidden md:table-cell">
                          {ticket.email}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <code className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded uppercase font-mono">
                              {ticket.id?.split("-")[0]}...
                            </code>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              ticket.status === "checked_in"
                                ? "default"
                                : "secondary"
                            }
                            className={
                              ticket.status === "checked_in"
                                ? "bg-green-100 text-green-700 hover:bg-green-100 border-green-200 shadow-none text-[10px]"
                                : ticket.status === "cancelled"
                                ? "bg-red-100 text-red-700 hover:bg-red-100 border-red-200 shadow-none text-[10px]"
                                : "bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-100 shadow-none text-[10px]"
                            }
                          >
                            {ticket.status === "checked_in"
                              ? "Checked In"
                              : ticket.status === "cancelled"
                              ? "Cancelled"
                              : "Confirmed"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-[11px] text-gray-500">
                          {ticket.checked_in_at ? (
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-700">
                                {new Date(
                                  ticket.checked_in_at
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                              <span>
                                {new Date(
                                  ticket.checked_in_at
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          ) : (
                            <span className="text-gray-300">
                              Not checked in
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end items-center gap-2">
                            {ticket.status !== "checked_in" ? (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 text-xs border-primary/20 hover:bg-primary/5 hover:text-primary transition-all"
                                onClick={() => handleCheckIn(ticket.id)}
                              >
                                Check In
                              </Button>
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                <CheckCircle className="w-4 h-4" />
                              </div>
                            )}

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {ticket.status !== "cancelled" && (
                                  <DropdownMenuItem
                                    className="text-orange-600 flex items-center gap-2 cursor-pointer"
                                    onClick={() =>
                                      handleCancelTicket(ticket.id)
                                    }
                                  >
                                    <UserX className="h-4 w-4" />
                                    Cancel Ticket
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem
                                  className="text-red-600 flex items-center gap-2 cursor-pointer"
                                  onClick={() => handleDeleteTicket(ticket.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  Delete Record
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="h-32 text-center text-gray-500"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Search className="w-8 h-8 text-gray-200" />
                          <p className="text-sm font-medium">
                            No attendees match your search.
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setTicketSearch("");
                              setStatusFilter("all");
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
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={emailDialog.open}
        onOpenChange={(open) => setEmailDialog({ ...emailDialog, open })}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Send Bulk Email</DialogTitle>
            <DialogDescription>
              Send an email to the {selectedTickets.length} selected attendees.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Input
                placeholder="Email subject..."
                value={emailDialog.subject}
                onChange={(e) =>
                  setEmailDialog({ ...emailDialog, subject: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea
                placeholder="Type your message here..."
                className="min-h-[150px]"
                value={emailDialog.content}
                onChange={(e) =>
                  setEmailDialog({ ...emailDialog, content: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setEmailDialog({ ...emailDialog, open: false })}
            >
              Cancel
            </Button>
            <Button
              disabled={!emailDialog.subject || !emailDialog.content}
              onClick={() => {
                handleBulkEmail(emailDialog.subject, emailDialog.content);
                setEmailDialog({ open: false, subject: "", content: "" });
              }}
            >
              Send Emails
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

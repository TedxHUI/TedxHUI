import {
  CheckCircle,
  CheckSquare,
  Clock,
  Download,
  Mail,
  MoreVertical,
  Search,
  Trash2,
  UserX,
  X,
} from "lucide-react";
import React from "react";
import { useMediaQuery } from "../../hooks/use-media-query";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "../ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle
} from "../ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Textarea } from "../ui/textarea";

import { Ticket } from "../../services/ticketService";

interface TicketsTabProps {
  searchId: string;
  setSearchId: (id: string) => void;
  handleValidate: () => void;
  validating: boolean;
  tickets: Ticket[];
  ticketSearch: string;
  setTicketSearch: (search: string) => void;
  statusFilter: "all" | "confirmed" | "checked_in";
  setStatusFilter: (filter: "all" | "confirmed" | "checked_in") => void;
  filteredTickets: Ticket[];
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
  const isDesktop = useMediaQuery("(min-width: 768px)");
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
      setSelectedTickets(
        filteredTickets
          .map((t) => t.id)
          .filter((id): id is string => id !== undefined)
      );
    }
  };

  const EmailForm = () => (
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
    </div>
  );

  return (
    <div className="grid gap-6 overflow-hidden">
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
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Enter Ticket ID or Payment Reference"
                className="pl-10 w-full"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleValidate()}
              />
            </div>
            <Button
              onClick={handleValidate}
              disabled={validating}
              className="w-full md:w-auto shrink-0"
            >
              {validating ? "Validating..." : "Check In"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Attendees Table */}
      <Card className="max-w-[90vw]">
        <CardHeader className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <CardTitle className="text-xl">Registered Attendees</CardTitle>
              <CardDescription className="mt-1.5">
                Manage and view all registered participants.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg border border-green-200 font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="font-semibold">
                  {tickets.filter((t) => t.status === "checked_in").length}
                </span>
                <span className="hidden sm:inline">Checked In</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg border border-blue-200 font-medium">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="font-semibold">
                  {tickets.filter((t) => t.status === "confirmed").length}
                </span>
                <span className="hidden sm:inline">Pending</span>
              </span>
            </div>
          </div>

          {selectedTickets.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 p-3 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-primary" />
                <span className="font-semibold text-primary text-sm">
                  {selectedTickets.length}{" "}
                  {selectedTickets.length === 1 ? "ticket" : "tickets"} selected
                </span>
              </div>
              <div className="h-4 w-px bg-primary/20 hidden sm:block" />
              <div className="flex flex-wrap gap-2 flex-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs px-3 hover:bg-primary/10 text-primary font-medium"
                  onClick={handleBulkCheckIn}
                >
                  <CheckSquare className="w-3.5 h-3.5 mr-1.5" />
                  Check In All
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs px-3 hover:bg-primary/10 text-primary font-medium"
                  onClick={() => setEmailDialog({ ...emailDialog, open: true })}
                >
                  <Mail className="w-3.5 h-3.5 mr-1.5" />
                  Send Email
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs px-3 hover:bg-red-50 text-red-600 font-medium ml-auto"
                  onClick={() => setSelectedTickets([])}
                >
                  Clear Selection
                </Button>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by name, email, or ID..."
                className="pl-10 h-10"
                value={ticketSearch}
                onChange={(e) => setTicketSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex gap-2 overflow-x-auto pb-2 -mb-2 sm:pb-0 sm:mb-0 custom-scrollbar">
                <Button
                  variant={statusFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("all")}
                  className="flex-1 sm:flex-none h-9 whitespace-nowrap min-w-[80px]"
                >
                  All ({tickets.length})
                </Button>
                <Button
                  variant={statusFilter === "confirmed" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("confirmed")}
                  className="flex-1 sm:flex-none h-9 whitespace-nowrap min-w-[100px]"
                >
                  Pending (
                  {tickets.filter((t) => t.status === "confirmed").length})
                </Button>
                <Button
                  variant={
                    statusFilter === "checked_in" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setStatusFilter("checked_in")}
                  className="flex-1 sm:flex-none h-9 whitespace-nowrap min-w-[110px]"
                >
                  Checked In (
                  {tickets.filter((t) => t.status === "checked_in").length})
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={exportAttendeesCSV}
                className="flex items-center justify-center gap-2 h-9 w-full sm:w-auto whitespace-nowrap shrink-0 sm:ml-auto"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-scroll custom-scrollbar">
            <Table className="min-w-full md:min-w-[900px]">
              <TableHeader className="bg-gray-50 sticky top-0 z-10 border-b-2 border-gray-200">
                <TableRow>
                  <TableHead className="w-12 pl-4">
                    <Checkbox
                      checked={
                        selectedTickets.length === filteredTickets.length &&
                        filteredTickets.length > 0
                      }
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Attendee
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 hidden md:table-cell">
                    Email
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Ticket ID
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Status
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 hidden md:table-cell">
                    Check-in Time
                  </TableHead>
                  <TableHead className="text-right font-semibold text-gray-700 pr-4 hidden sm:table-cell">
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
                        ticket.id && selectedTickets.includes(ticket.id)
                          ? "bg-primary/5"
                          : ""
                      }`}
                    >
                      <TableCell className="w-12 pl-4">
                        <Checkbox
                          checked={
                            ticket.id
                              ? selectedTickets.includes(ticket.id)
                              : false
                          }
                          onCheckedChange={() =>
                            ticket.id && toggleTicketSelection(ticket.id)
                          }
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-semibold text-gray-900">
                            {ticket.full_name}
                          </span>
                          <span className="text-xs text-gray-500 md:hidden">
                            {ticket.email}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600 hidden md:table-cell">
                        {ticket.email}
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono text-gray-700">
                          {ticket.id?.split("-")[0]}
                        </code>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center">
                          {ticket.status === "checked_in" ? (
                            <div
                              className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center border border-green-200"
                              title="Checked In"
                            >
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </div>
                          ) : ticket.status === "cancelled" ? (
                            <div
                              className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center border border-red-200"
                              title="Cancelled"
                            >
                              <X className="w-4 h-4 text-red-600" />
                            </div>
                          ) : (
                            <div
                              className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-200"
                              title="Confirmed"
                            >
                              <Clock className="w-4 h-4 text-blue-600" />
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-gray-600 hidden md:table-cell">
                        {ticket.checked_in_at ? (
                          <div className="flex flex-col gap-0.5">
                            <span className="font-semibold text-gray-900">
                              {new Date(
                                ticket.checked_in_at
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                            <span className="text-gray-500">
                              {new Date(
                                ticket.checked_in_at
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400 italic">
                            Not checked in
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right pr-4">
                        <div className="flex justify-end items-center gap-2">
                          {ticket.status !== "checked_in" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-9 text-xs border-primary/30 hover:bg-primary hover:text-white hover:border-primary transition-all hidden sm:flex font-medium"
                              onClick={() =>
                                ticket.id && handleCheckIn(ticket.id)
                              }
                            >
                              <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                              Check In
                            </Button>
                          )}

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 hover:bg-gray-100"
                              >
                                <MoreVertical className="h-4 w-4 text-gray-600" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {ticket.status !== "checked_in" && (
                                <DropdownMenuItem
                                  className="flex items-center gap-2 cursor-pointer sm:hidden"
                                  onClick={() =>
                                    ticket.id && handleCheckIn(ticket.id)
                                  }
                                >
                                  <CheckSquare className="h-4 w-4 text-green-600" />
                                  Check In
                                </DropdownMenuItem>
                              )}
                              {ticket.status !== "cancelled" && (
                                <DropdownMenuItem
                                  className="text-orange-600 flex items-center gap-2 cursor-pointer"
                                  onClick={() =>
                                    ticket.id && handleCancelTicket(ticket.id)
                                  }
                                >
                                  <UserX className="h-4 w-4" />
                                  Cancel Ticket
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                className="text-red-600 flex items-center gap-2 cursor-pointer"
                                onClick={() =>
                                  ticket.id && handleDeleteTicket(ticket.id)
                                }
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
        </CardContent>
      </Card>

      {isDesktop ? (
        <Dialog
          open={emailDialog.open}
          onOpenChange={(open) => setEmailDialog({ ...emailDialog, open })}
        >
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Send Bulk Email</DialogTitle>
              <DialogDescription>
                Send an email to the {selectedTickets.length} selected
                attendees.
              </DialogDescription>
            </DialogHeader>
            <EmailForm />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer
          open={emailDialog.open}
          onOpenChange={(open) => setEmailDialog({ ...emailDialog, open })}
        >
          <DrawerContent className="max-h-[80vh]">
            <div className="px-6 pb-8 overflow-y-auto">
              <DrawerHeader className="px-0">
                <DrawerTitle>Send Bulk Email</DrawerTitle>
                <DrawerDescription>
                  Email {selectedTickets.length} attendees.
                </DrawerDescription>
              </DrawerHeader>
              <EmailForm />
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

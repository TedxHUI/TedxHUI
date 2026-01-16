import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Megaphone, Send, RefreshCw, Search } from "lucide-react";

interface BroadcastTabProps {
  broadcast: { subject: string; content: string };
  setBroadcast: (broadcast: any) => void;
  broadcasting: boolean;
  handleBroadcast: () => void;
  handleSendReminders: () => void;
  sendingReminders: boolean;
  notifications: any[];
  filteredNotifications: any[];
  broadcastSearch: string;
  setBroadcastSearch: (search: string) => void;
}

export const BroadcastTab: React.FC<BroadcastTabProps> = ({
  broadcast,
  setBroadcast,
  broadcasting,
  handleBroadcast,
  handleSendReminders,
  sendingReminders,
  notifications,
  filteredNotifications,
  broadcastSearch,
  setBroadcastSearch,
}) => {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="border-2 border-primary/10 h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-primary" />
              Broadcast Announcement
            </CardTitle>
            <CardDescription>
              Send an update to all confirmed ticket holders via email.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Input
                placeholder="e.g. Venue Change or New Speaker Announcement"
                value={broadcast.subject}
                onChange={(e) =>
                  setBroadcast({ ...broadcast, subject: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Message Content</label>
              <Textarea
                placeholder="Write your message here..."
                className="min-h-[200px]"
                value={broadcast.content}
                onChange={(e) =>
                  setBroadcast({ ...broadcast, content: e.target.value })
                }
              />
            </div>
            <Button
              className="w-full flex items-center gap-2 h-12"
              onClick={handleBroadcast}
              disabled={broadcasting}
            >
              <Send className="w-4 h-4" />
              {broadcasting ? "Sending..." : "Send to All Attendees"}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="h-full">
          <CardHeader>
            <div className="flex flex-col space-y-2">
              <CardTitle className="text-lg">Recent Notifications</CardTitle>
              <CardDescription>
                History of sent emails and announcements.
              </CardDescription>
              <div className="relative mt-2">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                <Input
                  placeholder="Search history..."
                  className="pl-8 h-8 text-xs"
                  value={broadcastSearch}
                  onChange={(e) => setBroadcastSearch(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 text-scrollbar">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.slice(0, 20).map((n) => (
                  <div
                    key={n.id}
                    className="p-3 border rounded-lg bg-gray-50/50 space-y-1 text-xs"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-gray-700 line-clamp-1 flex-1 mr-2">
                        {n.subject}
                      </span>
                      <Badge
                        variant="outline"
                        className="text-[9px] h-4 py-0 uppercase"
                      >
                        {n.type.replace("_", " ")}
                      </Badge>
                    </div>
                    <p className="text-gray-500 line-clamp-2 italic">
                      "{n.content}"
                    </p>
                    <div className="flex justify-between items-center pt-1 text-[10px] text-gray-400">
                      <span className="truncate flex-1 mr-2">
                        {n.user_email}
                      </span>
                      <span className="whitespace-nowrap">
                        {new Date(n.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <Megaphone className="w-8 h-8 mx-auto mb-2 opacity-20" />
                  <p className="text-sm">
                    {broadcastSearch
                      ? "No matching notifications."
                      : "No notifications sent yet."}
                  </p>
                  {broadcastSearch && (
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => setBroadcastSearch("")}
                      className="mt-1 h-auto p-0 text-[10px]"
                    >
                      Clear search
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Quick Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSendReminders}
              disabled={sendingReminders}
              className="w-full flex items-center gap-2"
            >
              <RefreshCw
                className={`w-4 h-4 ${sendingReminders ? "animate-spin" : ""}`}
              />
              Send 24h Reminder
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

"use client";

import { useState } from "react";
import { Badge, Avatar, Card, Button } from "antd";
import { 
  Bell, 
  Tag, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Inbox
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Notification {
  id: string;
  type: "property" | "inquiry" | "system";
  title: string;
  subtitle: string;
  timestamp: string;
  isRead: boolean;
}

export default function NotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "inquiry",
      title: "New Lead Enquiry from Asadujjaman",
      subtitle: "Interested in the 4 bed House, London. Requested a callback.",
      timestamp: "8:00am, today",
      isRead: false,
    },
    {
      id: "2",
      type: "property",
      title: "Price drop on your Saved Property",
      subtitle: "3 bed Studio Apartment Manchester is now £10,000 cheaper.",
      timestamp: "10:30am, yesterday",
      isRead: true,
    },
    {
      id: "3",
      type: "system",
      title: "Account Verified Successfully",
      subtitle: "Your identity verification has been completed by our staff.",
      timestamp: "2 days ago",
      isRead: false,
    },
    {
      id: "4",
      type: "property",
      title: "New Match Found for Saved Search",
      subtitle: "A new property matches your Manchester search filters.",
      timestamp: "3 days ago",
      isRead: true,
    },
    {
      id: "5",
      type: "inquiry",
      title: "Viewing Confirmed by Agent Nadir",
      subtitle: "Your scheduled viewing for tomorrow at 10:00 AM is approved.",
      timestamp: "4 days ago",
      isRead: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleReadAll = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  const handleNotificationClick = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const getNotificationStyles = (type: string) => {
    switch (type) {
      case "property":
        return {
          icon: <Tag className="text-[#14b8a6]" size={20} />,
          bgColor: "bg-teal-50",
          borderColor: "border-teal-100/50"
        };
      case "inquiry":
        return {
          icon: <MessageSquare className="text-[#1a3c6e]" size={20} />,
          bgColor: "bg-blue-50",
          borderColor: "border-blue-100/50"
        };
      default:
        return {
          icon: <CheckCircle2 className="text-green-500" size={20} />,
          bgColor: "bg-green-50",
          borderColor: "border-green-100/50"
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card 
          className="rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] bg-white overflow-hidden"
          styles={{ body: { padding: 0 } }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 sm:p-8 border-b border-gray-100 bg-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50/50 border border-blue-100/50 flex items-center justify-center text-[#1a3c6e]">
                <Bell size={24} className="animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-[#1a3c6e] m-0">Notifications</h1>
                <p className="text-gray-500 text-xs mt-1 m-0 font-medium">Stay updated with your real estate activity</p>
              </div>
              {unreadCount > 0 && (
                <span className="bg-[#14b8a6] text-white text-xs font-bold px-2.5 py-0.5 rounded-full ml-1">
                  {unreadCount} new
                </span>
              )}
            </div>

            <Button
              type="text"
              onClick={handleReadAll}
              disabled={unreadCount === 0}
              className={`!h-10 !px-4 !font-bold !text-xs !rounded-xl transition-all ${
                unreadCount > 0 
                  ? "!text-[#14b8a6] hover:!bg-teal-50" 
                  : "!text-gray-400 cursor-not-allowed"
              }`}
            >
              Mark all as read
            </Button>
          </div>

          {/* List */}
          <div className="divide-y divide-gray-100">
            {notifications.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                  <Inbox className="text-gray-300" size={32} />
                </div>
                <h3 className="text-gray-900 font-bold text-base m-0">No notifications yet</h3>
                <p className="text-gray-400 text-xs mt-1">We'll alert you when there is new activity.</p>
              </div>
            ) : (
              notifications.map((item) => {
                const styles = getNotificationStyles(item.type);
                return (
                  <div
                    key={item.id}
                    onClick={() => handleNotificationClick(item.id)}
                    className={`group relative flex gap-4 p-5 sm:p-6 transition-all duration-200 cursor-pointer ${
                      item.isRead 
                        ? "bg-white hover:bg-gray-50/50" 
                        : "bg-blue-50/15 hover:bg-blue-50/30"
                    }`}
                  >
                    <div className={`flex-shrink-0 w-12 h-12 rounded-2xl ${styles.bgColor} border ${styles.borderColor} flex items-center justify-center shadow-inner`}>
                      {styles.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2 min-w-0">
                          <h4 className={`text-[14px] font-extrabold truncate m-0 ${
                            item.isRead ? "text-gray-700" : "text-[#1a3c6e]"
                          }`}>
                            {item.title}
                          </h4>
                          {!item.isRead && (
                            <span className="w-2 h-2 bg-[#14b8a6] rounded-full shrink-0" />
                          )}
                        </div>
                        <span className="text-[11px] font-medium text-gray-400 flex items-center gap-1 shrink-0 whitespace-nowrap">
                          <Clock size={12} />
                          {item.timestamp}
                        </span>
                      </div>
                      <p className="text-[13px] text-gray-500 m-0 leading-relaxed font-medium">
                        {item.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center self-center opacity-0 group-hover:opacity-100 transition-opacity pl-2">
                      <ArrowRight className="text-[#1a3c6e]" size={16} />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Stats */}
          {notifications.length > 0 && (
            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center text-xs font-semibold text-gray-500">
              <span>Total: {notifications.length} notifications</span>
              <span>{unreadCount > 0 ? `${unreadCount} unread` : "All read"}</span>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

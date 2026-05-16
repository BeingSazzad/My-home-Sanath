"use client";

import React, { useState } from 'react';
import { Switch } from 'antd';
import { useSelector } from 'react-redux';
import {
  Bell,
  Tag,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  Mail,
  Smartphone,
  Home,
  AlertCircle,
  Settings,
  ChevronLeft,
} from 'lucide-react';

const NOTIFICATIONS = [
  {
    id: 1,
    title: 'Price Reduced!',
    message: 'The property "4 bed House, London" has been reduced by £15,000.',
    time: '2 hours ago',
    isUnread: true,
    icon: <Tag className="text-orange-500" size={20} />,
    bgColor: 'bg-orange-50',
  },
  {
    id: 2,
    title: 'Booking Confirmed',
    message: 'Your viewing for "Studio Apartment" is confirmed for tomorrow at 10:00 AM.',
    time: '5 hours ago',
    isUnread: true,
    icon: <Calendar className="text-blue-500" size={20} />,
    bgColor: 'bg-blue-50',
  },
  {
    id: 3,
    title: 'Account Verified',
    message: 'Great news! Your identity verification has been successfully completed.',
    time: '1 day ago',
    isUnread: false,
    icon: <CheckCircle2 className="text-green-500" size={20} />,
    bgColor: 'bg-green-50',
  },
  {
    id: 4,
    title: 'New Listing for you',
    message: 'A new 3 bed house matches your saved search in Manchester.',
    time: '2 days ago',
    isUnread: false,
    icon: <Bell className="text-purple-500" size={20} />,
    bgColor: 'bg-purple-50',
  },
];

const CHANNEL_SETTINGS = [
  {
    key: 'emailAlerts',
    icon: <Mail size={20} className="text-[#1a3c6e]" />,
    title: 'Email Alerts',
    description: 'Receive alerts via email',
  },
  {
    key: 'pushNotifications',
    icon: <Smartphone size={20} className="text-[#1a3c6e]" />,
    title: 'Push Notifications',
    description: 'Get instant updates on your device',
  },
];

const ALERT_TYPE_SETTINGS = [
  {
    key: 'listingApproved',
    icon: <Home size={20} className="text-[#1a3c6e]" />,
    title: 'Listing approved',
    description: 'When your listing goes live',
  },
  {
    key: 'listingExpiring',
    icon: <AlertCircle size={20} className="text-[#1a3c6e]" />,
    title: 'Listing expiring',
    description: '7 days before listing expires',
  },
];

const ToggleRow = ({
  icon,
  title,
  description,
  checked,
  onChange,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) => (
  <div className="flex items-center justify-between py-4">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-sm font-bold text-gray-900">{title}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
    <Switch
      checked={checked}
      onChange={onChange}
      style={{ backgroundColor: checked ? '#1a3c6e' : undefined }}
    />
  </div>
);

const NotificationSettings = ({ onBack }: { onBack: () => void }) => {
  const { user } = useSelector((state: any) => state.auth);
  const isAgent = user?.user?.role === 'Agent';

  const [channels, setChannels] = useState({ emailAlerts: true, pushNotifications: true });
  const [alerts, setAlerts] = useState({ listingApproved: true, listingExpiring: true });

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <ChevronLeft size={18} className="text-gray-700" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-[#1a3c6e]">Notification Settings</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage how you receive updates</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 divide-y divide-gray-100">
          {CHANNEL_SETTINGS.map(row => (
            <ToggleRow
              key={row.key}
              icon={row.icon}
              title={row.title}
              description={row.description}
              checked={channels[row.key as keyof typeof channels]}
              onChange={v => setChannels(prev => ({ ...prev, [row.key]: v }))}
            />
          ))}
        </div>

        {isAgent && (
          <>
            <div className="px-5 pt-5 pb-1">
              <p className="text-sm font-extrabold text-gray-900">Alert Types</p>
            </div>
            <div className="px-5 divide-y divide-gray-100">
              {ALERT_TYPE_SETTINGS.map(row => (
                <ToggleRow
                  key={row.key}
                  icon={row.icon}
                  title={row.title}
                  description={row.description}
                  checked={alerts[row.key as keyof typeof alerts]}
                  onChange={v => setAlerts(prev => ({ ...prev, [row.key]: v }))}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const UserNotifications = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  if (showSettings) {
    return (
      <div className="max-w-7xl">
        <NotificationSettings onBack={() => setShowSettings(false)} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1a3c6e]">Notification</h1>
          <p className="text-gray-500 text-sm mt-1">Stay updated with your property activity</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="text-sm font-bold text-[#0f2d5e] hover:underline"
            onClick={() => setNotifications(prev => prev.map(n => ({ ...n, isUnread: false })))}
          >
            Mark all as read
          </button>
          <button
            onClick={() => setShowSettings(true)}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            title="Notification settings"
          >
            <Settings size={17} className="text-[#1a3c6e]" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map(item => (
          <div
            key={item.id}
            className={`group relative flex gap-4 p-4 rounded-2xl border transition-all cursor-pointer hover:shadow-md ${
              item.isUnread
                ? 'bg-white border-blue-100 shadow-sm'
                : 'bg-gray-50/50 border-gray-100 opacity-80'
            }`}
          >
            <div className={`flex-shrink-0 w-12 h-12 ${item.bgColor} rounded-xl flex items-center justify-center`}>
              {item.icon}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className={`text-sm font-bold truncate ${item.isUnread ? 'text-gray-900' : 'text-gray-600'}`}>
                  {item.title}
                </h4>
                <span className="text-[11px] font-medium text-gray-400 flex items-center gap-1 ml-2 shrink-0">
                  <Clock size={12} />
                  {item.time}
                </span>
              </div>
              <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{item.message}</p>
            </div>

            <div className="flex items-center self-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowRight className="text-[#0f2d5e]" size={18} />
            </div>

            {item.isUnread && (
              <div className="absolute top-4 right-4 w-2 h-2 bg-[#0f2d5e] rounded-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserNotifications;

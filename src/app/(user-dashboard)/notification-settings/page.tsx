"use client";

import React, { useState } from 'react';
import { Switch } from 'antd';
import { Mail, Smartphone, Home, AlertCircle } from 'lucide-react';
import { useSelector } from 'react-redux';

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

export default function NotificationSettingsPage() {
  const { user } = useSelector((state: any) => state.auth);
  const isAgent = user?.user?.role === 'Agent';

  const [channels, setChannels] = useState({ emailAlerts: true, pushNotifications: true });
  const [alerts, setAlerts] = useState({ listingApproved: true, listingExpiring: true });

  return (
    <div className="max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-[#1a3c6e]">Notification Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage how you receive updates</p>
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
}

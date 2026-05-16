"use client";

import React, { useState } from 'react';
import { Tabs, Badge } from 'antd';
import { 
  Bell, 
  Tag, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  ArrowRight
} from 'lucide-react';

const NOTIFICATIONS = [
  {
    id: 1,
    type: 'price_reduced',
    title: 'Price Reduced!',
    message: 'The property "4 bed House, London" has been reduced by £15,000.',
    time: '2 hours ago',
    isUnread: true,
    icon: <Tag className="text-orange-500" size={20} />,
    bgColor: 'bg-orange-50'
  },
  {
    id: 2,
    type: 'booking',
    title: 'Booking Confirmed',
    message: 'Your viewing for "Studio Apartment" is confirmed for tomorrow at 10:00 AM.',
    time: '5 hours ago',
    isUnread: true,
    icon: <Calendar className="text-blue-500" size={20} />,
    bgColor: 'bg-blue-50'
  },
  {
    id: 3,
    type: 'verification',
    title: 'Account Verified',
    message: 'Great news! Your identity verification has been successfully completed.',
    time: '1 day ago',
    isUnread: false,
    icon: <CheckCircle2 className="text-green-500" size={20} />,
    bgColor: 'bg-green-50'
  },
  {
    id: 4,
    type: 'new_listing',
    title: 'New Listing for you',
    message: 'A new 3 bed house matches your saved search in Manchester.',
    time: '2 days ago',
    isUnread: false,
    icon: <Bell className="text-purple-500" size={20} />,
    bgColor: 'bg-purple-50'
  }
];

const UserNotifications = () => {
  const [activeTab, setActiveTab] = useState('1');

  const renderList = (unreadOnly = false) => {
    const list = unreadOnly ? NOTIFICATIONS.filter(n => n.isUnread) : NOTIFICATIONS;
    
    if (list.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Bell className="text-gray-300" size={32} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">All caught up!</h3>
          <p className="text-gray-500">No new notifications at the moment.</p>
        </div>
      );
    }

    return (
      <div className="space-y-4 py-4">
        {list.map((item) => (
          <div 
            key={item.id}
            className={`group relative flex gap-4 p-4 rounded-2xl border transition-all cursor-pointer hover:shadow-md ${
              item.isUnread ? 'bg-white border-blue-100 shadow-sm' : 'bg-gray-50/50 border-gray-100 opacity-80'
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
                <span className="text-[11px] font-medium text-gray-400 flex items-center gap-1">
                  <Clock size={12} />
                  {item.time}
                </span>
              </div>
              <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                {item.message}
              </p>
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
    );
  };

  const items = [
    {
      key: '1',
      label: (
        <span className="px-2 flex items-center gap-2">
          All Notifications
          <Badge count={NOTIFICATIONS.length} className="site-badge-count-4" style={{ backgroundColor: '#f0f0f0', color: '#999' }} />
        </span>
      ),
      children: renderList(false),
    },
    {
      key: '2',
      label: (
        <span className="px-2 flex items-center gap-2">
          Unread
          <Badge count={NOTIFICATIONS.filter(n => n.isUnread).length} style={{ backgroundColor: '#0f2d5e' }} />
        </span>
      ),
      children: renderList(true),
    },
  ];

  return (
    <div className="max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1a3c6e]">Alerts & Notifications</h1>
          <p className="text-gray-500 text-sm mt-1">Stay updated with your property activity</p>
        </div>
        <button className="text-sm font-bold text-[#0f2d5e] hover:underline">
          Mark all as read
        </button>
      </div>

      <Tabs 
        defaultActiveKey="1" 
        items={items} 
        onChange={setActiveTab}
        className="notification-tabs"
      />
    </div>
  );
};

export default UserNotifications;
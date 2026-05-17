"use client";

import React from "react";
import { ConfigProvider, Tabs } from "antd";
import { Heart, Search } from "lucide-react";
import SaveProperties from "@/components/UserDashboard/saveProperties";
import SavedSearchList from "@/components/UserDashboard/savedSearches/SavedSearchList";
import { SavedSearch } from "@/components/UserDashboard/savedSearches/SavedSearchItem";

const MOCK_SEARCHES: SavedSearch[] = [
  { id: "1", title: "London, up to £1.5m", description: "Houses, 3+ Beds, Within 5 miles", alertOn: true },
  { id: "2", title: "Manchester City Centre", description: "Flats, up to £500k", alertOn: true },
];

export default function SavedPage() {
  const items = [
    {
      key: "properties",
      label: (
        <span className="flex items-center gap-2 px-2">
          <Heart size={16} />
          Saved Properties
        </span>
      ),
      children: (
        <div className="mt-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <SaveProperties />
        </div>
      ),
    },
    {
      key: "searches",
      label: (
        <span className="flex items-center gap-2 px-2">
          <Search size={16} />
          Saved Searches
        </span>
      ),
      children: (
        <div className="mt-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <SavedSearchList initialData={MOCK_SEARCHES} />
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-[#1a3c6e] mb-1">Saved</h1>
        <p className="text-gray-500 text-sm">Manage your saved properties and search alerts.</p>
      </div>

      <ConfigProvider
        theme={{
            token: {
                colorPrimary: '#1a3c6e',
            }
        }}
      >
        <Tabs
          defaultActiveKey="properties"
          items={items}
          className="custom-tabs"
          size="large"
        />
      </ConfigProvider>

      <style jsx global>{`
        .custom-tabs .ant-tabs-nav::before {
          border-bottom: 1px solid #f0f0f0;
        }
        .custom-tabs .ant-tabs-tab {
          padding: 12px 0 !important;
          margin-right: 32px !important;
        }
        .custom-tabs .ant-tabs-tab-btn {
          font-weight: 600 !important;
          font-size: 15px !important;
          color: #6b7280 !important;
          transition: all 0.3s !important;
        }
        .custom-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
          color: #1a3c6e !important;
        }
        .custom-tabs .ant-tabs-ink-bar {
          background: #1a3c6e !important;
          height: 3px !important;
          border-radius: 3px 3px 0 0;
        }
      `}</style>
    </div>
  );
}

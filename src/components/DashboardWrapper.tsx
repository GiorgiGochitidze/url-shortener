"use client";

import { useState } from "react";
import Input from "./Input";
import LinksTable from "./LinksTable";

interface ClickItem {
  timestamp: string;
  referrer: string;
  userAgent: string;
}

interface LinkItem {
  _id: string;
  slug: string;
  originalUrl: string;
  userId?: string;
  clicks?: ClickItem[];
  clicksCount?: number;
  status?: string;
  createdAt: string;
  updatedAt?: string;
}

const DashboardWrapper = () => {
  const [extraLinks, setExtraLinks] = useState<LinkItem[]>([]);

  const handleLinkAdded = (newLink: LinkItem) => {
    setExtraLinks((prev) => [newLink, ...prev]);
  };

  // ✅ New handler: Cleanses the dashboard state instantly when a subrow triggers a delete
  const handleLinkDeleted = (deletedId: string) => {
    setExtraLinks((prev) => prev.filter((link) => link._id !== deletedId));
  };

  return (
    <div className="w-full h-auto mx-auto flex flex-col gap-10">
      <Input onLinkAdded={handleLinkAdded} />

      <LinksTable
        isSample={false}
        extraLinks={extraLinks}
        onLinkDeleted={handleLinkDeleted}
      />
    </div>
  );
};

export default DashboardWrapper;

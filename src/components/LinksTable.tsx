"use client";

import { useEffect, useState } from "react";

// Mock Sample data for the Landing Page
const SAMPLE_LINKS: LinkItem[] = [
  {
    _id: "sample-1",
    slug: "Bn41aCOrxj",
    originalUrl: "https://www.twitter.com/tweets/8erelCsihu/",
    clicksCount: 1313,
    status: "Active",
    createdAt: "2026-06-12T12:00:00.000Z",
    expiresAt: "2026-06-13T12:00:00.000Z",
  },
  {
    _id: "sample-2",
    slug: "Yt72xPQz",
    originalUrl: "https://www.youtube.com/watch?v=8J7ZimHOXuia",
    clicksCount: 4313,
    status: "Inactive",
    createdAt: "2026-06-11T12:00:00.000Z",
    expiresAt: "2026-06-12T12:00:00.000Z",
  },
];

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
  expiresAt?: string | null; 
  createdAt: string;
  updatedAt?: string;
}

interface LinksTableProps {
  isSample?: boolean;
  extraLinks?: LinkItem[];
  onLinkDeleted?: (id: string) => void;
}

const LinksTable = ({
  isSample = false,
  extraLinks = [],
  onLinkDeleted,
}: LinksTableProps) => {
  const [dbLinks, setDbLinks] = useState<LinkItem[]>(
    isSample ? SAMPLE_LINKS : [],
  );
  const [loading, setLoading] = useState<boolean>(!isSample);
  const [error, setError] = useState<string>("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (isSample) return;

    async function fetchLinks() {
      try {
        setLoading(true);
        const res = await fetch("/api/links", { cache: "no-store" });

        if (!res.ok) {
          throw new Error("Failed to fetch links");
        }

        const data = await res.json();
        setDbLinks(data.links || []);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchLinks();
  }, [isSample]);

  const handleDelete = async (linkId: string) => {
    if (isSample) {
      setDbLinks((prev) => prev.filter((link) => link._id !== linkId));
      return;
    }

    if (!window.confirm("Are you sure you want to delete this link?")) return;

    setDeletingId(linkId);
    try {
      const res = await fetch("/api/links", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: linkId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete link");
      }

      setDbLinks((prev) => prev.filter((link) => link._id !== linkId));
      if (onLinkDeleted) onLinkDeleted(linkId);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error deleting link");
    } finally {
      setDeletingId(null);
    }
  };

  const links = [...extraLinks, ...dbLinks];

  if (loading) {
    return (
      <div className="w-full text-center py-10 text-[#C9CED6] animate-pulse">
        Loading your short links...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center py-10 text-red-400 bg-red-950/20 border border-red-900 rounded-2xl">
        {error}
      </div>
    );
  }

  if (links.length === 0) {
    return (
      <div className="w-full text-center py-12 text-[#C9CED6] border border-dashed border-[#353C4A] rounded-2xl bg-[#181E29]/50">
        You haven&apos;t shortened any links yet. Try one above!
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-[#353C4A] bg-[#0E131E]">
      <table className="w-full text-sm text-left text-[#C9CED6]">
        <thead>
          <tr className="bg-[#181E29] [&_th]:min-w-25 border-b border-[#353C4A]">
            <th className="py-4 px-4 font-medium">Short Link</th>
            <th className="py-4 px-4 font-medium">Original Link</th>
            <th className="py-4 px-4 font-medium">Clicks</th>
            <th className="py-4 px-4 font-medium">Status</th>
            <th className="py-4 px-4 font-medium">Created Date</th>
            <th className="py-4 px-4 font-medium">Expires At</th>{" "}
            <th className="py-4 px-4 font-medium text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => {
            const baseOrigin =
              typeof window !== "undefined"
                ? window.location.origin
                : "https://linkly.com";
            const shortUrl = `${baseOrigin}/${link.slug}`;

            const totalClicks = link.clicks
              ? link.clicks.length
              : link.clicksCount || 0;

            // Live status checks against the current time
            const isExpired = link.expiresAt
              ? new Date() > new Date(link.expiresAt)
              : false;
            const isActive =
              link.status === "Inactive" || isExpired ? false : true;

            // Formatting Created Date
            const displayCreatedDate = link.createdAt.includes("T")
              ? new Date(link.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })
              : link.createdAt;

            const displayExpiresDate = link.expiresAt
              ? new Date(link.expiresAt).toLocaleString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Never";

            return (
              <tr
                key={link._id}
                className="border-b border-[#353C4A]/40 hover:bg-[#1C2433] transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{shortUrl}</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(shortUrl)}
                      className="text-[#C9CED6] hover:text-white cursor-pointer active:scale-90 transition-transform"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect x="9" y="9" width="13" height="13" rx="2" />
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                      </svg>
                    </button>
                  </div>
                </td>

                <td className="py-4 px-4">
                  <span
                    title={link.originalUrl}
                    className="block truncate max-w-[220px] text-[#C9CED6] hover:text-white"
                  >
                    {link.originalUrl}
                  </span>
                </td>

                <td className="py-4 px-4 text-white font-mono">
                  {totalClicks}
                </td>

                <td className="py-4 px-4">
                  <span
                    className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full w-fit ${
                      isActive
                        ? "bg-[#1A2E1A] text-[#4ADE80]"
                        : "bg-[#2E1A1A] text-[#F87171]"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-[#4ADE80]" : "bg-[#F87171]"}`}
                    />
                    {isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="py-4 px-4 text-[#C9CED6] text-xs font-mono">
                  {displayCreatedDate}
                </td>

                <td
                  className={`py-4 px-4 text-xs font-mono ${isExpired ? "text-red-400/80" : "text-amber-400/90"}`}
                >
                  {displayExpiresDate}
                </td>

                <td className="py-4 px-4 text-center">
                  <button
                    onClick={() => handleDelete(link._id)}
                    disabled={deletingId === link._id}
                    className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/10 active:scale-95 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    title="Delete Link"
                  >
                    {deletingId === link._id ? (
                      <span className="block w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin mx-auto" />
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mx-auto"
                      >
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    )}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LinksTable;

"use client";

import { useState } from "react";
import { FiLink, FiCopy, FiCheck, FiArrowUp } from "react-icons/fi";

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

interface InputProps {
  onLinkAdded?: (newLink: LinkItem) => void;
}

const Input = ({ onLinkAdded }: InputProps) => {
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [shortenedUrl, setShortenedUrl] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError("");
    setShortenedUrl("");
    setCopied(false);

    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setShortenedUrl(data.shortUrl);
      setUrl("");

      if (onLinkAdded && data.link) {
        onLinkAdded({
          _id: data.link._id || `temp-${Date.now()}`,
          slug: data.link.slug,
          originalUrl: data.link.originalUrl,
          clicks: [],
          clicksCount: 0,
          status: "Active",
          createdAt: data.link.createdAt || new Date().toISOString(),
          expiresAt: data.link.expiresAt || null, 
        });
      }

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to shorten link");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!shortenedUrl) return;
    navigator.clipboard.writeText(shortenedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <form
        onSubmit={handleSubmit}
        className="w-full h-auto flex justify-center items-center relative"
      >
        <FiLink size={20} color="#C9CED6" className="absolute left-5" />
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
          className="w-full h-15 text-white outline-none rounded-full pl-12 pr-44 max-[480px]:pr-16 border-3 border-[#353C4A] bg-[#181E29] disabled:opacity-50"
          aria-label="url"
          placeholder={
            loading ? "Generating your slug..." : "Enter the link here"
          }
          required
        />
        <button
          type="submit"
          disabled={loading || !url}
          className="bg-[#144EE3] outline-none hover:cursor-pointer absolute text-white font-bold right-1.5 px-10 max-[480px]:px-0 max-[480px]:w-12 rounded-full h-12 max-[480px]:flex max-[480px]:items-center max-[480px]:justify-center drop-shadow-[#144EE3] disabled:bg-slate-700 disabled:cursor-not-allowed transition-all"
        >
          {loading ? (
            <>
              <span className="max-[480px]:hidden">Shortening...</span>
              <span className="hidden max-[480px]:inline animate-spin">⏳</span>
            </>
          ) : (
            <>
              <span className="max-[480px]:hidden">Shorten Now!</span>
              <span className="hidden max-[480px]:block">
                <FiArrowUp size={20} />
              </span>
            </>
          )}
        </button>
      </form>

      {error && (
        <p className="text-red-400 text-sm pl-5 font-medium animate-pulse">
          {error}
        </p>
      )}

      {shortenedUrl && (
        <div className="w-full flex flex-col md:flex-row items-center justify-between p-4 bg-[#144EE3]/10 border border-[#144EE3]/30 rounded-2xl animate-fade-in gap-3">
          <div className="flex flex-col">
            <span className="text-xs text-[#C9CED6] uppercase tracking-wider font-semibold">
              Your Link is Ready:
            </span>
            <a
              href={shortenedUrl}
              target="_blank"
              rel="noreferrer"
              className="text-white font-bold text-lg hover:underline mt-0.5 break-all"
            >
              {shortenedUrl}
            </a>
          </div>
          <button
            onClick={handleCopy}
            className="w-full md:w-auto bg-[#181E29] border border-[#353C4A] hover:border-white text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            {copied ? (
              <>
                Copied! <FiCheck className="text-green-400" size={16} />
              </>
            ) : (
              <>
                Copy URL <FiCopy size={16} />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Input;
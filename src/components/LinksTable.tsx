const links = [
  {
    shortLink: "https://linkly.com/Bn41aCOrxj",
    originalLink: "https://www.twitter.com/tweets/8erelCsihu/",
    clicks: 1313,
    status: "Active",
    date: "Oct - 10 - 2023",
  },
  {
    shortLink: "https://linkly.com/Bn41aCOrxj",
    originalLink: "https://www.youtube.com/watch?v=8J7ZimHOXuia",
    clicks: 4313,
    status: "Inactive",
    date: "Oct - 08 - 2023",
  },
  {
    shortLink: "https://linkly.com/Bn41aCOrxj",
    originalLink: "https://www.adventurewanderlust.com/",
    clicks: 1013,
    status: "Active",
    date: "Oct - 01 - 2023",
  },
  {
    shortLink: "https://linkly.com/Bn41aCOrxj",
    originalLink: "https://vimeo.com/825257654",
    clicks: 1313,
    status: "Active",
    date: "Sep - 20 - 2023",
  },
  {
    shortLink: "https://linkly.com/Bn41aCOrxj",
    originalLink: "https://unsplash.com/photos/2KjhwOzFNVQ",
    clicks: 1423,
    status: "Active",
    date: "Sep - 18 - 2023",
  },
]

const LinksTable = () => {
  return (
    <div className="w-fullrounded-xl">
      <table className="w-full text-sm text-left text-[#C9CED6]">
        <thead>
          <tr className="bg-[#181E29] border-b border-[#353C4A]">
            <th className="py-4 px-4 font-medium">Short Link</th>
            <th className="py-4 px-4 font-medium">Original Link</th>
            <th className="py-4 px-4 font-medium">QR Code</th>
            <th className="py-4 px-4 font-medium">Clicks</th>
            <th className="py-4 px-4 font-medium">Status</th>
            <th className="py-4 px-4 font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link, index) => (
            <tr
              key={index}
              className="border-b border-[#353C4A] hover:bg-[#1C2433] transition-colors"
            >
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <span className="text-white">{link.shortLink}</span>
                  <button className="text-[#C9CED6] hover:text-white cursor-pointer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                    </svg>
                  </button>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#353C4A] flex-shrink-0" />
                  <span className="truncate max-w-[200px]">{link.originalLink}</span>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="w-10 h-10 bg-white rounded p-1">
                  <div className="w-full h-full grid grid-cols-3 gap-0.5">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className={`rounded-sm ${i % 2 === 0 ? "bg-black" : "bg-white"}`} />
                    ))}
                  </div>
                </div>
              </td>
              <td className="py-4 px-4 text-white">{link.clicks}</td>
              <td className="py-4 px-4">
                <span
                  className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full w-fit ${
                    link.status === "Active"
                      ? "bg-[#1A2E1A] text-[#4ADE80]"
                      : "bg-[#2E1A1A] text-[#F87171]"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${link.status === "Active" ? "bg-[#4ADE80]" : "bg-[#F87171]"}`} />
                  {link.status}
                </span>
              </td>
              <td className="py-4 px-4 text-[#C9CED6]">{link.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LinksTable
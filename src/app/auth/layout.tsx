/* eslint-disable @next/next/no-img-element */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full min-h-screen relative flex flex-col">
      <img
        src="/swirl.png"
        alt="Swirl Image"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <img
        src="/cubes.png"
        alt="Cubes Image"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}
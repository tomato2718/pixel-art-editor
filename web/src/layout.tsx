export function Layout({ children }: { children: React.ReactElement }) {
  return (
    <div className="w-screen h-dvh bg-neutral-1 text-neutral-11 dark">
      {children}
    </div>
  );
}

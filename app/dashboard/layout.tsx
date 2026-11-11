"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { authClient } from "@/lib/auth-client";
import Loading from "@/components/Loading";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-neutral-950">
        <Loading text="Loading dashboard..." className="py-20" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 min-w-0 w-full min-h-screen bg-neutral-950 text-white p-4 md:p-6 overflow-x-hidden">
        <div className="mb-4 flex items-center gap-2">
          <SidebarTrigger />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;

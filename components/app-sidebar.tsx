"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient, signOut } from "@/lib/auth-client";
import {
  LayoutDashboard,
  Briefcase,
  BookmarkCheck,
  FileText,
  CreditCard,
  Settings,
  Building2,
  Users,
  LogOut,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

type Role = "candidate" | "recruiter" | "admin";

export interface SidebarItem {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const sidebarItemsByRole: Record<Role, SidebarItem[]> = {
  // Candidate (Job Seeker) menu from Figma
  candidate: [
    {
      name: "Dashboard",
      url: "/dashboard/candidate",
      icon: LayoutDashboard,
    },
    {
      name: "Jobs",
      url: "/dashboard/candidate/jobs",
      icon: Briefcase,
    },
    {
      name: "Saved Jobs",
      url: "/dashboard/candidate/saved",
      icon: BookmarkCheck,
    },
    {
      name: "Applications",
      url: "/dashboard/candidate/applications",
      icon: FileText,
    },
    {
      name: "Billing",
      url: "/dashboard/candidate/billing",
      icon: CreditCard,
    },
    {
      name: "Settings",
      url: "/dashboard/candidate/settings",
      icon: Settings,
    },
  ],

  // Recruiter menu from Figma
  recruiter: [
    {
      name: "Dashboard",
      url: "/dashboard/recruiter",
      icon: LayoutDashboard,
    },
    {
      name: "My Company",
      url: "/dashboard/recruiter/company",
      icon: Building2,
    },
    {
      name: "Add Jobs",
      url: "/dashboard/recruiter/add-job",
      icon: Briefcase,
    },
    {
      name: "Manage Jobs",
      url: "/dashboard/recruiter/jobs",
      icon: Briefcase,
    },
    {
      name: "Applications",
      url: "/dashboard/recruiter/applications",
      icon: FileText,
    },
    {
      name: "Settings",
      url: "/dashboard/recruiter/settings",
      icon: Settings,
    },
  ],

  // Admin menu from Figma
  admin: [
    {
      name: "Dashboard",
      url: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      url: "/dashboard/admin/users",
      icon: Users,
    },
    {
      name: "Companies",
      url: "/dashboard/admin/companies",
      icon: Building2,
    },
    {
      name: "Jobs",
      url: "/dashboard/admin/jobs",
      icon: Briefcase,
    },
    {
      name: "Payments",
      url: "/dashboard/admin/payments",
      icon: CreditCard,
    },
    {
      name: "Settings",
      url: "/dashboard/admin/settings",
      icon: Settings,
    },
  ],
};

const roleDisplayNames: Record<Role, string> = {
  candidate: "Candidate",
  recruiter: "Recruiter",
  admin: "Admin",
};

const roleTierLabels: Record<Role, string> = {
  candidate: "FREE",
  recruiter: "Premium",
  admin: "Premium",
};

export function AppSidebar() {
  const { data: session } = authClient.useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const role = (session?.user?.role as Role) || "candidate";
  const menuItems = sidebarItemsByRole[role] || [];

  const displayName = session?.user?.name || "Alex Sterling";
  const displayRole = roleDisplayNames[role] || "Candidate";
  const tierBadge = roleTierLabels[role] || "Premium account";

  const avatarSrc =
    !imageError && session?.user?.image ? session.user.image : "/profile.jpg";

  const handleSignOut = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/signin");
            router.refresh();
          },
        },
      });
    } catch (error) {
      console.error("Sign out failed:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <Sidebar className="border-r border-white/5 bg-[#090b10] text-white">
      {/* Brand & Identity Header */}
      <SidebarHeader className="border-b border-white/5 p-4 space-y-4">
        {/* Logo */}
        <div className="px-1 pt-1">
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/images/logo.png"
              alt="HireLoop"
              width={140}
              height={38}
              className="h-7 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Identity Card (Profile Image, Name, Role, Premium Badge) */}
        <div className="flex items-center gap-3.5 rounded-2xl border border-white/5 bg-[#121522] p-3 shadow-sm">
          <div className="relative size-11 shrink-0 overflow-hidden rounded-full ring-1 ring-white/10">
            <Image
              src={avatarSrc}
              alt={displayName}
              width={44}
              height={44}
              className="size-full object-cover"
              onError={() => setImageError(true)}
            />
          </div>
          <div className="min-w-0 flex-1 flex flex-col justify-center">
            <h3 className="truncate text-sm font-semibold text-white tracking-tight leading-tight">
              {displayName}
            </h3>
            <p className="truncate text-xs text-neutral-400 capitalize mt-0.5 leading-tight">
              {displayRole}
            </p>
            <div className="mt-1.5">
              <span className="inline-flex items-center rounded-full border border-[#2b3558] bg-[#1a2139] px-2.5 py-0.5 text-[10.5px] font-medium text-indigo-300 w-fit">
                {tierBadge}
              </span>
            </div>
          </div>
        </div>
      </SidebarHeader>

      {/* Navigation Menu */}
      <SidebarContent className="px-3 py-3">
        <SidebarGroup className="p-0">
          <SidebarMenu className="gap-1.5">
            {menuItems.map((item) => {
              const isActive = pathname === item.url;
              return (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    isActive={isActive}
                    className="p-0 h-auto"
                    render={
                      <Link
                        href={item.url}
                        className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                          isActive
                            ? "bg-[#181c28] text-white shadow-inner"
                            : "text-neutral-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {/* Active indicator bar */}
                        {isActive && (
                          <span className="absolute left-1.5 top-1/2 -translate-y-1/2 h-4 w-1 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                        )}
                        <item.icon
                          className={`size-4.5 shrink-0 ${
                            isActive
                              ? "text-neutral-200 ml-1.5"
                              : "text-neutral-400"
                          }`}
                        />
                        <span className="truncate">{item.name}</span>
                      </Link>
                    }
                  />
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer Logout Button */}
      <SidebarFooter className="border-t border-white/5 p-3">
        <button
          type="button"
          onClick={handleSignOut}
          disabled={isLoggingOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300 disabled:opacity-50 cursor-pointer"
        >
          {isLoggingOut ? (
            <Loader2 className="size-4.5 animate-spin text-red-400" />
          ) : (
            <LogOut className="size-4.5 text-red-400" />
          )}
          <span>{isLoggingOut ? "Signing out..." : "Log Out"}</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}

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
import { authClient } from "@/lib/auth-client";
import {
  LayoutDashboard,
  Briefcase,
  BookmarkCheck,
  FileText,
  CreditCard,
  Settings,
  Building2,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

const portalMeta: Record<Role, { title: string; subtitle: string }> = {
  candidate: {
    title: "Seeker Portal",
    subtitle: "Professional Tier",
  },
  recruiter: {
    title: "Recruiter Portal",
    subtitle: "Recruiter Tier",
  },
  admin: {
    title: "Admin Console",
    subtitle: "Systems Admin",
  },
};

export function AppSidebar() {
  const { data: session } = authClient.useSession();
  const pathname = usePathname();
  const [imageError, setImageError] = useState(false);

  const role = (session?.user?.role as Role) || "candidate";
  const currentPortal = portalMeta[role] || portalMeta.candidate;
  const menuItems = sidebarItemsByRole[role] || [];

  const avatarSrc =
    !imageError && session?.user?.image ? session.user.image : "/profile.jpg";

  return (
    <Sidebar className="border-r border-white/5 bg-[#090b10] text-white">
      {/* Brand & Identity Header (Same to same Figma) */}
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

        {/* Identity Card */}
        <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-[#121520] p-2.5">
          <div className="relative size-10 shrink-0 overflow-hidden rounded-full ring-1 ring-white/10">
            <Image
              src={avatarSrc}
              alt={currentPortal.title}
              width={40}
              height={40}
              className="size-full object-cover"
              onError={() => setImageError(true)}
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold text-white tracking-tight">
              {currentPortal.title}
            </h3>
            <p className="truncate text-xs text-neutral-400">
              {currentPortal.subtitle}
            </p>
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

      {/* Footer */}
      <SidebarFooter className="border-t border-white/5 px-4 py-3 text-[11px] text-neutral-500">
        HireLoop Workspace
      </SidebarFooter>
    </Sidebar>
  );
}

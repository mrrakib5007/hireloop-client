"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Code2,
  Palette,
  Server,
  Megaphone,
  CheckCircle2,
  Globe,
  MapPin,
  Users,
  Pencil,
  Trash2,
  MoreVertical,
  Calendar,
  Briefcase,
  Loader2,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";

interface JobPost {
  id: string;
  jobTitle: string;
  department: string;
  deptTheme: {
    color: string;
    bg: string;
    icon: React.ComponentType<{ className?: string }>;
  };
  companyName: string;
  location: string;
  isRemote: boolean;
  jobType: string;
  compensation: string;
  applicantsCount: number;
  status: "Active" | "Expired";
  deadline: string;
  postedAt: string;
}

interface ServerJob {
  _id?: string;
  id?: string;
  jobTitle?: string;
  companyName?: string;
  jobCategory?: string;
  department?: string;
  jobType?: string;
  isRemote?: boolean;
  location?: string;
  deadline?: string;
  minSalary?: string | number;
  maxSalary?: string | number;
  salaryFrequency?: string;
  compensation?: string;
  applicantsCount?: number;
  status?: "Active" | "Expired";
  postedAt?: string;
  createdAt?: string;
}

const getDeptTheme = (category?: string) => {
  const cat = category?.toLowerCase() || "";
  if (cat.includes("design") || cat.includes("creative")) {
    return {
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
      icon: Palette,
      deptName: "Design",
    };
  }
  if (cat.includes("product") || cat.includes("management")) {
    return {
      color: "text-indigo-400",
      bg: "bg-indigo-500/10 border-indigo-500/20",
      icon: Server,
      deptName: "Product",
    };
  }
  if (cat.includes("marketing") || cat.includes("sales")) {
    return {
      color: "text-pink-400",
      bg: "bg-pink-500/10 border-pink-500/20",
      icon: Megaphone,
      deptName: "Marketing",
    };
  }
  if (cat.includes("support") || cat.includes("operation")) {
    return {
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
      icon: CheckCircle2,
      deptName: "Operations",
    };
  }
  if (cat.includes("finance") || cat.includes("legal")) {
    return {
      color: "text-cyan-400",
      bg: "bg-cyan-500/10 border-cyan-500/20",
      icon: CheckCircle2,
      deptName: "Finance",
    };
  }
  // Default to Engineering / Tech
  return {
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    icon: Code2,
    deptName: category || "Engineering",
  };
};

const formatCompensation = (
  minSalary?: string | number,
  maxSalary?: string | number,
  frequency?: string
) => {
  if (!minSalary && !maxSalary) return "Competitive";
  const freqShort =
    frequency === "per hour"
      ? "/ hr"
      : frequency === "per day"
      ? "/ day"
      : frequency === "per week"
      ? "/ wk"
      : frequency === "per month"
      ? "/ mo"
      : frequency === "per year"
      ? "/ yr"
      : frequency
      ? `/${frequency}`
      : "";

  if (minSalary && maxSalary) {
    return `€${minSalary} - €${maxSalary} ${freqShort}`.trim();
  }
  if (minSalary) {
    return `From €${minSalary} ${freqShort}`.trim();
  }
  return `Up to €${maxSalary} ${freqShort}`.trim();
};

const getJobStatus = (deadlineStr?: string): "Active" | "Expired" => {
  if (!deadlineStr) return "Active";
  const deadlineDate = new Date(deadlineStr);
  if (isNaN(deadlineDate.getTime())) return "Active";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return deadlineDate >= today ? "Active" : "Expired";
};

const formatDeadline = (deadlineStr?: string) => {
  if (!deadlineStr) return "Open";
  const date = new Date(deadlineStr);
  if (isNaN(date.getTime())) return deadlineStr;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

const getPostedLabel = (createdAt?: string, postedAt?: string) => {
  if (postedAt) return postedAt;
  if (!createdAt) return "Recently";
  const createdDate = new Date(createdAt);
  if (isNaN(createdDate.getTime())) return "Recently";
  const diffMs = Date.now() - createdDate.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  const diffWeeks = Math.floor(diffDays / 7);
  return `${diffWeeks}w ago`;
};

export default function ManageJobsPage() {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [jobToDelete, setJobToDelete] = useState<{ id: string; title: string } | null>(null);

  const mapServerJobs = (data: ServerJob[]): JobPost[] => {
    if (!Array.isArray(data)) return [];

    // Sort descending: newest created / added job first
    const sorted = [...data].sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (a._id && b._id) {
        return b._id.localeCompare(a._id);
      }
      return 0;
    });

    return sorted.map((item, index) => {
      const theme = getDeptTheme(item.jobCategory || item.department);
      const id = item._id || item.id || `job-${index}`;
      return {
        id,
        jobTitle: item.jobTitle || "Untitled Position",
        department: theme.deptName,
        deptTheme: theme,
        companyName: item.companyName || "HireLoop Partner",
        location: item.location || (item.isRemote ? "Remote" : "On-site"),
        isRemote: Boolean(item.isRemote),
        jobType: item.jobType || "Full-time",
        compensation:
          item.compensation ||
          formatCompensation(
            item.minSalary,
            item.maxSalary,
            item.salaryFrequency
          ),
        applicantsCount: Number(item.applicantsCount || 0),
        status: item.status || getJobStatus(item.deadline),
        deadline: formatDeadline(item.deadline),
        postedAt: getPostedLabel(item.createdAt, item.postedAt),
      };
    });
  };

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const serverUrl =
        process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
      const res = await fetch(`${serverUrl}/jobs`, {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data: ServerJob[] = await res.json();
      setJobs(mapServerJobs(data));
    } catch (err) {
      console.error("Error fetching jobs from server:", err);
      toast.error("Could not load jobs from server.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    const loadInitialData = async () => {
      try {
        const serverUrl =
          process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
        const res = await fetch(`${serverUrl}/jobs`, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data: ServerJob[] = await res.json();
        if (!ignore) {
          setJobs(mapServerJobs(data));
          setIsLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          console.error("Error loading jobs:", err);
          toast.error("Could not load jobs from server.");
          setIsLoading(false);
        }
      }
    };

    loadInitialData();

    return () => {
      ignore = true;
    };
  }, []);

  const confirmDelete = async () => {
    if (!jobToDelete) return;
    const { id, title } = jobToDelete;
    setIsDeletingId(id);
    try {
      const serverUrl =
        process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
      const res = await fetch(`${serverUrl}/jobs/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Server error while deleting");
      }
      setJobs((prev) => prev.filter((job) => job.id !== id));
      toast.success(`"${title}" deleted successfully.`);
    } catch (err) {
      console.warn("Server delete warning, removing optimistically:", err);
      setJobs((prev) => prev.filter((job) => job.id !== id));
      toast.success(`"${title}" removed.`);
    } finally {
      setIsDeletingId(null);
      setJobToDelete(null);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto text-white space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            <span>Manage Jobs</span>
            <span>&gt;</span>
            <span className="text-indigo-400 font-medium">
              Job Listings &amp; Postings
            </span>
          </div>

          {/* Title & Description */}
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1.5">
            Manage Job Posts
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Review live listings, monitor applicants, and update job details across your organization.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={fetchJobs}
            disabled={isLoading}
            aria-label="Refresh job list"
            className="inline-flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-300 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`size-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>
          <Link
            href="/dashboard/recruiter/add-job"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all hover:bg-indigo-500 hover:shadow-indigo-600/40 active:scale-[0.99] cursor-pointer"
          >
            <Plus className="size-4 stroke-[2.5]" />
            <span>New Job Post</span>
          </Link>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="rounded-2xl border border-white/5 bg-[#0f121d]/90 p-8 shadow-xl">
          <Loading text="Loading jobs from server..." className="py-16" />
        </div>
      ) : (
        <>
          {/* ===================== DESKTOP TABLE VIEW (md+) ===================== */}
          <div className="hidden md:block rounded-2xl border border-white/5 bg-[#0f121d]/90 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse table-auto">
                <thead>
                  <tr className="border-b border-white/5 bg-white/2 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                    <th className="py-3 pl-3 pr-1.5 xl:pl-4 xl:pr-2">Job Title &amp; Dept</th>
                    <th className="py-3 px-1.5 xl:px-2">Company &amp; Location</th>
                    <th className="py-3 px-1 xl:px-1.5 text-center">Type</th>
                    <th className="py-3 px-1.5 xl:px-2">Compensation</th>
                    <th className="py-3 px-1.5 xl:px-2">Applicants</th>
                    <th className="py-3 px-1 xl:px-1.5 text-center">Status</th>
                    <th className="py-3 px-1.5 xl:px-2">Deadline</th>
                    <th className="py-3 pl-1 pr-3 xl:pr-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {jobs.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-16 text-center">
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <div className="flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-neutral-400">
                            <Briefcase className="size-6 text-neutral-400" />
                          </div>
                          <div className="space-y-1">
                            <p className="font-semibold text-white">No jobs posted yet</p>
                            <p className="text-xs text-neutral-400 max-w-sm">
                              You haven&apos;t published any job listings yet. Create your first listing to start hiring talent.
                            </p>
                          </div>
                          <Link
                            href="/dashboard/recruiter/add-job"
                            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white transition-all hover:bg-indigo-500 shadow-md shadow-indigo-600/30"
                          >
                            <Plus className="size-3.5" />
                            <span>Post a Job</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    jobs.map((job) => {
                      const DeptIcon = job.deptTheme.icon;
                      const isActive = job.status === "Active";

                      return (
                        <tr
                          key={job.id}
                          className="group transition-colors hover:bg-white/2"
                        >
                          {/* Job Title & Dept */}
                          <td className="py-3 pl-3 pr-1.5 xl:pl-4 xl:pr-2">
                            <div className="flex items-center gap-2">
                              <div
                                className={`flex size-7.5 shrink-0 items-center justify-center rounded-lg border ${job.deptTheme.bg} ${job.deptTheme.color}`}
                              >
                                <DeptIcon className="size-3.5" />
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold text-white truncate text-xs sm:text-sm group-hover:text-indigo-300 transition-colors max-w-31.25 xl:max-w-47.5">
                                  {job.jobTitle}
                                </p>
                                <p
                                  className={`text-[11px] font-medium ${job.deptTheme.color} truncate max-w-31.25 xl:max-w-47.5`}
                                >
                                  {job.department}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Company & Location */}
                          <td className="py-3 px-1.5 xl:px-2">
                            <p className="font-medium text-white text-xs truncate max-w-26.25 xl:max-w-38.75">
                              {job.companyName}
                            </p>
                            <div className="flex items-center gap-1 text-[11px] text-neutral-400 mt-0.5">
                              {job.isRemote ? (
                                <Globe className="size-3 shrink-0 text-neutral-400" />
                              ) : (
                                <MapPin className="size-3 shrink-0 text-neutral-400" />
                              )}
                              <span className="truncate max-w-23.75 xl:max-w-36.25">{job.location}</span>
                            </div>
                          </td>

                          {/* Type */}
                          <td className="py-3 px-1 xl:px-1.5 text-center">
                            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10.5px] text-neutral-300 whitespace-nowrap">
                              {job.jobType}
                            </span>
                          </td>

                          {/* Compensation */}
                          <td className="py-3 px-1.5 xl:px-2 font-medium text-neutral-200 text-xs whitespace-nowrap">
                            {job.compensation}
                          </td>

                          {/* Applicants */}
                          <td className="py-3 px-1.5 xl:px-2 whitespace-nowrap">
                            <div className="flex items-center gap-1 text-xs text-indigo-300 font-medium">
                              <Users className="size-3.5 text-indigo-400 shrink-0" />
                              <span>{job.applicantsCount}</span>
                              <span className="hidden xl:inline text-neutral-400">Candidates</span>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="py-3 px-1 xl:px-1.5 text-center whitespace-nowrap">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium ${
                                isActive
                                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                                  : "border-neutral-700 bg-neutral-800 text-neutral-400"
                              }`}
                            >
                              <span
                                className={`size-1.5 rounded-full ${
                                  isActive ? "bg-emerald-400 animate-pulse" : "bg-neutral-500"
                                }`}
                              />
                              {job.status}
                            </span>
                          </td>

                          {/* Deadline */}
                          <td className="py-3 px-1.5 xl:px-2 whitespace-nowrap">
                            <p className="font-medium text-white text-xs">
                              {job.deadline}
                            </p>
                            <p className="text-[10px] text-neutral-400">
                              {job.postedAt}
                            </p>
                          </td>

                          {/* Actions */}
                          <td className="py-3 pl-1 pr-3 xl:pr-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1">
                              <Link
                                href={`/dashboard/recruiter/edit-job/${job.id}`}
                                className="inline-flex items-center gap-1 rounded-lg border border-indigo-500/30 bg-indigo-600/20 px-2 py-1 text-xs font-semibold text-indigo-300 transition-colors hover:bg-indigo-600/30 hover:text-white cursor-pointer"
                              >
                                <Pencil className="size-3" />
                                <span>Update</span>
                              </Link>
                              <button
                                type="button"
                                onClick={() =>
                                  setJobToDelete({ id: job.id, title: job.jobTitle })
                                }
                                disabled={isDeletingId === job.id}
                                aria-label="Delete job"
                                className="rounded-lg p-1 text-neutral-400 transition-colors hover:bg-white/5 hover:text-red-400 disabled:opacity-50 cursor-pointer"
                              >
                                <Trash2 className="size-3.5" />
                              </button>
                              <button
                                type="button"
                                aria-label="More options"
                                className="rounded-lg p-1 text-neutral-400 transition-colors hover:bg-white/5 hover:text-white cursor-pointer"
                              >
                                <MoreVertical className="size-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ===================== MOBILE CARDS VIEW (block md:hidden) ===================== */}
          <div className="block md:hidden space-y-3.5">
            {jobs.length === 0 ? (
              <div className="rounded-2xl border border-white/5 bg-[#10131f] p-8 text-center space-y-3">
                <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-neutral-400">
                  <Briefcase className="size-6 text-neutral-400" />
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-white">No jobs posted yet</p>
                  <p className="text-xs text-neutral-400">
                    You haven&apos;t published any job listings yet. Create your first listing to start hiring talent.
                  </p>
                </div>
                <Link
                  href="/dashboard/recruiter/add-job"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-indigo-500 shadow-md shadow-indigo-600/30"
                >
                  <Plus className="size-3.5" />
                  <span>Post a Job</span>
                </Link>
              </div>
            ) : (
              jobs.map((job) => {
                const DeptIcon = job.deptTheme.icon;
                const isActive = job.status === "Active";

                return (
                  <div
                    key={job.id}
                    className="rounded-2xl border border-white/5 bg-[#10131f] p-4 shadow-lg space-y-3"
                  >
                    {/* Card Header: Icon, Title, Department & Status */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`flex size-10 shrink-0 items-center justify-center rounded-xl border ${job.deptTheme.bg} ${job.deptTheme.color}`}
                        >
                          <DeptIcon className="size-5" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-white text-base truncate">
                            {job.jobTitle}
                          </h3>
                          <p className={`text-xs font-medium ${job.deptTheme.color}`}>
                            {job.department}
                          </p>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <span
                        className={`shrink-0 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                          isActive
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                            : "border-neutral-700 bg-neutral-800 text-neutral-400"
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${
                            isActive ? "bg-emerald-400 animate-pulse" : "bg-neutral-500"
                          }`}
                        />
                        {job.status}
                      </span>
                    </div>

                    {/* Company & Location */}
                    <div className="text-xs text-neutral-300 space-y-0.5">
                      <p className="font-medium text-white">{job.companyName}</p>
                      <div className="flex items-center gap-1.5 text-neutral-400">
                        {job.isRemote ? (
                          <Globe className="size-3.5 shrink-0 text-neutral-400" />
                        ) : (
                          <MapPin className="size-3.5 shrink-0 text-neutral-400" />
                        )}
                        <span className="truncate">{job.location}</span>
                      </div>
                    </div>

                    {/* Badges Row: Type, Compensation, Applicants */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-white/5">
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-neutral-300">
                        {job.jobType}
                      </span>
                      <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-0.5 text-xs font-medium text-indigo-300">
                        {job.compensation}
                      </span>
                      <div className="inline-flex items-center gap-1.5 text-xs text-neutral-400 pl-1">
                        <Users className="size-3.5 text-indigo-400" />
                        <span>{job.applicantsCount} Candidates</span>
                      </div>
                    </div>

                    {/* Card Footer: Deadline on Left, Actions on Right */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                      <div>
                        <p className="text-neutral-400 flex items-center gap-1">
                          <Calendar className="size-3.5 text-neutral-400" />
                          <span>Deadline: {job.deadline}</span>
                        </p>
                        <p className="text-[11px] text-neutral-400 ml-4.5">
                          {job.postedAt}
                        </p>
                      </div>

                      <div className="flex items-center gap-1">
                        <Link
                          href={`/dashboard/recruiter/edit-job/${job.id}`}
                          className="inline-flex items-center gap-1 rounded-lg border border-indigo-500/30 bg-indigo-600/20 px-2.5 py-1.5 text-xs font-medium text-indigo-300 hover:bg-indigo-600/30 cursor-pointer"
                        >
                          <Pencil className="size-3.5" />
                          <span>Update</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() =>
                            setJobToDelete({ id: job.id, title: job.jobTitle })
                          }
                          disabled={isDeletingId === job.id}
                          aria-label="Delete job"
                          className="rounded-lg p-1.5 text-neutral-400 hover:text-red-400 hover:bg-white/5 disabled:opacity-50 cursor-pointer"
                        >
                          <Trash2 className="size-4" />
                        </button>
                        <button
                          type="button"
                          aria-label="More options"
                          className="rounded-lg p-1.5 text-neutral-400 hover:text-white hover:bg-white/5 cursor-pointer"
                        >
                          <MoreVertical className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}

      {/* Delete Confirmation Popup Modal */}
      {jobToDelete && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => {
            if (!isDeletingId) setJobToDelete(null);
          }}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-white/10 bg-[#101322] p-6 shadow-2xl space-y-4 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3.5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-400">
                <AlertTriangle className="size-5" />
              </div>
              <div className="space-y-1 min-w-0">
                <h3 className="text-base font-semibold text-white tracking-tight">
                  Delete Job Posting?
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-white">
                    &quot;{jobToDelete.title}&quot;
                  </span>
                  ? This action cannot be undone and will permanently remove this
                  listing from HireLoop.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-white/5">
              <button
                type="button"
                onClick={() => setJobToDelete(null)}
                disabled={Boolean(isDeletingId)}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-neutral-300 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={Boolean(isDeletingId)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-500 disabled:opacity-50 cursor-pointer"
              >
                {isDeletingId ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="size-3.5" />
                    <span>Confirm Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

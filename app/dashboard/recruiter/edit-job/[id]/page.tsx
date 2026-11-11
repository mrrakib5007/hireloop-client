"use client";

import React, { useState, useRef, useEffect, use } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  Calendar,
  ChevronDown,
  Globe,
  MapPin,
  Sparkles,
  Loader2,
  Save,
} from "lucide-react";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";

interface JobFormData {
  jobTitle: string;
  companyName: string;
  jobCategory: string;
  jobType: string;
  isRemote: boolean;
  location: string;
  deadline: string;
  minSalary: string;
  maxSalary: string;
  salaryFrequency: string;
  responsibilities: string;
  requirements: string;
}

const jobCategories = [
  "Engineering & Tech",
  "Design & Creative",
  "Product & Management",
  "Marketing & Sales",
  "Customer Support & Operations",
  "Finance & Legal",
];

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];

const salaryFrequencies = [
  "per hour",
  "per day",
  "per week",
  "per month",
  "per year",
];

const popularJobTitles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Engineer",
  "React / Next.js Developer",
  "Node.js Developer",
  "Software Engineer",
  "UI/UX Designer",
  "Product Designer",
  "DevOps Engineer",
  "Cloud Solutions Architect",
  "Mobile App Developer (React Native / Flutter)",
  "Data Scientist / AI Engineer",
  "Machine Learning Engineer",
  "QA & Test Automation Engineer",
  "Product Manager",
  "Scrum Master",
  "Cybersecurity Analyst",
  "Technical Project Manager",
  "Digital Marketing Manager",
];

interface EditJobPageProps {
  params: Promise<{ id: string }>;
}

export default function EditJobPage({ params }: EditJobPageProps) {
  const resolvedParams = use(params);
  const jobId = resolvedParams.id;
  const router = useRouter();

  const [formData, setFormData] = useState<JobFormData>({
    jobTitle: "",
    companyName: "",
    jobCategory: "Engineering & Tech",
    jobType: "Full-time",
    isRemote: true,
    location: "",
    deadline: "",
    minSalary: "",
    maxSalary: "",
    salaryFrequency: "per hour",
    responsibilities: "",
    requirements: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const titleWrapperRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on typed input
  const filteredSuggestions = popularJobTitles.filter((title) =>
    title.toLowerCase().includes(formData.jobTitle.trim().toLowerCase())
  );

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        titleWrapperRef.current &&
        !titleWrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Fetch job details to edit
  useEffect(() => {
    let ignore = false;
    const loadJob = async () => {
      try {
        const serverUrl =
          process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
        const res = await fetch(`${serverUrl}/jobs/${jobId}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          if (!ignore) {
            setIsNotFound(true);
            setIsLoading(false);
          }
          return;
        }

        const data = await res.json();
        if (!ignore) {
          if (!data || data.error) {
            setIsNotFound(true);
            setIsLoading(false);
            return;
          }
          setFormData({
            jobTitle: data.jobTitle || "",
            companyName: data.companyName || "",
            jobCategory: data.jobCategory || "Engineering & Tech",
            jobType: data.jobType || "Full-time",
            isRemote: data.isRemote !== undefined ? Boolean(data.isRemote) : true,
            location: data.location || "",
            deadline: data.deadline || "",
            minSalary: String(data.minSalary ?? ""),
            maxSalary: String(data.maxSalary ?? ""),
            salaryFrequency: data.salaryFrequency || "per hour",
            responsibilities: data.responsibilities || "",
            requirements: data.requirements || "",
          });
          setIsLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          console.error("Error loading job:", err);
          setIsNotFound(true);
          setIsLoading(false);
        }
      }
    };

    loadJob();
    return () => {
      ignore = true;
    };
  }, [jobId]);

  const handleSelectSuggestion = (title: string) => {
    setFormData((prev) => ({ ...prev, jobTitle: title }));
    setShowSuggestions(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const serverUrl =
        process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
      const res = await fetch(`${serverUrl}/jobs/${jobId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to update job");
      }

      toast.success("Job updated successfully!");
      router.push("/dashboard/recruiter/jobs");
    } catch (err) {
      console.error("Error updating job:", err);
      toast.error("Failed to update job listing.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isNotFound) {
    notFound();
  }

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto flex min-h-100 items-center justify-center">
        <Loading text="Loading job details..." className="py-20" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto text-white space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-2">
            <Link
              href="/dashboard/recruiter/jobs"
              className="hover:text-white transition-colors"
            >
              Manage Jobs
            </Link>
            <span>&gt;</span>
            <span className="text-indigo-400 font-medium">Edit Job Posting</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Edit Job Post
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Update listing details, compensation, and requirements for this position.
          </p>
        </div>

        <Link
          href="/dashboard/recruiter/jobs"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-neutral-300 transition-colors hover:bg-white/10 hover:text-white self-start sm:self-auto cursor-pointer"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to Jobs</span>
        </Link>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information Section */}
        <div className="rounded-2xl border border-white/5 bg-[#0f121d]/90 p-5 sm:p-7 shadow-xl space-y-5">
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <Building2 className="size-4.5 text-indigo-400" />
            <span>Job &amp; Company Overview</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Job Title with Autocomplete Suggestions */}
            <div ref={titleWrapperRef} className="relative space-y-1.5">
              <label
                htmlFor="jobTitle"
                className="text-xs font-medium text-neutral-300 flex items-center justify-between"
              >
                <span>Job Title *</span>
                <span className="text-[10.5px] text-indigo-400/80 flex items-center gap-1">
                  <Sparkles className="size-3" /> Popular titles suggested
                </span>
              </label>
              <input
                id="jobTitle"
                name="jobTitle"
                type="text"
                required
                value={formData.jobTitle}
                onChange={handleChange}
                onFocus={() => setShowSuggestions(true)}
                placeholder="e.g. Senior Frontend Developer"
                autoComplete="off"
                className="w-full rounded-xl border border-white/10 bg-[#090b10] px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all"
              />

              {/* Autocomplete Dropdown */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1.5 z-30 max-h-56 overflow-y-auto rounded-xl border border-white/10 bg-[#121626] p-1.5 shadow-2xl backdrop-blur-xl">
                  <div className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    Suggested Job Titles
                  </div>
                  {filteredSuggestions.slice(0, 8).map((title) => (
                    <button
                      key={title}
                      type="button"
                      onClick={() => handleSelectSuggestion(title)}
                      className="w-full text-left rounded-lg px-2.5 py-2 text-xs text-neutral-200 hover:bg-indigo-600/20 hover:text-white transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span>{title}</span>
                      <span className="text-[10px] text-indigo-400/70">Select</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Company Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="companyName"
                className="text-xs font-medium text-neutral-300"
              >
                Company Name *
              </label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                required
                value={formData.companyName}
                onChange={handleChange}
                placeholder="e.g. Acme Corporation"
                className="w-full rounded-xl border border-white/10 bg-[#090b10] px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all"
              />
            </div>

            {/* Job Category */}
            <div className="space-y-1.5">
              <label
                htmlFor="jobCategory"
                className="text-xs font-medium text-neutral-300"
              >
                Job Category *
              </label>
              <div className="relative">
                <select
                  id="jobCategory"
                  name="jobCategory"
                  value={formData.jobCategory}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-xl border border-white/10 bg-[#090b10] px-3.5 py-2.5 pr-10 text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all cursor-pointer"
                >
                  {jobCategories.map((cat) => (
                    <option key={cat} value={cat} className="bg-[#090b10] text-white">
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
              </div>
            </div>

            {/* Job Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300">
                Employment Type *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {jobTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, jobType: type }))
                    }
                    className={`rounded-xl border px-3 py-2 text-xs font-medium transition-all cursor-pointer ${
                      formData.jobType === type
                        ? "border-indigo-500 bg-indigo-600/20 text-white shadow-sm"
                        : "border-white/10 bg-[#090b10] text-neutral-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Location & Workplace Section */}
        <div className="rounded-2xl border border-white/5 bg-[#0f121d]/90 p-5 sm:p-7 shadow-xl space-y-5">
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <MapPin className="size-4.5 text-indigo-400" />
            <span>Workplace &amp; Schedule</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Workplace Preference: Remote vs On-site */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300">
                Workplace Setting *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, isRemote: true }))
                  }
                  className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-medium transition-all cursor-pointer ${
                    formData.isRemote
                      ? "border-indigo-500 bg-indigo-600/20 text-white"
                      : "border-white/10 bg-[#090b10] text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Globe className="size-3.5" />
                  <span>Remote</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, isRemote: false }))
                  }
                  className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-medium transition-all cursor-pointer ${
                    !formData.isRemote
                      ? "border-indigo-500 bg-indigo-600/20 text-white"
                      : "border-white/10 bg-[#090b10] text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Building2 className="size-3.5" />
                  <span>On-site / Hybrid</span>
                </button>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <label
                htmlFor="location"
                className="text-xs font-medium text-neutral-300"
              >
                Location Details *
              </label>
              <input
                id="location"
                name="location"
                type="text"
                required
                value={formData.location}
                onChange={handleChange}
                placeholder={
                  formData.isRemote
                    ? "e.g. Remote (Worldwide / US timezones)"
                    : "e.g. New York, NY, USA"
                }
                className="w-full rounded-xl border border-white/10 bg-[#090b10] px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all"
              />
            </div>

            {/* Application Deadline */}
            <div className="space-y-1.5 md:col-span-2">
              <label
                htmlFor="deadline"
                className="text-xs font-medium text-neutral-300 flex items-center gap-1.5"
              >
                <Calendar className="size-3.5 text-indigo-400" />
                <span>Application Deadline *</span>
              </label>
              <input
                id="deadline"
                name="deadline"
                type="date"
                required
                value={formData.deadline}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-[#090b10] px-3.5 py-2.5 text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Compensation Section */}
        <div className="rounded-2xl border border-white/5 bg-[#0f121d]/90 p-5 sm:p-7 shadow-xl space-y-5">
          <h2 className="text-base font-semibold text-white">
            Compensation &amp; Salary Range
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Minimum Salary */}
            <div className="space-y-1.5">
              <label
                htmlFor="minSalary"
                className="text-xs font-medium text-neutral-300"
              >
                Minimum Salary
              </label>
              <input
                id="minSalary"
                name="minSalary"
                type="number"
                value={formData.minSalary}
                onChange={handleChange}
                placeholder="e.g. 50000"
                className="w-full rounded-xl border border-white/10 bg-[#090b10] px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all"
              />
            </div>

            {/* Maximum Salary */}
            <div className="space-y-1.5">
              <label
                htmlFor="maxSalary"
                className="text-xs font-medium text-neutral-300"
              >
                Maximum Salary
              </label>
              <input
                id="maxSalary"
                name="maxSalary"
                type="number"
                value={formData.maxSalary}
                onChange={handleChange}
                placeholder="e.g. 80000"
                className="w-full rounded-xl border border-white/10 bg-[#090b10] px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all"
              />
            </div>

            {/* Frequency */}
            <div className="space-y-1.5">
              <label
                htmlFor="salaryFrequency"
                className="text-xs font-medium text-neutral-300"
              >
                Frequency
              </label>
              <div className="relative">
                <select
                  id="salaryFrequency"
                  name="salaryFrequency"
                  value={formData.salaryFrequency}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-xl border border-white/10 bg-[#090b10] px-3.5 py-2.5 pr-10 text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all cursor-pointer"
                >
                  {salaryFrequencies.map((freq) => (
                    <option key={freq} value={freq} className="bg-[#090b10] text-white">
                      {freq}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Responsibilities & Requirements */}
        <div className="rounded-2xl border border-white/5 bg-[#0f121d]/90 p-5 sm:p-7 shadow-xl space-y-5">
          <h2 className="text-base font-semibold text-white">
            Role Description &amp; Requirements
          </h2>

          <div className="space-y-5">
            <div className="space-y-1.5">
              <label
                htmlFor="responsibilities"
                className="text-xs font-medium text-neutral-300"
              >
                Key Responsibilities
              </label>
              <textarea
                id="responsibilities"
                name="responsibilities"
                rows={4}
                value={formData.responsibilities}
                onChange={handleChange}
                placeholder="Describe day-to-day responsibilities and expected project outcomes..."
                className="w-full rounded-xl border border-white/10 bg-[#090b10] px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="requirements"
                className="text-xs font-medium text-neutral-300"
              >
                Qualifications &amp; Requirements
              </label>
              <textarea
                id="requirements"
                name="requirements"
                rows={4}
                value={formData.requirements}
                onChange={handleChange}
                placeholder="List required skills, experience level, tools, and background..."
                className="w-full rounded-xl border border-white/10 bg-[#090b10] px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pb-8">
          <Link
            href="/dashboard/recruiter/jobs"
            className="w-full sm:w-auto text-center rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-neutral-300 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all hover:bg-indigo-500 hover:shadow-indigo-600/40 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <Save className="size-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

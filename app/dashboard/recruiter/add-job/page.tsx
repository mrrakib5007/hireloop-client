"use client"

import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Building2,
  Calendar,
  ChevronDown,
  Globe,
  MapPin,
  Sparkles,
} from "lucide-react"
import toast from "react-hot-toast"

interface JobFormData {
  jobTitle: string
  companyName: string
  jobCategory: string
  jobType: string
  isRemote: boolean
  location: string
  deadline: string
  minSalary: string
  maxSalary: string
  salaryFrequency: string
  responsibilities: string
  requirements: string
}

const jobCategories = [
  "Engineering & Tech",
  "Design & Creative",
  "Product & Management",
  "Marketing & Sales",
  "Customer Support & Operations",
  "Finance & Legal",
]

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"]

const salaryFrequencies = [
  "per hour",
  "per day",
  "per week",
  "per month",
  "per year",
]

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
]

export default function AddJobPage() {
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
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const titleWrapperRef = useRef<HTMLDivElement>(null)

  // Filter suggestions based on what user types
  const filteredSuggestions = popularJobTitles.filter((title) =>
    title.toLowerCase().includes(formData.jobTitle.trim().toLowerCase())
  )

  // Close suggestions dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        titleWrapperRef.current &&
        !titleWrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const handleSelectSuggestion = (title: string) => {
    setFormData((prev) => ({ ...prev, jobTitle: title }))
    setShowSuggestions(false)
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/add-job`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        createdAt: new Date().toISOString(),
      }),
    }).then((response) => {
        if (!response.ok) {
             toast.error("Failed to publish job listing")
        }
        return response.json()
    })
    .then((data) => {
        if (data.insertedId) {
            toast.success("Job listing published successfully!")
            setFormData({
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
            })
        } else {
            toast.error("Failed to publish job listing")
        }
    })
    .catch(() => {        
        toast.error("Failed to publish job listing")
    })
    
    setIsSubmitting(false)
  }

  return (
    <div className="mx-auto max-w-5xl px-2 py-4 text-white sm:px-4 sm:py-6">
      {/* Form Container */}
      <form id="add-job-form" onSubmit={handleSubmit} className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col gap-4 border-b border-white/5 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs text-neutral-400">
              <Link
                href="/dashboard/recruiter/jobs"
                className="transition-colors hover:text-white"
              >
                Manage Jobs
              </Link>
              <span>&gt;</span>
              <span className="font-medium text-indigo-400">
                Create New Listing
              </span>
            </div>

            {/* Title & Description */}
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Post a New Job
            </h1>
            <p className="mt-1 text-xs text-neutral-400 sm:text-sm">
              Fill in the position specifications to attract qualified talent
              across our network.
            </p>
          </div>

          {/* Top Right Action Button (Hidden on Mobile) */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="hidden cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all hover:bg-indigo-500 hover:shadow-indigo-600/40 active:scale-[0.99] disabled:opacity-50 sm:inline-flex"
          >
            <span>{isSubmitting ? "Publishing..." : "Publish Job"}</span>
            <ArrowRight className="size-4" />
          </button>
        </div>

        {/* 1. Basic Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-white">
            <span className="size-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
            <h2>1. Basic Information</h2>
          </div>

          <div className="space-y-4">
            {/* Job Title with Autocomplete Suggestions */}
            <div ref={titleWrapperRef} className="relative">
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="jobTitle"
                  className="block text-xs font-medium text-neutral-300"
                >
                  Job Title <span className="text-indigo-400">*</span>
                </label>
                {showSuggestions && (
                  <span className="text-[11px] text-neutral-500">
                    Click to autofill or type custom
                  </span>
                )}
              </div>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                required
                autoComplete="off"
                value={formData.jobTitle}
                onFocus={() => setShowSuggestions(true)}
                onChange={(e) => {
                  handleChange(e)
                  setShowSuggestions(true)
                }}
                placeholder="Frontend Developer"
                className="w-full rounded-xl border border-white/10 bg-[#121520] px-4 py-2.5 text-sm text-white placeholder-neutral-500 transition-colors outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/80"
              />

              {/* Suggestions Dropdown */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="custom-scrollbar absolute left-0 right-0 top-full z-40 mt-1.5 max-h-56 overflow-y-auto rounded-xl border border-white/10 bg-[#151928] p-1.5 shadow-2xl backdrop-blur-xl animate-in fade-in-0 zoom-in-95">
                  <div className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                    Popular Job Titles
                  </div>
                  <div className="space-y-0.5">
                    {filteredSuggestions.slice(0, 8).map((title) => (
                      <button
                        key={title}
                        type="button"
                        onClick={() => handleSelectSuggestion(title)}
                        className="group flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-neutral-200 transition-colors hover:bg-indigo-600/20 hover:text-white"
                      >
                        <div className="flex items-center gap-2.5">
                          <Sparkles className="size-3.5 text-indigo-400 opacity-70 group-hover:opacity-100" />
                          <span>{title}</span>
                        </div>
                        <span className="text-[11px] text-neutral-500 group-hover:text-indigo-300">
                          Autofill
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Company Name & Job Category */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="companyName"
                  className="mb-1.5 block text-xs font-medium text-neutral-300"
                >
                  Company Name <span className="text-indigo-400">*</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-400">
                    <Building2 className="size-4" />
                  </div>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="HirePulse Network"
                    className="w-full rounded-xl border border-white/10 bg-[#121520] py-2.5 pr-4 pl-10 text-sm text-white placeholder-neutral-500 transition-colors outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/80"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="jobCategory"
                  className="mb-1.5 block text-xs font-medium text-neutral-300"
                >
                  Job Category <span className="text-indigo-400">*</span>
                </label>
                <div className="relative">
                  <select
                    id="jobCategory"
                    name="jobCategory"
                    value={formData.jobCategory}
                    onChange={handleChange}
                    className="w-full cursor-pointer appearance-none rounded-xl border border-white/10 bg-[#121520] px-4 py-2.5 pr-10 text-sm text-white transition-colors outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/80"
                  >
                    {jobCategories.map((cat) => (
                      <option
                        key={cat}
                        value={cat}
                        className="bg-[#121520] text-white"
                      >
                        {cat}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-400">
                    <ChevronDown className="size-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Job Type Segmented Options */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-neutral-300">
                Job Type <span className="text-indigo-400">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {jobTypes.map((type) => {
                  const isSelected = formData.jobType === type
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, jobType: type }))
                      }
                      className={`cursor-pointer rounded-xl border px-3 py-2.5 text-center text-sm font-medium transition-all ${
                        isSelected
                          ? "border-indigo-500/60 bg-[#171b2d] text-white shadow-sm"
                          : "border-white/5 bg-[#121520] text-neutral-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {type}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Location, Compensation & Timeline */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-white">
            <span className="size-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
            <h2>2. Location, Compensation &amp; Timeline</h2>
          </div>

          <div className="space-y-4">
            {/* Remote Work Allowed Toggle Card */}
            <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#121520] p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                  <Globe className="size-5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">
                    Remote Work Allowed (isRemote)
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Enable worldwide or distributed candidate applications
                  </p>
                </div>
              </div>

              {/* Toggle switch */}
              <button
                type="button"
                role="switch"
                aria-checked={formData.isRemote}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    isRemote: !prev.isRemote,
                  }))
                }
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  formData.isRemote ? "bg-indigo-600" : "bg-neutral-800"
                }`}
              >
                <span
                  className={`inline-block size-4.5 transform rounded-full bg-white transition-transform ${
                    formData.isRemote ? "translate-x-5.5" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Location & Application Deadline */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label
                    htmlFor="location"
                    className="block text-xs font-medium text-neutral-300"
                  >
                    Job Location (location)
                  </label>
                  <span className="text-[11px] text-neutral-500">Required</span>
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-400">
                    <MapPin className="size-4" />
                  </div>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="New York, USA"
                    className="w-full rounded-xl border border-white/10 bg-[#121520] py-2.5 pr-4 pl-10 text-sm text-white placeholder-neutral-500 transition-colors outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/80"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="deadline"
                  className="mb-1.5 block text-xs font-medium text-neutral-300"
                >
                  Application Deadline (deadline)
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-400">
                    <Calendar className="size-4" />
                  </div>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    required
                    value={formData.deadline}
                    onChange={handleChange}
                    className="w-full cursor-pointer rounded-xl border border-white/10 bg-[#121520] py-2.5 pr-4 pl-10 text-sm text-white placeholder-neutral-500 transition-colors outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/80"
                  />
                </div>
              </div>
            </div>

            {/* Min Salary, Max Salary & Frequency */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label
                  htmlFor="minSalary"
                  className="mb-1.5 block text-xs font-medium text-neutral-300"
                >
                  Min Salary / Rate
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-sm font-semibold text-neutral-400">
                    €
                  </div>
                  <input
                    type="number"
                    id="minSalary"
                    name="minSalary"
                    value={formData.minSalary}
                    onChange={handleChange}
                    placeholder="25"
                    className="w-full rounded-xl border border-white/10 bg-[#121520] py-2.5 pr-4 pl-8 text-sm text-white placeholder-neutral-500 transition-colors outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/80"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="maxSalary"
                  className="mb-1.5 block text-xs font-medium text-neutral-300"
                >
                  Max Salary / Rate
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-sm font-semibold text-neutral-400">
                    €
                  </div>
                  <input
                    type="number"
                    id="maxSalary"
                    name="maxSalary"
                    value={formData.maxSalary}
                    onChange={handleChange}
                    placeholder="40"
                    className="w-full rounded-xl border border-white/10 bg-[#121520] py-2.5 pr-4 pl-8 text-sm text-white placeholder-neutral-500 transition-colors outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/80"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="salaryFrequency"
                  className="mb-1.5 block text-xs font-medium text-neutral-300"
                >
                  Frequency
                </label>
                <div className="relative">
                  <select
                    id="salaryFrequency"
                    name="salaryFrequency"
                    value={formData.salaryFrequency}
                    onChange={handleChange}
                    className="w-full cursor-pointer appearance-none rounded-xl border border-white/10 bg-[#121520] px-4 py-2.5 pr-10 text-sm text-white transition-colors outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/80"
                  >
                    {salaryFrequencies.map((freq) => (
                      <option
                        key={freq}
                        value={freq}
                        className="bg-[#121520] text-white"
                      >
                        {freq}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-400">
                    <ChevronDown className="size-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Responsibilities & Requirements */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-white">
            <span className="size-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
            <h2>3. Responsibilities &amp; Requirements</h2>
          </div>

          <div className="space-y-4">
            {/* Key Responsibilities */}
            <div>
              <label
                htmlFor="responsibilities"
                className="mb-1.5 block text-xs font-medium text-neutral-300"
              >
                Key Responsibilities <span className="text-indigo-400">*</span>
              </label>
              <textarea
                id="responsibilities"
                name="responsibilities"
                rows={4}
                required
                value={formData.responsibilities}
                onChange={handleChange}
                placeholder="Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products."
                className="w-full resize-none rounded-xl border border-white/10 bg-[#121520] p-4 text-sm text-white placeholder-neutral-500 transition-colors outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/80"
              />
            </div>

            {/* Qualifications & Requirements */}
            <div>
              <label
                htmlFor="requirements"
                className="mb-1.5 block text-xs font-medium text-neutral-300"
              >
                Qualifications &amp; Requirements{" "}
                <span className="text-indigo-400">*</span>
              </label>
              <textarea
                id="requirements"
                name="requirements"
                rows={4}
                required
                value={formData.requirements}
                onChange={handleChange}
                placeholder="• 3+ years of experience with React, TypeScript, and modern state architectures&#10;• Solid understanding of DOM performance and component-driven designs&#10;• Experience partnering closely with product teams and UI/UX designers"
                className="w-full resize-none rounded-xl border border-white/10 bg-[#121520] p-4 text-sm text-white placeholder-neutral-500 transition-colors outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/80"
              />
            </div>
          </div>
        </div>

        {/* Bottom Publish Button */}
        <div className="flex justify-end border-t border-white/5 pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all hover:bg-indigo-500 hover:shadow-indigo-600/40 active:scale-[0.99] disabled:opacity-50 sm:w-auto"
          >
            <span>{isSubmitting ? "Publishing Job..." : "Publish Job"}</span>
            <ArrowRight className="size-4" />
          </button>
        </div>
      </form>
    </div>
  )
}

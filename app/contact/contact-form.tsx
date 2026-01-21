"use client";

import { useState, useEffect, useRef } from "react";
import Turnstile from "react-turnstile";
import { servicesData } from "@/data/services";

const PHONE_TEL = "+17207381031";
const PHONE_DISPLAY = "(720) 738-1031";

type FormField =
  | "name"
  | "company"
  | "email"
  | "phone"
  | "projectType"
  | "property"
  | "estimatedCloseDate"
  | "city"
  | "timeline"
  | "details";

type FormState = {
  values: Record<FormField, string>;
  errors: Partial<Record<FormField, string>>;
  status: "idle" | "submitting" | "success" | "error";
  feedback: string;
  turnstileToken: string | null;
};

const INITIAL_STATE: FormState = {
  values: {
    name: "",
    company: "",
    email: "",
    phone: "",
    projectType: "",
    property: "",
    estimatedCloseDate: "",
    city: "",
    timeline: "",
    details: "",
  },
  errors: {},
  status: "idle",
  feedback: "",
  turnstileToken: null,
};

const sortedServices = [...servicesData].sort((a, b) => a.name.localeCompare(b.name));

const TIMELINE_OPTIONS = [
  { value: "", label: "Select timeline..." },
  { value: "immediate", label: "Immediate" },
  { value: "45-days", label: "45 days" },
  { value: "180-days", label: "180 days" },
  { value: "planning", label: "Planning phase" },
];

export const ContactForm: React.FC<{ prepopulatedProjectType?: string }> = ({ prepopulatedProjectType }) => {
  const [state, setState] = useState<FormState>(INITIAL_STATE);
  const [projectTypeFilter, setProjectTypeFilter] = useState("");
  const [showProjectTypeDropdown, setShowProjectTypeDropdown] = useState(false);
  const projectTypeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prepopulatedProjectType) {
      setState((prev) => ({
        ...prev,
        values: { ...prev.values, projectType: prepopulatedProjectType },
      }));
    }
  }, [prepopulatedProjectType]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (projectTypeRef.current && !projectTypeRef.current.contains(event.target as Node)) {
        setShowProjectTypeDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredServices = sortedServices.filter((service) =>
    service.name.toLowerCase().includes(projectTypeFilter.toLowerCase())
  );

  const validate = (values: FormState["values"]) => {
    const errors: Partial<Record<FormField, string>> = {};
    if (!values.name.trim()) {
      errors.name = "Please provide your full name.";
    }
    if (!values.email.trim()) {
      errors.email = "Please provide an email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      errors.email = "Enter a valid email address.";
    }
    if (!values.phone.trim()) {
      errors.phone = "Please provide a phone number.";
    } else if (!/^\+?[0-9()\-\s.]{7,}$/.test(values.phone.trim())) {
      errors.phone = "Enter a valid phone number.";
    }
    if (!values.projectType.trim()) {
      errors.projectType = "Please select a project type.";
    }
    return errors;
  };

  const handlePhoneChange = (value: string) => {
    const cleaned = value.replace(/[^\d+\-().\s]/g, "");
    handleChange("phone", cleaned);
  };

  const handleChange = (field: FormField, value: string) => {
    setState((prev) => ({
      ...prev,
      values: { ...prev.values, [field]: value },
      errors: { ...prev.errors, [field]: undefined },
      status: prev.status === "success" ? "idle" : prev.status,
      feedback: prev.status === "success" ? "" : prev.feedback,
    }));
  };

  const handleProjectTypeSelect = (serviceName: string) => {
    handleChange("projectType", serviceName);
    setProjectTypeFilter("");
    setShowProjectTypeDropdown(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState((prev) => ({
      ...prev,
      status: "submitting",
      feedback: "",
    }));

    if (!state.turnstileToken) {
      setState((prev) => ({
        ...prev,
        status: "error",
        feedback: "Please complete the security verification.",
      }));
      return;
    }

    const errors = validate(state.values);
    if (Object.keys(errors).length > 0) {
      setState((prev) => ({
        ...prev,
        errors,
        status: "error",
        feedback: "Please correct the highlighted fields.",
      }));
      return;
    }

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: state.values.name,
          email: state.values.email,
          phone: state.values.phone,
          company: state.values.company,
          service: state.values.projectType,
          message: state.values.details,
          timeline: state.values.timeline,
          turnstileToken: state.turnstileToken,
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setState({
        ...INITIAL_STATE,
        status: "success",
        feedback:
          "Thank you. A Denver 1031 exchange specialist will reach out shortly.",
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        status: "error",
        feedback:
          "We could not submit the form. Please try again or call our team.",
      }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="grid gap-5"
      aria-describedby="contact-form-feedback"
    >
      <div className="grid gap-2">
        <label htmlFor="name" className="text-xs font-medium uppercase tracking-[0.1em] text-gray-700">
          Name <span className="text-red-600">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={state.values.name}
          onChange={(event) => handleChange("name", event.target.value)}
          className="border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 transition focus:border-[#785530] focus:outline-none focus:ring-1 focus:ring-[#785530]"
          aria-invalid={Boolean(state.errors.name)}
          aria-describedby={state.errors.name ? "name-error" : undefined}
          required
        />
        {state.errors.name ? (
          <p id="name-error" className="text-xs text-red-600">
            {state.errors.name}
          </p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <label htmlFor="company" className="text-xs font-medium uppercase tracking-[0.1em] text-gray-700">
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          value={state.values.company}
          onChange={(event) => handleChange("company", event.target.value)}
          className="border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 transition focus:border-[#785530] focus:outline-none focus:ring-1 focus:ring-[#785530]"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="email" className="text-xs font-medium uppercase tracking-[0.1em] text-gray-700">
          Email <span className="text-red-600">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={state.values.email}
          onChange={(event) => handleChange("email", event.target.value)}
          className="border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 transition focus:border-[#785530] focus:outline-none focus:ring-1 focus:ring-[#785530]"
          aria-invalid={Boolean(state.errors.email)}
          aria-describedby={state.errors.email ? "email-error" : undefined}
          required
        />
        {state.errors.email ? (
          <p id="email-error" className="text-xs text-red-600">
            {state.errors.email}
          </p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <label htmlFor="phone" className="text-xs font-medium uppercase tracking-[0.1em] text-gray-700">
          Phone <span className="text-red-600">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={state.values.phone}
          onChange={(event) => handlePhoneChange(event.target.value)}
          className="border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 transition focus:border-[#785530] focus:outline-none focus:ring-1 focus:ring-[#785530]"
          aria-invalid={Boolean(state.errors.phone)}
          aria-describedby={state.errors.phone ? "phone-error" : undefined}
          required
        />
        {state.errors.phone ? (
          <p id="phone-error" className="text-xs text-red-600">
            {state.errors.phone}
          </p>
        ) : null}
      </div>

      <div className="grid gap-2" ref={projectTypeRef}>
        <label htmlFor="projectType" className="text-xs font-medium uppercase tracking-[0.1em] text-gray-700">
          Project Type <span className="text-red-600">*</span>
        </label>
        <div className="relative">
          <input
            id="projectType"
            name="projectType"
            type="text"
            value={state.values.projectType}
            onChange={(event) => {
              handleChange("projectType", event.target.value);
              setProjectTypeFilter(event.target.value);
              setShowProjectTypeDropdown(true);
            }}
            onFocus={() => {
              if (state.values.projectType) {
                setProjectTypeFilter(state.values.projectType);
              }
              setShowProjectTypeDropdown(true);
            }}
            className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 transition focus:border-[#785530] focus:outline-none focus:ring-1 focus:ring-[#785530]"
            aria-invalid={Boolean(state.errors.projectType)}
            aria-describedby={state.errors.projectType ? "projectType-error" : undefined}
            placeholder="Start typing to search..."
            required
          />
          {showProjectTypeDropdown && filteredServices.length > 0 && (
            <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto border border-gray-200 bg-white shadow-lg">
              {filteredServices.slice(0, 10).map((service) => (
                <button
                  key={service.slug}
                  type="button"
                  onClick={() => handleProjectTypeSelect(service.name)}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 transition hover:bg-[#F5F0E8] hover:text-[#785530]"
                >
                  {service.name}
                </button>
              ))}
            </div>
          )}
        </div>
        {state.errors.projectType ? (
          <p id="projectType-error" className="text-xs text-red-600">
            {state.errors.projectType}
          </p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <label htmlFor="property" className="text-xs font-medium uppercase tracking-[0.1em] text-gray-700">
          Property Being Sold
        </label>
        <input
          id="property"
          name="property"
          type="text"
          value={state.values.property}
          onChange={(event) => handleChange("property", event.target.value)}
          className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 transition focus:border-[#785530] focus:outline-none focus:ring-1 focus:ring-[#785530]"
          placeholder="Include property type, location, and estimated value (optional)"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="estimatedCloseDate" className="text-xs font-medium uppercase tracking-[0.1em] text-gray-700">
            Estimated Close Date
          </label>
          <input
            id="estimatedCloseDate"
            name="estimatedCloseDate"
            type="date"
            value={state.values.estimatedCloseDate}
            onChange={(event) => handleChange("estimatedCloseDate", event.target.value)}
            className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 transition focus:border-[#785530] focus:outline-none focus:ring-1 focus:ring-[#785530]"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="city" className="text-xs font-medium uppercase tracking-[0.1em] text-gray-700">
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            value={state.values.city}
            onChange={(event) => handleChange("city", event.target.value)}
            className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 transition focus:border-[#785530] focus:outline-none focus:ring-1 focus:ring-[#785530]"
            placeholder="Primary metro or submarket (optional)"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <label htmlFor="timeline" className="text-xs font-medium uppercase tracking-[0.1em] text-gray-700">
          Timeline
        </label>
        <select
          id="timeline"
          name="timeline"
          value={state.values.timeline}
          onChange={(event) => handleChange("timeline", event.target.value)}
          className="border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 transition focus:border-[#785530] focus:outline-none focus:ring-1 focus:ring-[#785530]"
        >
          {TIMELINE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-2">
        <label htmlFor="details" className="text-xs font-medium uppercase tracking-[0.1em] text-gray-700">
          Details
        </label>
        <textarea
          id="details"
          name="details"
          value={state.values.details}
          onChange={(event) => handleChange("details", event.target.value)}
          className="min-h-[100px] border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 transition focus:border-[#785530] focus:outline-none focus:ring-1 focus:ring-[#785530]"
          rows={4}
        />
      </div>

      <div className="flex justify-center">
        <Turnstile
          sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
            onSuccess={(token: string) => {
              setState((prev) => ({ ...prev, turnstileToken: token }));
            }}
          onError={() => {
            setState((prev) => ({ ...prev, turnstileToken: null }));
          }}
          onExpire={() => {
            setState((prev) => ({ ...prev, turnstileToken: null }));
          }}
        />
      </div>

      <button
        type="submit"
        disabled={state.status === "submitting" || !state.turnstileToken}
        className="inline-flex items-center justify-center bg-[#785530] px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#4A3520] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#785530] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state.status === "submitting" ? "Sending..." : "Submit Request"}
      </button>

      {state.feedback && (
        <p
          id="contact-form-feedback"
          className={`text-sm ${state.status === "success" ? "text-green-700" : "text-red-600"}`}
          role="alert"
        >
          {state.feedback}
        </p>
      )}
      <p className="text-xs text-gray-500">
        Educational content only. Not tax or legal advice.
      </p>
    </form>
  );
};


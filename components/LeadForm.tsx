"use client";

import { useState } from "react";
import Link from "next/link";

const PHONE_TEL = "+17202000000";
const PHONE_DISPLAY = "(720) 200-0000";

type FormField =
  | "name"
  | "email"
  | "phone"
  | "property"
  | "closeDate"
  | "city"
  | "message";

type FormState = {
  values: Record<FormField, string>;
  errors: Partial<Record<FormField, string>>;
  status: "idle" | "submitting" | "success" | "error";
  feedback: string;
};

const INITIAL_STATE: FormState = {
  values: {
    name: "",
    email: "",
    phone: "",
    property: "",
    closeDate: "",
    city: "",
    message: "",
  },
  errors: {},
  status: "idle",
  feedback: "",
};

export const LeadForm: React.FC = () => {
  const [state, setState] = useState<FormState>(INITIAL_STATE);

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
    if (!values.property.trim()) {
      errors.property = "Describe the property you are selling.";
    }
    if (!values.closeDate.trim()) {
      errors.closeDate = "Select your estimated close date.";
    }
    if (!values.city.trim()) {
      errors.city = "Enter the city where the property is located.";
    }
    if (!values.message.trim()) {
      errors.message = "Share your exchange goals or questions.";
    }
    return errors;
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState((prev) => ({
      ...prev,
      status: "submitting",
      feedback: "",
    }));

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
        body: JSON.stringify(state.values),
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
      className="grid gap-6"
      aria-describedby="lead-form-feedback"
    >
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium text-gray-900">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={state.values.name}
          onChange={(event) => handleChange("name", event.target.value)}
          className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-gray-900 shadow-sm focus:border-[#16324F] focus:outline-none focus:ring-2 focus:ring-[#16324F]/60"
          aria-invalid={Boolean(state.errors.name)}
          aria-describedby={state.errors.name ? "name-error" : undefined}
          required
        />
        {state.errors.name ? (
          <p id="name-error" className="text-sm text-[#B42318]">
            {state.errors.name}
          </p>
        ) : null}
      </div>
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-900">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={state.values.email}
          onChange={(event) => handleChange("email", event.target.value)}
          className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-gray-900 shadow-sm focus:border-[#16324F] focus:outline-none focus:ring-2 focus:ring-[#16324F]/60"
          aria-invalid={Boolean(state.errors.email)}
          aria-describedby={state.errors.email ? "email-error" : undefined}
          required
        />
        {state.errors.email ? (
          <p id="email-error" className="text-sm text-[#B42318]">
            {state.errors.email}
          </p>
        ) : null}
      </div>
      <div className="grid gap-2">
        <label htmlFor="phone" className="text-sm font-medium text-gray-900">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={state.values.phone}
          onChange={(event) => handleChange("phone", event.target.value)}
          className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-gray-900 shadow-sm focus:border-[#16324F] focus:outline-none focus:ring-2 focus:ring-[#16324F]/60"
          aria-invalid={Boolean(state.errors.phone)}
          aria-describedby={state.errors.phone ? "phone-error" : undefined}
          required
        />
        {state.errors.phone ? (
          <p id="phone-error" className="text-sm text-[#B42318]">
            {state.errors.phone}
          </p>
        ) : null}
      </div>
      <div className="grid gap-2">
        <label
          htmlFor="property"
          className="text-sm font-medium text-gray-900"
        >
          Property Being Sold
        </label>
        <input
          id="property"
          name="property"
          type="text"
          value={state.values.property}
          onChange={(event) => handleChange("property", event.target.value)}
          className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-gray-900 shadow-sm focus:border-[#16324F] focus:outline-none focus:ring-2 focus:ring-[#16324F]/60"
          aria-invalid={Boolean(state.errors.property)}
          aria-describedby={
            state.errors.property ? "property-error" : undefined
          }
          required
        />
        {state.errors.property ? (
          <p id="property-error" className="text-sm text-[#B42318]">
            {state.errors.property}
          </p>
        ) : null}
      </div>
      <div className="grid gap-2">
        <label
          htmlFor="closeDate"
          className="text-sm font-medium text-gray-900"
        >
          Estimated Close Date
        </label>
        <input
          id="closeDate"
          name="closeDate"
          type="date"
          value={state.values.closeDate}
          onChange={(event) => handleChange("closeDate", event.target.value)}
          className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-gray-900 shadow-sm focus:border-[#16324F] focus:outline-none focus:ring-2 focus:ring-[#16324F]/60"
          aria-invalid={Boolean(state.errors.closeDate)}
          aria-describedby={
            state.errors.closeDate ? "closeDate-error" : undefined
          }
          required
        />
        {state.errors.closeDate ? (
          <p id="closeDate-error" className="text-sm text-[#B42318]">
            {state.errors.closeDate}
          </p>
        ) : null}
      </div>
      <div className="grid gap-2">
        <label htmlFor="city" className="text-sm font-medium text-gray-900">
          City
        </label>
        <input
          id="city"
          name="city"
          type="text"
          value={state.values.city}
          onChange={(event) => handleChange("city", event.target.value)}
          className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-gray-900 shadow-sm focus:border-[#16324F] focus:outline-none focus:ring-2 focus:ring-[#16324F]/60"
          aria-invalid={Boolean(state.errors.city)}
          aria-describedby={state.errors.city ? "city-error" : undefined}
          required
        />
        {state.errors.city ? (
          <p id="city-error" className="text-sm text-[#B42318]">
            {state.errors.city}
          </p>
        ) : null}
      </div>
      <div className="grid gap-2">
        <label
          htmlFor="message"
          className="text-sm font-medium text-gray-900"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={state.values.message}
          onChange={(event) => handleChange("message", event.target.value)}
          className="min-h-[120px] rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm text-gray-900 shadow-sm focus:border-[#16324F] focus:outline-none focus:ring-2 focus:ring-[#16324F]/60"
          aria-invalid={Boolean(state.errors.message)}
          aria-describedby={
            state.errors.message ? "message-error" : undefined
          }
          required
        />
        {state.errors.message ? (
          <p id="message-error" className="text-sm text-[#B42318]">
            {state.errors.message}
          </p>
        ) : null}
      </div>
      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          type="submit"
          disabled={state.status === "submitting"}
          className="inline-flex items-center justify-center rounded-full bg-[#DAA520] px-6 py-3 text-sm font-semibold tracking-[0.2em] text-gray-900 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#16324F] hover:bg-[#c4911b] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state.status === "submitting" ? "SENDING" : "SUBMIT REQUEST"}
        </button>
        <Link
          href={`tel:${PHONE_TEL}`}
          className="text-sm font-semibold text-[#16324F] transition hover:text-[#0f2236] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16324F]"
        >
          Call {PHONE_DISPLAY}
        </Link>
      </div>
      <p
        id="lead-form-feedback"
        className="text-sm text-gray-700"
        role={state.status === "error" || state.status === "success" ? "alert" : undefined}
      >
        {state.feedback}
      </p>
      <p className="text-xs text-gray-500">
        Educational content only. Not tax or legal advice.
      </p>
    </form>
  );
};


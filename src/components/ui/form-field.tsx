"use client"

import type React from "react"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  required?: boolean
  description?: string
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, required, description, className, ...props }, ref) => {
    const fieldId = props.id || props.name

    return (
      <div className="space-y-2">
        <label htmlFor={fieldId} className="block text-sm font-medium text-gray-900 dark:text-white">
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-label="obrigatório">
              *
            </span>
          )}
          {description && <span className="text-sm text-gray-600 dark:text-gray-400"> ({description})</span>}
        </label>

        <input
          ref={ref}
          id={fieldId}
          className={cn(
            "w-full px-3 py-2 border border-gray-300 rounded-lg",
            "focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "dark:bg-gray-700 dark:border-gray-600 dark:text-white",
            "placeholder:text-gray-500 dark:placeholder:text-gray-400",
            error && "border-red-500 focus:ring-red-500",
            className,
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          {...props}
        />

        {error && (
          <p id={`${fieldId}-error`} className="text-sm text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  },
)

FormField.displayName = "FormField"

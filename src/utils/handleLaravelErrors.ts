import type { LaravelValidationErrors } from "@/types/auth";

export function handleLaravelError(err: any): LaravelValidationErrors {
  const response = err?.response;

  // Laravel validation error (422)
  if (response?.status === 422 && response?.data?.errors) {
    return response.data.errors as LaravelValidationErrors;
  }

  // Unauthorized (login failed, token expired, etc.)
  if (response?.status === 401) {
    return {
      general: [response.data?.message || "Unauthorized"],
    };
  }

  // Server error fallback
  if (response?.status >= 500) {
    return {
      general: ["Server error. Please try again later."],
    };
  }

  // Network / unknown error
  return {
    general: ["Unexpected error occurred."],
  };
}

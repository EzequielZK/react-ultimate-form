import validations from "@/lib/validations";

export type ValueValidationResponse = {
  error: string | null;
};

export type ValidationTypes = keyof typeof validations;

export type ValidationFunctionType = (
  value: string
) => ValueValidationResponse;
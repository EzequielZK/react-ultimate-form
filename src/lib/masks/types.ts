import masks from ".";

export type MaskTypes = keyof typeof masks

export type MaskFunctionType = (value: string) => string;
export const FREQ_OPTIONS = ["yearly", "monthly"] as const;
export type SavingsFrequency = (typeof FREQ_OPTIONS)[number];

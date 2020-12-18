export type Feature =
  | "Fasting Glucose"
  | "Waist Circumference"
  | "HDL Cholesterol"
  | "Triglycerides"
  | "Blood Pressure (SBP)";

export type Sex = "male" | "female";

export interface Data {
  "Fasting Glucose": number;
  "Waist Circumference": number;
  "HDL Cholesterol": number;
  Triglycerides: number;
  "Blood Pressure (SBP)": number;
}

export interface Threshold {
  name: Feature;
  units: string;
  upper: boolean;
  male: number;
  female: number;
  min: number;
  max: number;
}

export interface Intervention {
  name: string;
  type: string;
  link: string;
  "Fasting Glucose": number;
  "Waist Circumference": number;
  "HDL Cholesterol": number;
  Triglycerides: number;
  "Blood Pressure (SBP)": number;
}

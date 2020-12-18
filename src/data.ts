export { interventions, thresholds };
import type { Threshold, Intervention } from "./types";
// Min-Max values from
// Jeong S, Jo YM, Shim SO, et al.A novel model for
// metabolic syndrome risk quantification based on areal similarity
// degree. IEEE Trans Biomed Eng. 2014;61(3):665-79.

const thresholds: Threshold[] = [
  {
    name: "Fasting Glucose",
    units: "mg/dL",
    upper: true,
    male: 100,
    female: 100,
    min: 51,
    max: 295,
  },
  {
    name: "Waist Circumference",
    units: "cm",
    upper: true,
    male: 102,
    female: 88,
    min: 43,
    max: 127,
  },
  {
    name: "HDL Cholesterol",
    units: "mg/dL",
    upper: false,
    male: 40,
    female: 50,
    min: 15,
    max: 103,
  },
  {
    name: "Triglycerides",
    units: "mg/dL",
    upper: true,
    male: 150,
    female: 150,
    min: 31,
    max: 929,
  },
  {
    name: "Blood Pressure (SBP)",
    units: "mmHG",
    upper: true,
    male: 130,
    female: 130,
    min: 70,
    max: 203,
  },
];

const interventions: Intervention[] = [
  {
    name: "None",
    type: "",
    link: "",
    "Fasting Glucose": 0,
    "Waist Circumference": 0,
    "HDL Cholesterol": 0,
    Triglycerides: 0,
    "Blood Pressure (SBP)": 0,
  },
  {
    name: "Following Mediterranean-style diet",
    type: "Lifestyle",
    link: "https://doi.org/10.1001/jama.292.12.1440",
    "Fasting Glucose": 0,
    "Waist Circumference": -2,
    "HDL Cholesterol": 4,
    Triglycerides: -18,
    "Blood Pressure (SBP)": -4,
  },
  {
    name: "Supervised HIIT training (boxing) 4x50mins per week for 12 weeks",
    type: "Phisical Activity and Exercise",
    link: "https://doi.org/10.1186/2052-1847-7-3",
    "Fasting Glucose": 0,
    "Waist Circumference": -5.3,
    "HDL Cholesterol": 0,
    Triglycerides: 0,
    "Blood Pressure (SBP)": -10,
  },
  {
    name: "15 yoga sessions of 90 minutes each over 10 weeks",
    type: "Phisical Activity and Exercise",
    link: "https://doi.org/10.1089/met.2008.0016",
    "Fasting Glucose": 0, // 2.60 (Non significative)
    "Waist Circumference": -2.7,
    "HDL Cholesterol": 0, // -2.00 (Non significative)
    Triglycerides: -8.8,
    "Blood Pressure (SBP)": -3.6,
  },
  {
    name: "24 weeks of moderate intensity walking ",
    type: "Phisical Activity and Exercise",
    link: "https://core.ac.uk/display/29579948",
    "Fasting Glucose": 0,
    "Waist Circumference": -2,
    "HDL Cholesterol": 0,
    Triglycerides: 0,
    "Blood Pressure (SBP)": -6.5,
  },
];

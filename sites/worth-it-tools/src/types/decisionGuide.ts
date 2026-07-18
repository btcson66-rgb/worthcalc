export interface SensitivityRow {
  scenario: string;
  input: string;
  result: string;
}

export interface SourceLink {
  label: string;
  href: string;
}

export interface DecisionGuideContent {
  id: string;
  labels: {
    directAnswer: string;
    inputs: string;
    formula: string;
    workedExample: string;
    sensitivity: string;
    scenario: string;
    changedInput: string;
    result: string;
    limitations: string;
    sources: string;
    lastVerified: string;
  };
  directAnswer: string;
  inputs: string[];
  formula: string;
  workedExample: string;
  sensitivity: SensitivityRow[];
  cta?: { label: string; href: string };
  limitations: string[];
  sources: SourceLink[];
  lastVerified: string;
}

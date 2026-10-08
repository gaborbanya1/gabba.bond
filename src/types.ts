export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Flagship Product' | 'Enterprise Automation' | 'Mobile & Web';
  badge: string;
  description: string;
  problemStatement: string;
  solutionArchitecture: string;
  keyHighlights: string[];
  techStack: string[];
  metrics: { label: string; value: string }[];
  isFlagship?: boolean;
  demoAvailable?: boolean;
}

export interface InquiryFormData {
  name: string;
  email: string;
  company?: string;
  serviceCategory: string;
  timeline: string;
  message: string;
}

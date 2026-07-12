export interface TimelineItem {
  label: string;
  text: string;
}

export interface ProjectItem {
  label: string;
  time: string;
  position: string;
  logo: string;
  text: string;
  gallery: string[];
}

export interface Experience {
  id: string;
  slug: string;
  name: string;
  category: string;
  subtitle?: string;
  role: string;
  date: string;
  location: string;
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
  description: string;
  paragraphs: string[];
  gallery: string[];
  detailName?: string;
  metaText?: string;
  timelineItems?: TimelineItem[];
  partnerLogos?: string[];
  projects?: ProjectItem[];
}

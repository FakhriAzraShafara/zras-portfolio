export interface MediaItem {
  type: 'image' | 'video';
  url: string;
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  period: string;
  description: string;
  achievements: string[];
  tags: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  media: MediaItem[];
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  responsibilities: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  location: string;
}

export interface SkillDetail {
  name: string;
  proficiency: string;
  note: string;
}

export interface SkillCategory {
  name: string;
  details: SkillDetail[];
}

export interface Language {
  lang: string;
  level: string;
}

export interface VolunteerExperience {
  title: string;
  organization: string;
  period: string;
  description: string;
}

export interface Certification {
  name: string;
  title: string;
  date: string;
  details: string;
  imageUrl: string;
}

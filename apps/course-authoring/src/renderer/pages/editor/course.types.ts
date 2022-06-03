export interface Course extends CourseData {
  modules?: Module[] | string;
}

export interface CourseData {
  id: string;
  createdAt: string;
  modifiedAt: string;
  name: string;
  description?: string;
  authors?: string;
  theme?: string;
}

export interface Module {
  id: number;
  name: string;
  pages: Page[];
}

export interface Page {
  id: number;
  name: string;
  type: 'lesson' | 'quiz';
  stages: Stage[];
}

export interface Stage {
  id: number;
  name: string;
  blocks: Block[];
}

export interface Block {
  id: number;
  typeId: 'p' | 'h1' | 'button';
  element: Element;
}

export interface Element {
  name: string;
  content?: string;
  classNames?: string;
}

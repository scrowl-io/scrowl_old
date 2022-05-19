export interface PageRoute {
  [key: string]: string;
}
export interface PageNavItem {
  label: string;
  link: string;
}

export type PageNav = PageNavItem[];

export interface PageProps {
  handleTitleChange: (pages: PageNav) => void;
}

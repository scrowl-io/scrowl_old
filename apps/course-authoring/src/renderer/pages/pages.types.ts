export interface PageRouteProps {
  url: string;
  label: string;
}

export interface PageRoutesProps {
  [key: string]: PageRouteProps;
}

export type PageNavProps = Array<PageRouteProps>;

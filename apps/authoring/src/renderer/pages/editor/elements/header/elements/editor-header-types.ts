export interface HeaderProps {
  courseName: string | undefined;
  courseDesc: string | undefined;
  courseAut: string | undefined;
  publishFunc: () => void;
  disabled?: boolean;
}

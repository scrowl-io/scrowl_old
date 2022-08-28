import { SaveResult } from '../../../../../../main/models/projects';

export interface HeaderProps {
  courseName: string | undefined;
  courseDesc: string | undefined;
  courseAut: string | undefined;
  publishFunc: () => Promise<SaveResult>;
  disabled?: boolean;
}

import { Requester } from '../services';

export interface Model {
  EVENTS?: Requester.RegisterEvents;
  init?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

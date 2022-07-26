import { Requester } from '../services';

export interface Model {
  EVENTS?: Requester.RegisterEvents;
  init: () => void;
  [key: string]: unknown;
}

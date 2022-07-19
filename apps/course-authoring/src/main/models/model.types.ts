import { Requester } from '../services';

export interface Model {
  EVENTS?: Array<Requester.RegisterEvent>;
  init: () => void;
  [key: string]: unknown;
}
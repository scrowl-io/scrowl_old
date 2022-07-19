import { RegisterEvent } from '../requester';

export interface PathingProps {
  source: string;
  out: string;
}

export type PathingKey = keyof PathingProps;

export interface ExporterEventPackage extends Omit<RegisterEvent, 'name'> {
  name: 'package-course';
};

export type ExporterEventNames = ExporterEventPackage["name"];

export type ExportEvent = ExporterEventPackage;

export type ExporterEvents = {
  'package': ExporterEventPackage;
};

import { ApiResult, JsonResult } from '../requester';

export type StorageData = JsonResult;

export interface StorageQuery {
  [key: string]: string | number | boolean | undefined;
}

export type StorageOrder = [
  {
    column: string;
    order?: 'desc' | 'asc';
  }
];

export type StorageSchemaColumn = {
  column: {
    name: string;
    type: string;
    table?: string;
  };
};

export type StorageSchema = Array<StorageSchemaColumn>;

export type StorageResult = ApiResult;

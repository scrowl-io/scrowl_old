export interface StorageData {
  [key: string]: string | number | boolean;
}

export type StorageSchemaColumn = {
  column: {
    name: string;
    type: string;
    table?: string;
  };
};

export type StorageSchema = Array<StorageSchemaColumn>;

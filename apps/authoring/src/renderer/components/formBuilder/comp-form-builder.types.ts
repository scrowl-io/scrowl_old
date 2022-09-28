export interface FormBuilderDataNumber {
  type: 'number';
  value: number;
  label: string;
}

export interface FormBuilderDataText {
  type: 'text';
  value: string;
  label: string;
}

export interface FormBuilderDataTextarea {
  type: 'textarea';
  value: string;
  label: string;
}

export type FormBuilderDataListText = {
  value: Array<string>;
  type: 'listText';
  label: string;
};

export type FormBuilderData =
  | FormBuilderDataText
  | FormBuilderDataNumber
  | FormBuilderDataTextarea
  | FormBuilderDataListText;

export interface FormBuilderCommons {
  name?: string;
  formData: {
    [key: string]: FormBuilderData;
  };
  onUpdate: (data: FormBuilderCommons['formData']) => void;
  SubmitAction?: () => JSX.Element;
}

export type FormBuilderProps = FormBuilderCommons &
  React.AllHTMLAttributes<HTMLFormElement>;

export interface FormElementCommons {
  config: FormBuilderData;
  name: string;
  onUpdate: (data: FormBuilderCommons['formData']) => void;
}

export type FormElementProps = FormElementCommons;

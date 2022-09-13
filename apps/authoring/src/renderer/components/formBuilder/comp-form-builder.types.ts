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

export type FormBuilderData =
  | FormBuilderDataText
  | FormBuilderDataNumber
  | FormBuilderDataTextarea;

export interface FormBuilderCommons {
  name?: string;
  formData: {
    [key: string]: FormBuilderData;
  };
  onSubmit: () => void;
  onUpdate: (data: FormBuilderCommons['formData']) => void;
}

export type FormBuilderProps = FormBuilderCommons &
  React.AllHTMLAttributes<HTMLFormElement>;

export interface FormElementCommons {
  config: FormBuilderData;
  name: string;
  onUpdate: (data: FormBuilderCommons['formData']) => void;
}

export type FormElementProps = FormElementCommons;

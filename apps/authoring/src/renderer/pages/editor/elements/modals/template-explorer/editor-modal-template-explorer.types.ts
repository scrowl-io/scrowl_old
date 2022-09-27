import { Templates } from '../../../../../models';

export interface TemplateListItem extends Templates.TemplateManifest {
  isSelected?: boolean;
}

export type SelectTemplate = (template: TemplateListItem) => void;

export interface TemplateExplorerBodyCommons {
  onSelectTemplate: SelectTemplate;
}

export type TemplateExplorerBodyProps = TemplateExplorerBodyCommons &
  React.HTMLAttributes<HTMLDivElement>;

export interface TemplateExplorerFooterCommons {
  selectedTemplate?: TemplateListItem;
  onClose: () => void;
}

export type TemplateExplorerFooterProps = TemplateExplorerFooterCommons &
  React.HTMLAttributes<HTMLDivElement>;

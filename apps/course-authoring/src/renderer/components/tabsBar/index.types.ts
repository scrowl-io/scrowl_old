export interface TabsBarProps {
  children: React.ReactNode;
}

export interface TabProps {
  label: string;
  contentLabel: string;
  activeTab: string;
  onClick: (tab: string) => void;
}

export interface TabsContentListProps {
  children: React.ReactNode;
}

export interface TabsContentItemProps {
  label: string;
  tabLabel: string;
  activeTab: string;
  children: React.ReactNode;
}

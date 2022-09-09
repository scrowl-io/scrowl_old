import { Projects } from '../../../../../../models';

export type SlideTreeItem = {
  name: string;
};

export type TreeViewSlideCommons = {
  tree: SlideTreeItem;
  moduleIdx: number;
  lessonIdx: number;
  idx: number;
  project: Projects.ProjectData;
};

export type TreeViewSlideProps = TreeViewSlideCommons &
  React.HTMLAttributes<HTMLDivElement>;

export type SlideTree = Array<SlideTreeItem>;

export type TreeViewSlidesCommons = {
  tree: SlideTree;
  moduleIdx: number;
  lessonIdx: number;
  project: Projects.ProjectData;
};

export type TreeViewSlidesProps = TreeViewSlidesCommons &
  React.HTMLAttributes<HTMLDivElement>;

export type LessonTreeItem = {
  name: string;
  slides: SlideTree;
};

export type TreeViewLessonCommons = {
  tree: LessonTreeItem;
  moduleIdx: number;
  idx: number;
  project: Projects.ProjectData;
};

export type TreeViewLessonProps = TreeViewLessonCommons &
  React.HTMLAttributes<HTMLDivElement>;

export type LessonTree = Array<LessonTreeItem>;

export type TreeViewLessonsCommons = {
  tree: LessonTree;
  moduleIdx: number;
  project: Projects.ProjectData;
};

export type TreeViewLessonsProps = TreeViewLessonsCommons &
  React.HTMLAttributes<HTMLDivElement>;

export type ModuleTreeItem = {
  name: string;
  lessons: LessonTree;
};

export type TreeViewModuleCommons = {
  tree: ModuleTreeItem;
  idx: number;
  project: Projects.ProjectData;
};

export type TreeViewModuleProps = TreeViewModuleCommons &
  React.HTMLAttributes<HTMLDivElement>;

export type ProjectTree = Array<ModuleTreeItem>;

export type TreeViewModulesCommons = {
  tree: ProjectTree;
  project: Projects.ProjectData;
};

export type TreeViewModulesProps = TreeViewModulesCommons &
  React.HTMLAttributes<HTMLDivElement>;

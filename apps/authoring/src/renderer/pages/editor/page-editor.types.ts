export type SlidePosition = {
  moduleIdx: number;
  lessonIdx: number;
  slideIdx: number;
};

export interface EditorCanvasHeaderCommons {
  onUpdate: (title?: string) => void;
}

export type EditorCanvasHeaderProps = EditorCanvasHeaderCommons &
  React.HTMLAttributes<HTMLDivElement>;

import React, { useState, useEffect } from 'react';
import * as styles from '../editor-canvas.module.scss';
import { useActiveSlide } from '../../../page-editor-hooks';
import { EditorCanvasHeaderProps } from '../../../page-editor.types';
import { Icon } from '@owlui/lib';

export const Header = ({ onUpdate }: EditorCanvasHeaderProps) => {
  const slideData = useActiveSlide();
  const [slideName, setSlideName] = useState(slideData.name || '');

  useEffect(() => {
    setSlideName(slideData.name || '');
  }, [slideData]);

  const handleSlideNameChange = (ev: React.FormEvent<HTMLInputElement>) => {
    const val = ev.currentTarget.value;

    onUpdate(val);
    setSlideName(val);
  };

  return (
    <div className={styles.workspace__header}>
      {slideData.template && ( // This should probably be based on a better field to tell if a slide is selected
        <>
          <h1 className="visually-hidden">{slideName}</h1>
          <Icon
            icon="rectangle"
            display="outlined"
            opsz={20}
            appearance="Slide"
          />
          <div className={styles.workspace__header__slidename}>
            <input
              name="slideName"
              id="slideNameInput"
              className="owlui-form-control"
              value={slideName}
              onChange={handleSlideNameChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default {
  Header,
};

import React, { useState, useEffect } from 'react';
import * as styles from '../editor-canvas.module.scss';
import { useEditSlideRef } from '../../../page-editor-hooks';
import { EditorCanvasHeaderProps } from '../../../page-editor.types';
import { Icon } from '@owlui/lib';

export const Header = ({ onUpdate }: EditorCanvasHeaderProps) => {
  const slideRef = useEditSlideRef();
  const [slideName, setSlideName] = useState(slideRef.name || '');

  useEffect(() => {
    setSlideName(slideRef.name || '');
  }, [slideRef]);

  const handleSlideNameChange = (ev: React.FormEvent<HTMLInputElement>) => {
    const val = ev.currentTarget.value;

    onUpdate(val);
    setSlideName(val);
  };

  return (
    <div className={styles.slideNameContainer}>
      <span className={styles.slideNameIcon}>
        <Icon icon="rectangle" display="outlined" />
      </span>
      {slideName ? (
        <input
          name="slideName"
          id="slideNameInput"
          className="owlui-form-control"
          value={slideName}
          onChange={handleSlideNameChange}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default {
  Header,
};

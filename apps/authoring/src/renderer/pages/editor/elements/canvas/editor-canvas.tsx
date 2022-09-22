import React, { useEffect, useState } from 'react';
import { Templates } from '../../../../models';
import { useActiveSlide } from '../../page-editor-hooks';
import { Slide, SlideCommons } from '@scrowl/player/src/components/slide';
import { Icon, Button } from '@owlui/lib';

import * as styles from './editor-canvas.module.scss';

export const Canvas = () => {
  const activeSlide = useActiveSlide();
  const [canvasUrl, setCanvasUrl] = useState('');
  const [slideOpts, setSlideOpts] = useState<SlideCommons>({
    aspect: '16:9',
  });
  const [slideStyle, setSlideStyle] = useState({
    transform: 'translate(-50%, -50%) scale(.33)',
  });
  const [slideName, setSlideName] = useState(activeSlide.name);

  useEffect(() => {
    if (!activeSlide || !activeSlide.template || !activeSlide.template.meta) {
      return;
    }

    setSlideName(activeSlide.name);

    Templates.load(activeSlide.template).then(res => {
      if (res.error) {
        console.error(res);
        return;
      }

      setCanvasUrl(res.data.url);
    });
  }, [activeSlide]);

  const handleSlideNameChange = (ev: React.FormEvent<HTMLInputElement>) => {
    const name = ev.currentTarget.value;
    setSlideName(name);
    console.log(slideName);
  };

  const renderCanvasHeader = () => {
    return (
      <div className={styles.slideNameContainer}>
        <span className={styles.slideNameIcon}>
          <Icon icon="rectangle" display="outlined" />
        </span>
        <input
          name="slideName"
          id="slideNameInput"
          className="owlui-form-control"
          value={slideName}
          onChange={handleSlideNameChange}
        />
      </div>
    );
  };

  console.log(activeSlide);

  return (
    <div className={styles.canvasContainer}>
      {Object.keys(activeSlide).length > 0 ? renderCanvasHeader() : <></>}
      <Slide options={slideOpts} style={slideStyle}>
        <iframe
          src={canvasUrl}
          title="Scrowl Editor Canvas"
          referrerPolicy="unsafe-url"
          sandbox="allow-same-origin allow-scripts"
          height="100%"
          width="100%"
        ></iframe>
      </Slide>
    </div>
  );
};

export default {
  Canvas,
};

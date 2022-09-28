import React, { useEffect, useState } from 'react';
import { Templates, Projects } from '../../../../models';
import * as styles from './editor-canvas.module.scss';
import { requester } from '../../../../services';
import {
  useActiveSlide,
  updateActiveSlide,
  useActiveSlidePosition,
} from '../../page-editor-hooks';
import { Slide, SlideCommons } from '@scrowl/player/src/components/slide';
import { Header } from './elements';

export const Canvas = () => {
  const position = useActiveSlidePosition();
  const [refPosition, setRefPosition] = useState(position);
  const slideData: Projects.ProjectSlide = useActiveSlide();
  const [prevPrevSlideTemplate, setPrevSlideTemplate] = useState(
    slideData.template?.meta.filename || ''
  );
  const [canvasUrl, setCanvasUrl] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [slideOpts, setSlideOpts] = useState<SlideCommons>({
    aspect: '16:9',
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [slideStyle, setSlideStyle] = useState({
    transform: 'scale(.33)',
  });

  useEffect(() => {
    if (!slideData || !slideData.template || !slideData.template.meta) {
      return;
    }

    const updateCanvasUrl = (res: requester.ApiResult) => {
      if (res.error) {
        console.error(res);
        return;
      }

      setCanvasUrl(res.data.url);
    };

    const templateChanged =
      slideData.template.meta.filename !== prevPrevSlideTemplate;
    const slideChanged = position !== refPosition;

    if (slideChanged || templateChanged) {
      setPrevSlideTemplate(slideData.template.meta.filename);
      Templates.load(slideData.template).then(updateCanvasUrl);
    }

    return () => {
      setRefPosition(position);
    };
  }, [
    slideData,
    position,
    refPosition,
    setRefPosition,
    prevPrevSlideTemplate,
    setPrevSlideTemplate,
  ]);

  const updateSlideTitle = (title?: string) => {
    const payload = { name: title };

    updateActiveSlide(payload, position);
  };

  return (
    <div className={styles.workspace}>
      <Header onUpdate={updateSlideTitle} />
      <div className={styles.workspace__body}>
        <Slide
          options={slideOpts}
          // className="ratio ratio-16x9"
        >
          <iframe
            src={canvasUrl}
            title="Scrowl Editor Canvas"
            referrerPolicy="unsafe-url"
            sandbox="allow-same-origin allow-scripts"
            height="100%"
            width="100%"
            id="template-iframe"
          ></iframe>
        </Slide>
      </div>
      <div className={styles.workspace__footer}></div>
    </div>
  );
};

export default {
  Canvas,
};

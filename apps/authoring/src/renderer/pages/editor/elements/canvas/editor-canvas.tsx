import React, { useEffect, useState } from 'react';
import * as styles from './editor-canvas.module.scss';
import { Templates, Projects } from '../../../../models';
import {
  useActiveSlide,
  updateActiveSlide,
  useActiveSlidePosition,
  useEditSlideRef,
} from '../../page-editor-hooks';
import { Slide, SlideCommons } from '@scrowl/player/src/components/slide';
import { Header } from './elements';
import { deepCopy } from '../pane-details/elements';

export const Canvas = () => {
  const [isMounted, setMounted] = useState(false);
  const project = Projects.useData();
  const modules = deepCopy(project.modules);
  const activeSlide: Projects.ProjectSlide = useActiveSlide();
  const position = useActiveSlidePosition();
  const [refPosition, setRefPosition] = useState(position);
  const slideRef: Projects.ProjectSlide = useEditSlideRef();
  const [canvasUrl, setCanvasUrl] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [slideOpts, setSlideOpts] = useState<SlideCommons>({
    aspect: '16:9',
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [slideStyle, setSlideStyle] = useState({
    transform: 'translate(-50%, -50%) scale(.33)',
  });

  useEffect(() => {
    if (
      !activeSlide ||
      !activeSlide.template ||
      !activeSlide.template.meta ||
      !slideRef ||
      !slideRef.template ||
      !slideRef.template.meta
    ) {
      return;
    }

    const getSlideInfo = (slide: Projects.ProjectSlide) => {
      const copy = deepCopy(slide);

      delete copy.template;
      return copy;
    };

    const templateChanged =
      slideRef.template.meta.filename !== activeSlide.template.meta.filename;
    const templateUpdated =
      slideRef.template.elements !== activeSlide.template.elements;
    const slideChanged = position !== refPosition;
    const slideUpdated = getSlideInfo(slideRef) !== getSlideInfo(activeSlide);

    console.log('');
    console.log('templateChanged', templateChanged);
    console.log('templateUpdated', templateUpdated);
    console.log('slideChanged', slideChanged);
    console.log('slideUpdated', slideUpdated);

    if (!slideChanged && !templateChanged) {
      return;
    }

    Templates.load(slideRef.template).then(res => {
      if (res.error) {
        console.error(res);
        return;
      }

      setCanvasUrl(res.data.url);
    });

    return () => {
      setMounted(true);
      setRefPosition(position);
    };
  }, [
    activeSlide,
    slideRef,
    isMounted,
    setMounted,
    position,
    refPosition,
    setRefPosition,
  ]);

  const getSlideData = () => {
    if (
      position.moduleIdx === -1 ||
      position.lessonIdx === -1 ||
      position.slideIdx === -1
    ) {
      console.error('Active slide position not set', position);
      return;
    }

    const module = modules[position.moduleIdx];

    if (!module || !module.lessons.length) {
      console.error('Unable to find active slide module', position, modules);
      return;
    }

    const lesson = module.lessons[position.lessonIdx];

    if (!lesson || !lesson.slides.length) {
      console.error('Unable to find active slide lesson', position, modules);
      return;
    }

    const slide = lesson.slides[position.slideIdx];

    if (!slide) {
      console.error('Unable to find active slide', position, modules);
      return;
    }

    return slide;
  };

  const updateSlideTitle = (title?: string) => {
    const payload = { name: title };
    let slide = getSlideData();
    if (!slide) {
      return;
    }
    slide = Object.assign(slide, payload);
    updateActiveSlide(slide, position);
    // console.log('modules', modules);
    // console.log('updating slide title', __isMounted.current);
    // Projects.update({ modules });
  };

  return (
    <div className={styles.canvasContainer}>
      <Header onUpdate={updateSlideTitle} />
      <Slide options={slideOpts} style={slideStyle}>
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
  );
};

export default {
  Canvas,
};

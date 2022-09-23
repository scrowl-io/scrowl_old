import React, { useEffect, useState } from 'react';
import { Projects, Templates } from '../../../../models';
import {
  updateEditSlideRef,
  useEditSlideRef,
  useActiveSlide,
  updateActiveSlide,
} from '../../page-editor-hooks';
import { Slide, SlideCommons } from '@scrowl/player/src/components/slide';
import { Icon, Button } from '@owlui/lib';

import * as styles from './editor-canvas.module.scss';
import {
  ProjectLesson,
  ProjectSlide,
} from '../../../../../main/models/projects';
import { deepCopy } from '../right-pane/content/utils';

export const Canvas = () => {
  const activeSlide = useActiveSlide();
  const editSlideRef = useEditSlideRef();
  const [canvasUrl, setCanvasUrl] = useState('');
  const [slideOpts, setSlideOpts] = useState<SlideCommons>({
    aspect: '16:9',
  });
  const [slideStyle, setSlideStyle] = useState({
    transform: 'translate(-50%, -50%) scale(.33)',
  });
  const [slideName, setSlideName] = useState(
    activeSlide.name ? activeSlide.name : ''
  );
  const project = Projects.useData();
  const modules = deepCopy(project.modules);

  useEffect(() => {
    if (!activeSlide || !activeSlide.template || !activeSlide.template.meta) {
      return;
    }

    setSlideName(activeSlide.name);

    if (editSlideRef === activeSlide) {
      const targetframe = document.getElementById(
        'template-iframe'
      ) as HTMLIFrameElement;

      targetframe?.contentWindow?.postMessage(
        { updateManifest: activeSlide.template },
        '*'
      );
      return;
    }

    Templates.load(activeSlide.template).then(res => {
      console.log(res);
      if (res.error) {
        console.error(res);
        return;
      }

      setCanvasUrl(res.data.url);
    });
  }, [activeSlide, editSlideRef]);

  const getTargetSlide = () => {
    const moduleID: number | undefined = activeSlide.moduleID;
    const lessonID: number | undefined = activeSlide.lessonID;
    const slideID: number | undefined = activeSlide.id;

    if (moduleID && lessonID) {
      const targetLesson = modules[moduleID - 1].lessons.find(
        (lesson: ProjectLesson) => {
          return lesson.id === lessonID;
        }
      );

      const targetSlide = targetLesson.slides.find((slide: ProjectSlide) => {
        return slide.id === slideID;
      });
      return targetSlide;
    }
  };

  const handleSlideNameChange = (ev: React.FormEvent<HTMLInputElement>) => {
    const targetSlide = getTargetSlide();
    const name = ev.currentTarget.value;
    setSlideName(name);
    targetSlide.name = name;

    updateEditSlideRef(targetSlide);
    updateActiveSlide(targetSlide);
    Projects.update({ modules });
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
          id="template-iframe"
        ></iframe>
      </Slide>
    </div>
  );
};

export default {
  Canvas,
};

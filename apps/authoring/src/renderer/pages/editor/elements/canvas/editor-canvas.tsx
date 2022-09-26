import React, { useEffect, useState } from 'react';
import { Templates } from '../../../../models';
import {
  useCurrentlyLoadedSlide,
  useActiveSlide,
} from '../../page-editor-hooks';
import { Slide, SlideCommons } from '@scrowl/player/src/components/slide';

export const Canvas = () => {
  const activeSlide = useActiveSlide();
  const editSlideRef = useCurrentlyLoadedSlide();
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
    if (!activeSlide || !activeSlide.template || !activeSlide.template.meta) {
      return;
    }

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

  return (
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
  );
};

export default {
  Canvas,
};

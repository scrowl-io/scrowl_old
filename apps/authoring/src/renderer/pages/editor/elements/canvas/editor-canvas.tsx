import React, { useEffect, useState } from 'react';
import { Templates } from '../../../../models';
import {
  useCurrentlyLoadedSlide,
  useActiveSlide,
} from '../../page-editor-hooks';
import { Slide, SlideCommons } from '@scrowl/player/src/components/slide';

export const Canvas = () => {
  const activeSlide = useActiveSlide();
  const currentlyLoadedSlide = useCurrentlyLoadedSlide();
  const [canvasUrl, setCanvasUrl] = useState('');
  const [slideOpts, setSlideOpts] = useState<SlideCommons>({
    aspect: '16:9',
  });
  const [slideStyle, setSlideStyle] = useState({
    transform: 'translate(-50%, -50%) scale(.33)',
  });

  useEffect(() => {
    if (!activeSlide || !activeSlide.template || !activeSlide.template.meta) {
      return;
    }

    if (currentlyLoadedSlide === activeSlide) {
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
  }, [activeSlide, currentlyLoadedSlide]);

  return (
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
  );
};

export default {
  Canvas,
};

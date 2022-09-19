import React, { useEffect, useState } from 'react';
import { Templates } from '../../../../models';
import { useActiveSlide } from '../../page-editor-hooks';

export const Canvas = () => {
  const [canvasUrl, setCanvasUrl] = useState('');
  const activeSlide = useActiveSlide();

  useEffect(() => {
    if (!activeSlide || !activeSlide.template || !activeSlide.template.meta) {
      return;
    }

    Templates.load(activeSlide.template).then(res => {
      if (res.error) {
        console.error(res);
        return;
      }

      setCanvasUrl(res.data.url);
    });
  }, [activeSlide]);

  return (
    <iframe
      src={canvasUrl}
      title="Scrowl Editor Canvas"
      referrerPolicy="unsafe-url"
      sandbox="allow-same-origin allow-scripts"
      height="100%"
    ></iframe>
  );
};

export default {
  Canvas,
};

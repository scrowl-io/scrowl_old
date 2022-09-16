import React, { useEffect, useState } from 'react';
import { Templates } from '../../../../models';

export const Canvas = () => {
  const [canvasUrl, setCanvasUrl] = useState('');

  useEffect(() => {
    Templates.load('introduction').then(res => {
      if (res.error) {
        console.error(res);
        return;
      }

      setCanvasUrl(res.data.url);
    });
  }, []);

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

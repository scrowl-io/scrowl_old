import React, { useEffect, useState } from 'react';
import { Templates } from '../../../../models';

export const Canvas = () => {
  const [canvasData, setCanvasData] = useState('');

  useEffect(() => {
    Templates.load().then(res => {
      if (res.error) {
        console.error(res);
        return;
      }

      setCanvasData(res.data.template);
    });
  }, []);

  return <iframe srcDoc={canvasData} title="Scrowl Editor Canvas"></iframe>;
};

export default {
  Canvas,
};

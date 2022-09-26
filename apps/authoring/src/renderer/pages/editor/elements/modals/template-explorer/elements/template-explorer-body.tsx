import React, { useEffect, useState } from 'react';
import { Card, CardBody, Icon } from '@owlui/lib';
import { Templates } from '../../../../../../models';
import * as styles from '../editor-modal-template-explorer.module.scss';
import { updateActiveSlide } from '../../../../page-editor-hooks';

export const Body = () => {
  const [isInit, setInit] = useState(false);
  const [templateList, setTemplateList] = useState([]);

  useEffect(() => {
    if (isInit) {
      return;
    }

    Templates.list().then(results => {
      if (results.error) {
        console.error(results);
        return;
      }

      setTemplateList(results.data.templates);
      setInit(true);
    });
  }, [isInit]);

  return (
    <div className={styles.scrowlTemplateBrowser}>
      {!isInit ? (
        <div>Loading...</div>
      ) : (
        templateList.map(
          (
            item: { name: string; manifest: Templates.TemplateManifest },
            idx: number
          ) => {
            console.log('manifest item', item);
            return (
              <button
                onClick={() => updateActiveSlide(item)}
                className={styles.scrowlTemplateBrowserItem}
                key={idx}
              >
                <Card style={{ width: '100%' }}>
                  <Icon display="sharp" icon="dashboard" />
                  <div>
                    <img
                      src="https://eebos.github.io/scrowl_mockup/img/template_0.svg"
                      alt="template-placeholder"
                    />
                  </div>
                  <CardBody>
                    <div>{item.manifest.meta.name}</div>
                  </CardBody>
                </Card>
              </button>
            );
          }
        )
      )}
    </div>
  );
};

export default {
  Body,
};

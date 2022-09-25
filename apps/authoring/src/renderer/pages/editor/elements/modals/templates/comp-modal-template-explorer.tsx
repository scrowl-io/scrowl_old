import React, { useEffect, useState } from 'react';
import { Modal, Card, CardBody, Icon, CardTitle, CardHeader } from '@owlui/lib';
import { Templates } from '../../../../../models';
import * as styles from './comp-modal-template.module.scss';
import { updateActiveSlide } from '../../../page-editor-hooks';

const ExplorerTemplateBody = () => {
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

  console.log('styles', styles);

  // const updateSlideTemplate = () => {};
  return (
    <div
      className={styles.scrowlTemplateBrowser}
      // style={{ display: 'flex', justifyContent: 'space-evenly' }}
    >
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
                // style={{
                //   border: 'none',
                //   background: 'none',
                //   boxShadow: 'var(--owl-box-shadow)',
                //   padding: '0',
                // }}
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
                  {/* <CardHeader
                    style={{
                      backgroundImage:
                        'https://eebos.github.io/scrowl_mockup/img/template_0.svg',
                    }}
                  >
                    
                  </CardHeader> */}
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

export const ModalExplorerTemplates = () => {
  const show = Templates.useExplorer();
  const header = {
    bsProps: {
      closeButton: true,
      closeLabel: 'Close',
    },
    content: <>Template Browser</>,
  };
  const body = {
    content: <ExplorerTemplateBody />,
  };

  return (
    <Modal
      show={show}
      onHide={Templates.closeExplorer}
      header={header}
      body={body}
    />
  );
};

export default {
  ModalExplorerTemplates,
};

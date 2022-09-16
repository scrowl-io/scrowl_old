import React, { useEffect, useState } from 'react';
import { Modal, Card, CardBody, CardTitle, CardHeader } from '@owlui/lib';
import { Templates } from '../../../models';

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

  return (
    <>
      {!isInit ? (
        <div>Loading...</div>
      ) : (
        templateList.map(
          (
            item: { name: string; manifest: Templates.TemplateManifest },
            idx: number
          ) => {
            return (
              <div key={idx}>
                <Card>
                  <CardHeader>Example Card Body</CardHeader>
                  <CardBody>
                    <div>Name: {item.manifest.meta.name}</div>
                  </CardBody>
                </Card>
              </div>
            );
          }
        )
      )}
    </>
  );
};

export const ModalExplorerTemplates = () => {
  const show = Templates.useExplorer();
  const header = {
    bsProps: {
      closeButton: true,
      closeLabel: 'Close',
    },
    content: <></>,
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

import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, Icon } from '@owlui/lib';
import {
  TemplateExplorerBodyProps,
  TemplateListItem,
} from '../editor-modal-template-explorer.types';
import { Templates } from '../../../../../../models';
import * as styles from '../editor-modal-template-explorer.module.scss';
import {
  useActiveSlide,
  useHasActiveSlide,
} from '../../../../page-editor-hooks';

export const Body = ({ onSelectTemplate }: TemplateExplorerBodyProps) => {
  const hasActiveSlide = useHasActiveSlide();
  const slideData = useActiveSlide();
  const isNewSlide =
    slideData.template &&
    slideData.template.meta &&
    slideData.template.meta.name
      ? false
      : true;
  const currentTemplate = !isNewSlide ? slideData.template.meta.name : '';
  const [isInit, setInit] = useState(false);
  const [list, setList] = useState<Array<TemplateListItem>>([]);

  const handleSlideSelection = (template: TemplateListItem) => {
    const listCopy = list.map((item: TemplateListItem) => {
      item.isSelected = false;

      if (!template.meta || item.meta.name === template.meta.name) {
        item.isSelected = true;
      }

      return item;
    });

    setList(listCopy);
    onSelectTemplate(template);
  };

  useEffect(() => {
    if (isInit) {
      return;
    }

    const updateList = (templates: Array<TemplateListItem>) => {
      const markSelectedTemplate = () => {
        for (let i = 0, ii = templates.length; i < ii; i++) {
          if (templates[i].meta.name === currentTemplate) {
            templates[i].isSelected = true;
            onSelectTemplate(templates[i]);
            break;
          }
        }
      };

      if (hasActiveSlide && !isNewSlide) {
        markSelectedTemplate();
      }

      setList(templates);
    };

    Templates.list().then(results => {
      console.log('template list', results);
      if (results.error) {
        console.error(results);
        return;
      }

      updateList(results.data.templates);
      setInit(true);
    });
  }, [
    isInit,
    hasActiveSlide,
    slideData,
    onSelectTemplate,
    isNewSlide,
    currentTemplate,
  ]);

  return (
    <div className={styles.templateExplorerBody}>
      {!isInit ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.templateExplorerList}>
          {list.map((item: TemplateListItem, idx: number) => {
            return (
              <div
                className={`${styles.templateExplorerSlide}${
                  item.isSelected ? ' active' : ''
                }`}
                key={idx}
              >
                <button
                  id={`explorer-template-${idx}`}
                  className={styles.templateExplorerSlideAction}
                  onClick={() => {
                    handleSlideSelection(item);
                  }}
                >
                  {currentTemplate === item.meta.name ? (
                    <span className={styles.templateExplorerSlideActive}>
                      <Icon icon="check_circle" />
                    </span>
                  ) : (
                    <></>
                  )}
                  <Card className="template-explorer__slide__card">
                    <CardBody className={styles.templateExplorerSlideCardBody}>
                      <div className={styles.templateExplorerSlideType}>
                        <Icon display="sharp" icon="dashboard" filled={true} />
                      </div>
                      <div className={styles.templateExplorerSlideImg}>
                        <Icon display="sharp" icon="dashboard" filled={true} />
                      </div>
                    </CardBody>
                    <CardFooter
                      className={styles.templateExplorerSlideCardFooter}
                    >
                      <label htmlFor={`explorer-template-${idx}`}>
                        {item.meta.name}
                      </label>
                    </CardFooter>
                  </Card>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default {
  Body,
};

/* eslint-disable no-constant-condition */
import React, { useEffect, useState } from 'react';
import { Icon } from '@owlui/lib';
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
      console.log('[template explorer] listing templates - updating list');
      const markSelectedTemplate = () => {
        console.log(
          '[template explorer] listing templates - marking selected template'
        );
        for (let i = 0, ii = templates.length; i < ii; i++) {
          if (templates[i].meta.name === currentTemplate) {
            templates[i].isSelected = true;
            console.log(
              '[template explorer] listing templates - template selected'
            );
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

    console.log('[template explorer] listing templates - start');
    Templates.list().then(results => {
      console.log('[template explorer] listing templates - result', results);
      if (results.error) {
        console.error(results);
        return;
      }

      updateList(results.data.templates);
      setInit(true);
      console.log('[template explorer] listing templates - end');
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
    <div className={styles['template-explorer__body']}>
      {!isInit ? (
        <div>Loading...</div>
      ) : (
        list.map((item: TemplateListItem, idx: number) => {
          return (
            <button
              key={idx}
              id={`explorer-template-${idx}`}
              className={`${styles['template-explorer__item']} ${
                item.isSelected && 'active'
              }`}
              onClick={() => {
                handleSlideSelection(item);
              }}
            >
              <div className={styles['template-explorer__item__preview']}>
                {false ? (
                  <img alt="Preview of Template" />
                ) : (
                  <Icon
                    display="sharp"
                    icon="dashboard"
                    opsz={48}
                    filled={true}
                  />
                )}
              </div>
              <span className={styles['template-explorer__item__type']}>
                <Icon
                  display="sharp"
                  icon="dashboard"
                  opsz={20}
                  filled={true}
                />
              </span>
              <label>{item.meta.name}</label>
              {currentTemplate === item.meta.name && (
                <span className={styles['template-explorer__item__active']}>
                  <Icon icon="check_circle" opsz={20} />
                </span>
              )}
            </button>
          );
        })
      )}
    </div>
  );
};

export default {
  Body,
};

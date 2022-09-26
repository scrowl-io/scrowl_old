import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { Icon, Button } from '@owlui/lib';
import { OutlineNavModuleProps } from '../../../player-outline.types';
import * as styles from '../../../player-outline.module.scss';
import { NavLessons } from '.';

export const NavModule = ({ config, idx }: OutlineNavModuleProps) => {
  const [open, setOpen] = useState(true);
  const itemId = `tree-item-module-${idx}-item`;
  const menuId = `tree-item-module-${idx}-menu`;

  return (
    <div className={styles.treeViewModule} key={idx}>
      <div className={styles.treeViewHeader}>
        <Button
          id={itemId}
          aria-expanded={open}
          aria-controls={menuId}
          className={styles.treeViewItem}
          onClick={() => setOpen(!open)}
          variant="link"
        >
          <div className="module-icons">
            <span className={styles.treeViewItemIconHandle}>
              <Icon
                icon="arrow_drop_down"
                display="outlined"
                filled
                style={{ fontSize: '1.375rem' }}
              />
            </span>
            <span className={styles.treeViewItemIconDetail}>
              <Icon icon="folder" display="outlined" filled={open} />
            </span>
            <span className={styles.treeViewItemLabel}>{config.name}</span>
          </div>
        </Button>
      </div>
      <Collapse in={open}>
        <div className="nav flex-column" id={menuId}>
          <NavLessons config={config.lessons} moduleIdx={idx} />
        </div>
      </Collapse>
    </div>
  );
};

export default {
  NavModule,
};

import { Accordion, Button, Drawer, Icon } from '@owlui/lib';
import React, { useState } from 'react';
import * as styles from './header-publishbutton.module.scss';

export const PublishButton = () => {
  const [showDrawer, setShowDrawer] = useState(true);

  const drawerAccordion = [
    {
      id: '1',
      label: 'Course Settings',
      view: (
        <>
          <div className="mb-2">
            <label htmlFor="publish1" className="form-label">
              Course Name
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="publish1"
              value="Sexual Harrassment Prevention Training"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="publish2" className="form-label">
              Course Description
            </label>
            <textarea
              className="form-control form-control-sm"
              id="publish2"
              placeholder="Describe the Project"
            ></textarea>
          </div>
          <div className="mb-2">
            <label htmlFor="publish3" className="form-label">
              Authors
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="publish3"
              placeholder=""
            />
          </div>
        </>
      ),
    },
    {
      id: '2',
      label: 'Reporting & Tracking',
      view: (
        <>
          <div className="mb-2">
            <label htmlFor="publish6" className="form-label">
              LMS Lesson Title
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="publish6"
              placeholder=""
            />
          </div>

          <div className="row mb-2">
            <label
              htmlFor="publish5"
              className="col-5 form-label col-form-label col-form-label-sm"
            >
              Report Status to LMS as
            </label>
            <div className="col-7">
              <select
                className="form-select form-select-sm"
                id="publish5"
                value="Passed/Incomplete"
              >
                <option>Passed/Incomplete</option>
              </select>
            </div>
          </div>

          <div className="row mb-2">
            <label
              htmlFor="publish7"
              className="col-5 form-label col-form-label col-form-label-sm"
            >
              LMS Identifier
            </label>
            <div className="col-7">
              <input
                type="text"
                className="form-control form-control-sm"
                id="publish7"
                placeholder=""
                value="13kj83j"
              />
            </div>
          </div>
        </>
      ),
    },
  ];

  const drawerContent = {
    header: {
      content: (
        <h4
          className={`offcanvas-title mb-0 ${styles.publishHeader}`}
          id="publishSettingsLabel"
        >
          Publish
        </h4>
      ),
      bsProps: {
        closeButton: true,
      },
    },
    body: (
      <>
        <Accordion items={drawerAccordion} alwaysOpen />
        <div className="d-flex justify-content-end my-3">
          <Button
            className={`btn btn-sm btn-success ms-2 ${styles.btnPublish}`}
          >
            <Icon icon="publish" />
            Publish
          </Button>
        </div>
      </>
    ),
  };

  const toggleShowDrawer = () => setShowDrawer(!showDrawer);

  return (
    <>
      <Button
        className={`btn btn-sm btn-primary ms-2 ${styles.btnPublish}`}
        onClick={toggleShowDrawer}
      >
        <Icon icon="publish" />
        Publish
      </Button>
      <Drawer
        show={showDrawer}
        onHide={toggleShowDrawer}
        drawer={drawerContent}
        className={styles.publishDrawerHeader}
        placement="end"
        id="publishSettings"
        aria-labelledby="publishSettingsLabel"
        aria-hidden="true"
      />
    </>
  );
};

export default {
  PublishButton,
};

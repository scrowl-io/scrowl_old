import { Accordion, Button, Drawer, Icon } from '@owlui/lib';
import React, { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { Portal } from '../../../../../../components/portal';
import { Projects } from '../../../../../../models';
import * as styles from './header-publishbutton.module.scss';

export const PublishButton = ({ disabled }: { disabled: boolean }) => {
  const project = Projects.useData();
  const [showDrawer, setShowDrawer] = useState(false);
  const [showPubToast, setShowPubToast] = useState(false);
  const [repData, setRepData] = useState({
    lmsLessonTitle: '',
    lmsReportStatus: '',
    lmsIdentifier: '',
  });

  const handleInputChange = (
    ev: React.FormEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = ev.currentTarget;
    const name = target.name;
    const value = target.value;

    if (Object.prototype.hasOwnProperty.call(repData, name)) {
      const newRepData = { ...repData };

      newRepData[name as keyof typeof repData] = value;

      setRepData(newRepData);
    }

    Projects.update({ [target.name]: target.value });
  };

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
              name="name"
              className="form-control form-control-sm"
              id="publish1"
              placeholder="Course Name"
              value={project.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="publish2" className="form-label">
              Course Description
            </label>
            <textarea
              name="description"
              className="form-control form-control-sm"
              id="publish2"
              placeholder="Describe the Project"
              value={project.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="mb-2">
            <label htmlFor="publish3" className="form-label">
              Authors
            </label>
            <input
              type="text"
              name="authors"
              className="form-control form-control-sm"
              id="publish3"
              placeholder="Course Authors"
              value={project.authors}
              onChange={handleInputChange}
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
              name="lmsLessonTitle"
              className="form-control form-control-sm"
              id="publish6"
              onChange={handleInputChange}
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
                name="lmsReportStatus"
                className="form-select form-select-sm"
                id="publish5"
                value={repData.lmsReportStatus}
                onChange={handleInputChange}
              >
                <option value="Passed/Incomplete">Passed/Incomplete</option>
                <option value="Passed">Passed</option>
                <option value="Incomplete">Incomplete</option>
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
                name="lmsIdentifier"
                className="form-control form-control-sm"
                id="publish7"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </>
      ),
    },
  ];

  const toggleShowDrawer = () => setShowDrawer(!showDrawer);

  const handlePublish = () => {
    // TODO: Make the publish async and returning some value we can validate to display a toast or a message to update the frontend.
    Projects.publish(project);
    setShowPubToast(true);
  };

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
            onClick={handlePublish}
            disabled={disabled}
          >
            <Icon icon="publish" />
            Publish
          </Button>
        </div>
      </>
    ),
  };

  return (
    <>
      <Button
        className={`btn btn-sm btn-primary ms-2 ${styles.btnPublish}`}
        onClick={toggleShowDrawer}
        disabled={disabled}
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
      <Portal>
        <ToastContainer className="p-3" position="bottom-center">
          <Toast
            onClose={() => setShowPubToast(false)}
            show={showPubToast}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">Published!</strong>
            </Toast.Header>
            <Toast.Body>
              Course successfuly published into your Downloads folder.
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </Portal>
    </>
  );
};

export default {
  PublishButton,
};

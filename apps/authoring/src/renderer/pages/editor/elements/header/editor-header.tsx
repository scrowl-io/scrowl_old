import React, { useState } from 'react';
import * as styles from './editor-header.module.scss';
import { Logo, Toolbar } from '../../../../components';
import {
  Drawer,
  Button,
  DrawerProps,
  Accordion,
  Form,
  FormDataProps,
} from '@owlui/lib';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

export const Header = () => {
  const [filename, setFilename] = useState('MyCourseProject');
  const [showPublishPane, setShowPublishPane] = React.useState(false);
  const [publishData, setPublishData] = useState({
    courseName: '',
    courseDescription: '',
    courseAuthors: '',
    lessonTitle: '',
    lessonStatus: '',
    LMSID: '',
    outputFormat: '',
    outputMedia: '',
  });

  const handleChange = (e: React.BaseSyntheticEvent) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setPublishData({ ...publishData, [e.target.name]: value });
  };

  const toggleShowPublishPane = () => {
    setShowPublishPane(!showPublishPane);
  };

  const handleFilenameChange = (ev: React.FormEvent<HTMLInputElement>) => {
    setFilename(ev.currentTarget.value);
  };

  const handleSubmitPublish = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(publishData);
  };

  const courseSettingsFormData: FormDataProps[] = [
    {
      type: 'input',
      inputProps: {
        label: {
          content: 'Course Name',
          htmlFor: 'email',
        },
        control: {
          onChange: handleChange,
          id: 'course-name',
          value: publishData.courseName,
          name: 'courseName',
          type: 'text',
          disabled: false,
          readOnly: false,
          plaintext: false,
          placeholder: 'Sexual Harassment Prevention Training',
        },
      },
    },
    {
      type: 'input',
      inputProps: {
        label: {
          content: 'Course Description',
          htmlFor: 'course-description',
        },
        control: {
          onChange: handleChange,
          id: 'course-description',
          value: publishData.courseDescription,
          name: 'courseDescription',
          type: 'text',
          disabled: false,
          readOnly: false,
          plaintext: false,
          placeholder: 'Describe the Project',
        },
      },
    },
    {
      type: 'input',
      inputProps: {
        label: {
          content: 'Authors',
          htmlFor: 'course-authors',
        },
        control: {
          onChange: handleChange,
          id: 'course-authors',
          value: publishData.courseAuthors,
          name: 'courseAuthors',
          type: 'text',
          disabled: false,
          readOnly: false,
          plaintext: false,
          placeholder: '',
        },
      },
    },
  ];

  const reportingTrackingFormData = [
    {
      type: 'input',
      inputProps: {
        label: {
          content: 'LMS Lesson Title',
          htmlFor: 'lesson-title',
        },
        control: {
          onChange: handleChange,
          id: 'lesson-title',
          value: publishData.lessonTitle,
          name: 'lessonTitle',
          type: 'text',
          disabled: false,
          readOnly: false,
          plaintext: false,
          placeholder: '',
        },
      },
    },
    {
      type: 'select',
      inputProps: {
        label: {
          content: 'Report Status To LMS As',
          htmlFor: 'lesson-status',
        },
        control: {
          name: 'lessonStatus',
          id: 'lesson-status',
          value: publishData.lessonStatus,
          onChange: handleChange,
          options: [
            {
              id: '1',
              label: 'Passed/Incomplete',
              value: 'Passed/Incomplete',
            },
          ],
        },
      },
    },
    {
      type: 'input',
      inputProps: {
        label: {
          content: 'LMS Identifier',
          htmlFor: 'lms-identifier',
        },
        control: {
          onChange: handleChange,
          id: 'lms-identifier',
          value: publishData.LMSID,
          name: 'LMSID',
          type: 'text',
          disabled: false,
          readOnly: false,
          plaintext: false,
          placeholder: '',
        },
      },
    },
  ];

  const exportOptionsFormData = [
    {
      type: 'select',
      inputProps: {
        label: {
          content: 'Output Format',
          htmlFor: 'output-format',
        },
        control: {
          name: 'outputFormat',
          id: 'output-format',
          value: publishData.outputFormat,
          onChange: handleChange,
          options: [
            {
              id: '1',
              label: 'SCORM 2004',
              value: 'SCORM 2004',
            },
            {
              id: '2',
              label: 'PDF',
              value: 'PDF',
            },
          ],
        },
      },
    },
    {
      type: 'select',
      inputProps: {
        label: {
          content: 'Output Media',
          htmlFor: 'output-media',
        },
        control: {
          name: 'outputMedia',
          id: 'output-media',
          value: publishData.outputMedia,
          onChange: handleChange,
          options: [
            {
              id: '1',
              label: 'None',
              value: 'None',
            },
            {
              id: '2',
              label: 'Recommended',
              value: 'Recommended',
            },
            {
              id: '3',
              label: 'Maximum',
              value: 'Maximum',
            },
          ],
        },
      },
    },
  ];

  const overviewGrid = (
    <CardGroup>
      <Card>
        <Card.Body>
          <Card.Title>4</Card.Title>
          <Card.Text>Modules</Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>4</Card.Title>
          <Card.Text>Modules</Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>4</Card.Title>
          <Card.Text>Modules</Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>4</Card.Title>
          <Card.Text>Modules</Card.Text>
        </Card.Body>
      </Card>
    </CardGroup>
  );

  const courseSettingsForm = (
    <Form
      formData={courseSettingsFormData}
      children={<span>TO DO: REMOVE</span>}
    />
  );

  const reportingTrackingForm = (
    <Form
      formData={reportingTrackingFormData}
      children={<span>TO DO: REMOVE</span>}
    />
  );

  const exportOptionsForm = (
    <Form
      formData={exportOptionsFormData}
      children={<span>TO DO: REMOVE</span>}
    />
  );

  const publishAccordionItems = [
    {
      id: '1',
      label: 'Course Settings',
      view: courseSettingsForm,
    },
    {
      id: '2',
      label: 'Reporting & Tracking',
      view: reportingTrackingForm,
    },
    {
      id: '3',
      label: 'Export Options',
      view: exportOptionsForm,
    },
    {
      id: '4',
      label: 'Overview',
      view: overviewGrid,
    },
  ];

  const drawer: DrawerProps = {
    header: {
      content: <h2>Publish</h2>,
      bsProps: {
        closeButton: true,
      },
    },
    body: (
      <>
        <Accordion items={publishAccordionItems} alwaysOpen />
        <Button onClick={handleSubmitPublish}>Publish</Button>
      </>
    ),
  };

  return (
    <Toolbar>
      <Logo />
      <div className={styles.filename} data-value={filename}>
        <input
          name="filename"
          id="filenameInput"
          className="form-control"
          value={filename}
          placeholder="Untitled Project"
          onChange={handleFilenameChange}
        />
      </div>
      <Button onClick={toggleShowPublishPane}>Publish</Button>
      <Drawer
        drawer={drawer}
        onHide={toggleShowPublishPane}
        placement="end"
        show={showPublishPane}
      />
    </Toolbar>
  );
};

export default {
  Header,
};

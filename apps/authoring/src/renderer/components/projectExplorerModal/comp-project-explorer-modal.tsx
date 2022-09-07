import React, { ReactNode, useEffect, useState } from 'react';
import {
  Modal,
  ModalDefaultProps,
  Input,
  TableData,
  TableRowItem,
} from '@owlui/lib';
import { useExplorer, closeExplorer } from '../../models/projects/index';
import { Projects } from '../../models';
import { AppInput, Table } from '../../components/app/elements';
import { Link } from 'react-router-dom';

const ProjectExplorerBody = ({ projectList }: ModalDefaultProps) => {
  const [filteredResults, setFilteredResults] = useState<TableRowItem[]>([]);
  const [searchInput, setSearchInput] = useState('');

  const handleOpenProject = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();

    const projectBtn = ev.currentTarget;

    if (!projectBtn.dataset.projectId) {
      console.error(`Unable to open project: project id required`);
      return;
    }

    const projectId = parseInt(projectBtn.dataset.projectId);

    if (isNaN(projectId)) {
      console.error(
        `Unable to open project: malformed id - ${projectBtn.dataset.projectId}`
      );
      return;
    }

    Projects.open(projectId);
  };

  const filterData = (value: string) => {
    const lowerCaseValue = value.toLowerCase().trim();
    if (!lowerCaseValue) {
      return projectList;
    } else {
      const filteredData = projectList.filter((item: string) => {
        return (Object.keys(item) as (keyof typeof item)[]).some(key => {
          if (item[key] !== null) {
            return item[key].toString().toLowerCase().includes(lowerCaseValue);
          }
        });
      });
      setFilteredResults(filteredData);
    }
  };

  const searchItems = (searchValue: string) => {
    setSearchInput(searchValue);

    if (searchValue !== '') {
      filterData(searchValue);
    }
  };

  const convertProjectList = (): TableRowItem[] => {
    const convertedProjectList = projectList.map((project: any) => {
      return <button onClick={handleOpenProject}>{project.name}</button>;
    });

    return convertedProjectList;
  };

  console.log('convertProjectList', convertProjectList());

  const projectsData: TableData = {
    caption: 'Table 1. List of The Office characters.',
    columns: [
      {
        label: '#',
        field: 'id',
      },
      {
        label: 'Project Name',
        field: 'name',
      },
      {
        label: 'Created At',
        field: 'created_at',
      },
      {
        label: 'Last Modified At',
        field: 'updated_at',
      },
    ],
    items: searchInput.length < 1 ? projectList : filteredResults,
  };

  return (
    <>
      <AppInput
        searchItems={searchItems}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <hr />
      <Table projectsData={projectsData} />
    </>
  );
};

export const ProjectExplorerModal = () => {
  const showModalExplorer = useExplorer();
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    if (!showModalExplorer) {
      setProjectList([]);
      return;
    }
    Projects.list().then(results => {
      if (results.error) {
        console.error(results);
        return;
      }

      setProjectList(results.data.projects);
    });
  }, [showModalExplorer]);

  const modalContent: ModalDefaultProps = {
    header: {
      bsProps: {
        closeButton: true,
        closeLabel: 'Close',
      },
      content: <></>,
    },
    body: {
      content: <ProjectExplorerBody projectList={projectList} />,
    },
  };

  const { header, body, footer } = modalContent;
  console.log('projectList from project explorer', projectList);

  return (
    <Modal
      show={showModalExplorer}
      onHide={closeExplorer}
      header={header}
      body={body}
      footer={footer}
    />
  );
};

export default {
  ProjectExplorerModal,
};

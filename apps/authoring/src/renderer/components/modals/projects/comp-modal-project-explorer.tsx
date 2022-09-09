import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalDefaultProps,
  Table,
  TableData,
  TableRowItem,
  Input,
  TextInputProps,
} from '@owlui/lib';
import { Projects } from '../../../models';

const ProjectExplorerBody = ({ projectList }: ModalDefaultProps) => {
  const [filteredResults, setFilteredResults] = useState<TableRowItem[]>([]);
  const [searchInput, setSearchInput] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const projectsData: TableData = {
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
  const searchInputOpts: TextInputProps = {
    label: {
      content: 'Project Search',
      htmlFor: 'text',
    },
    control: {
      id: 'text',
      type: 'text',
      disabled: false,
      readOnly: false,
      plaintext: false,
      placeholder: 'e.g. Safety Training',
      value: searchInput,
      onChange: e => searchItems((e.target as HTMLInputElement).value),
    },
  };

  return (
    <>
      <Input inputProps={searchInputOpts} />
      <hr />
      <Table tableData={projectsData} />
    </>
  );
};

export const ModalProjectExplorer = () => {
  const showModalExplorer = Projects.useExplorer();
  const [projectList, setProjectList] = useState([]);
  const header = {
    bsProps: {
      closeButton: true,
      closeLabel: 'Close',
    },
    content: <></>,
  };
  const body = {
    content: <ProjectExplorerBody projectList={projectList} />,
  };

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

  return (
    <Modal
      show={showModalExplorer}
      onHide={Projects.closeExplorer}
      header={header}
      body={body}
    />
  );
};

export default {
  ModalProjectExplorer,
};

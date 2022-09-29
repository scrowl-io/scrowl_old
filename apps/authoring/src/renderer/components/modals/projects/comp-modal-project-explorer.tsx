/* eslint-disable import/named */
import React, { useEffect, useState } from 'react';
import {
  Modal,
  Table,
  TableData,
  Input,
  TextInputProps,
  Button,
} from '@owlui/lib';
import { Projects } from '../../../models';

export type ProjectExplorerBodyProps = {
  show: boolean;
};

export type ProjectExplorerTableItem = {
  id?: string;
  name?: string;
  link?: JSX.Element;
  created_at?: string;
  updated_at?: string;
};

const ProjectExplorerBody = ({ show }: ProjectExplorerBodyProps) => {
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
  const [sourceItems, setSourceItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const searchItems = (searchValue: string) => {
    setSearchInput(searchValue);

    if (searchValue === '') {
      setFilteredItems(sourceItems);
      return;
    }

    const searchedItems = sourceItems.filter(
      (item: ProjectExplorerTableItem) => {
        const lookup = item.name ? item.name.toLowerCase() : '';

        return lookup.includes(searchValue.toLowerCase());
      }
    );

    setFilteredItems(searchedItems);
  };
  const projectsData: TableData = {
    columns: [
      {
        label: 'Project Name',
        field: 'link',
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
    items: filteredItems,
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

  useEffect(() => {
    if (!show) {
      return;
    }

    Projects.list().then(results => {
      if (results.error) {
        console.error(results);
        return;
      }

      const items = results.data.projects.map(
        (project: Projects.ProjectData): ProjectExplorerTableItem => {
          return {
            id: project.id,
            name: project.name,
            link: (
              <Button
                variant="link"
                size="sm"
                data-project-id={project.id}
                onClick={handleOpenProject}
              >
                {project.name}
              </Button>
            ),
            created_at: project.created_at,
            updated_at: project.updated_at,
          };
        }
      );

      setSourceItems(items);
      setFilteredItems(items);
    });
  }, [show]);

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
  const header = {
    bsProps: {
      closeButton: true,
      closeLabel: 'Close',
    },
    content: <>Open Recent...</>,
  };
  const body = {
    content: <ProjectExplorerBody show={showModalExplorer} />,
  };

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

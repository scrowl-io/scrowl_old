import React, { useEffect, useState } from 'react';
import * as styles from './page-home.module.scss';
import { PageNavItems } from './page-home-routes';
import { NavigationBar } from '../../components/navigationbar';
import { Project, ProjectData } from '../../models';
import { ModalOutline } from '../../components/modal/index';
import {
  Table,
  TableDefaultProps,
  TableData,
  TableRowItem,
  ModalDefaultProps,
  Input,
  InputProps,
} from '@owlui/lib';
const project = new Project();

export const PageElement = () => {
  project.ready();
  console.log('project model', project);
  const [recentProjects, setProjectList] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const isProcessing = project.useProcessing();
  const projectModelData = project.useData();

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  useEffect(() => {
    project.list(10).then(res => {
      if (res.err) {
        console.warn(res);
        return;
      }

      /*
      Create a project, see a log message
      After project is created, shut down app and restart
      Then you'll have console log of recent projects, coming from UE
      Get UI into home page screen - then we can add interactivity
      */

      setProjectList(res.data.projects);
      console.log('recentProjects', res.data.projects);
    });
  }, []);

  // const handleFilterResults = (searchValue: string) => {
  //   setSearchInput(searchValue);
  //   const filteredData = recentProjects.filter(item => {
  //     return Object.values(item)
  //       .join('')
  //       .toLowerCase()
  //       .includes(searchInput.toLowerCase());
  //   });
  //   setFilteredResults(filteredData);
  // };

  const searchItems = (searchValue: string) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const filteredData = recentProjects.filter(item => {
        return Object.values(item)
          .join('')
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
      console.log('Form input', searchValue);
    } else {
      setFilteredResults(recentProjects);
    }
  };

  const recentProjectTableItems = (): TableRowItem[] => {
    const projectTableItem: TableRowItem = {};
    const projectItems: TableRowItem[] = recentProjects.map(
      (project): TableRowItem => {
        const { name, created_at, updated_at } = project;

        projectTableItem.projectName = name;
        projectTableItem.createdAt = created_at;
        projectTableItem.lastModifiedAt = updated_at;

        return projectTableItem;
      }
    );

    return projectItems;
  };

  const inputProps: InputProps = {
    label: {
      content: 'Project Name',
      htmlFor: 'input',
    },
    control: {
      id: 'text',
      type: 'text',
      disabled: false,
      readOnly: false,
      plaintext: false,
      placeholder: 'e.g. Safety',
    },
  };

  const projectsData: TableData = {
    caption: 'Table 1. List of The Office characters.',
    columns: [
      {
        label: '#',
        field: 'id',
      },
      {
        label: 'Project Name',
        field: 'projectName',
      },
      {
        label: 'Created At',
        field: 'createdAt',
      },
      {
        label: 'Last Modified At',
        field: 'lastModifiedAt',
      },
    ],
    items: recentProjectTableItems(),
    // items: [
    //   {
    //     id: 1,
    //     projectName: 'Michael',
    //     createdAt: 'Scott',
    //     lastModifiedAt: 'mscott',
    //   },
    //   {
    //     id: 2,
    //     projectName: 'Oscar',
    //     createdAt: 'Martinez',
    //     lastModifiedAt: 'omartinez',
    //   },
    //   {
    //     id: 3,
    //     projectName: 'Meredith',
    //     createdAt: 'Palmer',
    //     lastModifiedAt: 'mpalmer',
    //   },
    // ],
  };

  console.log('test project table', recentProjectTableItems());

  const handleOpenModal = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
  };

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

    project.open(projectId);
  };

  console.log(projectModelData);

  const testProps = {
    header: {
      content: 'Test Header',
    },
    body: {
      content: 'Test Body',
    },
    footer: {
      content: 'Test Footer',
    },
  };

  const modalContent: ModalDefaultProps = {
    header: {
      bsProps: {
        closeButton: true,
        closeLabel: 'Close',
      },
      content: <h2>Modal Header</h2>,
    },
    body: {
      content: (
        <>
          <h6>Inside the modal body</h6>
          <hr />
          <p>Example of text inside the modal body.</p>
        </>
      ),
    },
    footer: {
      content: (
        <>
          <button>Save Changes</button>
        </>
      ),
    },
  };

  return (
    <>
      <NavigationBar pages={PageNavItems} />
      <main className={styles.main}>
        <div>{isProcessing ? <div>WORKING ON IT</div> : ''}</div>
        <h1>Home Page</h1>
        {/* <ModalOutline modalContent={modalContent} /> */}
        <div style={{ padding: '1rem' }}>
          <Input
            onChange={event =>
              searchItems((event.target as HTMLInputElement).value)
            }
            inputProps={inputProps}
          />
          <Table tableData={projectsData} />
        </div>

        <button onClick={toggleModal}>TEST MODAL</button>
        {recentProjects.length > 0 && (
          <>
            <h3>Recent Projects:</h3>
            <div>
              {recentProjects.map((project: ProjectData, index) => (
                <button
                  key={index}
                  onClick={handleOpenProject}
                  data-project-id={project.id}
                >
                  {project.name}
                </button>
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default {
  PageElement,
};

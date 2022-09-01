import React, { useEffect, useState } from 'react';
import * as styles from './page-home.module.scss';
import { PageNavItems } from './page-home-routes';
import { NavigationBar } from '../../components/navigationbar';
// import { Project } from '../../models/project/model-project';
import { Preferences, Projects } from '../../models';
import { ProjectData } from '../../../main/models/projects';
import { ModalOutline } from '../../components/modal/index';
import { Logo } from '../../components/logo/comp-logo';
import { RecentProjects, Start, Tutorials } from './elements';
import {
  Table,
  TableDefaultProps,
  TableData,
  TableRowItem,
  ModalDefaultProps,
  Input,
  TextInputProps,
  TextInputDefaultProps,
} from '@owlui/lib';
// const project = new Project();

// export const PageElement = () => {
//   project.ready();
//   console.log('project model', project);
//   const [recentProjects, setProjectList] = useState([]);
//   const [filteredResults, setFilteredResults] = useState([]);
//   const [searchInput, setSearchInput] = useState('');

//   const isProcessing = project.useProcessing();
//   const projectModelData = project.useData();

export const PageElement = () => {
  const [projectList, setProjectList] = useState([]);
  const [hasProjects, setHasProjects] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  useEffect(() => {
    Projects.list().then(results => {
      if (results.error) {
        console.error(results);
        return;
      }

      setProjectList(results.data.projects);
      const hasProjects = results.data.projects.length > 0;
      setHasProjects(hasProjects);
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
      const filteredData = projectList.filter(item => {
        return Object.values(item)
          .join('')
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
      console.log('Form input', searchValue);
    } else {
      setFilteredResults(projectList);
    }
  };

  const recentProjectTableItems = (): TableRowItem[] => {
    const projectTableItem: TableRowItem = {};
    const projectItems: TableRowItem[] = projectList.map(
      (project: any): TableRowItem => {
        const { name, created_at, updated_at } = project;

        projectTableItem.projectName = name;
        projectTableItem.createdAt = created_at;
        projectTableItem.lastModifiedAt = updated_at;

        return projectTableItem;
      }
    );

    return projectItems;
  };

  const inputProps: TextInputProps = {
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

    // project.open(projectId);
  };

  // console.log(projectModelData);

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
    <main className={styles.main}>
      <div className="section-title-wrap">
        <Logo />
        <h1 className="section-title">Scrowl Authoring</h1>
      </div>

      <div className="section-row">
        <Start hasProjects={hasProjects} />
        <Tutorials />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <RecentProjects hasProjects={hasProjects} projectList={projectList} />
      </div>
    </main>
  );
};

export default {
  PageElement,
};

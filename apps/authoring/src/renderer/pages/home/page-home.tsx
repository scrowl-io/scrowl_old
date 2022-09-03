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
import { ProjectExplorerModal } from '../../components/projectExplorerModal/index';
import { TitleBar, AppInput, Table } from '../../components/app/elements';

import {
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
  const [recentProjectList, setRecentProjectList] = useState([]);
  const [hasProjects, setHasProjects] = useState(false);
  const [tableList, setTableList] = useState<TableRowItem[]>([]);
  const [filteredResults, setFilteredResults] = useState<TableRowItem[]>([]);
  const [searchInput, setSearchInput] = useState('');

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  const recentProjectTableItems = (): TableRowItem[] => {
    const projectItems: TableRowItem[] = projectList.map(
      (project: any): TableRowItem => {
        const { name, created_at, updated_at } = project;
        const projectTableItem: TableRowItem = {};
        projectTableItem.projectName = name;
        projectTableItem.createdAt = created_at;
        projectTableItem.lastModifiedAt = updated_at;

        return projectTableItem;
      }
    );
    console.log('projectItems', projectItems);
    return projectItems;
  };

  useEffect(() => {
    Projects.listRecent().then(results => {
      if (results.error) {
        console.error(results);
        return;
      }

      setRecentProjectList(results.data.projects);

      const hasProjects = results.data.projects.length > 0;
      setHasProjects(hasProjects);
    });
  }, []);

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

  console.log('projectList', projectList);

  const searchItems = (searchValue: string) => {
    setSearchInput(searchValue);
    // const testArr: TableRowItem[] = [];
    // projectList.forEach((p: any) => {
    //   testArr.push(p.name);
    // });

    // console.log('testArr', testArr);
    // if (searchInput !== '') {
    // const filteredData = projectList.filter((f: any) =>
    //   Object.values(f)
    //     .join('')
    //     .toLowerCase()
    //     .includes(searchInput.toLowerCase())
    // );

    // const filteredData = projectList.filter((project: any) => {
    // project.name.includes(searchInput) || searchInput === '';
    // });
    if (searchValue !== '') {
      filterData(searchValue);
    }

    // console.log('filteredData', filteredData);

    // .map(f => f);
    //const filteredData = projectList.filter((item: TableRowItem) => {
    // console.log('item', Object.values(item).join('').toLowerCase());
    // return Object.values(item)
    //   .join('')
    //   .toLowerCase()
    //   .includes(searchInput.toLowerCase());

    //});

    // const filteredData = testArr.filter((word: any) => {
    //   word.includes(searchInput || searchInput === '');
    // });

    // setProjectList(filteredData);
    // } else {
    // setProjectList(projectList);
    // }
  };;

  const filterData = (value: string) => {
    const lowerCaseValue = value.toLowerCase().trim();
    if (!lowerCaseValue) {
      return projectList;
    } else {
      const filteredData = projectList.filter((item: any) => {
        return Object.keys(item).some(key => {
          console.log('icecream', typeof item[key]);
          if (item[key] !== null) {
            return item[key].toString().toLowerCase().includes(lowerCaseValue);
          }
        });
      });
      setFilteredResults(filteredData);
    }
  };

  console.log('Form input', filteredResults);

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
    // items: projectList,
  };

  console.log('searchInput.length', searchInput.length);

  console.log('After Filter', projectList);
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
          <AppInput
            searchItems={searchItems}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
          <hr />
          <Table projectsData={projectsData} />
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

  const { header, body, footer } = modalContent;
  console.log('projectList', recentProjectList);

  return (
    <main className={styles.main}>
      <ProjectExplorerModal header={header} body={body} footer={footer} />
      <div className="section-title-wrap">
        <Logo />
        <h1 className="section-title">Scrowl Authoring</h1>
      </div>

      <div className="section-row">
        <Start hasProjects={hasProjects} />
        <Tutorials />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <RecentProjects
          hasProjects={hasProjects}
          recentProjectList={recentProjectList}
        />
      </div>
    </main>
  );
};

export default {
  PageElement,
};

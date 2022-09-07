import React, { useEffect, useState } from 'react';
import {
  MemoryRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import * as styles from './styles/comp-app.module.scss';
import { AppMainProps } from './comp-app.types';
import { pageRoutes } from './comp-app-routes';
import { TitleBar, AppInput, Table } from './elements';
import { Menu } from '../../services';
import { Home, PageNavProps } from '../../pages';
import { Preferences, Projects } from '../../models';
import { ProjectExplorerModal } from '../projectExplorerModal/index';

// import { ModalDefaultProps, TextInputProps } from '@owlui/lib';

import {
  TableDefaultProps,
  TableData,
  TableRowItem,
  ModalDefaultProps,
} from '@owlui/lib';

const routeList: PageNavProps = [];

const AppRoutes = () => {
  const pageRouteElements = pageRoutes.map((page, index) => {
    routeList.push(page.PageRoutes.base);
    return (
      <Route
        key={index}
        path={`${page.PageRoutes.base.url}`}
        element={<page.PageElement></page.PageElement>}
      />
    );
  });

  return (
    <Routes>
      {pageRouteElements}
      <Route path="/" element={<Home.PageElement />} />
    </Routes>
  );
};

const Main = (props: AppMainProps) => {
  const [filteredResults, setFilteredResults] = useState<TableRowItem[]>([]);
  const [searchInput, setSearchInput] = useState('');

  const navigate = useNavigate();

  // const { projectList } = props;
  console.log('projectList from main app', props);

  Projects.useOpen();
  Projects.useMenuEvents();

  useEffect(() => {
    Menu.File.onPreferencesOpen(() => {
      navigate('/settings/theme');
    });

    Menu.File.onGetStarted(() => {
      navigate('/home');
    });

    return () => {
      Menu.File.offGetStarted();
      Menu.File.offPreferencesOpen();
    };
  }, [navigate]);

  // const filterData = (value: string) => {
  //   const lowerCaseValue = value.toLowerCase().trim();
  //   if (!lowerCaseValue) {
  //     return projectList;
  //   } else {
  //     const filteredData = projectList.filter(item => {
  //       return (Object.keys(item) as (keyof typeof item)[]).some(key => {
  //         if (item[key] !== null) {
  //           return item[key].toString().toLowerCase().includes(lowerCaseValue);
  //         }
  //       });
  //     });
  //     setFilteredResults(filteredData);
  //   }
  // };

  // const searchItems = (searchValue: string) => {
  //   setSearchInput(searchValue);

  //   if (searchValue !== '') {
  //     filterData(searchValue);
  //   }
  // };

  // const projectsData: TableData = {
  //   caption: 'Table 1. List of The Office characters.',
  //   columns: [
  //     {
  //       label: '#',
  //       field: 'id',
  //     },
  //     {
  //       label: 'Project Name',
  //       field: 'name',
  //     },
  //     {
  //       label: 'Created At',
  //       field: 'created_at',
  //     },
  //     {
  //       label: 'Last Modified At',
  //       field: 'updated_at',
  //     },
  //   ],
  //   items: searchInput.length < 1 ? projectList : filteredResults,
  // };

  // const modalContent: ModalDefaultProps = {
  //   header: {
  //     bsProps: {
  //       closeButton: true,
  //       closeLabel: 'Close',
  //     },
  //     content: <h2>SCROWL Project Search</h2>,
  //   },
  //   body: {
  //     content: (
  //       <>
  //         <AppInput
  //           searchItems={searchItems}
  //           searchInput={searchInput}
  //           setSearchInput={setSearchInput}
  //         />
  //         <hr />
  //         <Table projectsData={projectsData} />
  //       </>
  //     ),
  //   },
  // };

  // const { header, body, footer } = modalContent;

  return (
    <div {...props}>
      <TitleBar routes={routeList} />
      <div className={styles.content}>
        <AppRoutes />
      </div>
      <ProjectExplorerModal />
    </div>
  );
};

export const Loader = () => {
  return <div>Loading...</div>;
};

export const App = () => {
  const preference = Preferences.useData();
  const prefInit = Preferences.useInit();
  const projectInit = Projects.useInit();
  const [appTheme, setAppTheme] = useState('');
  const [appInit, setAppInit] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    let ready = false;
    const initializations = [Menu.Global.init()];

    Promise.allSettled(initializations).then(() => {
      if (ready) {
        return;
      }

      setAppInit(true);

      if (appInit && prefInit && projectInit) {
        setAppTheme(`theme--${preference.theme}`);
        setAppReady(true);
      }

      return () => {
        ready = true;
      };
    });
  }, [appInit, appTheme, preference, prefInit, projectInit]);

  return (
    <Router>{appReady ? <Main className={appTheme} /> : <Loader />}</Router>
  );
};

export default {
  App,
};

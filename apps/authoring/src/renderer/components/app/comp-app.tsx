import React from 'react';
import {
  MemoryRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import * as styles from './styles/comp-app.module.scss';
import { pageRoutes } from './comp-app-routes';
import { Home, PageNavProps } from '../../pages';

const routeList: PageNavProps = [];

const createRouting = () => {
  return pageRoutes.map((page, index) => {
    routeList.push(page.PageRoutes.base);
    return (
      <Route
        key={index}
        path={`${page.PageRoutes.base.url}`}
        element={page.PageElement()}
      />
    );
  });
};

export const App = () => {
  const appRoutes = createRouting();
  // const [titlesList, setTitlesList] = useState(appRoutes.pages);

  // const handleTitleChange = (pages: PageNav) => {
  //   const newTitles = [...titlesList];

  //   pages.map(page => {
  //     if (!newTitles.some(title => title.PageName === page.label)) {
  //       newTitles.push({ PageName: page.label, PageRoute: page.link });
  //     }
  //   });

  //   setTitlesList(newTitles);
  // };

  return (
    <Router>
      <div className={styles.content}>
        <Routes>
          {appRoutes}
          <Route
            path="*"
            element={<Navigate to={Home.PageRoutes.base.url} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default {
  App,
};

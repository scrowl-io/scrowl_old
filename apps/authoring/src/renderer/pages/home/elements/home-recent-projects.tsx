import React, { useEffect, useState } from 'react';
import { Projects } from '../../../models';

export const RecentProjects = () => {
  const [recentProjects, setRecentProjects] = useState([]);

  useEffect(() => {
    Projects.list().then(results => {
      if (results.error) {
        console.error(results);
        return;
      }

      setRecentProjects(results.data.projects);
    });
  }, []);

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

  return (
    <div>
      {recentProjects.length === 0 ? (
        <></>
      ) : (
        <>
          <h2 className="section-title">Recent</h2>
          <ul>
            {recentProjects.map(
              (project: Projects.ProjectData, index: number) => (
                <button
                  className="section-link"
                  key={index}
                  onClick={handleOpenProject}
                  data-project-id={project.id}
                >
                  {project.name}
                </button>
              )
            )}
            <div style={{ marginTop: '2rem' }}>
              <button className="section-link">More...</button>
            </div>
          </ul>
        </>
      )}
    </div>
  );
};

export default {
  RecentProjects,
};

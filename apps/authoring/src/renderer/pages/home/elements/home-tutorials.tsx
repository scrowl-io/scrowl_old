import React from 'react';

export const Tutorials = () => {
  const handleCreateProject = () => {
    // TODO: add support for creating a project from a template
  };

  return (
    <div>
      <h2 className="section-title">Getting Started</h2>
      <ul>
        <li>
          <button className="section-link" onClick={handleCreateProject}>
            Beginner Tutorial Project...
          </button>
        </li>
      </ul>
    </div>
  );
};

export default {
  Tutorials,
};

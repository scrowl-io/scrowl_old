import React from 'react';
import { Nav } from 'react-bootstrap';
import { Icon, Button } from '@owlui/lib';

export const Tutorials = () => {
  const handleCreateProject = () => {
    // TODO: add support for creating a project from a template
  };

  return (
    <>
      <h2>Getting Started</h2>
      <Nav className="flex-column">
        <Nav.Item>
          <Button variant="link" onClick={handleCreateProject}>
            <Icon display="outlined" filled icon="assistant" />
            Beginner Tutorial Project...
          </Button>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default {
  Tutorials,
};

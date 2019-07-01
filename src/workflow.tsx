import * as React from 'react';
import greet from './greet/greet';

interface WorkflowProps {
  name: string;
}

const Workflow: React.FunctionComponent<WorkflowProps> = ({ name }) => (
  <div data-testid="workflow">{greet(name)}</div>
);

export default Workflow;

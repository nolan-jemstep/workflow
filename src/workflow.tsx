import * as React from 'react';
import greet from './greet/greet';

interface WorkflowProps {
  name: string;
}

const Workflow: React.SFC<WorkflowProps> = ({
  name,
}: WorkflowProps): JSX.Element => (
  <div data-testid="workflow">{greet(name)}</div>
);

export default Workflow;

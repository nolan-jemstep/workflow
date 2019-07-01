import * as React from 'react';

interface WorkflowProps {
  name: string;
}

const Workflow: React.SFC<WorkflowProps> = ({
  name,
}: WorkflowProps): JSX.Element => <div>{`hello ${name}`}</div>;

export default Workflow;

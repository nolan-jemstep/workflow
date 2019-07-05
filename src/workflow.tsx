import * as React from 'react';

interface WorkflowProps {
  items: React.ReactNode[];
}

const Workflow: React.FunctionComponent<WorkflowProps> = ({ items }) => {
  const [head] = items;
  const [current, setCurrent] = React.useState(head);

  const next = (): void => {
    const nextItemIndex = (items.indexOf(current) + 1) % items.length;
    setCurrent(items[nextItemIndex]);
  };

  const previous = (): void => {
    const previousItemIndex = items.indexOf(current) - 1;
    setCurrent(
      items[previousItemIndex >= 0 ? previousItemIndex : items.length - 1]
    );
  };

  return (
    <>
      <button onClick={previous}>previous</button>
      {current}
      <button onClick={next}>next</button>
    </>
  );
};

export default Workflow;

import * as React from 'react';

export enum button {
  next = 'next',
  previous = 'previous',
}

export interface WorkflowItem {
  id: string;
  next?: string;
  previous?: string;
  render: React.ReactNode;
}

interface WorkflowProps {
  initial?: string;
  items: WorkflowItem[];
}

const Workflow: React.FunctionComponent<WorkflowProps> = ({
  initial,
  items,
}) => {
  const [head, ...tail] = items;
  const activeItem = tail.find(i => i.id === initial) || head;
  const [current, setCurrent] = React.useState<WorkflowItem>(activeItem);
  const [history, setHistory] = React.useState<WorkflowItem[]>([]);

  const next = (): void => {
    // cast as WorkflowItem since the disabled prop on the next button protects this from being undefined
    const next = items.find(i => i.id === current.next) as WorkflowItem;
    setHistory([...history, current]);
    setCurrent({ ...next, previous: current.id });
  };

  const previous = (): void => {
    // cast as WorkflowItem since the disabled prop on the previous button protects this from being undefined
    const previous = history.pop() as WorkflowItem;
    setCurrent(previous);
  };

  return (
    <>
      {current.render}
      <div>
        <button onClick={previous} disabled={current.previous === undefined}>
          {button.previous}
        </button>
        <button onClick={next} disabled={current.next === undefined}>
          {button.next}
        </button>
      </div>
    </>
  );
};

export default Workflow;

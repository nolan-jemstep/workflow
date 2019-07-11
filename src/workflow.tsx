import * as React from 'react';

export enum Labels {
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
  /** the item that should be displayed when the workflow is rendered */
  initial?: string;
  /** the items that the workflow traverses over */
  items: readonly WorkflowItem[];
}

// construct the path required to get up to, and including, the current item.
export const buildHistory = (
  // the current item in the workflow
  current: WorkflowItem,
  // items the items in the workflow
  items: WorkflowItem[]
): WorkflowItem[] => {
  const go = (a: WorkflowItem, as: WorkflowItem[]): WorkflowItem[] => {
    const p = as.find(i => i.next === a.id);
    if (typeof p === 'undefined') {
      return [a];
    }
    return [...go(p, as), { ...a, previous: p.id }];
  };

  return go(current, items);
};

const initializeWorkflow = ({
  initial,
  items,
}: WorkflowProps): [WorkflowItem, WorkflowItem[]] => {
  const [head, ...tail] = items;
  const active = tail.find(i => i.id === initial) || head;
  const h = buildHistory(active, [...items]);
  const c = h.pop() as WorkflowItem;
  return [c, h];
};

const Workflow: React.FunctionComponent<WorkflowProps> = ({
  initial,
  items,
}) => {
  const [c, h] = initializeWorkflow({ initial, items });
  const [history, setHistory] = React.useState<WorkflowItem[]>(h);
  const [current, setCurrent] = React.useState<WorkflowItem>(c);

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
          {Labels.previous}
        </button>
        <button onClick={next} disabled={current.next === undefined}>
          {Labels.next}
        </button>
      </div>
    </>
  );
};

export default Workflow;

import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import 'jest-dom/extend-expect';
import Workflow, { buildHistory, WorkflowItem, Labels } from './workflow';

const workflowItemFactory = (id: string, next?: string): WorkflowItem => ({
  id,
  next,
  render: id,
});

const items: readonly WorkflowItem[] = [
  workflowItemFactory('one', 'two'),
  workflowItemFactory('two', 'three'),
  workflowItemFactory('three'),
];

const workflowFactory = (initial?: string) =>
  render(<Workflow initial={initial} items={items} />);

describe('<Workflow />', () => {
  afterEach(cleanup);

  it('should display the initial item', () => {
    const { getByText } = workflowFactory('two');
    expect(getByText('two')).toBeInTheDocument();
  });

  it('should display the first item if the initial item is not specified', () => {
    const { getByText } = workflowFactory();
    expect(getByText('one')).toBeInTheDocument();
  });

  it('should display the next item when the next button is clicked', () => {
    const { getByText } = workflowFactory();
    expect(getByText('one')).toBeInTheDocument();
    fireEvent.click(getByText(Labels.next));
    expect(getByText('two')).toBeInTheDocument();
  });

  it('should disable the next button if the next field is not set', () => {
    const { getByText } = workflowFactory('three');
    expect(getByText('three')).toBeInTheDocument();
    expect(getByText(Labels.next)).toHaveAttribute('disabled');
  });

  it('should display the previous item when the previous button is clicked', () => {
    const { getByText } = workflowFactory();
    expect(getByText('one')).toBeInTheDocument();
    fireEvent.click(getByText(Labels.next));
    expect(getByText('two')).toBeInTheDocument();
    fireEvent.click(getByText(Labels.previous));
    expect(getByText('one')).toBeInTheDocument();
  });

  it('should disable the previous button if the previous field is not set', () => {
    const { getByText } = workflowFactory();
    fireEvent.click(getByText(Labels.previous));
    expect(getByText('one')).toBeInTheDocument();
    expect(getByText(Labels.previous)).toHaveAttribute('disabled');
  });

  it('should keep a history of previous items', () => {
    const { getByText } = workflowFactory();

    const traverseWorkflow = (
      [head, ...tail]: WorkflowItem[],
      action: Labels.next | Labels.previous
    ): void => {
      expect(getByText(head.id)).toBeInTheDocument();
      fireEvent.click(getByText(action));
      if (tail.length > 0) {
        traverseWorkflow(tail, action);
      }
    };

    // traverse the workflow in the forward direction to build up a history
    traverseWorkflow([...items], Labels.next);
    expect(getByText(Labels.next)).toHaveAttribute('disabled');
    traverseWorkflow([...items].reverse(), Labels.previous);
    expect(getByText(Labels.previous)).toHaveAttribute('disabled');
  });
});

describe('buildHistory', () => {
  it('should contain all items leading up to, and including, the current item', () => {
    const [firstItem, secondItem, thirdItem] = items;
    expect(buildHistory(secondItem, [...items])).toStrictEqual([
      firstItem,
      { ...secondItem, previous: 'one' },
    ]);
    expect(buildHistory(thirdItem, [...items])).toStrictEqual([
      firstItem,
      { ...secondItem, previous: 'one' },
      { ...thirdItem, previous: 'two' },
    ]);
  });
});

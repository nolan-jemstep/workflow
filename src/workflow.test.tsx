import React from 'react';
import { cleanup, render } from '@testing-library/react';
import 'jest-dom/extend-expect';
import Workflow, { WorkflowItem, button } from './workflow';

describe('<Workflow />', () => {
  afterEach(cleanup);

  const workflowItemFactory = (id: string, next?: string): WorkflowItem => ({
    id,
    next,
    render: id,
  });

  const items = [
    workflowItemFactory('one', 'two'),
    workflowItemFactory('two', 'three'),
    workflowItemFactory('three'),
  ];

  it('should display the initial item', () => {
    const { getByText } = render(<Workflow initial="two" items={items} />);
    expect(getByText('two')).toBeInTheDocument();
  });

  it('should display the first item if the initial item is not specified', () => {
    const { getByText } = render(<Workflow items={items} />);
    expect(getByText('one')).toBeInTheDocument();
  });

  it('should display the next item when the next button is clicked', () => {
    const { getByText } = render(<Workflow items={items} />);
    expect(getByText('one')).toBeInTheDocument();
    getByText(button.next).click();
    expect(getByText('two')).toBeInTheDocument();
  });

  it('should disable the next button if the next field is not set', () => {
    const { getByText } = render(<Workflow items={items} initial="three" />);
    expect(getByText('three')).toBeInTheDocument();
    expect(getByText(button.next)).toHaveAttribute('disabled');
  });

  it('should display the previous item when the previous button is clicked', () => {
    const { getByText } = render(<Workflow items={items} />);
    expect(getByText('one')).toBeInTheDocument();
    getByText(button.next).click();
    expect(getByText('two')).toBeInTheDocument();
    getByText(button.previous).click();
    expect(getByText('one')).toBeInTheDocument();
  });

  it('should disable the previous button if the previous field is not set', () => {
    const { getByText } = render(<Workflow items={items} />);
    getByText(button.previous).click();
    expect(getByText('one')).toBeInTheDocument();
    expect(getByText(button.previous)).toHaveAttribute('disabled');
  });

  it('should keep a history of previous items', () => {
    const { getByText } = render(<Workflow items={items} />);

    const traverseWorkflow = (
      [head, ...tail]: WorkflowItem[],
      action: button.next | button.previous
    ): void => {
      expect(getByText(head.id)).toBeInTheDocument();
      getByText(action).click();
      if (tail.length > 0) {
        traverseWorkflow(tail, action);
      }
    };

    // traverse the workflow in the forward direction to build up a history
    traverseWorkflow(items, button.next);
    expect(getByText(button.next)).toHaveAttribute('disabled');
    traverseWorkflow(items.reverse(), button.previous);
    expect(getByText(button.previous)).toHaveAttribute('disabled');
  });

  // TODO - test whether you can click previous when starting from an arbitrary workflow item
});

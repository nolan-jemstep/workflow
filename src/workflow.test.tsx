import React from 'react';
import { cleanup, render } from '@testing-library/react';
import 'jest-dom/extend-expect';
import Workflow from './workflow';

describe('<Workflow />', () => {
  afterEach(cleanup);

  it('should display the first item', () => {
    const items = ['one', 'two'];
    const { getByText } = render(<Workflow items={items} />);
    expect(getByText('one')).toBeInTheDocument();
  });

  it('should display the next item when the next button is clicked', () => {
    const items = ['one', 'two'];
    const { getByText } = render(<Workflow items={items} />);
    expect(getByText('one')).toBeInTheDocument();
    getByText('next').click();
    expect(getByText('two')).toBeInTheDocument();
  });

  it('should wrap around to the first item when the next button is clicked and the last item is displayed', () => {
    const items = ['one', 'two'];
    const { getByText } = render(<Workflow items={items} />);
    expect(getByText('one')).toBeInTheDocument();
    getByText('next').click();
    expect(getByText('two')).toBeInTheDocument();
    getByText('next').click();
    expect(getByText('one')).toBeInTheDocument();
  });

  it('should display the previous item when the previous button is clicked', () => {
    const items = ['one', 'two'];
    const { getByText } = render(<Workflow items={items} />);
    expect(getByText('one')).toBeInTheDocument();
    getByText('next').click();
    expect(getByText('two')).toBeInTheDocument();
    getByText('previous').click();
    expect(getByText('one')).toBeInTheDocument();
  });

  it('should wrap around to the last item when the previous button is clicked and the first item is displayed', () => {
    const items = ['one', 'two'];
    const { getByText } = render(<Workflow items={items} />);
    expect(getByText('one')).toBeInTheDocument();
    getByText('previous').click();
    expect(getByText('two')).toBeInTheDocument();
  });
});

import React from 'react';
import { cleanup, render } from '@testing-library/react';
import 'jest-dom/extend-expect';
import Workflow from './workflow';

describe('<Workflow />', () => {
  afterEach(cleanup);

  it('should do the thing', () => {
    const { getByTestId } = render(<Workflow name="test" />);
    expect(getByTestId('workflow')).toHaveTextContent('hello test');
  });
});

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import Category from '../components/Category';

let getByTestId;

beforeEach(() => {
  ({ getByTestId } = render(<Category title={'Sports'} clues={[]} />));
});

afterEach(cleanup);

describe('Category', () => {
  it('should be a functional component', () => {
    expect(Category.prototype.render).toBeFalsy();
  });

  it('contains a category', () => {
    expect(getByTestId('category')).toBeVisible();
  });

  it('should render a category title', () => {
    expect(getByTestId('category')).toHaveTextContent('SPORTS');
  });
});

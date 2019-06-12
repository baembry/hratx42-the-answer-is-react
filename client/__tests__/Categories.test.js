import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import Categories from '../components/Categories';

let getByTestId;

beforeEach(() => {
  ({ getByTestId } = render(
    <Categories
      categories={[
        { clues: [], title: 'Sports' },
        { clues: [], title: 'Food' },
        { clues: [], title: 'Animals' }
      ]}
    />
  ));
});

afterEach(cleanup);

describe('categoryList', () => {
  it('should be a functional component', () => {
    expect(Categories.prototype.render).toBeFalsy();
  });

  it('contains a list of categories', () => {
    expect(getByTestId('categoryList')).toBeVisible();
  });
});

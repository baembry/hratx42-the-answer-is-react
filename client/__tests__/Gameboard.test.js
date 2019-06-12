import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import Gameboard from '../components/Gameboard';
import { categories } from '../../testdata';

const category_titles = categories.map(category => category.title.toUpperCase());

let getAllByTestId;

beforeEach(() => {
  //this destructures getByTestId and assigns it to the global getByTestId;
  ({ getAllByTestId } = render(
    <Gameboard
      categories={categories}
      selectQuestion={() => {}}
      currentQuestion={{}}
      answeredQuestions={[]}
    />
  ));
});

afterEach(cleanup);

describe('Gameboard', () => {
  it('should be a functional component', () => {
    expect(Gameboard.prototype.render).toBeFalsy();
  });

  it('should render all categories', () => {
    expect(getAllByTestId('category').length).toBe(categories.length);
  });

  it('should render the correct category titles', () => {
    category_titles.forEach((title, i) => {
      expect(getAllByTestId('categoryTitle')[i]).toHaveTextContent(title);
    });
  });
});

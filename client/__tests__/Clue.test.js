import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import Clue from '../components/Clue';

let getByTestId;

beforeEach(() => {
  ({ getByTestId } = render(
    <Clue
      selected={true}
      clueObject={{
        question: '2, 3 or this number means you rolled craps, so give up the dice already'
      }}
    />
  ));
  ({ getByTestId } = render(<Clue selected={false} clueObject={{ value: 200 }} />));
});

afterEach(cleanup);

describe('Clue', () => {
  it('should be a functional component', () => {
    expect(Clue.prototype.render).toBeFalsy();
  });

  it('contains a clue', () => {
    expect(getByTestId('clue')).toBeVisible();
  });

  it('should render a question when selected', () => {
    expect(getByTestId('clue')).toHaveTextContent(
      '2, 3 or this number means you rolled craps, so give up the dice already'
    );
  });

  it('should render a question value when not selected', () => {
    expect(getByTestId('value')).toHaveTextContent('200');
  });
});

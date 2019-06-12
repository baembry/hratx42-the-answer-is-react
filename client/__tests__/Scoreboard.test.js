import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import Scoreboard from '../components/Scoreboard';

let getByTestId;

beforeEach(() => {
  ({ getByTestId } = render(<Scoreboard score={100} />));
});

afterEach(cleanup);

describe('ScoreBoard', () => {
  it('should be a functional component', () => {
    expect(Scoreboard.prototype.render).toBeFalsy();
  });

  it('contains a scoreboard', () => {
    expect(getByTestId('scoreboard')).toBeVisible();
  });

  it('should render player score to a number greater than or equal to zero', () => {
    expect(getByTestId('scoreboard')).toHaveTextContent('$100');
  });
});

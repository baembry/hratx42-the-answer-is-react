import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import App from '../components/App';

let getByTestId;
let getAllByText;
let getByPlaceholderText;

beforeEach(() => {
  ({ getByTestId, getAllByText, getByPlaceholderText } = render(<App />));
});

afterEach(cleanup);

describe('Main app component', () => {
  it('should be a class component', () => {
    expect(App.prototype.render).toBeTruthy();
  });

  it('should render a gameboard component', () => {
    expect(getByTestId('gameboard')).toBeVisible();
  });

  it('should render a scoreboard component', () => {
    expect(getByTestId('scoreboard')).toBeVisible();
  });

  it('should render a response component', () => {
    expect(getByTestId('response')).toBeVisible();
  });

  it('should decrease score when answer is wrong', () => {
    const clues = getAllByText('$200');
    const input = getByPlaceholderText('Answers go here!');

    fireEvent.click(clues[0]);

    const window = getByTestId('clue');
    expect(window).toHaveTextContent(
      'In 1912 Heinrich Schliemann\'s grandson Paul claimed falsely that he had proof of finding this "lost continent"'
    );

    fireEvent.click(input);
    fireEvent.change(input, { target: { value: 'Atlantis' } });
    fireEvent.click(input);

    expect(input.value).toEqual('Atlantis');

    fireEvent.keyDown(input, { key: 'Enter', code: 13, charCode: 13 });
    expect(getByTestId('scoreboard')).toHaveTextContent('$200');
  });

  it('should increase score when answer is correct', () => {
    const clues = getAllByText('$200');
    const input = getByPlaceholderText('Answers go here!');

    fireEvent.click(clues[0]);

    const window = getByTestId('clue');
    expect(window).toHaveTextContent(
      'In 1912 Heinrich Schliemann\'s grandson Paul claimed falsely that he had proof of finding this "lost continent"'
    );

    fireEvent.click(input);
    fireEvent.change(input, { target: { value: 'Timbuktu' } });
    fireEvent.click(input);

    expect(input.value).toEqual('Timbuktu');

    fireEvent.keyDown(input, { key: 'Enter', code: 13, charCode: 13 });
    expect(getByTestId('scoreboard')).toHaveTextContent('$-200');
  });

  it('should flip clue to empty square after a response is submitted', () => {
    const clues = getAllByText('$200');
    const input = getByPlaceholderText('Answers go here!');

    fireEvent.click(clues[0]);

    const window = getByTestId('clue');
    expect(window).toHaveTextContent(
      'In 1912 Heinrich Schliemann\'s grandson Paul claimed falsely that he had proof of finding this "lost continent"'
    );

    fireEvent.keyDown(input, { key: 'Enter', code: 13, charCode: 13 });
    expect(getByTestId('answered')).toBeTruthy();
  });
});

import React from 'react';
import { render, getByPlaceholderText, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import Response from '../components/Response';

let getByTestId;

beforeEach(() => {
  ({ getByTestId } = render(<Response />));
});

afterEach(cleanup);

describe('Response', () => {
  it('should be a functional component', () => {
    expect(Response.prototype.render).toBeFalsy();
  });

  it('contains a response', () => {
    expect(getByTestId('response')).toBeVisible();
  });

  it('contains an input field with placeholder text', () => {
    const container = document.body;
    expect(getByPlaceholderText(container, 'Answers go here!'));
  });
});

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import ResizeObserver from "resize-observer-polyfill";

const windowMock = {
  scrollTo: jest.fn(),
  ResizeObserver,
};

Object.assign(global, global, windowMock);

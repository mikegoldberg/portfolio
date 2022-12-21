import { render } from "../../../test-utils";
import ThreeMorphModel from "..";
import { screen } from "@testing-library/react";
import { ThreeMorphModelProps } from "../types";
import * as TEST_DRIVERS from "./drivers";

const defaultProps: ThreeMorphModelProps = {
  width: 100,
  height: 100,
  mouthMorph: [0],
  leftEyeMorph: [0],
  rightEyeMorph: [0],
  headRotation: [0],
  headPosition: [0],
  hide: false,
};

describe("ThreeMorphModel", () => {
  it("renders correctly", () => {
    render(<ThreeMorphModel {...defaultProps} />);
    expect(screen).toMatchSnapshot();
  });

  it("uses the provided width and height", () => {
    render(<ThreeMorphModel {...defaultProps} />);
    const element = screen.getByTestId(TEST_DRIVERS.CANVAS);
    expect(element.style.width).toBe(`${defaultProps.width}px`);
    expect(element.style.height).toBe(`${defaultProps.height}px`);
  });
});

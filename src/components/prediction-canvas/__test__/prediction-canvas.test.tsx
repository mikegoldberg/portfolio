import { render } from "../../../test-utils";
import { screen } from "@testing-library/react";
import PredictionCanvas from "..";
import { PredictionCanvasProps } from "../types";
import * as TEST_DRIVERS from "./drivers";

const defaultProps: PredictionCanvasProps = {
  hide: false,
  width: 100,
  height: 100,
};

describe("PredictionCanvas", () => {
  it("renders correctly", () => {
    const { container } = render(<PredictionCanvas {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it("the component is hidden when hide is true", () => {
    render(<PredictionCanvas {...defaultProps} hide={true} />);
    const element = screen.getByTestId(TEST_DRIVERS.PREDICTION_CANVAS_CANVAS);
    const style = getComputedStyle(element);
    const displayValue = style.getPropertyValue("display");
    expect(displayValue).toBe("none");
  });

  it("the component is displayed when hide is false", () => {
    render(<PredictionCanvas {...defaultProps} hide={false} />);
    const element = screen.getByTestId(TEST_DRIVERS.PREDICTION_CANVAS_CANVAS);
    const style = getComputedStyle(element);
    const displayValue = style.getPropertyValue("display");
    expect(displayValue).toBe("block");
  });

  it("the component size is set to the provided width and height", () => {
    render(<PredictionCanvas {...defaultProps} />);
    const element = screen.getByTestId(TEST_DRIVERS.PREDICTION_CANVAS_CANVAS);
    const style = getComputedStyle(element);
    const widthValue = style.getPropertyValue("width");
    const heightValue = style.getPropertyValue("height");
    expect(widthValue).toBe(`${defaultProps.width}px`);
    expect(heightValue).toBe(`${defaultProps.width}px`);
  });
});

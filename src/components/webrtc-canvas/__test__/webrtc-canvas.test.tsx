import { render } from "../../../test-utils";
import { screen } from "@testing-library/react";
import WebRtcCanvas from "..";
import { WebRtcCanvasProps } from "../types";
import * as TEST_DRIVERS from "./drivers";
import { HOST_LABEL, CLIENT_LABEL } from "..";

const defaultProps: WebRtcCanvasProps = {};

describe("WebRtcCanvas", () => {
  it("renders correctly", () => {
    render(<WebRtcCanvas {...defaultProps} />);
    expect(screen).toMatchSnapshot();
  });

  it("displays host label if isHost is true", () => {
    render(<WebRtcCanvas {...defaultProps} isHost={true} />);
    const element = screen.getByTestId(TEST_DRIVERS.INSTANCE_LABEL);
    expect(element).toHaveTextContent(HOST_LABEL);
  });

  it("displays client label if isHost is false", () => {
    render(<WebRtcCanvas {...defaultProps} />);
    const element = screen.getByTestId(TEST_DRIVERS.INSTANCE_LABEL);
    expect(element).toHaveTextContent(CLIENT_LABEL);
  });
});

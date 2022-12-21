import { render } from "../../../test-utils";
import { screen } from "@testing-library/react";
import Webcam from "..";
import { WebcamProps } from "../types";
import { act } from "@testing-library/react";

const defaultProps: WebcamProps = {
  hide: false,
};

describe("Webcam", () => {
  it("renders correctly", async () => {
    await act(async () => {
      render(<Webcam {...defaultProps} />);
      expect(screen).toMatchSnapshot();
    });
  });
});

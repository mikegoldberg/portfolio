import { render } from "../../../test-utils";
import SlideshowPictureDetails from "..";
import { fireEvent, screen } from "@testing-library/react";
import { SlideshowPictureDetailsProps } from "../types";
import * as TEST_DRIVERS from "./drivers";

const defaultProps: SlideshowPictureDetailsProps = {
  url: "url",
  imageUrl: "image_url",
  title: "title",
  explanation: "explanation",
  copyright: "copyright",
  mediaType: "image",
};

jest.mock("../../../hooks", () => ({
  useImageLoaded: () => ({
    imageLoaded: true,
  }),
}));

describe("SlideshowPictureDetails", () => {
  it("renders correctly", () => {
    render(<SlideshowPictureDetails {...defaultProps} />);
    expect(screen).toMatchSnapshot();
  });

  it("renders an iframe if media type is video", () => {
    render(<SlideshowPictureDetails {...defaultProps} mediaType={"video"} />);
    const element = screen.queryByTestId(TEST_DRIVERS.VIDEO);
    expect(element).not.toBeNull();
  });

  it("renders an image if media type is image", () => {
    render(<SlideshowPictureDetails {...defaultProps} mediaType={"image"} />);
    const element = screen.queryByTestId(TEST_DRIVERS.IMAGE);
    expect(element).not.toBeNull();
  });

  it("renders a title if media type is image", () => {
    render(<SlideshowPictureDetails {...defaultProps} mediaType={"image"} />);
    const element = screen.queryByTestId(TEST_DRIVERS.TITLE);
    expect(element).not.toBeNull();
  });

  it("renders a more info icon if media type is image", () => {
    render(<SlideshowPictureDetails {...defaultProps} mediaType={"image"} />);
    const element = screen.queryByTestId(TEST_DRIVERS.MORE_INFO_ICON);
    expect(element).not.toBeNull();
  });

  it("renders shows an explanation if the more info icon is clicked", () => {
    render(<SlideshowPictureDetails {...defaultProps} mediaType={"image"} />);
    fireEvent.click(screen.getByTestId(TEST_DRIVERS.MORE_INFO_ICON));
    const element = screen.queryByTestId(TEST_DRIVERS.EXPLANATION);
    expect(element).not.toBeNull();
  });
});

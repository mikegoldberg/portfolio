import { render } from "../../../test-utils";
import { screen } from "@testing-library/react";
import SlideshowThumbnail from "..";
import { SlideshowThumbnailProps } from "../types";
import * as TEST_DRIVERS from "./drivers";

const defaultProps: SlideshowThumbnailProps = {
  image_url: "image_url",
  date: "12-01-2022",
  media_type: "image",
  highlight: true,
  onClick: () => {},
};

describe("SlideshowThumbnail", () => {
  it("renders correctly", () => {
    render(<SlideshowThumbnail {...defaultProps} />);
    expect(screen).toMatchSnapshot();
  });

  it("sets the thumbnail image", () => {
    render(<SlideshowThumbnail {...defaultProps} />);
    const element = screen.getByTestId(TEST_DRIVERS.THUMBNAIL);
    const style = getComputedStyle(element);
    const backgroundImageValue = style.getPropertyValue("background-image");
    expect(backgroundImageValue).toBe(`url(${defaultProps.image_url})`);
  });

  it("shows the play icon when the media type is a video", () => {
    render(<SlideshowThumbnail {...defaultProps} media_type={"video"} />);
    const element = screen.queryByTestId(TEST_DRIVERS.PLAY_ICON);
    expect(element).not.toBeNull();
  });

  it("does not show the play icon when the media type is an image", () => {
    render(<SlideshowThumbnail {...defaultProps} media_type={"image"} />);
    const element = screen.queryByTestId(TEST_DRIVERS.PLAY_ICON);
    expect(element).toBeNull();
  });

  it("sets the date", () => {
    render(<SlideshowThumbnail {...defaultProps} />);
    const element = screen.getByTestId(TEST_DRIVERS.DATE);
    expect(element).toHaveTextContent(defaultProps.date);
  });
});

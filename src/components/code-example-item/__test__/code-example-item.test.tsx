import { render } from "../../../test-utils";
import CodeExampleItem from "..";
import * as TEST_DRIVERS from "./drivers";
import { CodeExampleItemProps } from "../types";

const defaultProps: CodeExampleItemProps = {
  title: "test city",
  poster: "test_poster",
  onClick: jest.fn(),
  source: "test_source",
};

describe("CodeExampleItem", () => {
  it("renders correctly", () => {
    const { container } = render(<CodeExampleItem {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it("renders the title", () => {
    const { getByTestId } = render(<CodeExampleItem {...defaultProps} />);
    const element = getByTestId(TEST_DRIVERS.TITLE);
    expect(element).toHaveTextContent(defaultProps.title);
  });

  it("renders the poster", () => {
    const { getByTestId } = render(<CodeExampleItem {...defaultProps} />);
    const element = getByTestId(TEST_DRIVERS.POSTER);
    expect(element).toHaveStyle(
      `background-image: url(${defaultProps.poster})`
    );
  });

  it("renders the source", () => {
    const { getByTestId } = render(<CodeExampleItem {...defaultProps} />);
    const element = getByTestId(TEST_DRIVERS.SOURCE);
    expect(element).toHaveAttribute("href", defaultProps.source);
  });
});

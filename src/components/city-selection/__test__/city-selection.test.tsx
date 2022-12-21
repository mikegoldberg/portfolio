import { screen } from "@testing-library/react";
import { render } from "../../../test-utils";
import CitySelection from "..";
import * as TEST_DRIVERS from "./drivers";
import { CitySelectionProps } from "../types";

const defaultProps: CitySelectionProps = {
  city: "test city",
  onSubmit: jest.fn(),
};

describe("CitySelection", () => {
  it("renders correctly", () => {
    const { container } = render(<CitySelection {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it("renders the city name", () => {
    render(<CitySelection {...defaultProps} />);
    const element = screen.getByTestId(TEST_DRIVERS.HEADING);
    expect(element).toHaveTextContent(defaultProps.city);
  });
});

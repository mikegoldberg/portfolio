import { render } from "../../../test-utils";
import HourlyForecast from "..";
import { HourlyForecastProps } from "../types";

const defaultProps: HourlyForecastProps = {
  items: [],
  onScrollFrame: () => {},
};

describe("HourlyForecast", () => {
  it("renders correctly", () => {
    const { container } = render(<HourlyForecast {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});

import { render } from "../../../test-utils";
import { screen } from "@testing-library/react";
import WeatherChart from "..";
import { WeatherChartProps } from "../types";

const defaultProps: WeatherChartProps = {
  data: [],
  scrollPosition: 0,
  dataKey: "temperature",
  label: "Temp",
};

describe("WeatherChart", () => {
  it("renders correctly", () => {
    render(<WeatherChart {...defaultProps} />);
    expect(screen).toMatchSnapshot();
  });
});

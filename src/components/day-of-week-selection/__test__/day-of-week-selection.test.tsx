import { render } from "../../../test-utils";
import DayOfWeekSelection from "..";
import { DayOfWeekSelectionProps } from "../types";

const defaultProps: DayOfWeekSelectionProps = {
  dates: ["12-01-2022"],
  activeDayOfWeek: "12-01-2022",
  onDaySelected: () => {},
};

describe("DayOfWeekSelection", () => {
  it("renders correctly", () => {
    const { container } = render(<DayOfWeekSelection {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});

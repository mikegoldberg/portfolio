import { render } from "../../../test-utils";
import ColorModeSwitcher from "..";

describe("ColorModeSwitcher", () => {
  it("renders correctly", () => {
    const { container } = render(<ColorModeSwitcher />);
    expect(container).toMatchSnapshot();
  });
});

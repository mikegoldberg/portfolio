import { render } from "../../../test-utils";
import CustomScrollbars from "..";
import { CustomScrollbarsProps } from "../types";

const defaultProps: CustomScrollbarsProps = {
  onScrollFrame: () => {},
};

describe("CustomScrollbars", () => {
  it("renders correctly", () => {
    const { container } = render(
      <CustomScrollbars {...defaultProps}>
        <>{"Content"}</>
      </CustomScrollbars>
    );
    expect(container).toMatchSnapshot();
  });
});

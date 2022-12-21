import { render } from "../../../test-utils";
import Navigation from "..";
import { BrowserRouter } from "react-router-dom";

describe("Navigation", () => {
  it("renders correctly", () => {
    const { container } = render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});

import { render } from "../../../test-utils";
import { screen } from "@testing-library/react";
import Role from "..";
import { RoleProps } from "../types";
import * as TEST_DRIVERS from "./drivers";

const defaultProps: RoleProps = {
  company: "company name",
  contract: true,
  title: "job title",
  start: "2022-03-01T12:00-0500",
  end: "2022-09-30T12:00-0500",
  description: "test description.",
  achievements: ["achievements 1", "achievements 2"],
  skillset: ["test skill 1", "test skill 2"],
};

describe("Role", () => {
  it("renders correctly", () => {
    const { container } = render(<Role {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it("renders a title", () => {
    render(<Role {...defaultProps} />);
    const element = screen.queryByTestId(TEST_DRIVERS.TITLE);
    expect(element).not.toBeNull();
  });

  it("renders a description", () => {
    render(<Role {...defaultProps} />);
    const element = screen.queryByTestId(TEST_DRIVERS.DESCRIPTION);
    expect(element).not.toBeNull();
  });

  it("renders a achievements", () => {
    render(<Role {...defaultProps} />);
    const element = screen.queryByTestId(TEST_DRIVERS.ACHIEVEMENTS);
    expect(element).not.toBeNull();
  });

  it("renders the provided skillsets=", () => {
    render(<Role {...defaultProps} />);
    const element = screen.getByTestId(TEST_DRIVERS.SKILLSET);
    expect(element.children.length).toBe(defaultProps.skillset.length);
  });

  it("renders a start date", () => {
    render(<Role {...defaultProps} />);
    const element = screen.queryByTestId(TEST_DRIVERS.START);
    expect(element).not.toBeNull();
  });

  it("renders a end date", () => {
    render(<Role {...defaultProps} />);
    const element = screen.queryByTestId(TEST_DRIVERS.END);
    expect(element).not.toBeNull();
  });
});

import { fireEvent } from "@testing-library/dom";

import { render, screen } from "~/utils/tests";

import Button from ".";

describe("Button", () => {
  it("Should render and call function on click", () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Ativar</Button>);

    fireEvent.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

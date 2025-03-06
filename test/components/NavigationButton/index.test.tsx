import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavigationButton from "../../../src/components/NavigationButton";

describe("NavigationButton", () => {
  it("renders button with correct label, headline, and day", () => {
    const day = 1;
    const headline = "Test Headline";
    const label = "Test Label";

    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <NavigationButton day={day} headline={headline} label={label} />
            }
          />
        </Routes>
      </BrowserRouter>,
    );

    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText(headline)).toBeInTheDocument();
    expect(screen.getByText(`DAY ${day}`)).toBeInTheDocument();
  });

  it("navigates to the correct URL when button is clicked", () => {
    const day = 1;
    const headline = "Test Headline";
    const label = "Test Label";

    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <NavigationButton day={day} headline={headline} label={label} />
            }
          />
        </Routes>
      </BrowserRouter>,
    );

    fireEvent.click(screen.getByRole("button"));

    expect(window.location.pathname).toBe(`/itinerary/undefined/day/${day}`);
  });
});

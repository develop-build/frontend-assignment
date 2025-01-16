import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Table from "./Table.jsx";

// Mock data
const mockProjects = [
  { "s.no": 1, "percentage.funded": 100, "amt.pledged": 500 },
  { "s.no": 2, "percentage.funded": 200, "amt.pledged": 1000 },
  { "s.no": 3, "percentage.funded": 300, "amt.pledged": 1500 },
  { "s.no": 4, "percentage.funded": 400, "amt.pledged": 2000 },
  { "s.no": 5, "percentage.funded": 500, "amt.pledged": 2500 },
  { "s.no": 6, "percentage.funded": 600, "amt.pledged": 3000 },
  { "s.no": 7, "percentage.funded": 700, "amt.pledged": 3500 },
];

describe("Table Component", () => {
  it("renders table headers correctly", () => {
    render(<Table projects={mockProjects} />);
    expect(screen.getByText("S.No.")).toBeInTheDocument();
    expect(screen.getByText("Percentage Funded")).toBeInTheDocument();
    expect(screen.getByText("Amount Pledged")).toBeInTheDocument();
  });

  it("displays the correct number of rows per page", () => {
    render(<Table projects={mockProjects} />);
    const rows = screen.getAllByRole("row");
    // Subtracting 1 for the header row
    expect(rows.length - 1).toBe(5);
  });

  it("handles pagination: clicking 'Next' navigates to the next page", () => {
    render(<Table projects={mockProjects} />);
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    // Check for presence of records from the second page
    expect(screen.getByText("600")).toBeInTheDocument();
    expect(screen.getByText("700")).toBeInTheDocument();
  });

  it("handles pagination: clicking 'Previous' navigates to the previous page", () => {
    render(<Table projects={mockProjects} />);
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    const previousButton = screen.getByText("Previous");
    fireEvent.click(previousButton);

    // Check for presence of records from the first page
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("200")).toBeInTheDocument();
    expect(screen.getByText("400")).toBeInTheDocument();
  });

  it("disables 'Previous' button on the first page", () => {
    render(<Table projects={mockProjects} />);
    const previousButton = screen.getByText("Previous");
    expect(previousButton).toBeDisabled();
  });

  it("disables 'Next' button on the last page", () => {
    render(<Table projects={mockProjects} />);
    const nextButton = screen.getByText("Next");

    // Click "Next" to go to the last page
    fireEvent.click(nextButton);

    expect(nextButton).toBeDisabled();
  });

  it("displays the correct page number", () => {
    render(<Table projects={mockProjects} />);
    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    expect(screen.getByText("Page 2 of 2")).toBeInTheDocument();
  });
});

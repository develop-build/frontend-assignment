import React, { useState } from "react";
import classes from "./table.module.css";

const Table = ({ projects }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const totalPages = Math.ceil(projects.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;

  // setting current project to display i.e; 5 per page
  const currentRecords = projects.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  // Handle page navigation
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    };
  };

  const handleNext = () => {
    if (currentPage < totalPages) { setCurrentPage(currentPage + 1) };
  };

  return (
    <>
      <table className={classes.projectsTable}>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Percentage Funded</th>
            <th>Amount Pledged</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((project, index) => (
            <tr key={index}>
              <td>{project["s.no"]}</td>
              <td>{project["percentage.funded"]}</td>
              <td>{project["amt.pledged"]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className={classes.pagination}>
        <button
          className={classes.navButton}
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className={ classes.textContent }>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={classes.navButton}
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Table;
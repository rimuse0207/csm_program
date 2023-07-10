import React, { useState } from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const PageNumbers = styled.ul`
  display: flex;
  list-style-type: none;
  padding: 0;
`;

const PageNumber = styled.li`
  margin-right: 5px;
  cursor: pointer;
  color: ${(props) => (props.active ? 'white' : '#333')};
  background-color: ${(props) => (props.active ? '#007bff' : 'transparent')};
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.active ? '#007bff' : '#f1f1f1')};
  }
`;

const Ellipsis = styled.li`
  margin-right: 5px;
  color: #333;
  cursor: default;
`;

const PagiNation = ({ totalPagesss, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalPagesss / 100);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 3) {
      // If total pages is 3 or less, show all page numbers
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <PageNumber
            key={i}
            onClick={() => handlePageClick(i)}
            active={i === currentPage}
          >
            {i}
          </PageNumber>
        );
      }
    } else {
      // If total pages is more than 3, show maximum 3 page numbers with ellipsis
      if (currentPage <= 2) {
        // If current page is 1 or 2, show page numbers 1, 2, 3 with ellipsis
        for (let i = 1; i <= 3; i++) {
          pageNumbers.push(
            <PageNumber
              key={i}
              onClick={() => handlePageClick(i)}
              active={i === currentPage}
            >
              {i}
            </PageNumber>
          );
        }
        pageNumbers.push(<Ellipsis key="ellipsis">...</Ellipsis>);
        pageNumbers.push(
          <PageNumber
            key={totalPages}
            onClick={() => handlePageClick(totalPages)}
            active={totalPages === currentPage}
          >
            {totalPages}
          </PageNumber>
        );
      } else if (currentPage >= totalPages - 1) {
        // If current page is the last or second last, show page numbers with ellipsis
        pageNumbers.push(
          <PageNumber
            key={1}
            onClick={() => handlePageClick(1)}
            active={1 === currentPage}
          >
            1
          </PageNumber>
        );
        pageNumbers.push(<Ellipsis key="ellipsis">...</Ellipsis>);
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageNumbers.push(
            <PageNumber
              key={i}
              onClick={() => handlePageClick(i)}
              active={i === currentPage}
            >
              {i}
            </PageNumber>
          );
        }
      } else {
        // Show current page number with previous and next page numbers
        pageNumbers.push(
          <PageNumber
            key={1}
            onClick={() => handlePageClick(1)}
            active={1 === currentPage}
          >
            1
          </PageNumber>
        );
        pageNumbers.push(<Ellipsis key="ellipsis">...</Ellipsis>);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(
            <PageNumber
              key={i}
              onClick={() => handlePageClick(i)}
              active={i === currentPage}
            >
              {i}
            </PageNumber>
          );
        }
        pageNumbers.push(<Ellipsis key="ellipsis">...</Ellipsis>);
        pageNumbers.push(
          <PageNumber
            key={totalPages}
            onClick={() => handlePageClick(totalPages)}
            active={totalPages === currentPage}
          >
            {totalPages}
          </PageNumber>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <PaginationContainer>
      <PageNumbers>{renderPageNumbers()}</PageNumbers>
    </PaginationContainer>
  );
};

export default PagiNation;

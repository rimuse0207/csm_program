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

const PagiNation = ({ totalPagesss,currentPage,setCurrentPage }) => {
  const totalPages = Math.ceil(totalPagesss / 100);
  

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, index) => {
      const pageNumber = index + 1;
      const isActive = pageNumber === currentPage;

      return (
        <PageNumber
          key={pageNumber}
          onClick={() => handlePageClick(pageNumber)}
          active={isActive}
        >
          {pageNumber}
        </PageNumber>
      );
    });
  };

  return (
    <PaginationContainer>
      <PageNumbers>{renderPageNumbers()}</PageNumbers>
    </PaginationContainer>
  );
};

export default PagiNation;
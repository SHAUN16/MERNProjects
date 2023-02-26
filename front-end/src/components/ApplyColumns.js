import React from 'react';
import styled from 'styled-components';

const ApplyColumns = () => {
  return (
    <Wrapper>
      <span>position</span>
      <span>company</span>
      <span>Candidate Name</span>
      <span>Date</span>
      <span className='action'>Delete</span>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: none;
  @media (min-width: 992px) {
    display: block;
    background: var(--grey-200);
    color: var(--grey-500);
    border-top-left-radius: var(--borderRadius);
    border-top-right-radius: var(--borderRadius);
    display: grid;
    grid-template-columns: 1fr 1fr 150px 100px 100px;
    align-items: center;
    padding: 1rem 1.5rem;
    column-gap: 1rem;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    font-size: var(--small-text);
    font-weight: 600;
    .action {
      margin-left: 1rem;
    }
  }
`;

export default ApplyColumns;

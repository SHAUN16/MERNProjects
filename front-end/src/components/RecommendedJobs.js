import { useGlobalContext } from '../context/appContext';
import React, {useState} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaCheckCircle, FaStickyNote } from 'react-icons/fa';
import moment from 'moment';
import JobColumns from './JobColumns';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Jobs = () => {
  const { role,recommendedJobs,jobs, isLoading, deleteJob, createApply } = useGlobalContext();

  const [isChecked, setIsChecked] = useState({
    value:false,
    id:'',
  });

  const [object,setObject] = useState(null);
 
  const [show, setShow] = useState(false);

  const [value,setValue] = useState(null);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const handleJobData = (ob) => setValue(ob)
 
  const handleChecked = (id) =>{
    setIsChecked(!isChecked.value,id)

  }
  if (isLoading) {
    return <div className='loading'></div>;
  }

  if (recommendedJobs.length < 1) {
    return (
      <EmptyContainer>
        <h5>
          Currently, you have no <span>JOBS </span>
          to display
        </h5>
      </EmptyContainer>
    );
  }

  

  return (
    <>
      <JobColumns />
      <Container>
        {recommendedJobs.map((item) => {
          const { _id: id, company, position, createdAt,deadline } = item;
          let date = moment(deadline);
          date = date.format('MMMM Do, YYYY');
          let deadlineDate = moment(deadline)
          deadlineDate = deadlineDate.format('MMMM Do, YYYY');
          let currentDate = new Date();
          
         
            return (
            <article key={id} className='job'>
              <span className='icon'>{company.charAt(0)}</span>
              <span className='position'>{position.toLowerCase()}</span>
              <span className='company'>{company}</span>
              <span className='date'>{date}</span>
              <div className='action-div'>
              {role == "admin" && <><Link to={`/edit/${id}`} className='edit-btn' type='button'>
                  <FaEdit />
                </Link>
                  <Link to={`/specificApplies/${id}`} className='edit-btn' type='button'>
                  <FaStickyNote />
                </Link>
                <button
                  className='delete-btn'
                  type='button'
                  onClick={()=>{
                    setShow(true);
                    setValue(item);
                    }}>
                    <FaTrash />
                  </button>
                </>}
                
                {role == "user" && 
                <>
                <Button className='apply-btn'
                  type='button'>
                <Link to={`/jobDetails/${id}`} >
                  Job Description
                </Link>
                </Button>
                <button
                  className='apply-btn'
                  type='button'
                  onClick={() => createApply(id)}>
                    Apply
                </button>
                
                <input 
                type='checkbox' 
                className='' 
                value={`${id}`}
                // onChange={()=>handleChecked(id)} 
                // checked={isChecked.value && isChecked.id} 
                />
              </>}
              </div>
            </article>
          );
        })}
      </Container>

      <Modal show={show} onHide={handleClose} >
          <Modal.Header closeButton>
          <Modal.Title>Delete Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete the job?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={()=>deleteJob(value._id)}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
    </>
  );
};
const EmptyContainer = styled.section`
  text-align: center;
  h5 {
    text-transform: none;
  }
  span {
    color: var(--primary-500);
  }
`;
const Container = styled.section`
  .job {
    background: var(--white);
    border-radius: var(--borderRadius);
    margin-bottom: 2rem;
    display: grid;
    padding: 2rem 0;
    justify-content: center;
    text-align: center;
  }

  .apply-btn{
    background: var(--green)
    color: var(--green)
  }
  .icon {
    background: var(--primary-500);
    display: block;
    border-radius: var(--borderRadius);
    color: var(--white);
    font-size: 2rem;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-bottom: 1rem;
  }
  span {
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
  }
  .position {
    font-weight: 600;
  }
  .date {
    color: var(--grey-500);
  }
  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    margin: 0.75rem auto;
    width: 100px;
  }
  .edit-btn {
    color: var(--green-dark);
    border-color: transparent;
    background: transparent !important;
    outline: transparent;
    border-radius: var(--borderRadius);
    cursor: pointer;
    display: inline-block;
    appearance: none;
  }
  .delete-btn {
    color: var(--red-dark);
    border-color: transparent;
    border-radius: var(--borderRadius);
    cursor: pointer;
    background: transparent;
  }
  .edit-btn,
  .delete-btn {
    font-size: 1rem;
    line-height: 1.15;
    margin-bottom: -3px;
  }

  .action-div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
  }
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr;
    .icon {
      display: none;
    }
    background: var(--white);
    border-bottom-left-radius: var(--borderRadius);
    border-bottom-right-radius: var(--borderRadius);

    .job {
      border-radius: 0;
      justify-content: left;
      text-align: left;
      border-bottom: 1px solid var(--grey-200);
      grid-template-columns: 1fr 1fr 150px 100px 100px;
      align-items: center;
      padding: 1rem 1.5rem;
      column-gap: 1rem;
      margin-bottom: 0;
    }
    .job:last-child {
      border-bottom: none;
    }
    span {
      font-size: var(--small-text);
    }
    .company,
    .position {
      font-weight: 400;
      text-transform: capitalize;
    }
    .date {
      font-weight: 400;
      color: var(--grey-500);
    }

    .status {
      font-size: var(--smallText);
    }

    .action-div {
      margin-left: 1rem;
      justify-content: left;
    }
  }
`;
const setStatusColor = (status) => {
  if (status === 'interview') return '#0f5132';
  if (status === 'declined') return '#842029';
  return '#927238';
};
const setStatusBackground = (status) => {
  if (status === 'interview') return '#d1e7dd';
  if (status === 'declined') return '#f8d7da';
  return '#f7f3d7';
};

const StatusContainer = styled.span`
  border-radius: var(--borderRadius);
  text-transform: capitalize;
  letter-spacing: var(--letterSpacing);
  text-align: center;
  color: ${(props) => setStatusColor(props.status)};
  background: ${(props) => setStatusBackground(props.status)};
`;
export default Jobs;

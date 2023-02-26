import styled from 'styled-components';
import { useParams, Redirect, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/appContext';
import FormRow from '../components/FormRow';
import Navbar from '../components/Navbar';
import FormRowSelect from '../components/FormRowSelect';

const AddJob = () => {
  const [values, setValues] = useState({ company: '', position: '', deadline:'', grade:'',salary:'',jobType:'Developer'||'' });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
 
  const { role,user,isLoading, showAlert, fetchJobs, createJob } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { jobType,company, position,deadline,salary,grade } = values;
    console.log(values)
    if (jobType && company && position && deadline && salary && grade) {
      
      createJob(values);
      setValues({ company: '', position: '', deadline:'', grade:'',salary:'',jobType:''});
    }
  };

  return (
    <>{!user && <Redirect to='/' />}
    <Navbar />
    <Wrapper>
      

      <form className='form'>
        <h3>{'add job'}</h3>
        <div className='form-center'>
          {/* position */}
          <FormRow
            type='text'
            name='position'
            value={values.position}
            handleChange={handleChange}
          />
          {/* company */}
          <FormRow
            type='text'
            name='company'
            value={values.company}
            handleChange={handleChange}
          />

          <FormRow
            name='deadline'
            type='date'
            value={values.deadline}
            handleChange={handleChange}
          />
            <FormRow
            labelText='Cut-Off CGPA'
            type='text'
            name='grade'
            value={values.grade}
            handleChange={handleChange}
          />

            <FormRow
            type='text'
            name='salary'
            value={values.salary}
            handleChange={handleChange}
          />

            <FormRowSelect
            type='text'
            name='jobType'
            value={values.jobType}
            list={['Developer', 'Tester', 'DevOps', 'Business Analyst']}
            handleChange={handleChange}
          />


          {/* jobLocation */}
          {/* <FormRow
            type='text'
            name='jobLocation'
            labelText='job location'
            value={jobLocation}
            handleChange={handleJobInput}
          /> */}
          {/* status */}
          {/* <FormRowSelect
            name='status'
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          /> */}
          {/* job type*/}
          {/* <FormRowSelect
            name='jobType'
            labelText='job type'
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          /> */}
          <div className='btn-container'>
            <button
              type='button'
              className='btn btn-block clear-btn'
              // onClick={() => clearValues()}
            >
              clear
            </button>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper></>
  );
};

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`

export default AddJob;

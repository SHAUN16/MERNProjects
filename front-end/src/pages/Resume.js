import { useState, useEffect } from 'react';
import { useParams, Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useGlobalContext } from '../context/appContext';
import FormRow from '../components/FormRow';
import Navbar from '../components/Navbar';
function Update() {
  const {
    isLoading,
    editItem,
    fetchSingleJob,
    singleJobError: error,
    user,
    fileData,
    editJob,
    editComplete,
    updateUser,
    uploadFile,
    getFile,
  } = useGlobalContext();

  useEffect(() => {
    getFile();
  }, []);

  const showWidget = () => {
    
    let widget = window.cloudinary.createUploadWidget({ 
       cloudName: `dfwnemdnt`,
       uploadPreset: `zj9z7hcn`}, 
    (error, result) => {
      if (!error && result && result.event === "success") { 
      console.log(result.info)
      uploadFile({result}) 
    }});
    widget.open()
  }


  if (isLoading && !user) {
    return <div className='loading'></div>;
  }

  return (
    <>
      {!user && <Redirect to='/' />}
      <Navbar />
      <Container className='page'>
        <header>
          <Link to='/dashboard' className='btn btn-block back-home'>
            back home
          </Link>
          {fileData && (
          <a href={`${fileData.file}`} >
            My Resume
          </a>
          )}   
        </header>
        <div>
           <button onClick={showWidget}> Upload File </button>
           </div>
    
      </Container>
    </>
  );
}
// const ErrorContainer = styled.section`
//   text-align: center;
//   padding-top: 6rem; ;
// `;

const Container = styled.section`
  header {
    margin-top: 4rem;
  }
  .form {
    max-width: var(--max-width);
    margin-top: 2rem;
  }
  .form h4 {
    text-align: center;
  }
  .form > p {
    text-align: center;
    color: var(--green-dark);
    letter-spacing: var(--letterSpacing);
    margin-top: 0;
  }
  .status {
    background: var(--grey-100);
    border-radius: var(--borderRadius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .back-home {
    text-align: center;
    display: block;
    width: 100%;
    font-size: 1rem;
    line-height: 1.15;
    background: var(--black);
  }
  .back-home:hover {
    background: var(--grey-500);
  }
  @media (min-width: 768px) {
    .back-home {
      width: 200px;
    }
    .form h4 {
      text-align: left;
    }
    .form-container {
      display: grid;
      grid-template-columns: 1fr 1fr 100px auto;
      column-gap: 0.5rem;
      align-items: center;
    }

    .form > p {
      text-align: left;
    }
    .form-row {
      margin-bottom: 0;
    }
    .submit-btn {
      align-self: end;
    }
  }
`;
export default Update;

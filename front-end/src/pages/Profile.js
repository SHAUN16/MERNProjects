// import { useState, useEffect } from 'react';
// import { useParams, Redirect, Link } from 'react-router-dom';
// import styled from 'styled-components';
// import  FormRow  from '../components/FormRow';
// // import { updateUser } from '../../features/user/userSlice';
// import { useGlobalContext } from '../context/appContext';
// import Navbar from '../components/Navbar'

// function Profile(){

//   const user = localStorage.getItem('user');

//   if (user) {
//     const userData = JSON.parse(localStorage.getItem('user'));
//   }
//   const { isLoading,updateUser,showAlert,userData } = useGlobalContext
//   // const dispatch = useDispatch();
//   const [values, setValues] = useState({
//     name: userData ?.name || '',
//     email: userData ?.email || '',
//   });

//   useEffect(() => {
//     if (userData) {
//       setValues(userData);
//     }
//   }, [userData]);

  

//   const handleChange = (e) => {
//     setValues({ ...values, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { name, email} = values;
//     if (name && email) {
//       updateUser({name,email});
//     }
//   };

//   return (
//     <>
//       {!user && <Redirect to='/' />}
//       <Navbar />
//       <Wrapper>
      
//       <form className='form' onSubmit={handleSubmit}>
//         <h3>profile</h3>
//         <div className='form-center'>
//           <FormRow
//             type='text'
//             name='name'
//             value={values.name}
//             handleChange={handleChange}
//           />
//           {/* <FormRow
//             type='text'
//             labelText='last name'
//             name='lastName'
//             value={userData.lastName}
//             handleChange={handleChange}
//           /> */}
//           <FormRow
//             type='email'
//             name='email'
//             value={values.email}
//             handleChange={handleChange}
//           />
//           {/* <FormRow
//             type='text'
//             name='location'
//             value={userData.location}
//             handleChange={handleChange}
//           /> */}
//           <button type='submit' className='btn btn-block' disabled={isLoading}>
//             {isLoading ? 'Please Wait...' : 'save changes'}
//           </button>
//         </div>
//       </form>
//     </Wrapper>
//     </>
//   );
// };


// const Wrapper = styled.section`
//   display: grid;
//   align-items: center;
//   .logo {
//     display: block;
//     margin: 0 auto;
//     margin-bottom: 1.38rem;
//   }
//   .form {
//     max-width: 400;
//     border-top: 5px solid var(--primary-500);
//   }

//   h4 {
//     text-align: center;
//   }
//   p {
//     margin: 0;
//     margin-top: 1rem;
//     text-align: center;
//   }
//   .btn {
//     margin-top: 1rem;
//   }
//   .member-btn {
//     background: transparent;
//     border: transparent;
//     color: var(--primary-500);
//     cursor: pointer;
//   }
// `;
// export default Profile;


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
    userData,
    editJob,
    editComplete,
    updateUser,
  } = useGlobalContext();

  const [values, setValues] = useState({
    name: '',
    email: '',
    grade:'',
  });

  // useEffect(() => {
  //   fetchUserDetails();
  // }, []);

  useEffect(() => {
    if (userData) {
      const { name, email,grade } = userData;
      setValues({ name, email,grade });
    }
  }, [userData]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, grade } = values;
    if (name && email && grade) {
      updateUser({ name, email, grade });
    }
  };
  if (isLoading && !userData) {
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
        </header>
        <form className='form' onSubmit={handleSubmit}>
          <p>{editComplete && 'Success! Edit Complete'}</p>
          <h4>Update Profile Details</h4>
          {/* company */}
          <div className='form-container'>
            
            <FormRow
              type='name'
              name='name'
              value={values.name}
              handleChange={handleChange}
            />

            <FormRow
              type='name'
              name='email'
              value={values.email}
              // handleChange={handleChange}
             
            />

            <FormRow
              labelText='CGPA'
              type='text'
              name='grade'
              value={values.grade}
              handleChange={handleChange}
             
            />

            
            <button
              type='submit'
              className='btn btn-block submit-btn'
              disabled={isLoading}
            >
              {isLoading ? 'Editing...' : 'Edit'}
            </button>
          </div>
        </form>
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

import  FormRow  from './FormRow';
import { useState, useEffect } from 'react';
import FormRowSelect from './FormRowSelect';
import styled from 'styled-components'
import { useGlobalContext } from '../context/appContext';
import { CREATE_APPLY_ERROR } from '../context/actions';

const SearchContainer = () => {
  const { isLoading, search, sort, sortOptions,searchType,searchOptions,fetchSearchedJobs,createApply } = useGlobalContext();

  const [values, setValues] = useState({
    search : '',
    sort : sort||'',
    searchType : searchType||'',
  });

  useEffect(()=>{
    const { search, sort, searchType } = values
    fetchSearchedJobs(search,sort,searchType)
  },[values])

  const handleSearch = (e)=>{
    setValues({ ...values, [e.target.name]: e.target.value });    
  }
  
  // const handleSearch = (e) => {
  //   if (isLoading) return;
  //   // dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    const values = [
      ...document.querySelectorAll('[type="checkbox"]:checked')
    ].map(el => el.value);
    for (let i=0;i<values.length;i++){
      createApply(values[i])
    }
  };

  return (
    <Wrapper>
      <form className='form'>
        <h4>search form</h4>
        <div className='form-center'>
          {/* search position */}
          <FormRow
            type='text'
            name='search'
            value={values.search}
            handleChange={handleSearch}
          />

          {/* search by type*/}
          {/* <FormRowSelect
            labelText='type'
            name='searchType'
            value={searchType}
            handleChange={handleSearch}
            list={['all', ...jobTypeOptions]}
          /> */}
          {/* sort */}
          <FormRowSelect
            name='sort'
            value={values.sort}
            handleChange={handleSearch}
            list={sortOptions}
          />

            <FormRowSelect
            name='searchType'
            labelText='Search By'
            value={values.searchType}
            handleChange={handleSearch}
            list={searchOptions}
          />

          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Apply for selected
          </button>
        </div>
      </form>
    </Wrapper>
  );
};




const Wrapper = styled.section`
  .form {
    width: 100%;
    max-width: 100%;
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 0.5rem;
  }
  h5 {
    font-weight: 700;
  }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
  }
  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      margin-top: 0;
    }
  }
`

export default SearchContainer;
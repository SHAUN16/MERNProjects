import axios from 'axios'
import '../axios'
import React, { useContext, useEffect, useReducer } from 'react'
import {
  SET_LOADING,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
  SET_USER,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_ERROR,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  DELETE_JOB_ERROR,
  FETCH_SINGLE_JOB_SUCCESS,
  FETCH_SINGLE_JOB_ERROR,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  FETCH_APPLIES_ERROR,
  FETCH_APPLIES_SUCCESS,
  FETCH_SINGLE_APPLY_ERROR,
  FETCH_SINGLE_APPLY_SUCCESS,
  CREATE_APPLY_ERROR,
  CREATE_APPLY_SUCCESS,
  DELETE_APPLY_ERROR,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
  SEND_MAIL_ERROR,
  SEND_MAIL_SUCCESS,
  UPLOAD_FILE_ERROR,
  UPLOAD_FILE_SUCCESS,
  GET_FILE_ERROR,
  GET_FILE_SUCCESS,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  FETCH_RECOMMENDED_JOBS_SUCCESS,
  FETCH_RECOMMENDED_JOBS_ERROR,
} from './actions'
import reducer from './reducer'




const initialState = {
  user: null,
  isLoading: false,
  jobs: [],
  recommendedJobs: [],
  applies: [],
  showAlert: false,
  editItem: null,
  singleJobError: false,
  editComplete: false,
  role: null,
  email: null,
  name: null,
  userData:null,
  fileData:null,
  search: '',
  sort: 'latest',
  searchType:'position',
  searchOptions: ['company','position'],
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
}


const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setLoading = () => {
    dispatch({ type: SET_LOADING })
  }

  // register
  const register = async (userInput) => {
    setLoading()
    try {
      const { data } = await axios.post(`/auth/register`, {
        ...userInput,
      })
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user })
      localStorage.setItem(
        'user',
        JSON.stringify({ name: data.user.name, role:data.user.role,email:data.user.email, token: data.token })
      )
      const msg = "R"
      sendMail({data,msg })
    } catch (error) {
      dispatch({ type: REGISTER_USER_ERROR })
    }
  }

  // login
  const login = async (userInput) => {
    setLoading()
    try {
      const { data } = await axios.post(`/auth/login`, {
        ...userInput,
      })

      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user })
      localStorage.setItem(
        'user',
        JSON.stringify({ name: data.user.name, role: data.user.role, email:data.user.email,token: data.token })
        )
      } catch (error) {
      
        dispatch({ type: REGISTER_USER_ERROR })
    }
  }

  // logout
  const logout = () => {
    localStorage.removeItem('user')
    dispatch({ type: LOGOUT_USER })
  }

  // fetch jobs
  const fetchJobs = async () => {
    setLoading()
    try {
      const { data } = await axios.get(`/jobs`)
      dispatch({ type: FETCH_JOBS_SUCCESS, payload: data.jobs })
    } catch (error) {
      dispatch({ type: FETCH_JOBS_ERROR })
      logout()
    }
  }

  const fetchRecommendedJobs = async (jobId) => {
    setLoading()
    try {
      const { data } = await axios.get(`/jobs/recommendedJobs/${jobId}`)
      dispatch({ type: FETCH_RECOMMENDED_JOBS_SUCCESS, payload: data.recommendedJobs })
    } catch (error) {
      dispatch({ type: FETCH_RECOMMENDED_JOBS_ERROR })
      logout()
    }
  }



  const fetchSearchedJobs = async (search,sort,searchType) => {
    setLoading()
    try {
      let url = `/jobs`
      if (sort){
      url = url + `?sort=${sort}`}
      if (search){
        url = url + `&search=${search}&searchType=${searchType}`
      }
      const { data } = await axios.get(url)
      dispatch({ type: FETCH_JOBS_SUCCESS, payload: data.jobs })
    } catch (error) {
      dispatch({ type: FETCH_JOBS_ERROR })
      logout()
    }
  }



  // create job
  const createJob = async (userInput) => {
    setLoading()
    try {
      const { data } = await axios.post(`/jobs`, {
        ...userInput,
      })

      dispatch({ type: CREATE_JOB_SUCCESS, payload: data.job })
    } catch (error) {
      dispatch({ type: CREATE_JOB_ERROR })
    }
  }
  const deleteJob = async (jobId) => {
    setLoading()
    try {
      await axios.delete(`/jobs/${jobId}`)

      fetchJobs()
    } catch (error) {
      dispatch({ type: DELETE_JOB_ERROR })
    }
  }

  const fetchSingleJob = async (jobId) => {
    setLoading()
    try {
      const { data } = await axios.get(`/jobs/${jobId}`)
      dispatch({ type: FETCH_SINGLE_JOB_SUCCESS, payload: data.job })
    } catch (error) {
      dispatch({ type: FETCH_SINGLE_JOB_ERROR })
    }
  }


  const editJob = async (jobId, userInput) => {
    setLoading()
    try {
      const { data } = await axios.patch(`/jobs/${jobId}`, {
        ...userInput,
      })
      dispatch({ type: EDIT_JOB_SUCCESS, payload: data.job })
    } catch (error) {
      dispatch({ type: EDIT_JOB_ERROR })
    }
  }

  {/*API calls for applies collection */}

  const fetchApplies = async () => {
    setLoading()
    try {
      const { data } = await axios.get(`/applies`)
      dispatch({ type: FETCH_APPLIES_SUCCESS, payload: data.specificApplies })
    } catch (error) {
      dispatch({ type: FETCH_APPLIES_ERROR })
      logout()
    }
  }


  const fetchSingleApply = async (applyId) => {
    setLoading()
    try {
      const { data } = await axios.get(`/applies/${applyId}`)
      dispatch({ type: FETCH_SINGLE_APPLY_SUCCESS, payload: data.applies })
    } catch (error) {
      dispatch({ type: FETCH_SINGLE_APPLY_ERROR })
    }
  }

  const createApply = async (jobId) => {
    setLoading()
    try {
      const { data } = await axios.post(`/applies/${jobId}`)

      dispatch({ type: CREATE_APPLY_SUCCESS, payload: data.apply })
      const msg = "A"
      sendMail({data,msg })
    } catch (error) {
      dispatch({ type: CREATE_APPLY_ERROR })
    }
  }

  const deleteApply = async (applyId) => {
    setLoading()
    try {
      await axios.delete(`/applies/${applyId}`)
      fetchApplies()
    } catch (error) {
      dispatch({ type: DELETE_APPLY_ERROR })
    }
  }

  const sendMail = async (userInput) => {
    setLoading()
    try {
      await axios.post(`/sendMail`,{...userInput})
      dispatch({ type: SEND_MAIL_SUCCESS })
    } catch (error) {
      dispatch({ type: SEND_MAIL_ERROR })
    }
  }
  


  const updateUser = async (userInput) => {
    setLoading()
    try {
      const {data} = await axios.patch(`/auth/updateUser`,{...userInput})
      dispatch({type: UPDATE_USER_SUCCESS, payload: data.user})
      localStorage.setItem(
        'user',
        JSON.stringify({ name: data.user.name, role: data.user.role,email:data.user.email,grade:data.user.grade, token: data.token })
        )
    } catch (error) {
      dispatch({ type: UPDATE_USER_ERROR })
    }
  }


  const uploadFile = async (userInput) => {
    setLoading()
    try {
      const { data } = await axios.post(`/upload`,{...userInput})
      dispatch({ type: UPLOAD_FILE_SUCCESS, payload: data.upload })
      getFile()
    } catch (error) {
      dispatch({ type: UPLOAD_FILE_ERROR })
    }
  }

  


  const getFile = async () => {
    setLoading()
    try {
      const { data } = await axios.get(`/upload`)
      dispatch({ type: GET_FILE_SUCCESS, payload: data.upload })
    } catch (error) {
      dispatch({ type: GET_FILE_ERROR })
    }
  }

  const searchFunction = async (userInput)=>{
    setLoading()
    try {
      const {search,sort} = initialState
      const {values} = userInput
      dispatch({ type: SEARCH_SUCCESS, payload: values })
      // console.log(search,sort)
    } catch (error) {
      dispatch({ type: SEARCH_FAILURE })
    }
  }

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      const newUser = JSON.parse(user)
      dispatch({ type: SET_USER, payload: newUser })
    }
  }, [])
  return (
    <AppContext.Provider
      value={{
        ...state,
        setLoading,
        register,
        login,
        logout,
        fetchJobs,
        createJob,
        deleteJob,
        fetchSingleJob,
        editJob,
        fetchApplies,
        createApply,
        deleteApply,
        fetchSingleApply,
        updateUser,
        sendMail,
        uploadFile,
        getFile,
        searchFunction,
        fetchSearchedJobs,
        fetchRecommendedJobs,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppProvider }

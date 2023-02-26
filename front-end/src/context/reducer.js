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
  SEND_MAIL_SUCCESS,
  SEND_MAIL_ERROR,
  UPLOAD_FILE_ERROR,
  UPLOAD_FILE_SUCCESS,
  GET_FILE_ERROR,
  GET_FILE_SUCCESS,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  FETCH_RECOMMENDED_JOBS_SUCCESS,
  FETCH_RECOMMENDED_JOBS_ERROR,
} from './actions'

const reducer = (state, action) => {
  if (action.type === SET_LOADING) {
    return { ...state, isLoading: true, showAlert: false, editComplete: false }
  }

  if (action.type === SEARCH_SUCCESS) {
    return { ...state, isLoading: true, showAlert: false, editComplete: false , search: action.payload.search, sort:action.payload.sort}
  }

  if (action.type === SEARCH_SUCCESS) {
    return { ...state, isLoading: true, showAlert: true, editComplete: false}
  }

  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.name,
      name: action.payload.name,
      role: action.payload.role,
      email: action.payload.email,
      userData:action.payload
    }
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      user: null,
      name: null,
      showAlert: true,
      role:null,
      email:null,
      userData:null,
      fileData:null,
    }
  }

  if (action.type === SET_USER) {
    return { ...state, user: action.payload.name,role: action.payload.role,email:action.payload.email,name:action.payload.name,userData:action.payload}
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...state,
      user: null,
      showAlert: false,
      jobs: [],
      applies:[],
      isEditing: false,
      editItem: null,
      role:null,
      name:null,
      email:null,
      userData:null,
      fileData:null,
    }
  }

  if (action.type === FETCH_JOBS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      editItem: null,
      singleJobError: false,
      editComplete: false,
      jobs: action.payload,
    }
  }

  if (action.type === FETCH_RECOMMENDED_JOBS_SUCCESS) {
    return {
      ...state,
      recommendedJobs: action.payload,
    }
  }

  if (action.type === FETCH_RECOMMENDED_JOBS_ERROR) {
    return {
      ...state, isLoading: false
    }
  }

  if (action.type === FETCH_JOBS_ERROR) {
    return { ...state, isLoading: false }
  }
  if (action.type === CREATE_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      jobs: [...state.jobs, action.payload],
    }
  }
  if (action.type === CREATE_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
    }
  }

  if (action.type === DELETE_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
    }
  }

  if (action.type === FETCH_SINGLE_JOB_SUCCESS) {
    return { ...state, isLoading: false, editItem: action.payload }
  }
  if (action.type === FETCH_SINGLE_JOB_ERROR) {
    return { ...state, isLoading: false, editItem: '', singleJobError: true }
  }

  if (action.type === EDIT_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      editComplete: true,
      editItem: action.payload,
    }
  }
  
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      editComplete: true,
      email:action.payload.email,
      name:action.payload.name,
      user:action.payload.name,
      userData:action.payload
    }
  }

  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      editComplete: true,
      showAlert: true,
    }
  }

  if (action.type === UPLOAD_FILE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      editComplete: true,
      fileData:action.payload
    }
  }

  if (action.type === UPLOAD_FILE_ERROR) {
    return {
      ...state,
      isLoading: false,
      editComplete: true,
      showAlert: true,
    }
  }

  if (action.type === GET_FILE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      editComplete: true,
      fileData:action.payload
    }
  }

  if (action.type === GET_FILE_ERROR) {
    return {
      ...state,
      isLoading: false,
      editComplete: true,
      showAlert: true,
    }
  }
  
  
  if (action.type === FETCH_APPLIES_SUCCESS) {
    return {
    ...state,
    isLoading: false,
    editItem: null,
    singleJobError: false,
    editComplete: false,
    applies: action.payload,
  }
}

if (action.type === FETCH_APPLIES_ERROR) {
  return { ...state, isLoading: false }
}


if (action.type === FETCH_SINGLE_APPLY_SUCCESS) {
  return { ...state,
    isLoading: false,
    editItem: null,
    singleJobError: false,
    editComplete: false,
    applies: action.payload,
   }
}

if (action.type === FETCH_SINGLE_APPLY_ERROR) {
  return { ...state, isLoading: false }
}

if (action.type === CREATE_APPLY_SUCCESS) {
  return {
    ...state,
    isLoading: false,
    applies: [...state.applies, action.payload],
  }
}
if (action.type === CREATE_APPLY_ERROR) {
  return {
    ...state,
    isLoading: false,
    showAlert: true,
  }
}


if (action.type === DELETE_APPLY_ERROR) {
  return {
    ...state,
    isLoading: false,
    showAlert: true,
  }
}

if (action.type === SEND_MAIL_SUCCESS) {
  return {
    ...state,
    isLoading: false,
    showAlert: false,
  }
}

if (action.type === SEND_MAIL_ERROR) {
  return {
    ...state,
    isLoading: false,
    showAlert: true,
  }
}


if (action.type === EDIT_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      editComplete: true,
      showAlert: true,
    }
  }
  throw new Error(`no such action : ${action}`)
}

export default reducer

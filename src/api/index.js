import axios from 'axios'
import JobLevel from '../views/perusahaan/joblevel/job-level.vue'

const API_URL = 'https://bug-free-space-waddle-x7j6rqw5jr43p774-8002.app.github.dev/api'
const config = {
  headers: { 'content-type': 'multipart/form-data' },
}
function getToken() {
  return localStorage.getItem('token')
}

// Fungsi untuk membuat instance Axios dengan token otentikasi
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`, // Menambahkan token ke header Authorization
  },
})

// Fungsi untuk memperbarui token di header setiap kali permintaan dibuat
axiosInstance.interceptors.request.use(
  (config) => {
    // Mendapatkan token terbaru dari localStorage dan memperbarui header Authorization
    config.headers.Authorization = `Bearer ${getToken()}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

//company. list all get
export const getCompany = async () => {
  try {
    //axios membawa token yang disimpan di localStorage sebagai auth bearer token
    const response = await axiosInstance.get('/company')
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

//storeCompany. post
export const storeCompany = async (data) => {
  try {
    //kasih header multipart/form-data
    const response = await axiosInstance.post('/company', data, config)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

//showCompany. get
export const showCompany = async (id) => {
  try {
    const response = await axiosInstance.get(`/company/${id}`)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

//updateCompany. put
export const updateCompany = async (data) => {
  try {
    console.log(data)
    const response = await axiosInstance.post(`/company/update`, data, config)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

//deleteCompany. delete
export const deleteCompany = async (id) => {
  try {
    const response = await axiosInstance.delete(`/company/${id}`)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

//getalldivision. get
export const getDivision = async () => {
  try {
    const response = await axiosInstance.get('/division')
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

//getdivision with company  id as query. get
export const getDivisionCompany = async (id) => {
  try {
    const response = await axiosInstance.get(`/division/company/${id}`)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

//storeDivision. post, tanpa multipart/form-data
export const storeDivision = async (data) => {
  try {
    const response = await axiosInstance.post('/division', data)
    console.log(response)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

//divisionDelete. delete
export const deleteDivision = async (id) => {
  try {
    const response = await axiosInstance.delete(`/division/${id}`)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

//joblevel. get
export const getJobLevel = async () => {
  try {
    const response = await axiosInstance.get('/job_level')
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

//joblevel. post
export const storeJobLevel = async (data) => {
  try {
    const response = await axiosInstance.post('/job_level', data)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

//joblevel. delete
export const deleteJobLevel = async (id) => {
  try {
    const response = await axiosInstance.delete(`/job_level/${id}`)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

//updateJobLevel. post
export const updateJobLevel = async (data) => {
  try {
    const response = await axiosInstance.post(`/job_level/update`, data)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

//storeJobPosition. post
export const storeJobPosition = async (data) => {
  try {
    const response = await axiosInstance.post('/job_position', data)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

//getJobPosition. get
export const getJobPosition = async () => {
  try {
    const response = await axiosInstance.get('/job_position')
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

//updateJobPosition. post
export const updateJobPosition = async (data) => {
  try {
    const response = await axiosInstance.post(`/job_position/update`, data)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

//deleteJobPosition. delete
export const deleteJobPosition = async (id) => {
  try {
    const response = await axiosInstance.delete(`/job_position/${id}`)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

//getShift. get
export const getShift = async () => {
  try {
    const response = await axiosInstance.get('/shift')
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

//storeShift. post
export const storeShift = async (data) => {
  try {
    const response = await axiosInstance.post('/shift', data)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

//deleteShift. delete
export const deleteShift = async (id) => {
  try {
    const response = await axiosInstance.delete(`/shift/${id}`)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

//showShift. get
export const showShift = async (id) => {
  try {
    const response = await axiosInstance.get(`/shift/${id}`)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

//updateShift. post
export const updateShift = async (data) => {
  try {
    const response = await axiosInstance.post(`/shift/update`, data)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

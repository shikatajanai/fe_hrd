<template>
  <CRow>
    <CCol>
      <CCard>
        <CCardHeader>Job Position</CCardHeader>
        <CCardBody>
          <button class="btn btn-primary btn-sm" @click="tambahJobPosition">
            Tambah Job Position
          </button>
          <br />
          <COffcanvas
            placement="end"
            :visible="visibleEnd"
            @hide="
              () => {
                visibleEnd = !visibleEnd
              }
            "
          >
            <COffcanvasHeader>
              <COffcanvasTitle>Tambah Job Position</COffcanvasTitle>
              <CCloseButton
                class="text-reset"
                @click="
                  () => {
                    visibleEnd = false
                  }
                "
              />
            </COffcanvasHeader>
            <COffcanvasBody>
              <div>
                <label for="name">Name:</label>
                <input type="text" v-model="name" class="form-control" required />
              </div>
              <br />
              <div>
                <label for="company">Company:</label>
                <select
                  v-model="company"
                  class="form-control"
                  @change="selectCompanyId(company)"
                  required
                >
                  <option v-for="company in companies" :key="company.id" :value="company.id">
                    {{ company.name }}
                  </option>
                </select>
              </div>
              <br />
              <!--select division, hide jika company_id = null-->
              <div v-if="company_id !== 'null'">
                <label for="division">Division:</label>
                <select
                  v-model="selected_division"
                  @change="selectDivision(selected_division)"
                  class="form-control"
                >
                  <option v-for="division in division" :key="division.id" :value="division.id">
                    {{ division.name }}
                  </option>
                </select>
              </div>
              <br />
              <div>
                <label for="description">Description:</label>
                <textarea v-model="description" class="form-control"></textarea>
              </div>
              <br />
              <button class="btn btn-primary" @click="addJobPosition">Simpan</button>
            </COffcanvasBody>
          </COffcanvas>
          <!--EasyDataTable-->
          <EasyDataTable
            show-index
            v-model:items-selected="itemsSelected"
            buttons-pagination
            :headers="headers"
            :items="items"
            :loading="loading"
          >
            <template #loading>
              <img
                src="https://png.pngtree.com/png-vector/20220705/ourmid/pngtree-loading-icon-vector-transparent-png-image_5687537.png"
                style="width: 30px; height: 30px"
              />
            </template>
            <template #item-operation="item">
              <div class="operation-wrapper">
                <button
                  class="btn btn-sm btn-danger"
                  style="color: white"
                  @click="deleteItem(item)"
                >
                  Delete
                </button>
                |
                <button class="btn btn-sm btn-primary" style="color: white" @click="editItem(item)">
                  Edit
                </button>
              </div>
            </template>
          </EasyDataTable>
          <CModal
            :visible="visibleLiveDemo"
            @close="
              () => {
                visibleLiveDemo = false
              }
            "
            aria-labelledby="LiveDemoExampleLabel"
          >
            <CModalHeader>
              <CModalTitle id="LiveDemoExampleLabel">Edit Job Position Name</CModalTitle>
            </CModalHeader>
            <CModalBody>
            <div>
                <label for="name">Company Name:</label>
                <input type="text" v-model="company_selected" class="form-control" readonly />
              </div>
              <br/>

              <div>
                <label for="name">Division Name:</label>
                <input type="text" v-model="division_selected" class="form-control" readonly />
              </div>
              <br />
              <div>
                <label for="name">Name:</label>
                <input type="text" v-model="name_selected" class="form-control" id="fokus" required />
              </div>
              <br />
              
            </CModalBody>
            <CModalFooter>
              <CButton
                color="secondary"
                @click="
                  () => {
                    visibleLiveDemo = false
                  }
                "
              >
                Close
              </CButton>
              <CButton color="primary" @click="editProcess">Save changes</CButton>
            </CModalFooter>
          </CModal>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import {
  getCompany,
  getDivisionCompany,
  storeJobPosition,
  getJobPosition,
deleteJobPosition,
updateJobPosition
} from '@/api/index'
//division
const division = ref([])
const selected_division = ref(null)

//visible end
const items = ref([])
const visibleEnd = ref(false)
const visibleLiveDemo = ref(false)
const loading = ref(true)
//name
const name = ref('')
//company
const company_id = ref('null')
//companies
const companies = ref([])
//job_level_id
const job_level_id = ref(null)
//description
const description = ref('')
//itemsSelected
const itemsSelected = ref(null)

//name_selected
const name_selected = ref('')
//division_selected
const division_selected = ref('')
//company_selected
const company_selected = ref('')
//id_selected
const id_selected = ref(null)


//headers
const headers = [
  { text: 'NAMA', value: 'name' },
  { text: 'COMPANY', value: 'company_name' },
  { text: 'DIVISI', value: 'division_name' },
  { text: 'Operation', value: 'operation' },
]

//edit item, visibleLiveDemo
const editItem = (item) => {
  visibleLiveDemo.value = !visibleLiveDemo.value
  name_selected.value = item.name
  division_selected.value = item.division_name
  company_selected.value = item.company_name
  id_selected.value = item.id
  //arahkan kursor input ke input Name
  setTimeout(() => {
    document.getElementById('fokus').focus()
  }, 100)

  console.log(name_selected.value, division_selected.value, company_selected.value, id_selected.value)
}

//selectDivision
const selectDivision = (id) => {
  selected_division.value = id
  console.log('selected_division:', selected_division.value)
}

//editProcess, job_level_id, name, description dijadikan body
const editProcess = async () => {
  console.log('id_selected:', id_selected.value)
  console.log('name_selected:', name_selected.value)
  console.log('division_selected:', division_selected.value)
  console.log('company_selected:', company_selected.value)
  try {
    const response = await updateJobPosition({
      id: id_selected.value,
      name: name_selected.value,
    })
    console.log('response:', response)
    alert('Job Level berhasil diubah')
    const response1 = await getJobPosition()
    items.value = response1.data
    visibleLiveDemo.value = !visibleLiveDemo.value
  } catch (error) {
    console.error('Error updating job level:', error)
  }
}

//select company, then get division from api getDivisionCompany, async
const selectCompanyId = async (company) => {
  console.log('company:', company)
  company_id.value = company
  try {
    const response = await getDivisionCompany(company)
    division.value = response.data
    console.log('division:', division.value)
  } catch (error) {
    console.error('Error fetching division:', error)
  }
}

//delete item, tanya dulu
const deleteItem = async (item) => {
  const konfirmasi = confirm('Apakah anda yakin ingin menghapus job level ini?')
  if (konfirmasi) {
    try {
      const response = await deleteJobPosition(item.id)
      console.log('response:', response)
      alert('Job Position berhasil dihapus')
      const response1 = await getJobPosition()
      items.value = response1.data
    } catch (error) {
      console.error('Error deleting job position:', error)
      alert('Job Position gagal dihapus')


    }
  }
}

//add job Level
const addJobPosition = async () => {
  try {
    const response = await storeJobPosition({
      name: name.value,
      company_id: company_id.value,
      division_id: selected_division.value,
      description: description.value,
    })
    console.log('response:', response)
    //alert
    alert('Job Level berhasil ditambahkan')
    //refresh, getJobPosition
    const response1 = await getJobPosition()
    items.value = response1.data
    //clear value
    name.value = ''
    company_id.value = 'null'
    selected_division.value = null
    description.value = ''
    //close offcanvas
    visibleEnd.value = !visibleEnd.value


  } catch (error) {
    console.error('Error adding job level:', error)
  }
}

//tambah job level
const tambahJobPosition = () => {
  visibleEnd.value = !visibleEnd.value
}

onMounted(async () => {
  try {
    const response = await getJobPosition()
    items.value = response.data
    loading.value = false
  } catch (error) {
    console.error('Error fetching job level:', error)
  }
  try {
    const response = await getCompany()
    companies.value = response.company
  } catch (error) {
    console.error('Error fetching company:', error)
  }
})
</script>

<template>
  <CRow>
    <CCol>
      <CCard>
        <CCardHeader>Job Level</CCardHeader>
        <CCardBody>
          <button class="btn btn-primary btn-sm" @click="tambahJobLevel">Tambah Job Level</button>
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
              <COffcanvasTitle>Tambah Job Level</COffcanvasTitle>
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
              <div>
                <label for="description">Description:</label>
                <textarea v-model="description" class="form-control"></textarea>
              </div>
              <br />
              <button class="btn btn-primary" @click="addJobLevel">Simpan</button>
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
              <CModalTitle id="LiveDemoExampleLabel">Edit Job Level Name</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <div>
                <label for="name">Name:</label>
                <input type="text" v-model="name" class="form-control" required />
              </div>
              <br />
              <!--textarea-->
              <div>
                <label for="description">Description:</label>
                <textarea v-model="description" class="form-control"></textarea>
              </div>
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
import { getCompany, getJobLevel, storeJobLevel, deleteJobLevel, updateJobLevel } from '@/api/index'

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
const job_levels = ref([])
//headers
const headers = [
  { text: 'NAMA', value: 'job_name' },
  { text: 'COMPANY', value: 'company_name' },
  { text: 'DESCRIPTION', value: 'description' },
  { text: 'Operation', value: 'operation' },
]

//edit item, visibleLiveDemo
const editItem = (item) => {
  visibleLiveDemo.value = !visibleLiveDemo.value
  job_level_id.value = item.id
  name.value = item.job_name
  description.value = item.description
}

//editProcess, job_level_id, name, description dijadikan body
const editProcess = async () => {
  try {
    const response = await updateJobLevel({
      id: job_level_id.value,
      job_name: name.value,
      description: description.value,
    })
    visibleLiveDemo.value = !visibleLiveDemo.value
    //clear value
    name.value = ''
    description.value = ''

    //alert
    alert('Job Level berhasil diubah')
    //refresh
    const response1 = await getJobLevel()
    items.value = response1.data
  } catch (error) {
    console.error('Error updating job level:', error)
  }
}

//select company
const selectCompanyId = (company) => {
  console.log('company:', company)
  company_id.value = company
}

//delete item, tanya dulu
const deleteItem = async (item) => {
  const konfirmasi = confirm('Apakah anda yakin ingin menghapus job level ini?')
  if (konfirmasi) {
    try {
      const response = await deleteJobLevel(item.id)
      console.log('response:', response)
      alert('Job Level berhasil dihapus')
      const response1 = await getJobLevel()
      items.value = response1.data
    } catch (error) {
      console.error('Error deleting job level:', error)
    }
  }
}

//add job Level
const addJobLevel = async () => {
  console.log(
    'name:',
    name.value,
    'company_id:',
    company_id.value,
    'description:',
    description.value,
  )
  try {
    const response = await storeJobLevel({
      job_name: name.value,
      id_company: company_id.value,
      description: description.value,
    })
    console.log('response:', response)
    visibleEnd.value = !visibleEnd.value
    //hilangkan value
    name.value = ''
    company_id.value = 'null'
    description.value = ''
    //alert
    alert('Job Level berhasil ditambahkan')
    //refresh
    const response1 = await getJobLevel()
    items.value = response1.data
  } catch (error) {
    console.error('Error adding job level:', error)
  }
}

//tambah job level
const tambahJobLevel = () => {
  visibleEnd.value = !visibleEnd.value
}

onMounted(async () => {
  try {
    const response = await getCompany()
    companies.value = response.company
    console.log('companies:', companies.value)
    loading.value = false // Set loading ke false
  } catch (error) {
    console.error('Error fetching company:', error)
  }

  try {
    const response = await getJobLevel()
    items.value = response.data
    console.log('job_levels:', job_levels.value)
  } catch (error) {
    console.error('Error fetching job level:', error)
  }
})
</script>

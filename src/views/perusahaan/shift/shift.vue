<template>
  <CRow>
    <CCol>
      <CCard>
        <CCardHeader>Shift</CCardHeader>
        <CCardBody>
          <button
            @click="visible = !visible"
            class="btn btn-sm btn-primary"
            style="margin-bottom: 5px"
          >
            Shift Baru
          </button>
          <COffcanvas
            placement="end"
            :visible="visible"
            @hide="
              () => {
                visible = !visible
              }
            "
          >
            <COffcanvasHeader>
              <COffcanvasTitle>Tambah Shift Baru</COffcanvasTitle>
              <CCloseButton
                class="text-reset"
                @click="
                  () => {
                    visible = false
                  }
                "
              />
            </COffcanvasHeader>
            <COffcanvasBody>
              <!--select company-->
              <div>
                <label for="company">Company:</label>
                <select
                  v-model="company_id"
                  class="form-control"
                  @change="selectCompanyId(company_id)"
                  required
                >
                  <option v-for="company in company" :key="company.id" :value="company.id">
                    {{ company.name }}
                  </option>
                </select>
              </div>
              <br />
              <div>
                <label for="name">Nama Shift:</label>
                <input type="text" v-model="name" class="form-control" required />
              </div>
              <br />

              <div>
                <label for="start_time">Jam Masuk:</label>
                <input type="time" v-model="start_time" class="form-control" required />
              </div>
              <br />

              <div>
                <label for="end_time">Jam Keluar:</label>
                <input type="time" v-model="end_time" class="form-control" required />
              </div>
              <br />
              <button @click="addShift" class="btn btn-primary">Tambah Shift</button>
            </COffcanvasBody>
          </COffcanvas>
          <CModal 
            :visible="modalShow"
            @close="() => { modalShow = false }"
            aria-labelledby="LiveDemoExampleLabel"
          >
            <CModalHeader>
              <CModalTitle id="LiveDemoExampleLabel">Edit Shift</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <div>
                <label for="name">Company:</label>
                <input type="text" v-model="company_selected" class="form-control" readonly />
              </div>
              <br />

              <div>
                <label for="start_time">Jam Masuk:</label>
                <input type="time" v-model="start_time_selected" class="form-control" required />
              </div>
              <br />

              <div>
                <label for="end_time">Jam Keluar:</label>
                <input type="time" v-model="end_time_selected" class="form-control" required />
              </div>
              <br />
              <div>
                <label for="name">Nama Shift:</label>
                <input type="text" v-model="name_selected" class="form-control" required />
              </div>
              <br />
              
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" @click="() => { modalShow = false }">
                Close
              </CButton>
              <CButton @click='saveChanges' color="primary">Save changes</CButton>
            </CModalFooter>
          </CModal>

          <EasyDataTable show-index :items="items" :headers="headers">
          
            <template #item-operation="item">
              <button
              @click="edit(item)"
                class="btn btn-sm btn-warning"
                style="margin-bottom: 5px;color:white"
              >
              Edit
                

              </button> | 
              <button
                @click="delete_shit(item.id)"
                class="btn btn-sm btn-danger"
                style="margin-bottom: 5px;color:white"
              >
                Hapus
              </button>
              
            </template>
            
          </EasyDataTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getShift, getCompany, storeShift, deleteShift, updateShift } from '@/api/index'

const headers = [
  { text: 'NAMA SHIFT', value: 'name' },
  { text: 'COMPANY', value: 'company_name' },
  { text: 'JAM MASUK', value: 'start_time' },
  { text: 'JAM KELUAR', value: 'end_time' },
  { text: 'Operation', value: 'operation' },
]
const items = ref([])
const visible = ref(false)
const visibleEnd = ref(false)
const company = ref([])
const modalShow = ref(false)

const name = ref('')
const start_time = ref('')
const end_time = ref('')
const name_selected = ref('')
const start_time_selected = ref('')
const end_time_selected = ref('')
const company_selected = ref('')
const id_selected = ref('')
const company_id = ref('')
const selectCompanyId = (id) => {
  company_id.value = id
}

const saveChanges = async () => {
  const response = await updateShift({
    id: id_selected.value,
    name: name_selected.value,
    start_time: start_time_selected.value,
    end_time: end_time_selected.value,
  })
  const responseShift = await getShift()
  items.value = responseShift.data
  modalShow.value = false
}

const addShift = async () => {
  const response = await storeShift({
    name: name.value,
    start_time: start_time.value,
    end_time: end_time.value,
    id_company: company_id.value,
  })

  //ambil list shift lagi
  const responseShift = await getShift()
  items.value = responseShift.data
  visible.value = false
  //reset form
  name.value = ''
  start_time.value = ''
  end_time.value = ''
  company_id.value = ''
}

const delete_shit = async (id) => {
  if (confirm('Apakah anda yakin ingin menghapus shift ini?')) {
    const response = await deleteShift(id)
    const responseShift = await getShift()
    items.value = responseShift.data
  }
}

const edit = async (id) => {
  console.log(id)
  modalShow.value = true
  company_selected.value = id.company_name
  id_selected.value = id.id
  name_selected.value = id.name
  start_time_selected.value = id.start_time
  end_time_selected.value = id.end_time
  
}



//onMounted
onMounted(async () => {
  try {
    const response = await getShift()
    const companyResponse = await getCompany()
    company.value = companyResponse.company
    items.value = response.data
    console.log(items.value)
    console.log(company.value)
  } catch (error) {
    console.error('Error fetching shift:', error)
  }
})
</script>

<template>
  <CRow>
    <CCol>
      <CCard>
        <CCardHeader>Pendaftaran Perusahaan Baru</CCardHeader>
        <CCardBody>
          <CButton
            color="primary"
            size = "sm"
            style="margin-bottom: 5px"
            @click="
              () => {
                visibleEnd = !visibleEnd
              }
            "
            >Divisi Baru</CButton
          >

          <CAlert 
          v-if="alert_gagal" 
          style = "margin-top: 10px"  
          color="danger">{{message}}</CAlert>
          <CAlert 
          v-if="alert_sukses" 
          style = "margin-top: 10px"  
          color="success">{{message}}</CAlert>

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
              <COffcanvasTitle>Input Divisi Baru</COffcanvasTitle>
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
                <select v-model="company" class="form-control" @change="selectDivision(company)">
                  <option v-for="company in companies" :key="company.id" :value="company.id">
                    {{ company.name }}
                  </option>
                </select>
                <br />
                <div v-if="division_options_true">
                  <label for="division">Parent:</label>
                  <select v-model="parent" class="form-control">
                    <option
                      v-for="division in division_company"
                      :key="division.id"
                      :value="division.id"
                    >
                      {{ division.name }}
                    </option>
                  </select>
                  <br />
                  <label for="description">Description:</label>
                  <textarea v-model="description" class="form-control" required></textarea>
                  <br />
                  <!--button-->
                  <button 
                  class="btn btn-primary"
                   @click="addDivision">Simpan</button>
                </div>
              </div>
              <br />
            </COffcanvasBody>
          </COffcanvas>
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
            <template #item-player="{ player, avator, page }">
              <div class="player-wrapper">
                <img class="avator" :src="avator" alt="" />
                <a target="_blank" :href="page">{{ player }}</a>
              </div>
            </template>
            <template #item-team="{ teamName, teamUrl }">
              <a target="_blank" :href="teamUrl">{{ teamName }}</a>
            </template>
            <template #item-operation="item">
              <div class="operation-wrapper">
                <button class="btn btn-sm btn-danger" style="color:white;" @click="deleteItem(item)">Delete</button>
              </div>
              
            </template>
          </EasyDataTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getCompany, getDivision, getDivisionCompany, storeDivision, deleteDivision } from '@/api/index'


const visibleEnd = ref(false)
const name = ref('')
const companies = ref([])
const company_id = ref(null)
const division = ref([])
//parent integer
const parent = ref(null)
const division_company = ref([])
const description = ref('')
const items = ref([])
const loading = ref(true)
const alert_gagal = ref(false)
const message = ref('')
const alert_sukses = ref(false)

const division_options_true = ref(false)

const headers = [
  { text: 'NAMA DIVISI', value: 'name' },
  { text: 'COMPANY', value: 'company_name' },
  { text: 'PARENT', value: 'parent_name' },
  { text: 'DESCRIPTION', value: 'description' },
  { text: 'Operation', value: 'operation' },
];

const selectDivision = async (id) => {
  try {
    company_id.value = id
    const response = await getDivisionCompany(id)
    division_options_true.value = true
    division_company.value = response.data
    console.log(division_company.value)
  } catch (error) {
    console.error('Error fetching division:', error)
  }
}

const edit = (item) => {
  console.log(item)
  //offcanvas visible
  visibleEnd.value = true
  //set value
  name.value = item.name
  parent.value = item.parent_id
  //division_options_true true
  division_options_true.value = true
  description.value = item.description
  company_id.value = item.id_company


}

const deleteItem = async (item) => {
//alert konfirmasi dulu
  if (confirm('Are you sure you want to delete this division?')) {
    try {
      const response = await deleteDivision(item.id)
      //get division lagi 
      const response2 = await getDivision()
      division.value = response2.data
      items.value = response2.data
      alert_sukses.value = true
      message.value = 'Division deleted successfully'
      //after 3 seconds alert will disappear
      setTimeout(() => {
        alert_sukses.value = false
      }, 4000)
    } catch (error) {
      console.error('Error deleting division:', error)
      alert_gagal.value = true
      message.value = error.response.data.message
      //after 3 seconds alert will disappear
      setTimeout(() => {
        alert_gagal.value = false
      }, 4000)
    }
  }
}

const addDivision = async () => {
  //jika division_options_true false maka akan muncul alert
  if (!division_options_true.value) {
    alert('Please select company first')
    return
  }
  try {
  console.log(company_id.value)
    const response = await storeDivision({
      name: name.value,
      id_company: company_id.value,
      parent_id: parent.value,
      description: description.value,
    })
    console.log(response)
    alert_sukses.value = true
    message.value = 'Division added successfully'

    //reset form
    name.value = ''
    parent.value = null
    description.value = ''
    //close offcanvas
    visibleEnd.value = false
    //division company update lagi
    const response1 = await getDivisionCompany(company_id.value)
    division_company.value = response1.data
    //get division lagi 
    const response2 = await getDivision()
    division.value = response2.data
    items.value = response2.data
    //after 3 seconds alert will disappear
    setTimeout(() => {
      alert_sukses.value = false
    }, 4000)


  } catch (error) {
    console.error('Error adding division:', error)
    alert('Error adding division')
  }
}

//ambil data perusahaan saat halaman dimuat
onMounted(async () => {
  try {
    const response = await getCompany()

    companies.value = response.company
    console.log(companies.value)
  } catch (error) {
    console.error('Error fetching company:', error)
  }
  //get division
  try {
    const response = await getDivision()
    items.value = response.data
    loading.value = false // Set loading ke false
    console.log(division.value)
  } catch (error) {
    console.error('Error fetching division:', error)
  }
})
</script>

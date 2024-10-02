
<template>
  <CRow>
    <CCol>
      <CCard>
        <CCardHeader>Job Level</CCardHeader>
        <CCardBody>
        <button
        class="btn btn-primary btn-sm"
        @click="tambahJobLevel"
        >
        Tambah Job Level
        </button>
        <br/>
        <COffcanvas placement="end" :visible="visibleEnd" @hide="() => { visibleEnd = !visibleEnd }">
            <COffcanvasHeader>
            <COffcanvasTitle>Tambah Job Level</COffcanvasTitle>
            <CCloseButton class="text-reset" @click="() => { visibleEnd = false }"/>
            </COffcanvasHeader>
            <COffcanvasBody>
            <div>
                <label for="name">Name:</label>
                <input type="text" v-model="name" class="form-control" required />
            </div>
            <br />
            <div>
                <label for="company">Company:</label>
                <select v-model="company" class="form-control" @change="selectCompanyId(company)" required>
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
          > 
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
import { getCompany, getJobLevel, storeJobLevel, deleteJobLevel } from '@/api/index'




//visible end
const items = ref([])
const visibleEnd = ref(false)
//name
const name = ref('')
//company
const company_id = ref('null')
//companies
const companies = ref([])
//description
const description = ref('')
const job_levels = ref([])
//headers
const headers = [
  { text: 'NAMA', value: 'job_name' },
  { text: 'COMPANY', value: 'company_name' },
  { text: 'DESCRIPTION', value: 'description' },
  { text: 'Operation', value: 'operation' },
];



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
console.log('name:', name.value, 'company_id:', company_id.value, 'description:', description.value)
    try {
        const response = await storeJobLevel({
            job_name: name.value,
            id_company: company_id.value,
            description: description.value
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

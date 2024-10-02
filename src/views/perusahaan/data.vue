<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>Data Perusahaan</strong>
        </CCardHeader>
        <CCardBody>
          <CButton color="primary" size="sm" style="margin-bottom: 5px" @click="routeToNewCompany"
            >Daftarkan Perusahaan Baru</CButton
          >

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
                <CButton color="secondary" size="sm" @click="editItem(item.id)">Edit</CButton> | 
                <button class="btn btn-sm btn-danger" style="color:white;" @click="deleteItem(item)">Delete</button>
              </div>
              
            </template>
          </EasyDataTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { mockClientItems, mockItems } from './mock'
import { Header, Item } from 'vue3-easy-data-table'
import { getCompany, deleteCompany } from '@/api/index'
import router from '@/router'

export default defineComponent({
  components: {},
  setup() {
    const headers: Header[] = [
      { text: 'NAMA PERUSAHAAN', value: 'name' },
      //address
      { text: 'ADDRESS', value: 'address' },
      //phone
      { text: 'PHONE', value: 'phone' },
      { text: 'Operation', value: 'operation' },
    ]
    const itemsSelected: Item[] = ref([])
    const items: Item[] = ref([])
    const loading = ref(true)
    const editingItem = reactive({ height: '', weight: '', id: 0 })

    // Ambil data dari API saat komponen dimuat
    onMounted(async () => {
      try {
        const response = await getCompany() // Ambil data dari API
        console.log(response.company) // Log hasil ke console
        items.value = response.company // Atur data ke items
      } catch (error) {
        console.error('Error fetching data:', error) // Log error jika ada
      } finally {
        loading.value = false // Set loading ke false
      }
    })

    const isEditing = ref(false)

    //fungsi untuk route ke perusahaan baru
    const routeToNewCompany = () => {
      //route ke halaman perusahaan baru
      router.push({ name: 'NewCompany' })
    }

    //editItem
    const editItem = (id: number) => {
      //route ke halaman edit perusahaan
      router.push({ name: 'EditCompany', params: { id: id.toString() } })
    }

    const deleteItem = (item: Item) => {
      //alert confirm ya atau tidak, deleteCompany
      if (confirm('Are you sure you want to delete this item?')) {
        //delete company
        deleteCompany(item.id)
          .then(() => {
            //alert company berhasil dihapus
            alert('Company deleted successfully')
            //hapus item dari items
            items.value = items.value.filter((i) => i.id !== item.id)
          })
          .catch((error) => {
            //alert error
            alert('Error deleting company')
            console.error('Error deleting company:', error)
          })
      }
    }

    return {
      loading,
      headers,
      items,
      routeToNewCompany,
      deleteItem,
      editItem,
    }
  },
})
</script>

<style>
.operation-wrapper .operation-icon {
  width: 20px;
  cursor: pointer;
}
.player-wrapper {
  padding: 5px;
  display: flex;
  align-items: center;
  justify-items: center;
}
.avator {
  margin-right: 10px;
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 10%);
}
</style>

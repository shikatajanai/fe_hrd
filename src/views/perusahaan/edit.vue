<script setup>
import { showCompany, updateCompany } from '@/api/index'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router' // Import useRoute

// Use useRoute to get route parameters
const route = useRoute()
const id = route.params.id // Access the id parameter

// Definisikan state
const formData = ref({
  name: '',
  address: '',
  phone: '',
  provinsi: '',
  city: '',
  industry: '',
  companySize: '',
  npwp: '',
  taxable: '',
  taxname: '',
  hqInitial: '',
  umr: '',
  bpjs_Kesehatan: '',
  bpjs_Ketenagakerjaan: '',
  description: '',
  logo: null
});

// Fungsi untuk meng-handle perubahan file
const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    formData.value.logo = file;
  }
};

// Fetch company data from the API when the component is mounted
const company = ref({})
onMounted(async () => {
  try {
    const response = await showCompany(id)
    company.value = response.company
    formData.value = response.company
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})

// Fungsi untuk submit form
const submitForm = async () => {
  const form = new FormData();
  form.append('id', id);
  form.append('name', formData.value.name);
  form.append('address', formData.value.address);
  form.append('phone', formData.value.phone);
  form.append('provinsi', formData.value.provinsi);
  form.append('city', formData.value.city);
  form.append('industry', formData.value.industry);
  form.append('companySize', formData.value.companySize);
  form.append('npwp', formData.value.npwp);
  form.append('taxable', formData.value.taxable);
  form.append('taxname', formData.value.taxname);
  form.append('hqInitial', formData.value.hqInitial);
  form.append('umr', formData.value.umr);
  form.append('bpjs_Kesehatan', formData.value.bpjs_Kesehatan);
  form.append('bpjs_Ketenagakerjaan', formData.value.bpjs_Ketenagakerjaan);
  form.append('description', formData.value.description);
  if (formData.value.logo) {
    console.log('logo:', formData.value.logo);
    form.append('logo', formData.value.logo);
  }

  try {
  console.log('form:', formData.value)
    await updateCompany(form)
    alert('Company updated successfully')
  } catch (error) {
    console.error('Error updating company:', error)
  }
};

</script>

<template>
  <CRow>
    <CCol>
      <CCard>
        <CCardHeader>Edit Perusahaan</CCardHeader>
        <CCardBody>
          <CRow>
                        <form @submit.prevent="submitForm">
              <div>
                <label for="name">Name:</label>
                <input type="text" v-model="formData.name" class="form-control" required />
              </div>

              <div>
                <label for="address">Address:</label>
                <input type="text" v-model="formData.address" class="form-control" required />
              </div>

              <div>
                <label for="phone">Phone:</label>
                <input type="text" v-model="formData.phone" class="form-control"  />
              </div>

              <div>
                <label for="provinsi">Provinsi:</label>
                <input type="text" v-model="formData.provinsi" class="form-control"  />
              </div>

              <div>
                <label for="city">City:</label>
                <input type="text" v-model="formData.city" class="form-control"  />
              </div>

              <div>
                <label for="industry">Industry:</label>
                <!--select, IT, Finance, education, marketing, etc-->
                <select v-model="formData.industry" class="form-control" >
                  <option value="IT">IT</option>
                  <option value="Finance">Finance</option>
                  <option value="Education">Education</option>
                  <option value="Marketing">Marketing</option>
                  <!--other-->
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label for="companySize">Company Size:</label>
                <!--select, 1-10, 11-50, 51-200, 201-500, 501-1000, 1001-5000, 5001-10000, 10001+-->
                <select v-model="formData.companySize" class="form-control" >
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="201-500">201-500</option>
                  <option value="501-1000">501-1000</option>
                  <option value="1001-5000">1001-5000</option>
                  <option value="5001-10000">5001-10000</option>
                  <option value="10001+">10001+</option>
                </select>
              </div>

              <div>
                <label for="npwp">NPWP:</label>
                <input type="text" v-model="formData.npwp" class="form-control"  />
              </div>

              <div>
                <label for="taxable">Taxable:</label>
                <!--select, yes, no-->
                <select v-model="formData.taxable" class="form-control" >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label for="taxname">Tax Name:</label>
                <input type="text" v-model="formData.taxname" class="form-control"  />
              </div>

              <div>
                <label for="hqInitial">HQ Initial:</label>
                <input type="text" v-model="formData.hqInitial" class="form-control"  />

              </div>

              <div>
                <label for="umr">UMR:</label>
                <input type="text" v-model="formData.umr" class="form-control"  />
              </div>

              <div>
                <label for="bpjs_Kesehatan">BPJS Kesehatan:</label>
                <input type="text" v-model="formData.bpjs_Kesehatan" class="form-control"  />
              </div>

              <div>
                <label for="bpjs_Ketenagakerjaan">BPJS Ketenagakerjaan:</label>
                <input type="text" v-model="formData.bpjs_Ketenagakerjaan" class="form-control"  />
              </div>

              <div>
                <label for="description">Description:</label>
                <!--text area-->
                <textarea v-model="formData.description" class="form-control" ></textarea>
              </div>

              <div>
                <label for="logo">Logo (Optional):</label>
                <br/> logo sebelumnya:
                <img :src="company.logo" alt="logo" style="width: 100px; height: 100px" />
                <input type="file" @change="onFileChange" class="form-control" />
              </div>
              <br />
              <button type="submit">Submit</button>
            </form>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

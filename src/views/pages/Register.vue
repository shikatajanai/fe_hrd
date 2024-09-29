<script setup>
import { ref, computed } from "vue";
import { register } from "@/api/auth";
import router from "@/router";

const name = ref("");
const email = ref("");
const password = ref("");
const repeatPassword = ref("");
const isSuccessful = ref(false);
const ifError = ref(false);
const error_message = ref("");

const registerProses = () => {
  ifError.value = false;
  console.log(name.value, email.value, password.value, repeatPassword.value);
  register(name.value, email.value, password.value)
    .then((response) => {
      console.log("berhasil register");
      isSuccessful.value = true;
    })
    .catch((error) => {
      console.log(error);
      error_message.value = error.response.data.message;
      ifError.value = true;
      console.log("password salah");
    });
};

//fungsi route push ke "Login"
const login = () => {
  router.push({ name: "Login" });
};

</script>
<template>
  <div class="bwrapper min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="9" :lg="7" :xl="6">
          <CCard class="mx-4">
            <CCardBody class="p-4">
              <CForm>
                <h1>Register</h1>
                <p class="text-body-secondary">Create your account (Ini adalah akun untuk admin perusahaan)</p>
                <CAlert 
                v-if="isSuccessful"
                color="success"
                >Pendaftaran berhasil, klik 
                <CAlertLink @click="login">disini</CAlertLink> untuk login
              </CAlert>
              <CAlert
                v-if="ifError"
                color="danger"
              >Pendaftaran gagal, karena {{ error_message }}  
              </CAlert>
              



                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput 
                  placeholder="Name" 
                  autocomplete="name"
                  v-model="name"
                  
                  />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput placeholder="Email"
                  v-model="email"
                   autocomplete="email" />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="Password"
                    autocomplete="new-password"
                    v-model="password"
                  />
                </CInputGroup>
                <CInputGroup class="mb-4">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="Repeat password"
                    autocomplete="new-password"
                    v-model="repeatPassword"
                  />
                </CInputGroup>
                <div class="d-grid">
                  <CButton 
                  @click="registerProses" 
                  color="success">Create Account</CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

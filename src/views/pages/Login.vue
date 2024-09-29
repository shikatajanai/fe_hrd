<script setup>
import router from "@/router";
import { ref, computed } from "vue";
import { login } from "@/api/auth";

const email = ref("");
const password = ref("");

//buat fungsi login
const loginProses = () => {
  //login ke fungsi login di api.js
  console.log(email.value, password.value);
  login(email.value, password.value)
    .then((response) => {
      console.log("berhasil login");
      //jika berhasil maka ke route dashboard
      router.push({ name: "Home" });
    })
    .catch((error) => {
      console.log(error);
      console.log("password salah");
    });
};

//fungsi route push ke "Register"
const register = () => {
  router.push({ name: "Register" });
};

</script>

<template>
  <div class="wrapper min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-body-secondary">Sign In to your account</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autocomplete="username"
                      v-model="email"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autocomplete="current-password"
                      v-model="password"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton color="primary" class="px-4" @click="loginProses" > Login </CButton>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0">
                        Forgot password?
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>
                    Daftarkan perusahaan anda sekarang juga dan dapatkan akses ke berbagai fitur yang kami sediakan
                  </p>
                  <CButton color="light" variant="outline" class="mt-3" @click="register">
                    Register Now!
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>


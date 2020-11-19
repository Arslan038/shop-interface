<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue'
export default {
  computed: {
    checkPage() {
      const page = this.$route.name
      if(page == 'Home' || page == 'AccountCreation' || page == 'ForgotPassword' || page == 'ResetPassword' || page == 'CompanyAccountCreation') {
        return false
      }
      return true
    }
  },
  components: {
    Navbar
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
  background: #f9f9f9;
}
hr {
    border: .5px solid #E96928 !important;;
}
.b-sidebar > .b-sidebar-header {
  display: none !important;
}
.b-sidebar {
  width: 263px !important;
}
.pink, .b-sidebar > .b-sidebar-body {
  background: rgb(248, 206, 178);
}
.text-dark {
  color: #ac4816 !important;
}
.btn-primary {
  background: #E96928 !important;
  border: none !important;
}

.btn-primary:focus {
  box-shadow: none !important;
  background: #E96928 !important;
}

.btn-secondary {
  background: #fff !important;
  color: black !important;
  border: 1px solid #E96928 !important;
}
.btn-secondary:hover {
  background: #E96928 !important;
  color: white !important;
  border: 1px solid #E96928 !important;
}
.navbar-toggler-icon {
  background-image: url('./assets/menu.jpg') !important;
  
}
.navbar-light .navbar-toggler {
border: none !important;
}
.btn-secondary:focus {
  box-shadow: none !important;
}
.spinner-grow {
  background-color: #E96928 !important;
}
.text-orange {
  color: #E96928 !important;
}
.ant-switch-checked {
  background-color: #E96928 !important;
}
th {
  color: #E96928 !important;
  font-weight: bold !important;
}
.ant-pagination-item-active {
  border: 1px solid #E96928 !important;
}
.ant-pagination-item-active a {
  color: #E96928 !important;
}
input:focus, textarea:focus, select:focus {
  box-shadow: none !important;
  border: 1px solid black !important
}
.ant-radio-group-solid .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
  background: #ac4816 !important;
  color: #fff !important;
  border: 1px solid #ac4816 !important;
}

.custom-control-input:checked ~ .custom-control-label::before {
    color: #fff;
    border-color: #E96928 !important;
    background-color: #E96928 !important;
}
.ant-tag-checkable {
  border: 1px solid #E96928 !important;
}
.ant-tag-checkable:hover {
  cursor: pointer !important;
}
.ant-tag-checkable-checked {
    background-color: #E96928 !important;
}
</style>

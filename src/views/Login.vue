<template>
  <v-container class="login d-flex flex-column align-center justify-center">
    <v-img
      :src="require('@/assets/LOGO1.png')"
      class="my-3"
      contain
      max-height="95"
    />
    <FormLogin />
  </v-container>
</template>

<script>
import FormLogin from "@/components/auth/FormLogin.vue";

export default {
  name: "Login-view",

  components: {
    FormLogin,
  },

  data: () => ({}),
};
</script>

<style>
.login {
  min-width: 100vw;
  min-height: 100vh;
  background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.3)), #3b3477;
}
</style>

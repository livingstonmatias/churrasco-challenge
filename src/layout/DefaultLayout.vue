<template>
  <v-main>
    <v-toolbar flat color="primary">
      <div class="container d-flex justify-space-between align-center">
        <img
          height="36px"
          src="https://res.cloudinary.com/dfl2pqtq7/image/upload/v1662980185/resources/churrasco-brand_jzn61d.png"
        />

        <ModalPreventLogout />
      </div>
    </v-toolbar>

    <v-container>
      <router-view />
    </v-container>
  </v-main>
</template>

<script>
import { logout } from "@/services/auth.services";
import ModalPreventLogout from "@/components/auth/ModalPreventLogout";

export default {
  name: "DefaultLayout",

  components: {
    ModalPreventLogout,
  },

  methods: {
    handleLogout() {
      logout().then(() => this.$router.push("/login"));
    },
  },
};
</script>

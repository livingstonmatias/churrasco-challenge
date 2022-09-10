<template>
  <v-dialog v-model="showModal" width="300" @click:outside="showModal = false">
    <template #activator="{ on, attrs }">
      <v-btn icon dark dense v-bind="attrs" v-on="on">
        <v-icon>mdi-login-variant</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="d-flex justify-end">
        <v-btn icon @click="showModal = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <h2>Estas seguro que quiere salir</h2>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="showModal = false"> Cancel </v-btn>
        <v-btn color="primary" @click="handleLogout()"> Accept </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { logout } from "@/services/auth.services";

export default {
  name: "DefaultLayout",

  data: () => ({
    showModal: false,
  }),

  methods: {
    handleLogout() {
      logout().then(() => this.$router.push("/login"));
    },
  },
};
</script>

<style scoped></style>

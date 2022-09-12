<template>
  <v-form max-width="240" @submit.prevent="handleSubmit">
    <v-card>
      <v-text-field
        v-model="auth.username"
        hide-details
        placeholder="Username"
        class="px-4"
        flat
        solo
      >
        <template v-slot:prepend>
          <v-icon small>mdi-account</v-icon>
        </template>
      </v-text-field>

      <v-divider></v-divider>

      <v-text-field
        v-model="auth.password"
        hide-details
        placeholder="Password"
        type="password"
        class="px-4"
        flat
        solo
      >
        <template v-slot:prepend>
          <v-icon small>mdi-lock</v-icon>
        </template>
      </v-text-field>
    </v-card>

    <div class="d-flex align-center justify-space-between">
      <v-checkbox dark off-icon="mdi-square" label="remember me"></v-checkbox>

      <v-btn
        depressed
        :loading="isLoading"
        :disabled="isLoading"
        color="primary"
        type="submit"
        dark
        large
      >
        <span class="btn-label">Log in</span>
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import { login } from "@/services/auth.services";
import { toastAlert } from "@/helper/toastAlert";

export default {
  name: "FormLogin",

  data: () => ({
    auth: {
      username: "",
      password: "",
    },
    rules: {
      email: [],
      password: [],
    },
    isLoading: false,
    valid: false,
  }),

  methods: {
    handleSubmit() {
      this.isLoading = true;

      login(this.auth)
        .then(() => this.$router.push("/products"))
        .catch((err) =>
          toastAlert({
            type: "error",
            message: err
              ? err
              : "oops! we had problems processing your request",
          })
        )
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>

<style scoped>
.btn-label {
  font-weight: bold;
  text-transform: capitalize;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.7);
}
</style>

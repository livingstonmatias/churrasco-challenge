<template>
  <v-form
    v-model="valid"
    class="product-add-form"
    @submit.prevent="handleSubmit"
  >
    <v-row>
      <v-col v-if="error" cols="12">
        <v-alert text prominent type="error" icon="mdi-cloud-alert">
          {{ error }}
        </v-alert>
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          v-model="product.sku"
          :rules="rules.sku"
          label="SKU"
          name="sku"
          placeholder="Ej: 7610848337010"
          outlined
          dense
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          v-model.number="product.code"
          :rules="rules.code"
          label="Code"
          name="code"
          placeholder="Ej: 2030"
          outlined
          dense
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="product.name"
          :rules="rules.name"
          label="Name"
          name="name"
          placeholder="Ej: Mangos"
          outlined
          dense
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-textarea
          v-model="product.description"
          name="description"
          label="Description"
          placeholder="Ej: mango (Thailandia)"
          outlined
          dense
        ></v-textarea>
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          v-model.number="product.price"
          :rules="rules.price"
          label="Price"
          name="price"
          placeholder="Ej: 100.00"
          outlined
          dense
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="6">
        <v-select
          v-model="product.currency"
          :rules="rules.currency"
          :items="currencies"
          name="currency"
          item-text="name"
          item-value="code"
          label="Currency"
          placeholder="currency"
          outlined
          dense
        ></v-select>
      </v-col>

      <v-col cols="12">
        <upload-image v-model="product.pictures" name="pictures" />
      </v-col>

      <v-col cols="12" class="d-flex justify-end align-center">
        <v-btn
          depressed
          large
          text
          color="primary"
          type="button"
          @click.prevent="$router.push('/products')"
        >
          <span class="btn-label">Cancel</span>
        </v-btn>
        <v-btn
          depressed
          large
          color="primary"
          :disabled="!valid"
          :loading="isLoading"
          type="submit"
        >
          <span class="btn-label">Accept</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { createProduct } from "@/services/products.services";
import UploadImage from "../ui/UploadImage.vue";

export default {
  name: "product-add-form",

  components: { UploadImage },

  data: () => ({
    valid: false,
    isLoading: false,
    error: null,
    product: {
      sku: "",
      code: "",
      name: "",
      description: "",
      pictures: [],
      price: null,
      currency: "",
    },
    currencies: [
      { symbol: "$", code: "ARS", name: "Pesos Argentinos" },
      { symbol: "$", code: "USD", name: "Dolares Estadounidences" },
    ],
    rules: {
      sku: [(v) => !!v || "SKU is required"],
      code: [(v) => !!v || "Code is required"],
      name: [(v) => !!v || "Name is required"],
      price: [(v) => !!v || "Price is required"],
      currency: [(v) => !!v || "Currency is required"],
    },
  }),

  methods: {
    handleSubmit() {
      this.isLoading = true;

      createProduct(this.product)
        .then(() => this.$router.push("/products"))
        .catch((err) => (this.error = err))
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>

<style lang="scss">
.product-add-form {
  max-width: 968px;
  margin: 0 auto;
}
</style>

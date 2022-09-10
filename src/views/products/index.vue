<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container class="pt-10">
    <modal-product-detail
      v-model="showModalDetail"
      :product="productSelected"
    />

    <v-row>
      <v-col cols="12" lg="4">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          placeholder="Busca por nombre o descripcion del producto"
          outlined
          dense
          hide-details
        ></v-text-field>
      </v-col>

      <v-col cols="12" lg="8" class="d-flex justify-end align-center">
        <v-btn
          depressed
          large
          color="primary"
          @click.prevent="$router.push('/products/add')"
        >
          <span class="btn-label">add product</span>
        </v-btn>
      </v-col>

      <v-col cols="12">
        <v-data-table
          :search="search"
          :headers="headers"
          :items="products"
          :items-per-page="10"
          :loading="isLoading"
          :page.sync="page"
          @page-count="pageCount = $event"
          @click:row="handleShowProductDetail"
          hide-default-footer
          class="elevation-1"
        >
          <template v-slot:item.name="{ item }">
            <v-btn icon color="primary" @click="handleShowProductDetail(item)">
              <v-icon>mdi-launch</v-icon>
            </v-btn>
            <span>{{ item.name }}</span>
          </template>
        </v-data-table>
      </v-col>

      <v-col cols="12">
        <v-pagination
          class="pt-4"
          v-model="page"
          :length="pageCount"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getProducts } from "@/services/products.services";
import ModalProductDetail from "@/components/product/ModalProductDetail.vue";

export default {
  name: "products-list",

  components: { ModalProductDetail },

  data: () => ({
    page: 1,
    columns: 4,
    pageCount: 0,
    productSelected: null,
    showModalDetail: false,
    show: false,
    isLoading: false,
    products: [],
    error: "",
    search: "",
    headers: [
      { text: "Name", align: "start", value: "name" },
      { text: "Description", value: "description" },
      { text: "Code", value: "code" },
      { text: "SKU", value: "SKU" },
      { text: "Currency", value: "currency" },
      { text: "Price", value: "price" },
    ],
  }),

  mounted() {
    this.getAllProducts();
  },

  methods: {
    getAllProducts() {
      this.isLoading = true;

      getProducts()
        .then((res) => {
          this.products = res.data;
        })
        .catch((err) => {
          this.error = err;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    handleShowProductDetail(product) {
      this.productSelected = product;
      this.showModalDetail = true;
    },
  },
};
</script>

<style scoped></style>

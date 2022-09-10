<template>
  <div class="pa-4">
    <h1 class="mb-10">Add new products</h1>

    <ProductAddForm />
  </div>
</template>

<script>
import ProductAddForm from "@/components/product/ProductAddForm.vue";

export default {
  name: "products-description",

  components: { ProductAddForm },
};
</script>

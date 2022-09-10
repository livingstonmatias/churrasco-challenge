<template>
  <v-file-input
    chips
    multiple
    outlined
    dense
    truncate-length="15"
    accept="image/*"
    loader-height="6"
    :name="name"
    :loading="isLoading"
    :error-messages="errorMessages"
    @change="upload"
  ></v-file-input>
</template>

<script>
import { uploadFiles } from "@/services/uploadImage.services";

export default {
  name: "upload-image",

  props: {
    value: { type: Array, default: () => [] },
    name: String,
  },

  data: () => ({
    isLoading: false,
    errorMessages: [],
  }),

  methods: {
    validateFile(file) {
      if (!file) return "Image not found";
      if (file.size > 2000000) return "Image size should be less than 2 MB!";

      return true;
    },

    async upload(files) {
      this.isLoading = true;

      this.errorMessages = files
        .map((file) => this.validateFile(file))
        .filter((error) => typeof error !== "boolean");

      if (this.errorMessages.length > 0) return;

      const urls = await uploadFiles({ files });

      this.$emit("input", [...this.value, ...urls]);
      this.isLoading = false;
    },
  },
};
</script>

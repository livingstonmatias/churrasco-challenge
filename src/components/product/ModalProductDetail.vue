<template>
  <v-dialog :value="value" width="800" @click:outside="$emit('input', false)">
    <v-card v-if="product">
      <v-toolbar flat color="transparent">
        <v-toolbar-title>Product detail</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon @click="$emit('input', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <v-row>
          <v-col cols="12" lg="6">
            <v-carousel
              hide-delimiters
              :show-arrows="pictures.length > 1"
              height="300"
            >
              <v-carousel-item
                v-for="(picture, i) in pictures"
                :key="i"
                :src="picture"
              ></v-carousel-item>
            </v-carousel>
          </v-col>

          <v-col cols="12" lg="6">
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td class="text-left">SKU</td>
                    <td class="text-right">{{ product.SKU }}</td>
                  </tr>

                  <tr>
                    <td class="text-left">Code</td>
                    <td class="text-right">{{ product.code }}</td>
                  </tr>

                  <tr>
                    <td class="text-left">Name</td>
                    <td class="text-right">{{ product.name }}</td>
                  </tr>

                  <tr>
                    <td class="text-left">Description</td>
                    <td class="text-right">{{ product.descripcion }}</td>
                  </tr>

                  <tr>
                    <td class="text-left">Price</td>
                    <td class="text-right">{{ product.price }}</td>
                  </tr>

                  <tr>
                    <td class="text-left">Currency</td>
                    <td class="text-right">{{ product.currency }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>
    </v-card>
  </v-dialog>
</template>

<script>
const notAvailable =
  "https://res.cloudinary.com/dfl2pqtq7/image/upload/v1662980154/resources/not-available_l79wdk.png";

export default {
  name: "modal-details",

  props: {
    value: { type: Boolean, default: false },
    product: { type: Object },
  },

  data: () => ({
    pictures: [],
  }),

  beforeUpdate() {
    const propsPictures = this.product?.pictures;

    if (Array.isArray(propsPictures)) {
      this.pictures = propsPictures.filter((pic) => pic);
    }

    if (this.pictures.length === 0) this.pictures[0] = notAvailable;

    if (this.pictures.length > 0) {
      this.pictures = this.pictures.map((p) =>
        p.startsWith("http") || p.startsWith("data:") ? p : notAvailable
      );
    }
  },
};
</script>

<style scoped></style>

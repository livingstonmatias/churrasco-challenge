<template>
  <Transition name="fade">
    <div id="feedback" v-if="show" class="alert__wrapp">
      <v-alert :type="type" :class="['alert', `alert__type--${type}`]">
        {{ message }}
      </v-alert>
    </div>
  </Transition>
</template>

<script>
export default {
  name: "alert-msg",

  props: {
    message: { type: String },
    type: { type: String },
    timer: { type: String },
  },

  data: () => ({
    show: true,
  }),

  mounted() {
    this.show = true;

    setTimeout(() => {
      this.show = false;
    }, parseInt(this.timer));
  },
};
</script>

<style scoped>
.alert__wrapp {
  position: absolute;
  background: transparent;
  top: 10px;
  width: 100vw;
  max-height: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
}
.alert {
  max-width: max-content;
  max-height: max-content;
}
.alert__type--success {
  background: green;
}
.alert__type--error {
  background: red;
}
.alert__type--info {
  background: gray;
}
.alert__type--warning {
  background: orange;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

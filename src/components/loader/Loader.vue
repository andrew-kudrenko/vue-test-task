<template>
  <div class="loader" v-bind:style="loaderStyle"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Loader',
  props: {
    size: {
      type: Number,
      default: 30,
      validator: (n: number) => n >= 0,
    },
    color: {
      type: String,
      default: '#333',
    },
  },
  computed: {
    loaderStyle(): any {
      return {
        display: 'inline-block',
        width: `${this.$props.size}px`,
        height: `${this.$props.size}px`,
        border: `.25em solid ${this.$props.color}`,
        'border-right-color': 'transparent',
      };
    },
  },
});
</script>

<style>
.loader {
  border-radius: 50%;

  animation-name: rotate-loader;
  animation-iteration-count: infinite;
  animation-duration: .75s;
  animation-timing-function: linear;
};

@keyframes rotate-loader {
  from { transform: rotateZ(0deg); }
  to { transform: rotateZ(360deg); }
}
</style>

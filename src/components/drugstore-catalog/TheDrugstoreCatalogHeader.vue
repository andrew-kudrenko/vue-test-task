<template>
  <span>Searching for a drugstore</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheDrugstoreCatalogHeader',
});
</script>

<style lang="scss">
@import '@/styles/core/_core.scss';

.drugstore-catalog__header {
  @extend .p-1 !optional;
}
</style>

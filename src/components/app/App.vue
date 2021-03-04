<template>
  <drugstore-catalog
    :data="drugstoresData"
    :width="'800px'"
    :height="'600px'"
  ></drugstore-catalog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import '@/styles/index.scss';
import DrugstoreCatalog from '@/components/drugstore-catalog/DrugstoreCatalog.vue';
import { DrugstoreData } from '@/types/entities.types';
import data from '@/data/drugstores';

export default defineComponent({
  name: 'App',
  components: {
    DrugstoreCatalog,
  },
  data() {
    return { drugstoresData: data.result as Array<DrugstoreData> };
  },
});
</script>

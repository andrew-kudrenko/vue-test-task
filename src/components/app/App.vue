<template>
  <drugstore-catalog
    :data="data"
    :filtered="filtered"
    :onSetFiltered="setFiltered"
    :width="'800px'"
    :height="'600px'"
    :lat="50.61074"
    :lng="36.58015"
  ></drugstore-catalog>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import '@/styles/index.scss';
import DrugstoreCatalog from '@/components/drugstore-catalog/DrugstoreCatalog.vue';
import data from '@/data/drugstores';
import { DrugstoreState } from '@/types/components.types';
import { DrugstoreData } from '@/types/entities.types';

const drugstoresState = reactive<DrugstoreState>({
  data: data.result,
  filtered: data.result,
});

export default defineComponent({
  name: 'App',
  components: {
    DrugstoreCatalog,
  },
  data(): DrugstoreState {
    return drugstoresState;
  },
  methods: {
    setData(value: Array<DrugstoreData>) {
      drugstoresState.data = value;
    },
    setFiltered(value: Array<DrugstoreData>) {
      drugstoresState.filtered = value;
    },
  },
});
</script>

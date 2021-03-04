<template>
  <drugstore-catalog-layout
    v-bind="this.$props"
    :filtered="filtered"
    :onGoToMarker="goToMarker"
    :onSetMap="setMap"
    :onSetFiltered="onSetFiltered"
  ></drugstore-catalog-layout>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import DrugstoreCatalogLayout from '@/components/drugstore-catalog/DrugstoreCatalogLayout.vue';
import { DrugstoreData, Location } from '@/types/entities.types';
import { DrugstoreCatalogState } from '@/types/components.types';

export default defineComponent({
  name: 'DrugstoreCatalog',
  components: { DrugstoreCatalogLayout },
  data(): DrugstoreCatalogState {
    return {
      map: null,
    };
  },
  props: {
    data: {
      type: Array as PropType<Array<DrugstoreData>>,
      required: true,
    },
    filtered: {
      type: Array as PropType<Array<DrugstoreData>>,
      required: true,
    },
    onSetFiltered: {
      type: Function as PropType<(value: Array<DrugstoreData>) => void>,
      required: true,
    },
    width: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  methods: {
    setMap(value: google.maps.Map) {
      this.map = value;
    },
    goToMarker({ latitude, longitude }: Location) {
      console.log('Going to the marker...', latitude, longitude);
      if (this.map) {
        this.map.setCenter({ lat: latitude, lng: longitude });
        this.map.setZoom(16);
      }
    },
  },
});
</script>

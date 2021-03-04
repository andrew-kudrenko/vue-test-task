<template>
  <div
    v-bind:style="rootStyles"
    class="drugstore-catalog rounded"
  >
    <header
      v-bind:style="headerStyles"
      class="drugstore-catalog__header"
    >
      <the-drugstore-catalog-header></the-drugstore-catalog-header>
    </header>
    <main class="drugstore-catalog__main">
      <div
        v-bind:style="[mainStyles, listStyles]"
        class="drugstore-catalog__list"
      >
        <drugstore-list
          :data="this.$props.data"
          :onClick="onShowAtTheMap"
        ></drugstore-list>
      </div>
      <div
        v-bind:style="[mainStyles, mapStyles]"
        class="drugstore-catalog__map"
      >
        <google-map
          :width="mapWidth"
          :height="mainHeight"
          :lat="50.61074"
          :lng="36.58015"
          :zoom="12"
          :markers="markers"
        ></google-map>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import GoogleMap from '@/components/google-map/GoogleMap.vue';
import DrugstoreList from '@/components/drugstore-list/DrugstoreList.vue';
import { DrugstoreData, Marker } from '@/types/entities.types';
import TheDrugstoreCatalogHeader from '@/components/drugstore-catalog/TheDrugstoreCatalogHeader.vue';
import { Nullable } from '@/types/utility.types';

export default defineComponent({
  name: 'DrugstoreCatalog',
  components: {
    GoogleMap,
    DrugstoreList,
    TheDrugstoreCatalogHeader,
  },
  data() {
    const headerHeight = '50px';
    const mapRatio = 0.55;
    const currentShownId: Nullable<number> = null;

    return {
      headerHeight,
      mapRatio,
      currentShownId,
      mapWidth: `calc(${this.$props.width} * ${mapRatio})`,
      mainHeight: `calc(${this.$props.height} - ${headerHeight})`,
    };
  },
  props: {
    data: {
      type: Array as PropType<Array<DrugstoreData>>,
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
  },
  computed: {
    markers(): Array<Marker> {
      return this.$props.data.map((item) => ({
        position: {
          latitude: item.geo.location.latitude,
          longitude: item.geo.location.longitude,
        },
        title: item.geo.address,
      }));
    },
    rootStyles(): Partial<CSSStyleDeclaration> {
      return {
        width: this.$props.width,
        height: this.$props.height,
      };
    },
    headerStyles(): Partial<CSSStyleDeclaration> {
      return { height: this.$data.headerHeight };
    },
    mainStyles(): Partial<CSSStyleDeclaration> {
      return { height: this.mainHeight };
    },
    mapStyles(): Partial<CSSStyleDeclaration> {
      return { width: this.mapWidth };
    },
    listStyles(): Partial<CSSStyleDeclaration> {
      return { width: `calc(${this.$props.width} * ${1 - this.mapRatio})` };
    },
  },
  methods: {
    onShowAtTheMap(e: Event, item: DrugstoreData) {
      console.log('Going to the marker...', item);
    },
  },
});
</script>

<style lang="scss">
@import '@/styles/index.scss';

.drugstore-catalog {
  $border: 1px solid #ccc;

  display: flex;
  flex-direction: column;

  margin: 1rem;

  border: $border;

  &__header {
    @extend .p-1 !optional;
    border-bottom: $border;
  }

  &__main { display: flex; }

  &__list {
    $border-radius: 12px;

    overflow-y: auto;
    border-right: $border;

    &::-webkit-scrollbar {
      width: $border-radius;
      background-color: map-get($map: $colors, $key: 'success');

    }

    &::-webkit-scrollbar-thumb,
    &::-webkit-scrollbar-track { border-radius: $border-radius; }

    &::-webkit-scrollbar-thumb {
      background-color: map-get($map: $colors, $key: 'success');
    }

    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(163, 140, 140, 0.2);
      background-color: #f9f9fd;
    }
  }
}
</style>

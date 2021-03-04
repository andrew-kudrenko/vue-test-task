<template>
  <ul class="drugstore-list px-1">
    <li
      v-for="item in data"
      v-bind:key="item.id"
      class="drugstore-list-item p-1"
    >
      <div class="d-flex-col">
        <b class="drugstore-list-item__address">{{ item.geo.address }}</b>
        <span class="drugstore-list-item__phone">{{ item.phone }}</span>
      </div>
      <small
        @click="onGoToMarker(item.geo.location)"
        class="drugstore-list-item__show-button"
      >
        На карте
      </small>
    </li>
  </ul>
</template>

<script lang="ts">
import { DrugstoreData } from '@/types/entities.types';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'DrugstoreList',
  props: {
    data: {
      type: Array as PropType<Array<DrugstoreData>>,
      required: true,
    },
    onGoToMarker: {
      type: Function as PropType<(e: Event, marker: Location) => void>,
      required: true,
    },
  },
});
</script>

<style lang="scss">
@import '@/styles/index';

.drugstore-list {
  &-item {
    @extend .d-flex, .cursor-pointer, .justify-space-between, .align-items-center;

    &:not(:last-child) { border-bottom: 1px solid #ccc; }

    &__address { font-weight: 500; }

    &__phone {
      @extend .mt-1;
      font: {
        weight: 300;
        size: .85rem;
      }
    }

    &__show-button {
      font: {
        size: .75rem;
        weight: 300;
      }
      text-decoration: underline;
      color: map-get($colors, 'success');
    }
  }
}
</style>

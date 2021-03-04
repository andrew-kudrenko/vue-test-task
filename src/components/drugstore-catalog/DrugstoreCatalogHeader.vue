<template>
  <input
    @input="onSearchForMatches"
    v-model="query"
    class="search-text-field"
    placeholder="Поиск по адресу и названию аптеки"
  >
</template>

<script lang="ts">
import { DrugstoreCatalogHeaderState } from '@/types/components.types';
import { DrugstoreData } from '@/types/entities.types';
import FuzzySearch from 'fuzzy-search';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'DrugstoreCatalogHeader',
  data(): DrugstoreCatalogHeaderState {
    return {
      query: '',
    };
  },
  props: {
    data: {
      type: Array as PropType<Array<DrugstoreData>>,
      required: true,
    },
    onSetFiltered: {
      type: Function as PropType<(value: Array<DrugstoreData>) => void>,
      required: true,
    },
  },
  methods: {
    onSearchForMatches() {
      const searcher = new FuzzySearch(this.data, ['geo.address']);
      const found = searcher.search(this.query);

      this.onSetFiltered(found);
    },
  },
});
</script>

<style lang="scss">
@import '@/styles/index.scss';

.drugstore-catalog__header {
  @extend .p-1 !optional;
}

.search-text-field {
  width: 100%;
  font-size: 1rem;
  border: none;
  outline: none;
}
</style>

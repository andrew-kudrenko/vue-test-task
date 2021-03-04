<template>
  <div class="google-map">
    <div
      v-if="loading"
      v-bind:style="fullSizeStyles"
      class="google-map__loader"
    >
      <Loader />
    </div>
    <div
      v-else-if="error"
      v-bind:style="fullSizeStyles"
      class="google-map__error"
    >
      {{ String(error) }}
    </div>
    <div
      v-show="!loading && !error"
      ref="map"
      class="google-map__content"
      v-bind:style="fullSizeStyles"
    >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue';
import { Loader as MapsLoader } from 'google-maps';
import MarkerClusterer from '@googlemaps/markerclustererplus';
import { GoogleMapState } from '@/types/components.types';
import Loader from '@/components/loader/Loader.vue';
import { Marker } from '@/types/entities.types';

export default defineComponent({
  name: 'GoogleMap',
  components: { Loader },
  props: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
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
    zoom: {
      type: Number,
      default: 8,
    },
    markers: {
      type: Array as PropType<Array<Marker>>,
      required: true,
    },
  },
  data() {
    const state = reactive<GoogleMapState>({
      loading: false,
      error: null,
    });

    return state;
  },
  computed: {
    fullSizeStyles(): Partial<CSSStyleDeclaration> {
      return {
        width: this.$props.width,
        height: this.$props.height,
      };
    },
  },
  async mounted() {
    try {
      const key = process.env.GOOGLE_MAPS_API_KEY;
      const loader = new MapsLoader(key);

      this.$data.loading = true;
      const google = await loader.load();

      const map = new google.maps.Map(this.$refs.map as HTMLElement, {
        center: { ...this.$props },
        zoom: this.$props.zoom,
      });

      const markers = this.$props.markers.map((m) => new google.maps.Marker({
        position: { lat: m.position.latitude, lng: m.position.longitude },
        map: map as google.maps.Map,
      }));

      const imagePath = 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';
      (() => new MarkerClusterer(map, markers, { imagePath }))();
    } catch (e) {
      this.$data.error = e instanceof Error ? e.message : String(e);
      console.error(this.$data);
    } finally {
      this.$data.loading = false;
    }
  },
});
</script>

<style lang="scss">
.google-map {
  &__loader,
  &__error {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

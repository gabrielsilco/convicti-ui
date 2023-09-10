<template>
  <q-page class="q-pa-md">
    <header class="index-header">
      <q-select
        filled
        v-model="model"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        placeholder="Pesquisar"
        :options="options"
        @filter="filterFn"
        style="width: 450px;"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-btn unelevated @click="openAddCompanyDrawer">
        <span class="add-company__label">Adicionar Empresa</span>
        <q-icon class="q-ml-md" color="primary" name="add" />
      </q-btn>
    </header>
    <div id="map" style="width: 100%; height: 400px"></div>
  </q-page>
</template>

<script>
import axios from 'axios';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';

export default {
  methods: {
    openAddCompanyDrawer() {
      this.$emit('openAddCompanyDrawer')
    }
  },
  async created() {
    const companies = await axios.get('http://localhost:8080/api/companies');
    console.log(companies)
  },
  mounted() {
    const map = new Map({
      layers: [
        new TileLayer({source: new OSM()}),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
      target: 'map',
    });
  }
}
</script>

<style lang="sass" scoped>
.index-header
  display: flex
  flex-direction: row
  justify-content: space-between

.q-page
  background-color: #f6f9fa

.q-field__inner
  background-color: #fff !important
.q-btn
  background-color: #e0e5f8

.add-company__label
  text-transform: none
  color: #0e044a
  font-weight: 600
  letter-spacing: .8px
  line-height: 0
</style>

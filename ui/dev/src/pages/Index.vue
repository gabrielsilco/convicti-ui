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
    <div class="map-container">
      <div id="map" style="width: 100%; height: 600px"></div>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';

export default {
  data() {
    return {
      companies: [],
      coordinatesArray: [],
    }
  },
  methods: {
    openAddCompanyDrawer() {
      this.$emit('openAddCompanyDrawer')
    }
  },
  async mounted() {
    const companies = await axios.get('http://localhost:8080/api/companies');
    this.companies = companies.data.data;
    this.coordinatesArray = this.companies.map(company => {
      return [company.longitude, company.latitude]
    })
    console.log(this.coordinatesArray)

    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        // Add a vector layer for points
        new VectorLayer({
          source: new VectorSource(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    // Function to add points to the map
    const addPoint = (coordinates) => {
      const vectorSource = map.getLayers().item(1).getSource(); // Get the vector source
      const point = new Point(fromLonLat(coordinates)); // Convert coordinates to the map's projection
      const feature = new Feature(point);
      vectorSource.addFeature(feature);
    };

    // Example: Add points based on coordinates
    const coordinatesArray = [
      ["-34.87696400", "-8.04756300"], // Example coordinates, replace with your own
      // [10, 10], // Example coordinates, replace with your own
      // Add more coordinates as needed
    ];

    await console.log(this.coordinatesArray)

    this.coordinatesArray.forEach((coordinates) => {
      addPoint(coordinates);
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

.map-container
  margin-top: 24px
</style>

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
      <q-btn unelevated>
        <span class="add-company__label">Adicionar Empresa</span>
        <q-icon class="q-ml-md" color="primary" name="add" />
      </q-btn>
    </header>
  </q-page>
</template>

<script>
import pages from '../router/pages'

export default {
  setup () {
    return {
      pages
    }
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

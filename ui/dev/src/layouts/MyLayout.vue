<template>
  <q-layout view="lHr lpR lFr">

    <!-- <q-header class="bg-primary text-white">
      <q-toolbar>
      </q-toolbar>
    </q-header> -->

    <q-drawer show-if-above side="left" :width="280">
      <!-- drawer content -->
      <div class="drawer-content">
        <img class="drawer-logo" src="../assets/images/r_footer-logo.webp" alt="">
        <div class="drawer-menu">
          <h2 class="menu-header">MENU</h2>
          <q-btn align="left">
            <img class="base-logo" src="../assets/icons/building.svg" alt="">
            <span class="btn-label">Empresas</span>
          </q-btn>
        </div>

        <div class="drawer-footer">
          <q-btn flat>
            <img class="base-logo" src="../assets/icons/power.svg" alt="">
            <span class="logout-label">Sair</span>
          </q-btn>
        </div>
        

      </div>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay :width="700">
      <q-form class="q-px-lg">
        <h2 class="form-title">Cadastrar Empresa</h2>
        <div class="form-grid">
          <q-input
            filled
            v-model="companyName"
            label="Nome"
            stack-label
            :dense="dense"
            style="grid-column: 1 / 3;"
          />
          <q-input
            filled
            v-model="observation"
            label="Observação"
            stack-label
            :dense="dense"
          />
          <q-input
            filled
            v-model="cnpj"
            label="CNPJ"
            stack-label
            :dense="dense"
            style="grid-column: 1 / 3;"
          />
          <q-select
            filled
            v-model="category"
            :options="categories"
            label="Categoria"
            stack-label
            :dense="dense"
          />
          <q-input
            filled
            v-model="email"
            label="E-mail"
            stack-label
            :dense="dense"
            style="grid-column: 1 / 3;"
          />
          <q-input
            filled
            v-model="whatsapp"
            label="Whatsapp"
            stack-label
            :dense="dense"
            style="grid-column: 1 / 3;"
          />
          <q-input
            filled
            v-model="representative"
            label="Representante"
            stack-label
            :dense="dense"
            style="grid-column: 1 / 3;"
          />
          <q-input
            filled
            v-model="latitude"
            label="Latitude"
            stack-label
            :dense="dense"
            style="grid-column: 1;"
          />
          <q-input
            filled
            v-model="longitude"
            label="Longitude"
            stack-label
            :dense="dense"
          />
          <q-select
            filled
            v-model="state"
            :options="states"
            label="Estado"
            stack-label
            :dense="dense"
            style="grid-column: 1;"
          />
          <q-select
            filled
            v-model="city"
            :options="cities"
            label="Cidade"
            stack-label
            :dense="dense"
          />
        </div>
        <div class="form-actions">
          <q-btn unelevated class="cancel-button" @click="rightDrawerOpen = false">
            <span class="cancel-button__label">Cancelar</span>
          </q-btn>
          <q-btn unelevated class="register-button">
            <span class="register-button__label">Cadastrar Empresa</span>
          </q-btn>
        </div>
      </q-form>
    </q-drawer>

    <q-page-container>
      <router-view @openAddCompanyDrawer="rightDrawerOpen = !rightDrawerOpen" />
    </q-page-container>

  </q-layout>
</template>

<script>

export default {
  name: 'MyLayout',
  data() {
    return {
      rightDrawerOpen: false,
      companyName: '',
      observation: '',
      cnpj: '',
      category: '',
      categories: [],
      email: '',
      whatsapp: '',
      representative: '',
      latitude: '',
      longitude: '',
      state: '',
      states: []
    }
  }
}
</script>

<style scoped>
.drawer-content {
  background-color: #0E044A;
  height: 100%;
  padding-left: 34px;
  padding-right: 34px;
  padding-top: 56px;

}

.drawer-logo {
  width: 100%;
}

.base-logo {
  height: 24px;
  width: 24px;
}

.drawer-menu {
  width: 100%;
  padding-top: 128px;
}

.menu-header {
  font-size: 16px;
  color: white;
  font-weight: 500;
  padding: 0;
  margin: 0 0 12px 0;
  line-height: 1.6rem;
  letter-spacing: 2.2px;
}

.drawer-menu .q-btn {
  width: 100%;
  padding-left: 24px;
  background-color: #fff;
}

.btn-label {
  text-transform: none;
  margin-left: 18px;
  line-height: 1.2px;
  font-weight: 600;
  color: #0E044A;
}

.drawer-footer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  bottom: 0;
  margin-bottom: 18px;
}

.logout-label {
  color: #fff;
  text-transform: none;
  font-size: 18px;
  margin-left: 16px;
  line-height: 2rem;
}

.form-title {
  font-size: 32px;
  text-transform: none;
  color: #0e044a;
  font-weight: 600;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  grid-gap:20px;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 20px;

  margin-top: 64px;
}

.cancel-button {
  background-color: #e0e5f8;
}

.cancel-button__label {
  text-transform: none;
  color: #0e044a;
  letter-spacing: .8px;
  line-height: 0;
}

.register-button {
  background-color: #0e044a;
}

.register-button__label {
  text-transform: none;
  color: #e0e5f8;
  letter-spacing: .8px;
  line-height: 0;
}

</style>
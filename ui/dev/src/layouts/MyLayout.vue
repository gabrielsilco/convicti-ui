<template>
  <q-layout view="lHr lpR lFr">


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
          <q-btn flat @click="logout">
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
            style="grid-column: 1 / 3;"
          />
          <q-input
            filled
            v-model="observation"
            label="Observação"
            stack-label
          />
          <q-input
            filled
            v-model="cnpj"
            label="CNPJ"
            stack-label
            style="grid-column: 1 / 3;"
            :rules="[ val => val.length === 14 || 'O CNPJ deve ser informado um total de 14 dígitos!']"
          />
          <q-select
            filled
            v-model="category"
            :options="categories"
            label="Categoria"
            stack-label
            option-label="name"
            option-value="id"
          />
          <q-input
            filled
            v-model="email"
            label="E-mail"
            stack-label
            style="grid-column: 1 / 3;"
          />
          <q-input
            filled
            v-model="whatsapp"
            label="Whatsapp"
            stack-label
            style="grid-column: 1 / 3;"
            :rules="[ val => val.length === 11 || 'O campo whatsapp deve ser informado uma quantidade de 11 caracteres (DD + Número de Telefone).']"
          />
          <q-input
            filled
            v-model="representative"
            label="Representante"
            stack-label
            style="grid-column: 1 / 3;"
          />
          <q-input
            filled
            v-model="latitude"
            type="number"
            label="Latitude"
            stack-label
            style="grid-column: 1;"
          />
          <q-input
            filled
            v-model="longitude"
            type="number"
            label="Longitude"
            stack-label
          />
          <q-select
            filled
            v-model="state"
            :options="states"
            label="Estado"
            stack-label
            option-label="title"
            option-value="id"
            style="grid-column: 1;"
            @update:model-value="selectState"
          />
          <q-select
            filled
            v-model="city"
            :options="cities"
            label="Cidade"
            stack-label
            option-label="title"
            option-value="id"
          />
        </div>
        <div class="form-actions">
          <q-btn unelevated class="cancel-button" @click="rightDrawerOpen = false">
            <span class="cancel-button__label">Cancelar</span>
          </q-btn>
          <q-btn unelevated class="register-button" @click="registerCompany" :loading="loadingRegistration">
            <span class="register-button__label">Cadastrar Empresa</span>
          </q-btn>
        </div>
      </q-form>
    </q-drawer>

    <q-dialog v-model="confirmRegistration">
      <q-card>
        <q-card-section>
          <div class="text-h6">Empresa cadastrada com sucesso</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-page-container>
      <router-view @openAddCompanyDrawer="rightDrawerOpen = !rightDrawerOpen" />
    </q-page-container>

  </q-layout>
</template>

<script>
import axios from 'axios';

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
      state: null,
      states: [],
      city: null,
      cities: [],
      confirmRegistration: false,
      loadingRegistration: false,
    }
  },
  methods: {
    async selectState(value) {
      const result = await axios.get(`http://localhost:8080/api/state-cities/cities?state_id=${value.id}`);
      this.cities = result.data;
    },
    async registerCompany() {
      this.loadingRegistration = true;
      const result = await axios.post('http://localhost:8080/api/companies', {
        name: this.companyName,
        city_id: this.city.id,
        cnpj: this.cnpj,
        email: this.email,
        state_id: this.state.id,
        category_id: this.category.id,
        latitude: this.latitude,
        longitude: this.longitude,
        whatsapp_phone: this.whatsapp,
        representantive_user: this.representative,   
      })
      if (result.status === 200 || result.statusText === 'OK') {
        this.rightDrawerOpen = false;
        this.confirmRegistration = true;
      }
      this.loadingRegistration = false;
    },
    logout() {
      localStorage.removeItem('auth_token');
      this.$router.push('/auth')
    }
  },
  async created() {
    if (!localStorage.getItem('auth_token')) {
      this.$router.push('/auth');
      return
    }
    const states = await axios.get('http://localhost:8080/api/state-cities/states')
    this.states = states.data;
    const categories = await axios.get('http://localhost:8080/api/categories');
    this.categories = categories.data;
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
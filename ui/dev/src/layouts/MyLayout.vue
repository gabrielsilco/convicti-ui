<template>
  <q-layout view="lHr lpR lFr">

    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Title
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" :width="280">
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

    <q-drawer v-model="rightDrawerOpen" side="right" overlay>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'MyLayout',
  setup () {
    const rightDrawerOpen = ref(false)

    return {
      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
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
  align-items: start;
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
</style>
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

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left">
      <!-- drawer content -->
      <div class="drawer-content">
        <img class="q-pa-xl drawer-logo" src="../assets/images/r_footer-logo.webp" alt="">
        <div class="drawer-menu">
          <h2>MENU</h2>
          <q-btn color="primary">
            <img class="base-logo" src="../assets/icons/building.svg" alt="">
            <span>Empresas</span>
          </q-btn>
        </div>

        <div class="drawer-footer">
          <q-btn flat color="primary">
            <img class="base-logo" src="../assets/icons/power.svg" alt="">
            <span>Sair</span>
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

.drawer-logo {
  width: 80%;;
}

.base-logo {
  height: 24px;
  width: 24px;
}

.drawer-footer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 0;
}
</style>
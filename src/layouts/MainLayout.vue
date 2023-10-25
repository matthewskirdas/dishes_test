<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="q-mt-lg">
      <q-toolbar>
        <q-btn color="primary" label="Меню">
        <q-menu>
          <q-list style="min-width: 100px">
            <router-link to="/">
              <q-item clickable v-close-popup>
              <q-item-section>Меню блюд</q-item-section>
            </q-item>
            </router-link>
            <q-separator />
            <router-link to="/register-guest">
              <q-item clickable v-close-popup>
              <q-item-section>Регистрация гостя</q-item-section>
            </q-item>
            </router-link>
          </q-list>
        </q-menu>
      </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',
})
</script>

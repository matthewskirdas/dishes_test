
<template>
  <q-page class="q-pa-md">
    <h1 class="text-h1 dish-title">Меню блюд</h1>
    <div class="dishes-menu-container">
      <router-link 
        v-for="dish in dishes" 
        :key="dish.dish_id" 
        :to="{ name: 'EditDish', params: { dish_id: dish.dish_id } }">
        <q-card class="my-card q-ma-md">
          <q-card-section class=" q-mb-md dish-name" style="border: none;">{{ dish.dish_name }}</q-card-section>
          <hr>
          <q-img class="dish-image" :src="'data:image/jpeg;base64,' + dish.dish_image" />
          <hr>
          <q-card-section class="text-h6 dish-price">Цена: ${{ dish.dish_cost }}</q-card-section>
        </q-card>
      </router-link>
    </div>
  </q-page>
</template>


<script>
import { ref, onMounted } from 'vue'
import ReconnectingWebSocket from 'reconnecting-websocket'

export default {
  setup() {
    const dishes = ref([])

    // Инициализация WebSocket
    const rws = new ReconnectingWebSocket('ws://178.250.156.182:8080/fortest')

    // Получение списка блюд
    onMounted(() => {
      rws.addEventListener('open', () => {
        rws.send(JSON.stringify({
          key: 'm2T6cxvijN1otRkiTnW5',
          operation: 'dishes_list'
        }))
      })

      rws.addEventListener('message', (event) => {
        const data = JSON.parse(event.data)
        if (data.operation === 'dishes_list') {
          dishes.value = data.dishes_list
        }
      })
    })

    return {
      dishes
    }
  }
}
</script>

<style scoped>
.dishes-menu-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px); /* This will auto-fit as many 300px wide cards in a row as possible */
  gap: 30px; /* This provides spacing between the cards */
  justify-content: center; /* This centers the grid itself */
  margin: 0 auto; /* This will center the grid container horizontally on the page */
}


.dish-title {
  color: #4CAF50; 
  margin-bottom: 20px;
  text-shadow: 1px 1px 2px #888888;
  text-align: center;
}
hr {
  color: black;
}
.my-card {
  width: 300px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease-in-out;
}

.my-card:hover {
  transform: translateY(-10px);
}

.dish-name {
  color: #333;
  text-align: center;
}

.dish-image {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.dish-price {
  color: #FF5722;
  text-align: center;
}

.dish-image {
  width: 250px;  /* width of the image */
  height: 150px; /* height of the image */
  object-fit: cover; /* This will ensure the image covers the entire space without stretching */
}
</style>

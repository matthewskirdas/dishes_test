<template>
    <q-page class="edit-dish-page">
      <div class="form-container">
        <h1>Редактировать блюдо: {{ dish.dish_name }}</h1>
  
        <!-- Edit Dish Form -->
        <q-form @submit.prevent="updateDish">
  <q-input
    class="q-pt-md"
    v-model="dish.dish_description"
    label="Описание блюда"
    required
    outlined
  ></q-input>
  <q-btn class="q-mt-md"
    label="Обновить описание"
    @click="updateDishDescription"
  ></q-btn>

  <q-input class="q-mt-md"
    v-model="dish.dish_cost"
    label="Цена блюда"
    required
    outlined
  ></q-input>
  <q-btn class="q-mt-md"
    label="Обновить цену"
    @click="updateDishCost"
  ></q-btn>
</q-form>
      </div>
    </q-page>
  </template>

<script>
import ReconnectingWebSocket from 'reconnecting-websocket';
import { Notify } from 'quasar'
export default {
  data() {
    return {
      dish: {}
    }
  },
  props: {
    dish_id: {
      type: String,
      required: true
    }
  },
  created() {
    const rws = new ReconnectingWebSocket('ws://178.250.156.182:8080/fortest');

    rws.addEventListener('open', () => {
      rws.send(JSON.stringify({
        key: 'm2T6cxvijN1otRkiTnW5',
        operation: 'dishes_list',
      }));
    });

    rws.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      this.dish = data.dishes_list[parseInt(this.dish_id) - 1];
      console.log(this.dish);
    });
  },
  methods: {
    updateDishDescription() {
    if (!this.dish.dish_description) {
      return;
    }
    const rws = new ReconnectingWebSocket('ws://178.250.156.182:8080/fortest');

    rws.addEventListener('open', () => {
      rws.send(JSON.stringify({
        key: 'm2T6cxvijN1otRkiTnW5',
        operation: 'change_dish_desc',
        id: parseInt(this.dish_id),
        desc_value: this.dish.dish_description
      }));

      Notify.create({
        color: 'green',
        position: 'bottom',
        message: 'Описание успешно обновлено!',
        icon: 'check'
      });
    });
  },

  updateDishCost() {
    if (!this.dish.dish_cost) {
      return;
    }
    const rws = new ReconnectingWebSocket('ws://178.250.156.182:8080/fortest');

    rws.addEventListener('open', () => {
      rws.send(JSON.stringify({
        key: 'm2T6cxvijN1otRkiTnW5',
        operation: 'change_dish_cost',
        id: parseInt(this.dish_id),
        cost_value: parseFloat(this.dish.dish_cost)
      }));

      Notify.create({
        color: 'green',
        position: 'bottom',
        message: 'Цена успешно обновлена!',
        icon: 'check'
      });
    });
  }
}

};
</script>

<style scoped>
.edit-dish-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f4;
}

.form-container {
  width: 100%;
  max-width: 550px;
  background-color: #fff;
  padding: 25px 35px;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}


h1 {
  color: #4CAF50;
  text-align: center;
  font-size: 24px;
  line-height: 1.5;
  margin-bottom: 30px;
  border-bottom: 2px solid #e1e1e1;
  padding-bottom: 15px;
}

q-input {
  margin-bottom: 25px;
  background-color: #f9f9f9; /* light gray background */
  border: 1px solid #e1e1e1; /* light border */
  border-radius: 8px; /* rounded corners */
  transition: all 0.3s ease; /* smooth transition */
}


q-btn {
  width: 100%;
  font-weight: bold;
  font-size: 18px;
}
</style>

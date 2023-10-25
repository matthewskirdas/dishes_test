<template>
  <div class="register-form-container">
      <h2>Форма Регистрации Гостя</h2>
      <q-form @submit.prevent="submitForm">
          <q-input v-model="guest.surname" class="q-mb-md" 
          label="Фамилия" 
          :rules="[validateRequired, validateName]"
          error-label="Фамилия обязательна и должна содержать только буквы" outlined></q-input>
          <q-input v-model="guest.forename" class="q-mb-md" :rules="[validateRequired, validateName]"
      error-label="Имя обязательно и должно содержать только буквы" label="Имя"  outlined></q-input>
          <q-input v-model="guest.middlename" class="q-mb-md" :rules="[validateRequired, validateName]"
      error-label="Отчество обязательно и должно содержать только буквы" label="Отчество"  outlined></q-input>
          <q-input v-model="guest.birthday" class="q-mb-md" :rules="[validateRequired]"
      error-label="Дата рождения обязательна" label="Дата рождения" type="date"  outlined></q-input>
          <q-input v-model="guest.address" class="q-mb-md" :rules="[validateRequired]"
      error-label="Адрес обязателен" label="Адрес"  outlined></q-input>
          <q-input v-model="guest.phone" class="q-mb-md" :rules="[ validatePhone]"
      error-label="Телефон обязателен и должен иметь формат 8-XXX-XXX-XX-XX" label="Телефон" v-mask="'8-###-###-##-##'" outlined></q-input>
          <q-input v-model="guest.email" class="q-mb-md" :rules="[ validateEmail]"
      error-label="Email обязателен и должен быть валидным" label="Электронная почта"  outlined></q-input>
          <q-btn label="Отправить" type="submit" color="primary"></q-btn>
      </q-form>
  </div>
</template>

<script>
import ReconnectingWebSocket from 'reconnecting-websocket';
import { mask } from 'vue-the-mask'; // импортировать v-mask
import { Notify } from 'quasar'

export default {
  data() {
      return {
          guest: {
              surname: '',
              forename: '',
              middlename: '',
              phone: '',
              email: '',
              birthday: '',
              address: ''
          },
          rws: null // объект WebSocket
      };
  },
  created() {
      // Устанавливаем соединение с WebSocket при создании компонента
      this.rws = new ReconnectingWebSocket('ws://178.250.156.182:8080/fortest');
  },
  directives: { mask }, // добавить директиву mask
  methods: {
      submitForm() {
          // Отправляем данные формы через WebSocket
          this.rws.send(JSON.stringify({
              operation: 'guest_regestration',
              key: 'm2T6cxvijN1otRkiTnW5',
              surname: this.guest.surname,
              forename: this.guest.forename,
              middlename: this.guest.middlename,
              phone: this.guest.phone,
              email: this.guest.email,
              birthday: this.guest.birthday,
              address: this.guest.address
          }));

          Notify.create({
            color: 'green',
            position: 'bottom',
            message: 'Гость успешно добавлен!',
            icon: 'check'
        });
      },
      validateRequired(val) {
          return !!val || 'Это поле обязательно для заполнения';
      },

      validateName(val) {
          const pattern = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
          return pattern.test(val) || 'Поле должно содержать только буквы';
      },

      validatePhone(val) {
          if (!val) return true;

          const pattern = /^8-\d{3}-\d{3}-\d{2}-\d{2}$/;
          return pattern.test(val) || 'Телефон должен иметь формат 8-XXX-XXX-XX-XX';
      },

      validateEmail(val) {
          if (!val) return true;

          const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
          return pattern.test(val) || 'Неверный формат email';
      }
  },
  beforeUnmount() {
      if (this.rws) {
          this.rws.close();
      }
  },
};

</script>

<style scoped>
.register-form-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 8px;
}
</style>

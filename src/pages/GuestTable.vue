<template>
    <div>
      <q-table
        :rows="guests"
        :columns="columns"
        row-key="id">

        <template v-slot:body-cell-phones="props">
          <q-td :props="props">
            {{ props.row.phones.join(', ') }} 
          </q-td>
        </template>
        <template v-slot:body-cell-emails="props">
          <q-td :props="props">
            {{ props.row.emails.join(', ') }}
          </q-td>
        </template>

        <template v-slot:body-cell-addPhone="props">
          <q-td :props="props">
            <q-btn @click="openPhoneDialog(props.row.id)" icon="phone" flat round></q-btn>
          </q-td>
        </template>
        <template v-slot:body-cell-addEmail="props">
          <q-td :props="props">
            <q-btn @click="openEmailDialog(props.row.id)" icon="email" flat round></q-btn>
          </q-td>
        </template>

      </q-table>

      <q-dialog v-model="phoneDialog" persistent>
        <q-card>
          <q-card-section>
            <div class="text-h6">Добавить телефон</div>
          </q-card-section>

          <q-card-section>
            <q-input v-model="newPhone" label="Новый телефон" outlined></q-input>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Отмена" color="primary" v-close-popup></q-btn>
            <q-btn label="Добавить" color="primary" @click="addNewPhone"></q-btn>
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="emailDialog" persistent>
        <q-card>
          <q-card-section>
            <div class="text-h6">Добавить email</div>
          </q-card-section>

          <q-card-section>
            <q-input v-model="newEmail" label="Новый email" outlined></q-input>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Отмена" color="primary" v-close-popup></q-btn>
            <q-btn label="Добавить" color="primary" @click="addNewEmail"></q-btn>
          </q-card-actions>
        </q-card>
      </q-dialog>

    </div>
</template>

<script>
import ReconnectingWebSocket from 'reconnecting-websocket';
import { Notify } from 'quasar'


export default {
    data() {
      return {
        guests: [],
        columns: [
          { name: 'surname', required: true, label: 'Фамилия', align: 'left', field: 'surname' },
          { name: 'forename', required: true, label: 'Имя', align: 'left', field: 'forename' },
          { name: 'middlename', required: true, label: 'Отчество', align: 'left', field: 'middlename' },
          { name: 'birthday', required: true, label: 'День рождения', align: 'left', field: 'birthday' },
          { name: 'address', required: true, label: 'Адрес', align: 'left', field: 'address' },
          { name: 'phones', required: true, label: 'Телефон', align: 'left', field: 'phones' },
          { name: 'emails', required: true, label: 'Email', align: 'left', field: 'emails' },
          { name: 'addPhone', label: '', align: 'center', field: row => 'addPhone' },
          { name: 'addEmail', label: '', align: 'center', field: row => 'addEmail' }
        ],
        rws: null,
        phoneDialog: false,
        emailDialog: false,
        newPhone: '',
        newEmail: '',
        currentGuestId: null
      }
    },
    created() {
        this.rws = new ReconnectingWebSocket('ws://178.250.156.182:8080/fortest');

        this.rws.addEventListener('open', () => {
            this.rws.send(JSON.stringify({
            key: 'm2T6cxvijN1otRkiTnW5',
            operation: 'guests_list'
            }))
        })

        this.rws.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            this.guests = data.guest_list;
            console.log(this.guests);
        });
    },
    methods: {
        openPhoneDialog(guestId) {
            this.currentGuestId = guestId; 
            this.phoneDialog = true;
        },
        openEmailDialog(guestId) {
            this.currentGuestId = guestId; 
            this.emailDialog = true;
        },
        addNewPhone() {
            this.rws.send(JSON.stringify({
                operation: 'add_guestphone',
                key: 'm2T6cxvijN1otRkiTnW5',
                id: this.currentGuestId,
                phone: this.newPhone
            }));
            this.phoneDialog = false;
            this.newPhone = '';
            this.rws = new ReconnectingWebSocket('ws://178.250.156.182:8080/fortest');

        this.rws.addEventListener('open', () => {
            this.rws.send(JSON.stringify({
            key: 'm2T6cxvijN1otRkiTnW5',
            operation: 'guests_list'
            }))
        })

        this.rws.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            this.guests = data.guest_list;
            console.log(this.guests);
        });

        Notify.create({
            color: 'green',
            position: 'bottom',
            message: 'Телефон успешно добавлен!',
            icon: 'check'
        });
        },
        addNewEmail() {
            this.rws.send(JSON.stringify({
                operation: 'add_guestemail',
                key: 'm2T6cxvijN1otRkiTnW5',
                id: this.currentGuestId,
                email: this.newEmail
            }));
            this.emailDialog = false;
            this.newEmail = '';
            this.rws = new ReconnectingWebSocket('ws://178.250.156.182:8080/fortest');

        this.rws.addEventListener('open', () => {
            this.rws.send(JSON.stringify({
            key: 'm2T6cxvijN1otRkiTnW5',
            operation: 'guests_list'
            }))
        })

        this.rws.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            this.guests = data.guest_list;
            console.log(this.guests);
        });

        Notify.create({
            color: 'green',
            position: 'bottom',
            message: 'Email успешно добавлен!',
            icon: 'check'
        });
        }
    },
    beforeUnmount() {
        if (this.rws) {
            this.rws.close();
        }
    }
}
</script>

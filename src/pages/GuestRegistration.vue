<template>
    <q-layout view="lHh Lpr lFf">
        <q-page class="q-pa-md q-mt-lg centered-content">
            <q-toolbar style="justify-content: center;">
                <q-btn @click="show = 'form'" color="primary" class="q-mr-md" label="Регистрация Гостя" />
                <q-btn @click="show = 'table'" color="secondary" label="Таблица Гостей" />
            </q-toolbar>

             <q-page-container>
            <q-page class="guest-registration-page" v-if="show === 'form'">
                <div class="form-container">
                    <RegisterForm />
                </div>
            </q-page>
            <q-page class="guest-registration-page" v-if="show === 'table'">
                <GuestTable />
            </q-page>
        </q-page-container>
        </q-page>
       
    </q-layout>
</template>

<script>
import RegisterForm from 'src/pages/RegisterForm.vue';
import GuestTable from 'src/pages/GuestTable.vue';

export default {
    data() {
        return {
            show: 'form' // 'form' для отображения формы, 'table' для отображения таблицы
        }
    },
    components: {
        RegisterForm,
        GuestTable
},
    methods: {}
};
</script>

<style scoped>
.centered-content {
    justify-content: center;
    align-items: flex-start;
    height: auto;
    background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
}

.guest-registration-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 2rem;
}

.form-container {
    width: 100%;
    max-width: 550px;
    background-color: #ffffff;
    padding: 25px 35px;
    border-radius: 12px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

h1 {
    color: #4CAF50;
    text-align: center;
    font-size: 24px;
    margin-bottom: 30px;
    border-bottom: 2px solid #e1e1e1;
    padding-bottom: 15px;
}

q-input {
    margin-bottom: 25px;
    background-color: #f9f9f9;
    border: 1px solid #e1e1e1;
    border-radius: 8px;
    transition: all 0.3s ease;
}

q-btn {
    width: 100%;
    font-weight: bold;
    font-size: 18px;
    transition: background-color 0.3s, box-shadow 0.3s;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

q-btn:hover {
    background-color: #5a6268; /* Slightly darker shade */
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.centered-content q-toolbar {
    width: 100%;
    max-width: 550px;
    justify-content: space-between;
    margin-bottom: 1rem;
}
</style>

<template>
    <q-page>
        <div class="auth-form-container">
            <img class="auth-logo" src="../assets/images/r_footer-logo.webp" alt="">
            <q-input
                filled
                type="email"
                v-model="email"
                label="E-mail"
                stack-label
                bg-color="white"
            />
            <q-input
                type="password"
                filled
                v-model="password"
                label="Senha"
                stack-label
                bg-color="white"
                style="margin-top: 24px"
            />
            <q-btn class="login-button" @click="login">
                <span class="login-button__label">Entrar</span>
            </q-btn>
        </div>
    </q-page>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async login() {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                email: this.email,
                password: this.password,
            })
            if (response.request.status === 200) {
                this.$router.push('/')
                localStorage.setItem('auth_token', response.data.access_token)
            }
        }
    }
}
</script>


<style lang="sass" scoped>
.q-page
    background-color: #0E044A
    height: 100vh
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center

.auth-form-container
    width: 500px
    display: flex
    flex-direction: column

.auth-logo
    width: 300px
    margin: auto
    margin-bottom: 146px

.q-btn
    background-color: #584af8
    margin-top: 26px

.login-button__label
    text-transform: none
    color: white
</style>
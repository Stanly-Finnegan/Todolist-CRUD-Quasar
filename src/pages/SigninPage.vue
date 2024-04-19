<template>
  <div class="row justify-center items-center q-mb-xl">
    <h1>Sign In</h1>
  </div>
 <form class ="q-gutter-md q-mx-xl justify-center items-center" @submit.prevent="btnLogin">
  <q-input v-model="email" type="email" outlined label="Email" />
  <q-input v-model="password" :type="isPwd ? 'password': 'text'" outlined label="Password">
    <template
    v-slot:append>
      <q-icon
    :name="isPwd ? 'visibility_off' : 'visibility'"
    class="cursor-pointer"
    @click="isPwd = !isPwd"
    />
    </template>
  </q-input>
  <div class="row">
    <q-btn class="col-md-auto q-px-xl q-py-sm" label="Sign In" type="submit" color="primary"/>
    <div class="column col items-end justify-center" >
      <router-link to="/signup">Sign Up</router-link>
    </div>
  </div>
 </form>

 <q-dialog v-model="alertMsg" >
      <q-card style="min-width: 40%">
        <q-card-section>
          <div class="text-h6">Wrong  Email or Password!</div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Ok" v-close-popup />
        </q-card-actions>

      </q-card>
  </q-dialog>

</template>

<script setup>
import { ref } from 'vue'
import { api } from 'src/boot/axios'
import { useRouter } from 'vue-router'

const isPwd = ref(true)
const email = ref('')
const password = ref('')
const router = useRouter()
const alertMsg = ref('false')

const authtoken = localStorage.getItem('token')
console.log('token', authtoken)

const checkToken = (localToken) => {
  try {
    api.get('authToken', {
      // token: localToken
    }).then((response) => {
      console.log('response axios', response)
      console.log(response.data)
      router.push('home')
    }).catch((error) => {
      console.error('Error token', error)
    })
  } catch (error) {
  }
}

if (authtoken) {
  checkToken(authtoken)
}

const btnLogin = () => {
  try {
    console.log('Input Data : ' + email.value, password.value)
    api.post('signIn', {
      email: email.value,
      password: password.value
    }).then((response) => {
      console.log('response axios', response)
      localStorage.setItem('token', response.data.token)
      console.log('success login :', response.data.message, 'token : ', response.data.token)
      router.push('home')
    }).catch((error) => {
      alertMsg.value = true
      console.log('Error Sign In : ', error.response.data.messages)
    })
  } catch (error) {
  }
}
</script>

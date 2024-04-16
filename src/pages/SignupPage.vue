<template>
  <div class="row justify-center items-center q-mb-xl">
    <h1>Sign Up</h1>
  </div>
 <form class ="q-gutter-md q-mx-xl justify-center" @submit.prevent="btnSignUp">
  <q-input v-model="name"  outlined label="User Name" />
  <p style="color: red;">{{ errMessage.name }}</p>
  <q-input v-model="email"  outlined label="Email" />
  <p style="color: red;" >{{ errMessage.email }}</p>
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
  <p style="color: red;" >{{ errMessage.password }}</p>

  <div class="row">
    <q-btn class="col-md-auto q-px-xl q-py-sm" label="Sign Up" type="submit" color="primary"/>
    <div class="column col items-end justify-center" >
      <router-link to="/" >Sign In</router-link>
    </div>
  </div>
 </form>
</template>

<script setup>
import { ref } from 'vue'
import { api } from 'src/boot/axios'
import { useRouter } from 'vue-router'

const isPwd = ref(true)
const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()
const errMessage = ref({
  name: '',
  email: '',
  password: ''
})

const btnSignUp = async () => {
  try {
    const response = await api.post('signUp', {
      name: name.value,
      email: email.value,
      password: password.value
    })
    console.log('response axios', response)
    if (response.data.success) {
      router.push('/')
      console.log('success register :', response.data.message)
    } else {
      // console.error('Error: register :', error.response.data.messages)
    }
  } catch (error) {
    console.log('Error Register : ', error.response.data.messages)
    errMessage.value.name = error.response.data.messages.message.name
    errMessage.value.email = error.response.data.messages.message.email
    errMessage.value.password = error.response.data.messages.message.password
  }
}
</script>

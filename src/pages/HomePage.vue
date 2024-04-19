<template>
  <div class="q-mx-xl">

    <div class="row justify-between q-my-sm" >
    <q-btn
          size="lg"
          color="negative"
          round
          flat
          dense
          icon=" logout"
          @click.prevent="btnLogout"
        />
  </div>

  <div class="column justify-center items-center q-my-xl">
    <h1 style="font-weight:400;" class="q-my-lg" >Todo List</h1>
    <q-btn unelevated round color="positive" icon="add" @click="addPrompt = true"/>
  </div>

  <div  class="q-gutter-y-md q-mb-xl">
    <q-card flat bordered v-for="(item,index) in fetch" :key="index">

      <q-card-section>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ item.title }}</div>
        <div class="text-caption text-grey">
          <pre>{{ item.description }}</pre>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat color="primary" icon="edit" @click="btnEditAlert(item)"  />
        <q-btn flat color="negative" icon="delete" @click="btnDeleteAlert(item)"  />
      </q-card-actions>

    </q-card>
  </div>

  </div>

  <q-dialog v-model="addPrompt" persistent>
      <q-card style="min-width: 60%">
        <q-card-section>
          <div class="text-h6">Add new task</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="title" autofocus label="Title" />
          <q-input dense v-model="description" type="textarea" autofocus autogrow label="Description" class="q-my-lg"  />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add" @click="btnAdd"   />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <dialogDelete :dialogStatus="deletePrompt" :data="tempData" @onClose="deletePrompt=false" @fetchData="checkToken(authtoken)" />
    <dialogEdit :dialogStatus="editPrompt" :data="tempData" @onClose="editPrompt=false" @fetchData="checkToken(authtoken)" />

</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'src/boot/axios'
import dialogDelete from 'components/ComponentDeleteDialog.vue'
import dialogEdit from 'components/ComponentEditDialog.vue'

const router = useRouter()
const addPrompt = ref(false)
const editPrompt = ref(false)
const title = ref('')
const description = ref('')
const deletePrompt = ref(false)
const fetch = ref([])
const tempData = ref([])

const authtoken = localStorage.getItem('token')

const checkToken = (localToken) => {
  try {
    api.get('authToken')
      .then((response) => {
        console.log('response axios', response)
        console.log(response.data)
        if (response.data.success) {
          // router.push('home')
          fetchData(authtoken)
          console.log('Home token :', response.data.message)
        } else {
          console.error('error: token :', response.data.message)
          router.push('/')
        }
      }).catch((error) => {
        console.error('Error token', error)
      })
  } catch (error) {
  }
}

checkToken(authtoken)

const btnAdd = () => {
  try {
    api.post('addList', {
      title: title.value,
      description: description.value
      // token: authtoken
    }).then((response) => {
      console.log('response axios', response)
      // localStorage.getItem('token', response.data.token)
      checkToken(authtoken)
      console.log('success add list :', response.data.message, 'token : ', response.data.token)
      addPrompt.value = false
      title.value = ''
      description.value = ''
      console.log('This is Addprompt' + addPrompt.value)
    }).catch((error) => {
      console.log('Error add list : ', error)
    })
  } catch (error) {
  }
}

const btnDeleteAlert = (data) => {
  // console.log('Data: ', data)
  deletePrompt.value = true
  tempData.value = data
}
const btnEditAlert = (data) => {
  // console.log('Data: ', data)
  editPrompt.value = true
  tempData.value = data
}

const fetchData = (localToken) => {
  try {
    api.post('fetchData', {
      token: localToken
    }).then((response) => {
      console.log('response axios', response)
      console.log(response.data)
      if (response.data.success) {
        // router.push('home')
        console.log('Fetch data Status :', response.data.message)
        fetch.value = response.data.result
        console.log('result: ', response.data.result)
      } else {
        console.error('Fetch Failed :', response.data.message)
      }
    }).catch((error) => {
      console.error('Fetch Error', error)
    })
  } catch (error) {
  }
}

const deleteToken = (localToken) => {
  try {
    api.delete('signOut').then((response) => {
      console.log('response axios', response)
      if (response.data.success) {
        router.push('/')
        localStorage.removeItem('token')
        console.log('token', response.data.message)
      } else {
        console.error('error: token :', response.data.message)
      }
    }).catch((error) => {
      console.error('Error token', error)
    })
  } catch (error) {
  }
}

const btnLogout = () => {
  console.log('Home token', authtoken)
  if (authtoken) {
    deleteToken(authtoken)
  }
}

</script>

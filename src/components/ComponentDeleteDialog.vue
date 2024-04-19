<template>

<q-dialog :model-value="props.dialogStatus" persistent @hide="emits('onClose')">
      <q-card style="min-width: 40%">
        <q-card-section>
          <div class="text-h6">Delete this list {{ props.data.title }} ?</div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Delete" @click="deleteItem" />
        </q-card-actions>

      </q-card>
    </q-dialog>

</template>

<script setup>
import { defineProps } from 'vue'
import { api } from 'src/boot/axios'

const emits = defineEmits([
  'onClose',
  'fetchData'
])

const props = defineProps({
  dialogStatus: Boolean,
  data: Object
})

const deleteItem = () => {
  // console.log('ini UUID', props.data.uuid)
  emits('onClose')

  api.delete('deleteData/' + props.data.uuid).then((response) => {
    console.log('response axios', response)
    emits('fetchData')
    console.log('success delete list :', response.data.message)
  }).catch((error) => {
    console.error('Delete Error', error)
  })
  // const apiURL = 'deleteData/' + props.data.uuid
  // console.log(apiURL)
  // api.delete('deleteData/' + props.data.uuid).then(() => {
  //   emits('fetchData')
  //   alert('Berhasil Menghapus Data')
  // })
}
</script>

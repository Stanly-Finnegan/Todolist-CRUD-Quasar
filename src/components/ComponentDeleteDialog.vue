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
  'onClose'
])

const props = defineProps({
  dialogStatus: Boolean,
  data: Object
})

const deleteItem = async () => {
  // console.log('ini UUID', props.data.uuid)
  emits('onClose')
  try {
    const response = await api.post('deleteData', {
      uuid: props.data.uuid
    })
    console.log('response axios', response)
    if (response.data.success) {
      console.log('success delete list :', response.data.message)
    } else {
      console.error('failed delete list  :', response.data.message)
    }
  } catch (error) {
    console.error('Delete Error', error)
  }

  location.reload()
}
</script>

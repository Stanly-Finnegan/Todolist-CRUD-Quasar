<template>

<q-dialog :model-value="props.dialogStatus" persistent @hide="emits('onClose')">
  <q-card style="min-width: 60%">
        <q-card-section>
          <div class="text-h6">Edit task</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="title" autofocus label="Title" ></q-input>
          <q-input dense v-model="description" autofocus autogrow label="Description" class="q-my-lg"  />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Edit" @click="editItem"   />
        </q-card-actions>
      </q-card>
</q-dialog>

</template>

<script setup>
import { ref, watch } from 'vue'
import { api } from 'src/boot/axios'
const emits = defineEmits([
  'onClose'
])

const props = defineProps({
  dialogStatus: Boolean,
  data: Object
})

const title = ref('')
const description = ref('')

watch(() => props.dialogStatus, (newVal) => {
  if (newVal) {
    title.value = props.data.title
    description.value = props.data.description
  } else {
    title.value = ''
    description.value = ''
  }
})

const editItem = async () => {
  console.log('ini UUID', props.data.uuid)
  emits('onClose')
  try {
    const response = await api.post('editData', {
      uuid: props.data.uuid,
      title: title.value,
      desc: description.value
    })
    console.log('response axios', response)
    if (response.data.success) {
      console.log('success edit list :', response.data.message)
    } else {
      console.error('failed edit list  :', response.data.message)
    }
  } catch (error) {
    console.error('Edit Error', error)
  }

  location.reload()
}
</script>

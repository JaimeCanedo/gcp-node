<template>
    <div class="q-pa-md">
      <h1>Editar Usuario</h1>
      <q-form @submit="updateUser">
        <q-input label="Nombre" v-model="editedUser.name" />
        <q-input label="Contraseña" v-model="editedUser.password" />
        <q-input label="Correo Electrónico" v-model="editedUser.email" />
        <q-input label="Rol" v-model="editedUser.rol" />
        <q-btn type="submit" label="Guardar Cambios" color="primary" class="q-mt-md" />
      </q-form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { usersController } from '../controllers/usersController.js';
  
  export default {
    setup() {
      const router = useRouter();
      const route = useRouter();
      const userId = ref(route.params.id);
      const editedUser = ref(null);
  
      const getUser = async () => {
        try {
          editedUser.value = await usersController.getUser(userId.value);
        } catch (error) {
          console.error('Error al obtener el usuario:', error);
        }
      };
  
      const updateUser = async () => {
        try {
          await usersController.updateUser(userId.value, editedUser.value);
          console.log('Usuario actualizado correctamente');
          router.push('/'); // Redirigir a la página principal después de actualizar el usuario
        } catch (error) {
          console.error('Error al actualizar el usuario:', error);
        }
      };
  
      getUser(); // Obtener el usuario al cargar el componente
  
      return {
        editedUser,
        updateUser,
      };
    },
  };
  </script>
  
  <style scoped>
  </style>
  
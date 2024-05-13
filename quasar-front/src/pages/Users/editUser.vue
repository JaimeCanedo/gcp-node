<template>
    <div class="q-pa-md">
      <h1>Editar Usuario</h1>
      <q-form @submit="updateUser" v-if="editedUser">
        <q-input label="Nombre" v-model="editedUser.name" />
        <q-input label="Contraseña" v-model="editedUser.password" />
        <q-input label="Correo Electrónico" v-model="editedUser.email" />
        <q-input label="Rol" v-model="editedUser.rol" />
        <q-btn type="submit" label="Guardar Cambios" color="primary" class="q-mt-md" />
      </q-form>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const router = useRouter();
      const userId = router.currentRoute.value.params.id;
      const editedUser = ref(null);
  
      const getUser = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/users/${userId}`);
          console.log(response);
          editedUser.value = await response.json();
        } catch (error) {
          console.error('Error al obtener el usuario:', error);
        }
      };
  
      const updateUser = async () => {
  try {
    const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedUser.value)
    });

    if (response.ok) {
      console.log('Usuario actualizado correctamente');
      router.push('/users'); // Redirigir a la página principal después de actualizar el usuario
    } else {
      console.error('Error al actualizar el usuario:', response.statusText);
    }
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
  }
};
  
      onMounted(() => {
        getUser();
      });
  
      return {
        editedUser,
        updateUser,
      };
    },
  };
  </script>
  
  <style scoped>
  </style>
  
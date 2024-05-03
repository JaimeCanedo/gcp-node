<template>
    <div class="q-pa-md">
      <h1>Crear Usuario</h1>
      <q-form @submit="createUser">
        <q-input label="Nombre" v-model="newUser.name" />
        <q-input label="Contraseña" v-model="newUser.password" />
        <q-input label="Correo Electrónico" v-model="newUser.email" />
        <q-input label="Rol" v-model="newUser.rol" />
        <q-btn type="submit" label="Crear Usuario" color="primary" class="q-mt-md" />
      </q-form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newUser: {
          name: '',
          password: '',
          email: '',
          rol: '',
        },
      };
    },
    methods: {
      async createUser() {
        try {
          const response = await fetch('http://localhost:8080/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.newUser),
          });
          if (response.ok) {
            console.log('Usuario creado correctamente');
            this.$router.push('/'); // Redirigir a la página principal después de crear el usuario
          } else {
            console.error('Error al crear usuario:', response.statusText);
          }
        } catch (error) {
          console.error('Error al crear usuario:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  
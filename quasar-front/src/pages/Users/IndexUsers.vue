<template>
    <div class="q-pa-md">
      <q-table
        title="Usuarios"
        :rows="users"
        :columns="columns"
        row-key="id"
      />
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserTable',
    data() {
      return {
        users: [],
        columns: [
          { name: 'id', label: 'ID', align: 'left', sortable: true },
          { name: 'name', label: 'Nombre', align: 'left', sortable: true },
          { name: 'email', label: 'Email', align: 'left', sortable: true },
          { name: 'rol', label: 'Rol', align: 'left', sortable: true }
        ]
      };
    },
    mounted() {
      this.getUsers();
    },
    methods: {
      async getUsers() {
        try {
          const response = await fetch("http://localhost:8080/api/users");
          //console.log(response);
          if (!response.ok) {
            throw new Error("Error al obtener los usuarios");
          }
          this.users = await response.json();
          console.log(this.users)
          console.log(Array.from(this.users)); // Convierte el Proxy a un Array
console.log([...this.users]); // Otra forma de convertir el Proxy a un Array

        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  </script>
  
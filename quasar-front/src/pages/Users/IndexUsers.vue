<template>
  <div class="q-pa-md">
    <q-table
      flat bordered
      title="Usuarios"
      :rows="users"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:body="props">
        <q-tr :props="props" @click="onRowClick(props.row)">
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="password" :props="props">
            {{ props.row.password }}
          </q-td>
          <q-td key="email" :props="props">
            {{ props.row.email }}
          </q-td>
          <q-td key="rol" :props="props">
            {{ props.row.rol }}
          </q-td>
          <q-td key="actions" :props="props" class="text-center">
            <q-btn icon="edit" round dense color="yellow" @click="editUser(props.row)"/>
            <q-btn icon="delete" round dense color="negative" @click="deleteUser(props.row)"/>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      columns: [
        { name: 'id', label: 'ID' },
        { name: 'name', label: 'Nombre' },
        { name: 'password', label: 'Contraseña' },
        { name: 'email', label: 'Correo Electrónico' },
        { name: 'rol', label: 'Rol' },
        { name: 'actions', label: 'Acciones', align: 'center' }
      ]
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      const response = await fetch("http://localhost:8080/api/users");
      this.users = await response.json();
    },
    async editUser(user) {

    },
    async deleteUser(user) {

    },
    async onRowClick(row) {

    }
  },
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>


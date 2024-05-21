<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
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
            <q-btn
              icon="edit"
              round
              dense
              color="yellow"
              class="q-ml-md q-mb-md"
              @click="$router.push({ name: 'editUser', params: { id: props.row.id } })"
            />
            <q-btn
              icon="delete"
              round
              dense
              color="red"
              class="q-ml-md q-mb-md"
              @click="deleteUser(props.row.id)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <div class="button-container">
      <q-btn icon="add" label="Crear" color="primary" class="q-ml-md q-mb-md" @click="$router.push('/createUser')" />
      <q-btn icon="picture_as_pdf" label="Exportar PDF" color="primary" class="q-ml-md q-mb-md" @click="exportToPDF" />
      <q-btn icon="table_view" label="Exportar Excel" color="primary" class="q-ml-md q-mb-md" @click="exportToExcel" />
    </div>
  </div>
</template>

<script>
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

export default {
  data() {
    return {
      users: [],
      columns: [
        { name: "id", label: "ID" },
        { name: "name", label: "Nombre" },
        { name: "password", label: "Contraseña" },
        { name: "email", label: "Correo Electrónico" },
        { name: "rol", label: "Rol" },
        { name: "actions", label: "Acciones", align: "center" },
      ],
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
      try {
        this.$router.push({ path: `/editUser/${user.id}` });
      } catch (error) {
        console.error("Error al actualizar el usuario:", error);
      }
    },
    async deleteUser(userId) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/users/${userId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          console.log(`Usuario con ID ${userId} eliminado correctamente`);
          this.getUsers();
        } else {
          console.error("Error al eliminar el usuario:", response.statusText);
        }
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
      }
    },
    async onRowClick(row) {},
    exportToPDF() {
      const doc = new jsPDF();
      const columns = this.columns.filter(col => col.name !== 'actions').map(col => col.label);
      const rows = this.users.map(user => [
        user.id,
        user.name,
        user.password,
        user.email,
        user.rol
      ]);

      doc.autoTable(columns, rows);
      doc.save("usuarios.pdf");
    },
    exportToExcel() {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(this.users.map(user => ({
        ID: user.id,
        Nombre: user.name,
        Contraseña: user.password,
        "Correo Electrónico": user.email,
        Rol: user.rol
      })));

      XLSX.utils.book_append_sheet(wb, ws, "Usuarios");
      XLSX.writeFile(wb, "usuarios.xlsx");
    }
  }
};
</script>

<style scoped>
.text-center {
  text-align: center;
}

.button-container {
  display: flex;
  justify-content: space-between;
}
</style>

<template>
    <div>
        <h1>Usuarios</h1>
        <ul>
            <li v-for="user in users" :key="user.id">{{ user.name }}</li>
        </ul>
    </div>
</template>

<script>
export default {
data() {
    return {
       users:[], 

        };
    },
    mounted() {
        this.getUsers();
    },
    methods: {
        async getUsers(){
            const response = await fetch("http://localhost:8080/api/users");
            this.users = await response.json();
            res.sendFile(path.join(__dirname) + '/quasar-front/dist/spa/index.html');
        }
        
    }
}
</script>

<style>

</style>
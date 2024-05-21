<template>
  <div class="login-layout">
    <div class="login-container">
      <h2>Login</h2>
      <input type="text" v-model="correo" placeholder="Correo" class="login-input">
      <input type="password" v-model="contraseña" placeholder="Contraseña" class="login-input">
      <div class="button-container">
        <button @click="login" class="login-button">Iniciar sesión</button>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        correo: '',
        contraseña: ''
      };
    },
    methods: {
      login() {
        fetch('http://localhost:8080/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.correo,
            password: this.contraseña,
          })
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Credenciales incorrectas');
          }
        })
        .then(data => {
          if (data.rol === 2) {
            this.$router.push('/main');
          } else {
            throw new Error('Acceso denegado');
          }
        })
        .catch(error => {
          alert(error.message);
        });
      },
    }
  };
  </script>
  
  <style>
  .login-layout {
    background-image: url(''); /* Cambia esto a la ruta de tu imagen */
    background-size: cover; /* Esto hace que la imagen cubra toda la página */
    background-position: center; /* Centra la imagen en la página */
    background-repeat: no-repeat; /* Evita que la imagen se repita */
    height: 100vh; /* Asegura que la imagen cubra toda la altura de la ventana */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    background: rgba(255, 255, 255, 0.8); /* Fondo blanco semitransparente para el contenedor de login */
  }
  
  .login-input {
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  
  .button-container {
    display: flex;
    justify-content: space-between;
  }
  
  .login-button {
    width: calc(50% - 10px); /* Ajusta el ancho para dejar un espacio entre los botones */
    padding: 8px;
    margin: 0 5px; /* Añade un margen a la izquierda y a la derecha */
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  
  .login-button:hover {
    background-color: #0056b3;
  }
  </style>
  
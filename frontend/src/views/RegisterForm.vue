<template>
    <div class="register-form">
      <h2>Register</h2>
      <form @submit.prevent="submitForm">
        <div>
          <label for="username">Username</label>
          <input type="text" v-model="username" @blur="checkUsername" required />
          <span v-if="usernameError">{{ usernameError }}</span>
        </div>
        <div>
          <label for="email">Email</label>
          <input type="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" v-model="password" required />
        </div>
        <div>
          <label for="profilePicture">Profile Picture</label>
          <input type="file" @change="onFileChange" />
        </div>
        <div>
          <label for="bio">Bio</label>
          <textarea v-model="bio"></textarea>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        profilePicture: null,
        bio: '',
        usernameError: ''
      };
    },
    methods: {
      async checkUsername() {
        // Simulate an API call to check if the username is already taken
        const response = await fetch(`/api/check-username?username=${this.username}`);
        const data = await response.json();
        if (data.exists) {
          this.usernameError = 'Username is already taken';
        } else {
          this.usernameError = '';
        }
      },
      onFileChange(event) {
        this.profilePicture = event.target.files[0];
      },
      async submitForm() {
        if (this.usernameError) {
          alert('Please fix the errors before submitting');
          return;
        }
  
        const formData = new FormData();
        formData.append('username', this.username);
        formData.append('email', this.email);
        formData.append('password', this.password);
        formData.append('profilePicture', this.profilePicture);
        formData.append('bio', this.bio);
  
        // Simulate an API call to submit the form data
        const response = await fetch('/api/register', {
          method: 'POST',
          body: formData
        });
  
        if (response.ok) {
          alert('Registration successful');
        } else {
          alert('Registration failed');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .register-form {
    max-width: 400px;
    margin: 0 auto;
  }
  .register-form div {
    margin-bottom: 15px;
  }
  .register-form label {
    display: block;
    margin-bottom: 5px;
  }
  .register-form input,
  .register-form textarea {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  .register-form button {
    padding: 10px 15px;
  }
  </style>
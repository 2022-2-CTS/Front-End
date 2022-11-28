<template>
    <div>
        <button @click="aa()">히힛</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    name: 'test',
    data() {
        return {

        }
    },
    components: {
        
    },
    methods: {
        aa(){
            axios.get("/api/post-get").then((response) => { 
                console.log(response.data);
            });
        }
    },
  }
  </script>
  
  <style>
  
  </style>
  
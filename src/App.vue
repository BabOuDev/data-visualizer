<template>
  <MainView v-model="people"/>
</template>

<script>

  import MainView from '@/views/MainView.vue';

  export default {
    name: 'App',
    components: {
      MainView,
    },
    data() {
      return {
        people: [],
      };
    },
    methods: {
      retrievePeople() {
        return fetch('https://run.mocky.io/v3/70e5b0ad-7112-41c5-853e-b382a39e65b7');
      },
    },
    created() {
      this.retrievePeople()
        .then((data) => data.json())
        .then((data) => {
          this.people = data.people;
        })
        .catch((e) => console.log('Error while retrieving data!', e));
    },
  };
</script>

<style>

  body {
    background: radial-gradient(circle, var(--color-1-alpha) 0%, var(--color-2-alpha) 70%);
  }

</style>

<template>
  <MainView :people="people"/>
</template>

<script>

  import MainView from '@/components/MainView.vue';

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

<style scoped>

</style>

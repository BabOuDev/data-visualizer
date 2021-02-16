<template>
  <img class="logo" alt="Vue logo" src="./assets/logo.png" />
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      people: []
    }
  },
  methods: {
    retrievePeople () {
      return fetch('https://run.mocky.io/v3/70e5b0ad-7112-41c5-853e-b382a39e65b7')
    }
  },
  created () {
    this.retrievePeople()
      .then((data) => data.json())
      .then((data) => { this.people = data.people })
      .catch((e) => console.log('Error while retrieving data!', e))
  }
}
</script>

<style scoped>
.logo{
    position: absolute;
    top: 0;
    left: 0;
    height: 60px;
}
</style>

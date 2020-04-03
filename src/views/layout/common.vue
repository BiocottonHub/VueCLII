<template>
  <div>
    users
    <router-link to="/users/list">list</router-link>|
    <router-link to="/users/edit">Edit</router-link>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'users'
}

</script>
<style lang='' scoped>
</style>

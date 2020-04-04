<template>
  <div class="nav">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">
        <router-link to="/">Home</router-link>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">Tools</template>
        <el-menu-item index="2-1">
          <router-link to="/blast/query">Blast</router-link>
        </el-menu-item>
        <el-menu-item index="2-2">
          <router-link to="/users">选项2</router-link>
        </el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3">
        <router-link to="/about">About</router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <router-link to="/users">Users</router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>

export default {
  name: 'NavHeader',
  data () {
    return {
      activeIndex: '1'
    }
  }
}

</script>
<style  scoped>
.el-menu a.router-link-exact-active {
  color: #42b983;
}
.el-menu a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}
</style>

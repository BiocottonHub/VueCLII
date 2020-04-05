<template>
  <el-row
    id="my-modal"
    v-show="isShow"
    type="flex"
    align="center"
    justify="center"
    :style="backgroundColor"
  >
    <el-col :span="24">
      <div id="modal-show" v-show="isShow">
        <span :style="fontColor">
          <i :class="icon"></i>
          <h1>
            <slot name="message">success</slot>
          </h1>
        </span>
      </div>
    </el-col>
  </el-row>
</template>

<script>

export default {
  name: 'MyModal',
  props: {
    isShow: {
      default: false
    },
    fontColor: {
      default: () => { return { color: '#67c23a' } }
    },
    icon: {
      default: 'el-icon-check'
    },
    backgroundColor: {
      default: () => { return { 'background-color': '#2f3640' } }
    }
  },
  data () {
    return {

    }
  }
}

</script>
<style  scoped>
#my-modal {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;

  z-index: 10001;
  opacity: 0.9;
  filter: alpha(opacity=0.7);
}
#my-modal .el-col {
  display: flex;
  justify-content: center;
  align-items: center;
}
#modal-show {
  border: 0px;
  opacity: 1;
  z-index: 10002;
  overflow: auto;
  text-align: center;
}
#modal-show span i {
  font-size: 50px;
}
</style>

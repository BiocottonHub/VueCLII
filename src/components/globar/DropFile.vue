<template>
  <div id="drop-box" class="drop-box">
    <my-modal
      :isShow="showModal"
      :message="Modalmessage"
      :fontColor="ModalFontColor"
      :icon="Modalicon"
    >
      <slot slot="message">{{Modalmessage}}</slot>
    </my-modal>
  </div>
</template>
<script>
export default {
  name: 'DropFile',
  data () {
    return {
      borderhover: true,
      showModal: false,
      Modalicon: '',
      Modalmessage: '',
      ModalFontColor: ''
    }
  },
  // TODO:
  /*
  增加前端文件校验函数
  */
  methods: {
    enentDrop: function (e) {
      this.borderhover = false
      e.stopPropagation()
      e.preventDefault() // 必填字段
      // const fileData = e.dataTransfer.files
      this.showModal = true
      this.Modalmessage = 'Parse upload files'
      this.ModalFontColor = { color: '#00a8ff' }
      this.Modalicon = 'el-icon-loading'
      setTimeout(() => {
        if (typeof this === 'undefined') {
          this.showModal = true
          this.Modalmessage = 'success upload file'
          this.ModalFontColor = { color: '#4cd137' }
          this.Modalicon = 'el-icon-check'
        } else {
          this.showModal = true
          this.Modalmessage = 'some error with  file'
          this.ModalFontColor = { color: '#d63031' }
          this.Modalicon = 'el-icon-close'
          setTimeout(() => { this.showModal = false }, 400)
        }
      }, 2000)
    }
  },
  mounted () {
    const _this = this
    var elementNode = ''
    var dropBox = document.getElementsByTagName('body')[0]
    dropBox.addEventListener('drop', this.enentDrop, false)
    dropBox.addEventListener('dragleave', function (e) {
      e.stopPropagation()
      e.preventDefault()
      if (elementNode === e.target) {
        _this.showModal = false
        _this.borderhover = false
      }
      // _this.$loading().close()
    }, false)
    dropBox.addEventListener('dragenter', function (e) {
      elementNode = e.target
      e.stopPropagation()
      e.preventDefault()
      _this.showModal = true
      _this.Modalmessage = 'Drop File here'
      _this.ModalFontColor = { color: '#fbc531' }
      _this.Modalicon = 'el-icon-upload'
      _this.borderhover = true
    }, false)
    dropBox.addEventListener('dragover', function (e) {
      e.stopPropagation()
      e.preventDefault()
      _this.borderhover = true
    }, false)
  }
}

</script>
<style scoped>
.drop-file {
  background: olive;
}
</style>

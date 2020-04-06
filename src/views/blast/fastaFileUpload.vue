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
import validateFasta from '@/utils/validateFasta.js'
export default {
  name: 'fastaFileUpload',
  props: {

  },
  data () {
    return {
      borderhover: true,
      showModal: false,
      Modalicon: '',
      Modalmessage: '',
      ModalFontColor: '',
      fileData: ''
    }
  },
  /*
    TODO: ok
    增加fasta文件校验函数
  */
  methods: {
    enentDrop: function (e) {
      this.borderhover = false
      e.stopPropagation()
      e.preventDefault() // 阻止浏览器默认事件
      this.fileData = e.dataTransfer.files[0] // 获取上传文件对象
      this.showModal = true
      this.Modalmessage = 'Parse upload files'
      this.ModalFontColor = { color: '#00a8ff' }
      this.Modalicon = 'el-icon-loading'
      setTimeout(() => {
        validateFasta(this.fileData, (BaseFlag, ProteinFlag, fileText) => {
          if (BaseFlag && ProteinFlag) {
            this.showModal = true
            this.Modalmessage = 'error fasta file'
            this.ModalFontColor = { color: '#d63031' }
            this.Modalicon = 'el-icon-close'
            this.$emit('fileStatus', { status: 0, fileText: fileText })
            setTimeout(() => { this.showModal = false }, 1000)
          } else if (!BaseFlag) {
            this.showModal = true
            this.Modalmessage = 'Nucleic acid sequence file'
            this.ModalFontColor = { color: '#4cd137' }
            this.Modalicon = 'el-icon-check'
            this.$emit('fileStatus', { status: 1, fileText: fileText })
            setTimeout(() => { this.showModal = false }, 1000)
          } else if (!ProteinFlag) {
            this.showModal = true
            this.Modalmessage = 'Protein sequence file'
            this.ModalFontColor = { color: '#4cd137' }
            this.Modalicon = 'el-icon-check'
            this.$emit('fileStatus', { status: 1, fileText: fileText })
            setTimeout(() => { this.showModal = false }, 1000)
          }
        })
      }, 1500) // 有一个过渡时间
      // console.log(validateResult)
      // window.URL.createObjectURL(fileData[0]) // 用于显示上传图片url
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

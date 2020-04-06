<template>
  <div class="blast-query">
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-form :model="formInline" class="demo-form-inline">
          <el-form-item>
            <el-input
              type="textarea"
              :placeholder="placeholder"
              :rows="10"
              v-model="formInline.sequence"
            ></el-input>
          </el-form-item>
          <el-col :span="12">
            <el-form-item>
              <h1>nucle</h1>
              <el-radio-group
                v-model="formInline.database"
                v-for="item in blastDataBase.nucle"
                v-bind:key="item.key"
              >
                <el-col :span="24">
                  <el-radio :label="item.key" border>{{item.label}}</el-radio>
                </el-col>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <h1>Protein</h1>
              <el-radio-group
                v-model="formInline.database"
                v-for="item in blastDataBase.protein"
                v-bind:key="item.key"
              >
                <el-col :span="24">
                  <el-radio :label="item.key" border>{{item.label}}</el-radio>
                </el-col>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item>
              <el-button type="primary" @click="onSubmit">Blast</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-col>
    </el-row>
    <fasta-file-upload @fileStatus="filestatus" ref="dropfile"></fasta-file-upload>
  </div>
</template>

<script>
import request from '@/utils/request.js'
import fastaFileUpload from './fastaFileUpload'
export default {
  name: 'BlastQuery',
  data () {
    return {
      blastDataBase: {
        protein: [
          {
            label: 'Gh',
            key: 'dsaddsa'
          }
        ],
        nucle: [
          {
            label: 'Gb',
            key: 'dsaddsa1'
          }
        ]
      },
      formInline: {
        sequence: '',
        database: '',
        evalue: ''

      },
      placeholder: '请输入内容or拖动上传文件'
    }
  },
  components: {
    fastaFileUpload
  },
  methods: {
    onSubmit () {
      const formData = new FormData()
      formData.append('fastafile', this.fastaFile)
      for (var key in this.formInline) {
        formData.append(key, this.formInline[key])
      }
      request.post('/test', formData).then(
        () => {
          // console.log('ok')
        }
      )
    },
    filestatus (dropFile) {
      if (dropFile.status === 1) {
        this.formInline.sequence = dropFile.fileText
      } else {
        this.placeholder = '文件格式错误，请重新上传或者粘贴序列'
      }
    }
  },
  computed: {

  },
  mounted () {
    // request.get('/blast/database').then(
    //   (reponse) => {
    //     this.blastDataBase = reponse.data
    //   }
    // )
  }
}

</script>
<style scoped>
</style>

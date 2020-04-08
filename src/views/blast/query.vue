<template>
  <div class="blast-query">
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-form
          :model="formInline"
          ref="blastForm"
          class="demo-form-inline"
          :rules="blastFormRules"
        >
          <el-form-item prop="sequence">
            <el-input
              type="textarea"
              placeholder="'请输入内容or拖动上传文件'"
              :rows="10"
              v-model="formInline.sequence"
            ></el-input>
          </el-form-item>
          <el-col :span="12">
            <el-form-item prop="database">
              <h1>nucle</h1>
              <el-radio-group
                v-model="formInline.database"
                v-for="item in blastDataBase.nucle"
                v-bind:key="item.key"
                :disabled="dataBaseDisabled.nucle"
              >
                <el-col :span="24">
                  <el-radio :label="item.key" border>{{item.label}}</el-radio>
                </el-col>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="database">
              <h1>Protein</h1>
              <el-radio-group
                v-model="formInline.database"
                v-for="item in blastDataBase.protein"
                v-bind:key="item.key"
                :disabled="dataBaseDisabled.protein"
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
        <blast-show v-if="reponseData.length==0?false:true" :reponseData="reponseData"></blast-show>
      </el-col>
    </el-row>
    <fasta-file-upload @fileStatus="filestatus" ref="dropfile"></fasta-file-upload>
    <my-modal :isShow="showProcess" :icon="'el-icon-loading'">
      <h1 slot="message">Blasting</h1>
    </my-modal>
  </div>
</template>

<script>
import request from '@/utils/request.js'
import fastaFileUpload from './fastaFileUpload'
import BlastShow from './show.vue'
import validateFasta from '@/utils/validateFasta.js'

export default {
  name: 'BlastQuery',
  data () {
    var checkSequence = (rule, value, callback) => {
      var result = validateFasta.validateFastaByText(value)
      if (result === 0) {
        this.formInline.blastType = ''
        return callback(new Error('sequence can\'t be empty'))
      } else if (result === -1) {
        this.formInline.blastType = 3
        return callback(new Error('the text is not fasta'))
      } else if (result === 1) {
        const h = this.$createElement
        this.$message({
          message: h('p', null, [
            h('span', null, 'sequence type: '),
            h('i', { style: 'color: teal' }, 'Nucle')
          ]),
          type: 'success'
        })
        this.formInline.blastType = 1
        callback()
      } else {
        const h = this.$createElement
        this.$message({
          message: h('p', null, [
            h('span', null, 'sequence type: '),
            h('i', { style: 'color: teal' }, 'Protein')
          ]),
          type: 'success'
        })
        this.formInline.blastType = 2
        callback()
      }
    }
    var checkDataBase = (rule, value, callback) => {
      if (!value) {
        callback(new Error('please select a DataBase'))
      } else {
        callback()
      }
    }
    return {
      blastDataBase: {
        protein: [
          {
            label: 'Gh',
            key: 'afc8b57f9b23744099fe36b8a31d8877'
          },
          {
            label: 'error',
            key: 'afc8b57f9b23744099fe236b8a31d8877'
          }
        ],
        nucle: [
          {
            label: 'Gb',
            key: '5b8c174f2ea1f0b725d052400fc85ade'
          },
          {
            label: 'error',
            key: '5b8c1174f2ea1f0b725d052400fc85ade'
          }
        ]
      },
      formInline: {
        sequence: '',
        database: '',
        evalue: '-evalue 1.0e-5 -num_alignments 10 -max_hsps 10',
        blastType: ''
      },
      blastFormRules: {
        sequence: [
          { validator: checkSequence, trigger: 'blur' }
        ],
        database: [
          { validator: checkDataBase, trigger: 'blur' }
        ]
      },
      reponseData: [],
      showProcess: false
    }
  },
  components: {
    fastaFileUpload,
    BlastShow
  },
  methods: {
    onSubmit () {
      this.$refs.blastForm.validate((valid) => {
        if (valid) {
          const formData = new FormData()
          for (var key in this.formInline) {
            formData.append(key, this.formInline[key])
          }
          this.showProcess = true
          request.post('/test', formData).then(
            (reponse) => {
              this.reponseData = reponse.data
              this.showProcess = false
            }
          )
        } else {
          return false
        }
      })
    },
    filestatus (dropFile) {
      if (dropFile.status === 1) {
        this.formInline.sequence = dropFile.fileText
      } else {
        const h = this.$createElement
        this.$message({
          message: h('p', null, [
            h('span', null, 'sequence error: '),
            h('i', { style: 'color: teal' }, 'Please try again')
          ]),
          type: 'success'
        })
      }
    }
  },
  computed: {
    dataBaseDisabled () {
      if (this.formInline.blastType === 1) {
        return {
          protein: true,
          nucle: false
        }
      } else if (this.formInline.blastType === 2) {
        return {
          protein: false,
          nucle: true
        }
      } else if (this.formInline.blastType === 3) {
        return {
          protein: true,
          nucle: true
        }
      } else {
        return {
          protein: false,
          nucle: false
        }
      }
    }
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

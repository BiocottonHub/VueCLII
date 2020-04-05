<template>
  <div class="blast-query">
    <el-row>
      <el-col :span="20">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="审批人">
            <el-input
              type="textarea"
              placeholder="请输入内容or拖动上传文件"
              :rows="20"
              v-model="formInline.user"
            ></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="formInline.region" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <drop-file></drop-file>
  </div>
</template>

<script>
export default {
  name: 'BlastQuery',
  data () {
    return {
      formInline: {
        user: '',
        region: ''
      }
    }
  },
  methods: {
    onSubmit () {
      // console.log('submit!')
    }
  }
}

</script>
<style scoped>
</style>

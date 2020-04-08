<template>
  <div id="show-blast_result">
    <div v-for="item in ValidateReponse" :key="ValidateReponse.indexOf(item)">
      <h1>query: {{item.queryName}}</h1>
      <div class="showResult" v-if="item.summaryTable.length>0?true:false">
        <el-table :data="item['summaryTable']" stripe style="width: 100%">
          <el-table-column prop="id" label="number"></el-table-column>
          <el-table-column label="subject name">
            <template slot-scope="scope">
              <el-link :href="'#'+scope.row.id" type="primary">{{scope.row.subjectName}}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="score" label="score"></el-table-column>
          <el-table-column prop="evalue" label="E-value"></el-table-column>
          <el-table-column prop="identities" label="identities"></el-table-column>
          <el-table-column prop="length" label="Length"></el-table-column>
        </el-table>
        <div v-for="single in item['singleTable']" :key="single[0].id">
          <!-- <h1>{{single.subjectName}}</h1> -->
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                <h6 :id="single[0].id">{{single[0].subjectName}}</h6>
              </template>
              <div class="single-align">
                <el-table :data="single" stripe style="width: 100%">
                  <el-table-column prop="id" label="number"></el-table-column>
                  <el-table-column prop="subjectName" label="subject name"></el-table-column>
                  <el-table-column prop="score" label="score"></el-table-column>
                  <el-table-column prop="evalue" label="E-value"></el-table-column>
                  <el-table-column prop="identities" label="identities"></el-table-column>
                  <el-table-column prop="length" label="Length"></el-table-column>
                </el-table>
                <p class="pairSequence">{{single[0].pairSequence}}</p>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      <div class="Noresut" v-if="item.summaryTable.length>0?false:true">
        <h1>No Hit result</h1>
      </div>
    </div>
  </div>
</template>

<script>
// import reponseData from './reponse.js'
export default {
  name: 'BlastShow',
  props: {
    reponseData: {
      default: () => {
        return [{
          query: 'CYP78A7',
          queryLength: '559',
          alignments: []
        }]
      }
    }
  },
  data () {
    return {

    }
  },
  mounted () {
    // console.log(this.ValidateReponse)
    // console.log(this.reponseData)
  },
  computed: {
    ValidateReponse () {
      var newDataArray = []
      this.reponseData.forEach((item) => {
        var queryName = item.query
        var queryLength = item.queryLength
        var summaryTable = []
        var singleTable = []
        var AlignmentIf = ''
        if (item.alignments.length > 0) {
          AlignmentIf = true
          item.alignments.forEach((subject, index) => {
            summaryTable.push(
              {
                id: index + 1,
                subjectName: subject.subjectName,
                score: subject.score,
                evalue: subject.eValue,
                length: subject.subjectLength,
                identities: subject.identities,
                pairSequence: subject.pairSequence

              }
            )
            singleTable.push([{
              id: index + 1,
              subjectName: subject.subjectName,
              score: subject.score,
              evalue: subject.eValue,
              length: subject.subjectLength,
              identities: subject.identities,
              pairSequence: subject.pairSequence
            }])
          })
        } else {
          AlignmentIf = false
        }
        newDataArray.push({
          queryName,
          queryLength,
          summaryTable,
          AlignmentIf,
          singleTable
        })
      })
      return newDataArray
    }
  }
}

</script>
<style  scoped>
.pairSequence {
  white-space: pre;
  font-family: Courier;
}
</style>

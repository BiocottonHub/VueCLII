/**
 *
 * @param {*} fileData 文件对象
 * @param {*} callback 回调函数
 * 判断文件是否正确放在回调函数中
 * + BaseFlag 为 true则表示文件不正确
 * + ProteinFlag wei True 则表示文件不正确
 */
var validateFastaByFile = function (fileData, callback) {
  var reader = new FileReader()
  reader.readAsText(fileData, 'utf-8') // 触发load事件
  var BaseFlag = true
  var ProteinFlag = true
  var Basepattern = /[^ATCGN\n\r]/im // 匹配除这些字符之外的字符
  var ProteinPattern = /[^GAVLIPFYWSTCMNQDEKRH\\*\r\n]/im
  // var next = function (code) {
  //   return code
  // }
  reader.onload = function () {
    //   // 读取完毕后输出结果
    // 获取每个基因的序列,第一个是空字符
    var sequenceArray = reader.result.split(/>[^\n]+\n/).slice(1)
    if (sequenceArray.length === 0) {
      var flag = true
      callback(flag, flag)
    } else {
      BaseFlag = sequenceArray.some((sequence) => {
        return Basepattern.test(sequence)
      })
      ProteinFlag = sequenceArray.some((sequence) => {
        return ProteinPattern.test(sequence) || /^[^M]/i.test(sequence)
        // 核苷酸序列碱基缩写被氨基酸序列覆盖，所有必须以M氨基酸开头才是蛋白序列
      })
      callback(BaseFlag, ProteinFlag, reader.result)
    }
  }
}

var validateFastaByText = function (sequence) {
  var BaseFlag = true
  var ProteinFlag = true
  var Basepattern = /[^ATCGN\n\r]/im // 匹配除这些字符之外的字符
  var ProteinPattern = /[^GAVLIPFYWSTCMNQDEKRH\\*\r\n]/im
  var sequenceArray = sequence.split(/>[^\n]+\n/).slice(1)
  if (sequenceArray.length === 0) {
    return 0
  } else {
    BaseFlag = sequenceArray.some((sequence) => {
      return Basepattern.test(sequence)
    })
    ProteinFlag = sequenceArray.some((sequence) => {
      return ProteinPattern.test(sequence) || /^[^M]/i.test(sequence)
      // 核苷酸序列碱基缩写被氨基酸序列覆盖，所有必须以M氨基酸开头才是蛋白序列
    })
    if (BaseFlag && ProteinFlag) {
      return -1
    } else if (!BaseFlag) {
      return 1 // nucle
    } else {
      return 2 // protein
    }
  }
}

export default { validateFastaByFile, validateFastaByText }

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var dbName = event.dbName // 集合名称
  var filter = event.filter ? event.filter : null // 筛选条件 默认为空
  var pageIndex = event.pageIndex ? event.pageIndex : 1 // 当前第几页 默认为第一页
  var pageSize = event.pageSize ? event.pageSize : 10 // 每页取多少条数据 默认 10 条
  let countResult = await db.collection(dbName).where({
    filter
  }).count() // 获取集合中的总记录条数
  let total = countResult.total // 得到总记录条数
  let totalPage = Math.ceil(total / pageSize) // 计算需要多少页
  var hasMore; // 提示是否还有数据
  if (pageIndex > totalPage || pageIndex == totalPage) { // 如果没有数据了就返回 false
    hasMore = false
  } else {
    hasMore = true
  }
  return db.collection(dbName).where({
    filter
  }).skip((pageIndex - 1) * pageSize).limit(pageSize).get().then(res => {
    res.hasMore = hasMore;
    return res
  })
}
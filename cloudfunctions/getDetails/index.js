// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let dbName = event.dbName
  let id = event.id
  let res = await cloud.database().collection(dbName).where({
    _id: id
  }).get()
  return res
}
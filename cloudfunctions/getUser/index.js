// 云函数入口文件
const cloud = require('wx-server-sdk');
// const _ = db.command;

cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
  // return cloud
  //   .database()
  //   .collection('t_account')
  //   .where(
  //     _.or([
  //       {
  //         account: _eq(event.account),
  //       },
  //       {
  //         _id: _eq(event._id),
  //       },
  //     ])
  //   )
  //   .get();
  return cloud
    .database()
    .collection('t_account')
    .where({
      account: event.account,
      _id: event._id,
      pwd: event.pwd
    })
    .get();
};
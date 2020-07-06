// miniprogram/pages/set/set.js
const db = wx.cloud.database().collection('t_account')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    head_img: '../../images/default.png',
    // 用户信息
    user: '',
  },
  // 用户点击更换头像
  head_imgChange() {
    let {
      user
    } = this.data
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePaths = res.tempFilePaths[0]
        let imgName = (new Date()).valueOf();
        const cloudPath = imgName + tempFilePaths.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath: cloudPath,
          filePath: tempFilePaths
        }).then(res => {
          let img = res.fileID
          db.where({
            _id: user._id
          }).get().then(res => {
            let id = res.data[0]._id
            db.doc(id).update({
              data: {
                head_img: img
              }
            }).then(res => {
              this.getUSer()
            })
          })
        })
      }
    })
  },
  // 获取用户信息
  getUSer() {
    db.where({
      _id: this.data.user._id
    }).get().then(res => {
      this.setData({
        user: res.data[0]
      })
      wx.setStorageSync('user', res.data[0])
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      user: wx.getStorageSync('user')
    })
    // 获取用户信息
    this.getUSer()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
// miniprogram/pages/me/me.js
let db = wx.cloud.database().collection('t_account')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    head_img: '../../images/default.png',
    // 用户信息
    user: '',
  },
  // 跳转页面
  goUrl(e) {
    wx.navigateTo({
      url: e.target.dataset.url
    })
  },
  // 获取用户信息
  getUSer() {
    let {
      user
    } = this.data
    db.where({
      _id: user._id
    }).get().then(res => {
      this.setData({
        user: res.data[0]
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      user: wx.getStorageSync('user')
    })
    // 获取用户信息
    this.getUSer()
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
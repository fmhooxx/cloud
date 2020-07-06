// miniprogram/pages/login/login.js
let db = wx.cloud.database().collection('t_account')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 账号
    account: '',
    // 密码
    pwd: ''
  },
  // 当账户输入框发生变化的时候
  accountChange(e) {
    this.setData({
      account: e.detail.value
    })
  },
  // 当密码输入框发生变化的时候
  pwdChange(e) {
    this.setData({
      pwd: e.detail.value
    })
  },
  // 点击登录
  submit() {
    let {
      account,
      pwd
    } = this.data
    if (account == '' || pwd == '') {
      return wx.showToast({
        title: '账号或密码不能为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    }
    db.where({
      account: account
    }).get().then(res => {
      if (res.data.length !== 0) {
        let password = res.data[0].pwd
        if (pwd != password) {
          wx.showToast({
            title: '密码错误, 请重新输入密码',
            icon: 'none',
            duration: 2000,
            mask: true
          })
          this.setData({
            pwd: ''
          })
        } else {
          wx.setStorageSync('user', res.data[0])
          wx.showToast({
            title: '登录成功!',
            icon: 'none',
            duration: 2000,
            mask: true
          })
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/index/index'
            })
          }, 1900);
        }
      } else {
        wx.showToast({
          title: '未查到该账号, 请先注册',
          icon: 'none',
          duration: 2000,
          mask: true
        })
      }
    })
  },
  // 跳转页面
  goUrl(e) {
    wx.navigateTo({
      url: e.target.dataset.url
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({
      account: options.account
    })
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
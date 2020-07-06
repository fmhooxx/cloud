// miniprogram/pages/register/register.js
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
  register() {
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
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    db.where({
      account: account
    }).get().then(res => {
      if (res.data.length === 0) {
        db.add({
          data: {
            account: account,
            pwd: pwd,
            head_img: ''
          }
        }).then(res => {
          if (res.errMsg == 'collection.add:ok') {
            wx.showToast({
              title: '注册成功',
              icon: 'none',
              duration: 2000,
              mask: true
            })
            setTimeout(() => {
              wx.hideLoading()
              wx.navigateTo({
                url: '/pages/login/login?account=' + account
              })
            }, 2000);
          }
        })
      } else {
        wx.hideLoading()
        wx.showToast({
          title: '该用户名已经被注册, 请重新输入',
          icon: 'none',
          duration: 2000,
          mask: true
        })
        this.setData({
          account: '',
          pwd: ''
        })
      }
    })
  },
  // 跳转页面
  goUrl(e) {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
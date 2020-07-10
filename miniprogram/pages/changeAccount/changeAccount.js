// miniprogram/pages/changeAccount/changeAccount.js
let db = wx.cloud.database().collection('t_account');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    account: '',
    user: '',
  },
  submit() {
    let {
      account
    } = this.data;
    if (account == '') {
      wx.showToast({
        title: '新账号名不能为空',
        icon: 'none',
        duration: 2000,
        mask: true,
      });
    }
    this.getUser();
  },
  changeAccount(e) {
    this.setData({
      account: e.detail,
    });
  },
  clearAccount() {
    this.setData({
      account: '',
    });
  },
  getUser() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let {
      account,
      user
    } = this.data;
    wx.cloud
      .callFunction({
        name: 'getUser',
        data: {
          account: account,
          _id: user._id,
        },
      })
      .then((res) => {
        let result = res.result.data;
        if (result.length === 0) {
          wx.cloud
            .callFunction({
              name: 'getUser',
              data: {
                _id: user._id,
              },
            })
            .then((res) => {
              let results = res.result.data
              if (results.length !== 0) {
                db.doc(user._id).update({
                  data: {
                    account: account
                  }
                }).then(res => {
                  user.account = account
                  wx.setStorageSync('user')
                  wx.showToast({
                    title: '修改成功',
                    icon: 'none',
                    duration: 2000,
                    mask: true,
                  });
                  setTimeout(() => {
                    wx.hideLoading()
                    wx.navigateBack({
                      delta: 1
                    })
                  }, 1900);
                })
              }
            })
        } else {
          wx.showToast({
            title: '新账户名与原账号相同, 请重新输入',
            icon: 'none',
            duration: 2000,
            mask: true,
          });
          this.setData({
            account: '',
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(wx.getStorageSync('user'))
    this.setData({
      user: wx.getStorageSync('user'),
    });
    // this.getUser()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
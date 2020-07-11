// miniprogram/pages/details/details.js
const db = wx.cloud.database().collection('t_account')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品详情 id
    id: '',
    // 商品详情
    details: '',
    // 本地的用户信息
    user: '',
    // 用户加入收藏的列表
    guessList: '',
    // 点击要加入收藏的数据
    list: [],
    // 判断用户是否将该商品加入我的收藏
    flag: false
  },
  // 获取用户信息
  getUser() {
    wx.cloud.callFunction({
      name: 'getUser',
      data: {
        _id: this.data.user._id
      }
    }).then(res => {
      this.setData({
        user: res.result.data[0],
        guessList: res.result.data[0].guess
      })
      let arr = this.data.guessList
      this.setData({
        list: arr
      })
      let boole = arr.some((item) => {
        if (item.shopId == this.data.id) {
          return true
        } else {
          return false
        }
      })
      this.setData({
        flag: boole,
      })
      wx.setStorageSync('user', this.data.user)
    })
  },
  // 点击收藏
  collection() {
    wx.cloud.callFunction({
      name: 'getUser',
      data: {
        _id: this.data.user._id
      }
    }).then(res => {
      if (this.data.flag == false) {
        let obj = {
          shopId: this.data.id,
          _id: this.data.user._id
        }
        this.data.list.push(obj)
        db.doc(this.data.user._id).update({
          data: {
            guess: this.data.list
          }
        }).then(res => {
          this.getUser()
        })
      } else {
        let arr = res.result.data[0].guess
        let index = arr.findIndex((item) => {
          return item.shopId == this.data.id
        })
        arr.splice(index, 1)
        db.doc(this.data.user._id).update({
          data: {
            guess: arr
          }
        }).then(res => {
          console.log(res)
          this.getUser()
        })
      }
    })
  },
  // 获取详情数据
  getDetails() {
    let {
      id
    } = this.data
    wx.cloud.callFunction({
      name: 'getDetails',
      data: {
        dbName: 'guessList',
        id: id
      }
    }).then(res => {
      this.setData({
        details: res.result.data[0]
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.id,
      user: wx.getStorageSync('user')
    })
    // 获取详情数据
    this.getDetails()
    // 获取用户信息
    this.getUser()
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
//index.js
let db = wx.cloud.database().collection('banner');
Page({
  data: {
    // 轮播图数据
    swiperList: [],
    // 猜你喜欢列表数据
    guessList: []
  },
  // 获取轮播图数据
  getSwiper() {
    wx.cloud
      .callFunction({
        name: 'getSwiper',
      })
      .then((res) => {
        let result = res.result.data
        this.setData({
          swiperList: result
        })
      });
  },
  // 获取猜你喜欢数据
  getGuessList() {
    wx.cloud.callFunction({
      name: 'guessList'
    }).then(res => {
      let result = res.result.data
      this.setData({
        guessList: result
      })
      console.log(this.data.guessList)
    })
  },
  onLoad() {
    // 获取轮播图数据
    this.getSwiper();
    // 获取猜你喜欢数据
    this.getGuessList()
  },
});

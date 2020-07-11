//index.js
let db = wx.cloud.database().collection('banner');
Page({
  data: {
    // 轮播图数据
    swiperList: [],
    // 猜你喜欢列表数据
    guessList: [],
    // 节流阀
    flag: true,
    // 分页
    // 当前页码
    pageIndex: 1,
    // 每页显示的条数
    pageSize: 4
  },
  // 去详情页面
  goDetails(e) {
    let url = e.currentTarget.dataset.url
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: url + '?id=' + id
    })
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
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let {
      pageSize,
      pageIndex
    } = this.data
    wx.cloud.callFunction({
      name: 'guessList',
      data: {
        dbName: 'guessList',
        pageIndex: pageIndex,
        pageSize: pageSize
      }
    }).then(res => {
      let result = res.result.data
      let list = []
      list = this.data.guessList.concat(result)
      wx.hideLoading()
      this.setData({
        guessList: list,
        flag: res.result.hasMore
      })
    })
  },
  onLoad() {
    // 获取轮播图数据
    this.getSwiper();
    // 获取猜你喜欢数据
    this.getGuessList()
  },
  // 监听用户上拉触底
  onReachBottom() {
    this.setData({
      pageIndex: this.data.pageIndex + 1
    })
    if (this.data.flag) {
      this.getGuessList()
    } else {
      wx.showToast({
        title: '没有更多数据了',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    }
  }
});
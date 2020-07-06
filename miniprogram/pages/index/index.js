//index.js
let db = wx.cloud.database().collection('banner');
Page({
  data: {
    img: '',
  },
  getSwiper() {
    wx.cloud
      .callFunction({
        name: 'getSwiper',
      })
      .then((res) => {
        console.log(res);
      });
  },
  onLoad() {
    this.getSwiper();
  },
});

//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'cloud1-6gvgpr4q1fe587f3',
        traceUser: true,
      })
    }
    this.globalData = {
      ID:null,
      userinfo:'请登录',
      showtime:false,
      flag:true,
      currentUser:null,
    }
  }
})

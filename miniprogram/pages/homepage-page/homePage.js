// pages/homePage/homePage.js 
var app= getApp()

Page({
  data: {
    windowHeight: 654,
    maxtime: "",
    isHiddenLoading: true,
    isHiddenToast: true,
    dataList: {},
    countDownDay: 0,
    countDownHour: 0,
    countDownMinute: 0,
    countDownSecond: 0,
    //hasTicket决定要不要显示“查看我的二维码”按钮
    hasTicket: false,
    //show time决定是否显示已进场的时间
    showtime:app.globalData.showtime,
    imgUrls: [
      '../img/羽毛球.jpg',
      '../img/乒乓球.jpg',
      '../img/篮球.jpg'
    ],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s
   },
   //事件处理函数
   bindViewTap: function() {
    wx.navigateTo( {
     url: '../logs/logs'
    })
   },
   onLoad: function() {
    this.setData( {
     windowHeight: wx.getStorageSync( 'windowHeight' )
    });
   },
   // 页面渲染完成后 调用
   onReady: function () {
    console.log(app.globalData.ID)
    //var totalSecond = Date.parse(new Date()) / 1000-Date.parse(new Date("2021/4/22,00:00")) / 1000;
    var totalSecond = 3590;
    var interval = setInterval(function () {
     // 秒数
     var second = totalSecond;
     // 天数位
     var day = Math.floor(second / 3600 / 24);
     var dayStr = day.toString();
     if (dayStr.length == 1) dayStr = '0' + dayStr;
     // 小时位
     var hr = Math.floor((second - day * 3600 * 24) / 3600);
     var hrStr = hr.toString();
     if (hrStr.length == 1) hrStr = '0' + hrStr;
     // 分钟位
     var min = Math.floor((second - day * 3600 *24 - hr * 3600) / 60);
     var minStr = min.toString();
     if (minStr.length == 1) minStr = '0' + minStr;
     // 秒位
     var sec = second - day * 3600 * 24 - hr * 3600 - min*60;
     var secStr = sec.toString();
     if (secStr.length == 1) secStr = '0' + secStr;
     this.setData({
      countDownDay: dayStr,
      countDownHour: hrStr,
      countDownMinute: minStr,
      countDownSecond: secStr,
     });
     totalSecond++;
     
     if (totalSecond == 3601) {
      wx.showToast({
        title: '进场超过1小时，请立即离场',
        icon: 'none'
      });
      
     }
    }.bind(this), 1000);
   },
   //cell事件处理函数
   bindCellViewTap: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
     url: '../babyDetail/babyDetail?id=' + id
    });
   },

  /**
   * 生命周期函数--监听页面加载
   
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   
  onReady: function () {

  },*/

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    console.log('flag in home page:  '+app.globalData.flag)
    
    that.setData({
      showtime:app.globalData.showtime
    })
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

  },

  OrderIfo:function(){
    wx.navigateTo({
      url: '/pages/QRcode/QRcode',
    })
  }
  
})

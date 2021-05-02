// miniprogram/pages/QRcode/QRcode.js
var app = getApp()
let userid = ""
Page({
  /**
   * 页面的初始数据
   */
  data: {
    datalist: [],
    judge:false,
    showtime: app.globalData.showtime,
    flag:app.globalData.flag
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let that = this
    const db =  wx.cloud.database()
    db.collection("order").where({
      userID:app.globalData.ID,
      state:"已付款",
      status:"未进场"
    }).get({
      success(res){
        console.log("获取到的id是："+ app.globalData.ID)
        //console.log("获取到的数据是："+res)
        userid = res.data[0]._id
        if(res.data[0] != undefined){
          console.log("haha")
          that.setData({
            judge:true
          })
        }
        that.setData({
          datalist:res.data[0]
        })
        console.log("获取到的值为"+res)
      }
    })
      
    
  },
  toIndexPage:function(){
    wx.switchTab({
          url: "/miniprogram/pages/homepage-page/homePage"
    });
},
showTime:function(){
  var that = this
  that.setData({
    showtime:true,
    flag:false
  })
  app.globalData.flag = that.data.flag
  console.log('flag is:  '+that.data.flag+'  '+app.globalData.flag)
  app.globalData.showtime = that.data.showtime
  console.log('showtime:  '+that.data.showtime+'  '+ app.globalData.showtime)
},
refund:function(){
  wx.cloud.database().collection('order').doc(userid).update({
    data:{
      state:"已取消"
    },
    success(res){
      console.log("修改状态成功",res)
    },
    fail(res){
      console.log("修改状态失败",res)
    }
  })
  wx.showModal({
    title:"提示",
    showCancel:false,
    content:"退款成功",
    success:function(res){
      if(res.confirm){
        wx.switchTab({
          //url: '../homepage-page/homePage',
          url:'../my-page/my'
        })
      }
    }
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
    
    var time = util.formatTime ( new Date ());
    var that = this;
    console.log('flag:  '+that.data.flag+ ' ')
    that.setData ({
      flag:app.globalData.flag,
      time : time
      });
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
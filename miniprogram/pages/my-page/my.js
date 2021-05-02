// pages/My/my.js
var app = getApp()
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showUser: false,
    showDefalut:true,
    userInfo: {},
    hasUserInfo: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: true,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    username : app.globalData.userinfo
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
    if(app.globalData.ID!=null){
      db.collection('user').doc(app.globalData.ID).get({
        success: res=> {
          var that = this
          
          that.setData({
            username : res.data.userName
          })
          app.globalData.userinfo = this.data.username
          console.log('local user name:  '+this.data.username)
          console.log('global userinfo:  '+app.globalData.userinfo)
        }
      })
    }
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
  /**
   * 跳转到我的订单页面
   */
  jumpOrder:function(){
    wx.navigateTo({
      url: '/pages/order-page/order-page',
    })
  },
  /**
   * 跳转到登陆页面
   */
  jumpLogin:function(){
    this.setData({
      hasUserinfo:true,
    })
    if (wx.getUserProfile) {
      this.setData({
        showDefalut:false,
        showUser:true,
      })
    }
    wx.navigateTo({
      url: '/pages/login-page/login',
    })
    this.onShow()
    
  },

  jumpPersonal:function(){
    wx.navigateTo({
      url: 'pages/personal-page/myinfo',
    })
  },

  pleaseLogin:function(){
    wx.showToast({
      title: '请先登录！',
      icon: 'none',
    })
  },

  jumpWallet:function(){
    wx.navigateTo({
      url: '/pages/wallet/wallet',
    })
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
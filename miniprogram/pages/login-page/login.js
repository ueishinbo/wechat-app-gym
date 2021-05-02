// pages/login/login.js

let flag=0;
var app= getApp()
Page({
  /**
   * 页面的初始数据
  */ 
  data: {
    zhanghao:'',
    password: ''
  },
  focusID: function () {
    this.setData({
      focusID: true
    })
  },
  focusPassword: function () {
    this.setData({
      focusPassword: true
    })
  },
  blurID: function (event) {
    this.setData({
      focusID: false,
      zhanghao: event.detail.value
    })
  //获取输入的账号
  if (event.detail.value == "") {
    wx.showToast({
      title: '账号不能为空',
      icon: 'none',
      duration: 1000
    })
  } else {
    if( (/^1[3456789]\d{9}$/).test(this.data.zhanghao)){
      flag=1;
    } else if((/^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/).test(this.data.zhanghao)){
      flag=2;
    } else {
      wx.showToast({
        title: '请输入正确的账号',
        icon: 'none',
        duration: 1000
      })
    }
  }
  },
  blurPassword: function (event) {
    this.setData({
      focusPassword: false,
      password: event.detail.value
    })
  //获取输入的密码
  if (event.detail.value.length < 8) {
    wx.showToast({
      icon: 'none',
      title: '密码至少8位',
    })
    return
  }
  },
  //点击登陆
  login:function() {
    let zhanghao = this.data.zhanghao
    let password = this.data.password
    console.log('账号', zhanghao, '密码', password)
    //登陆
    if(flag==1){
      wx.cloud.database().collection('user').where({
        phoneNum: zhanghao
      }).get({
        success(res) {
          console.log("获取数据成功", res)
          let user = res.data[0]
          console.log("user", user)
          app.globalData.ID = user._id
          //console.log(ID)
          if (password == user.password) {
            console.log('登陆成功')
            wx.showToast({
              title: '登陆成功',
              icon: 'success',
              duration: 2000
            })
            wx.switchTab({
              //url: '../homepage-page/homePage',
              url:'../my-page/my'
            })
          //保存用户登陆状态
          wx.setStorageSync('user', user)
          } 
          else {
            console.log('登陆失败')
            wx.showToast({
              icon: 'none',
              title: '账号或密码不正确',
            })
          }
        },
        fail(res) {
          console.log("获取数据失败", res)
        }
      })
    }
    else if(flag==2){
      wx.cloud.database().collection('user').where({
        email: zhanghao
      }).get({
        success(res) {
          console.log("获取数据成功", res)
          let user = res.data[0]
          console.log("user", user)
          app.globalData.ID = user._id
          //console.log(ID)
          if (password == user.password) {
            console.log('登陆成功')
            wx.showToast({
              title: '登陆成功',
            })
            wx.switchTab({
              url: '../homepage-page/homePage',
            })
          //保存用户登陆状态
          wx.setStorageSync('user', user)
          } 
          else {
            console.log('登陆失败')
            wx.showToast({
              icon: 'none',
              title: '账号或密码不正确',
            })
          }
        },
        fail(res) {
          console.log("获取数据失败", res)
        }
      })
    }
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
  /*login: function(){
    wx.navigateTo({
      url: '../homepage/homepage',
    })
  },*/
  register: function(){
    wx.navigateTo({
      url: '../registration-page/registration',
    })
  },
  /*login:function() {
    wx.switchTab({
      url: '../homePage/homePage',
    })
  },*/
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
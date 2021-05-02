// miniprogram/pages/changePassword/changePassword.js

var app= getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    password: '',
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //获取输入的密码
  passwordInput(event) {
    // console.log('密码', event.detail.value)
    this.setData({
     password: event.detail.value
    })
    if (event.detail.value.length < 8) {
      wx.showToast({
        icon: 'none',
        title: '密码至少8位',
      })
      return
    }
  },

  updData() {
    let password = this.data.password
    wx.cloud.database().collection('user').doc(app.globalData.ID).update({
      data:{
        password: password
      },
      success(res) {
        console.log("更新成功", res)
        wx.showModal({
          title: '提示',
          content: '修改密码成功！请重新登录',
          showCancel:false,
          success: function(res){
            if(res.confirm){
              console.log('用户在修改密码成功提示窗点击了确认')
              wx.navigateTo({
                url: '/pages/login-page/login',
              })
            }
          }
        })
        console.log('改密码了唷，要重新登陆了唷')
      },
      fail(res){
        console.log("更新失败", res)
        wx.showToast({
          title: '修改密码失败',
          icon: 'fail',
          duration: 1000
        })
      }
    })
  }


})
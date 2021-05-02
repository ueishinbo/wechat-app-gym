// pages/register/register.js
wx.cloud.init();
let app = getApp();
//获取云数据库引用
const db = wx.cloud.database();
const admin = db.collection('user');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    registerParam: 1, //1：手机号注册；0：邮箱注册
    focusPhoneNum: false,
    focusEmail: false,
    focusVerificationCode: false,
    focusStuNumber: false,
    focusUserName: false,
    focusPassword: false,
    focusRePassword: false,
    phoneNum: "",
    email: "",
    userNumber: "",
    password: "",
    rePassword: ""
  },

  phoneRegister: function () {
    this.setData({
      registerParam: 1,
    })
  },

  emailRegister: function () {
    this.setData({
      registerParam: 0
    })
  },

  focusPhoneNum: function () {
    this.setData({
      focusPhoneNum: true
    })
  },
  focusEmail: function () {
    this.setData({
      focusEmail: true
    })
  },
  focusUserName: function () {
    this.setData({
      focusUserName: true
    })
  },
  focusPassword: function () {
    this.setData({
      focusPassword: true
    })
  },
  focusRePassword: function () {
    this.setData({
      focusRePassword: true
    })
  },
  blurPhoneNum: function (e) {
    this.setData({
      focusPhoneNum: false,
      phoneNum: e.detail.value
    })
    let myreg = /^1[3456789]\d{9}$/;
    if (e.detail.value == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if (!myreg.test(e.detail.value)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
    }
  },
  blurEmail: function (e) {
    this.setData({
      focusEmail: false,
      email: e.detail.value
    })
    let myreg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
    if (e.detail.value == "") {
      wx.showToast({
        title: '邮箱不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if (!myreg.test(e.detail.value)) {
      wx.showToast({
        title: '请输入正确的邮箱',
        icon: 'none',
        duration: 1000
      })
    }
  },
  blurUserName: function (e) {
    this.setData({
      focusUserName: false,
      userNumber: e.detail.value
    })
    if (e.detail.value == "") {
      wx.showToast({
        title: '用户名不能为空',
        icon: 'none',
        duration: 1000
      })
    }
  },
  blurPassword: function (e) {
    this.setData({
      focusPassword: false,
      password: e.detail.value
    })
    if (e.detail.value == "") {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if (e.detail.value.length < 8) {
      wx.showToast({
        title: '密码不得少于8位',
        icon: 'none',
        duration: 1000
      })
    }
  },
  blurRePassword: function (e) {
    console.log(this.data.password);
    this.setData({
      focusRePassword: false,
      rePassword: e.detail.value
    })
    if (e.detail.value == "") {
      wx.showToast({
        title: '请确认密码',
        icon: 'none',
        duration: 1000
      })
    } else if (e.detail.value != this.data.password) {
      wx.showToast({
        title: '与第一次输入密码不同，请再次确认密码',
        icon: 'none',
        duration: 1000
      })
    }
  },

  //提交时验证
  submit: function () {
    //手机
    if (this.data.registerParam == 1 && (/^1[3456789]\d{9}$/).test(this.data.phoneNum)  && this.data.password.length >= 6 && this.data.password == this.data.rePassword) {
      let flag = false;//是否存在 true为存在
      //查询用户是否已经注册
      admin.get({
        success:(res)=> {
          let admins = res.data;  //获取到的对象数组数据
        //  console.log(admins);
          for (let i=0; i<admins.length; i++){  //遍历数据库对象集合
            if (this.data.phoneNum === admins[i].phoneNum){ //用户名存在
              flag = true;
            }
          }
          if(flag === true){    //已注册
            wx.showToast({
            title: '该手机号已被注册！',
            icon: 'none',
            duration: 2500
            })
          }else{  //未注册
            admin.add({  //添加数据
              data:{
                phoneNum: this.data.phoneNum,
                userName: this.data.userNumber,
                password: this.data.password,
              }
            }).then(res => {
              console.log('注册成功！')
              wx.showToast({
                title: '注册成功！',
                icon: 'success',
                duration: 2500
              })
              wx.redirectTo({
                url: '../login-page/login',
              })
            })
          }
        }
      })
    }
    //邮箱
    else if(this.data.registerParam == 0 && (/^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/).test(this.data.email)  && this.data.password.length >= 6 && this.data.password == this.data.rePassword) {
      let flag = false;//是否存在 true为存在
      //查询用户是否已经注册
      admin.get({
        success:(res)=> {
          let admins = res.data;  //获取到的对象数组数据
        //  console.log(admins);
          for (let i=0; i<admins.length; i++){  //遍历数据库对象集合
            if (this.data.email === admins[i].email){ //用户名存在
              flag = true;
            }
          }
          if(flag === true){    //已注册
            wx.showToast({
            title: '该邮箱已被注册！',
            icon: 'none',
            duration: 2500
            })
          }else{  //未注册
            admin.add({  //添加数据
              data:{
                email: this.data.email,
                userName: this.data.userNumber,
                password: this.data.password,
              }
            }).then(res => {
              console.log('注册成功！')
              wx.showToast({
                title: '注册成功！',
                icon: 'success',
                duration: 2500
              })
              wx.redirectTo({
                url: '../login-page/login',
              })
            })
          }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

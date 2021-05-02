// miniprogram/pages/order-page/order-page.js
var app= getApp()
let list1=[]
let list2=[]
let list3=[]

Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    showRefund: true,
    currtab: 0,
    swipertab: [{ name: '已完成', index: 0 }, { name: '待付款', index: 1 }, { name: '已取消', index: 2 }],
    alreadyOrder: [],
    waitPayOrder: [],
    lostOrder: [],
    ifState : "未进场"
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
    // 页面渲染完成
    this.getDeviceInfo()
    this.orderShow()
  },
  onShow: function() {
  },
  getDeviceInfo: function () {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceW: res.windowWidth,
          deviceH: res.windowHeight
        })
      }
    })
  },
 
  /**
  * @Explain：选项卡点击切换
  */
  tabSwitch: function (e) {
    var that = this
    if (this.data.currtab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currtab: e.target.dataset.current
      })
    }
  },
 
  tabChange: function (e) {
    this.setData({ currtab: e.detail.current })
    this.orderShow()
  },
 
  orderShow: function () {
    let that = this
    switch (this.data.currtab) {
      case 0:
        that.alreadyShow()
        break
      case 1:
        that.waitPayShow()
        break
      case 2:
        that.lostShow()
        break
    }
  },
  alreadyShow: function(){
    /*for (let i=0; i<list.length; i++){  //遍历数据库对象集合
      if (list[i].state==="已完成"){ //用户名存在
        this.setData({
          alreadyOrder: this.data.alreadyOrder.concat([{ name: list[i].name, state: list[i].state, time: list[i].time, place:list[i].place,status: list[i].status, money:list[i].money }])
        })
      }
    }*/

    var that = this
    wx.cloud.database().collection('order').where({
      userID:app.globalData.ID,
      state:"已完成"
    }).get({
      success(res) {
        console.log("获取数据成功",res)
        list1 = res.data
        /*this.setData({
          List:res.data
        })*/
        //console.log(List1)
        that.setData({
          alreadyOrder:res.data
        })
      }
    })
    
  },
 
  waitPayShow:function(){
    /*for (let i=0; i<list.length; i++){  //遍历数据库对象集合
      if (list[i].state==="待付款"){ //用户名存在
        this.setData({
          waitPayOrder: this.data.waitPayOrder.concat([{ name: list[i].name, state: list[i].state, time: list[i].time, place:list[i].place,status: list[i].status, money:list[i].money }])
        })
      }
    }*/
    var that = this
    wx.cloud.database().collection('order').where({
      userID:app.globalData.ID,
      state:"待付款"
    }).get({
      success(res) {
        console.log("获取数据成功",res)
        list2 = res.data
        /*this.setData({
          List:res.data
        })*/
        //console.log(List1)
        that.setData({
          waitPayOrder:res.data
        })
      }
    })
    
  },
  lostShow: function () {
    /*for (let i=0; i<list.length; i++){  //遍历数据库对象集合
      if (list[i].state==="已取消"){ //用户名存在
        this.setData({
          lostOrder: this.data.lostOrder.concat([{ name: list[i].name, state: list[i].state, time: list[i].time, place:list[i].place,status: list[i].status, money:list[i].money }])
        })
      }
    }*/
    var that = this
    wx.cloud.database().collection('order').where({
      userID:app.globalData.ID,
      state:"已取消"
    }).get({
      success(res) {
        console.log("获取数据成功",res)
        list3 = res.data
        /*this.setData({
          List:res.data
        })*/
        //console.log(List1)
        that.setData({
          lostOrder:res.data
        })
      }
    })
    
  },
  
  //暂时付款界面
  OrdertoPay:function(){
    wx.navigateTo({
      url: '/pages/pay/pay',
    })
  },
  OrderIfo:function(){
    wx.navigateTo({
      url: '/pages/QRcode/QRcode',
    })
  },
  refund:function(){
    wx.showModal({
      title: '提示',
      content: '退款申请提交成功！退款将于24h内到您的账户',
      showCancel:false,
      success: function(res){
        if(res.confirm){
          console.log('用户点击了确认')
        }
      }
    })
  }
})

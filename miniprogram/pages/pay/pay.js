//index.js
//获取应用实例
const app = getApp()
 let userid = ""
Page({
  //获取usserid 用于修改支付状态


  data: {
    showPayPwdInput: false,  //是否展示密码输入层
    pwdVal: '',  //输入的密码
    payFocus: true, //文本框焦点
  },
  onLoad: function () {
    //console.log("此时获取到的id是"+app.globalData.ID)
    wx.cloud.database().collection('order').where({
      userID:app.globalData.ID,
      state:"待付款",
    }).get({
      success(res){
        console.log("获取数据成功了呢",res.data[0]._id)
        userid = res.data[0]._id
      },
      fail(res){
        console.log("获取数据失败了呢",res)
      }
    })
    //this.showInputLayer();
  },
  /**
   * 显示支付密码输入层
   */
  showInputLayer: function(){
    this.setData({ showPayPwdInput: true, payFocus: true });
    wx.cloud.database().collection('order').doc(userid).update({
      data:{
        state:"已付款"
      },
      success(res){
        console.log("修改状态成功",res)
      },
      fail(res){
        console.log("修改状态失败",res)
      }
    })

  },
  /**
   * 隐藏支付密码输入层
   */
  hidePayLayer: function(){
    /**获取输入的密码**/
    var val = this.data.pwdVal;
    /**在这调用支付接口**/
    this.setData({ showPayPwdInput: false, payFocus: false, pwdVal: '' }, function(){
      /**弹框**/
      wx.showToast({
        //title: val,
        duration:1500,
        title:"支付成功",
        success(res){
          wx.navigateBack({
            delta: 1,
          })
        }
      })
      
    });
 
  },
  /**
   * 获取焦点
   */
  getFocus: function(){
    this.setData({ payFocus: true });
  },
  /**
   * 输入密码监听
   */
  inputPwd: function(e){
      this.setData({ pwdVal: e.detail.value });
 
      if (e.detail.value.length >= 6){
        this.hidePayLayer();
      }
  }
})
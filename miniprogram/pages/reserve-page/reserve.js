const DB = wx.cloud.database().collection("order")
var app = getApp()
let SelectTimes = ""
let SelectDay = "2021-4-25"
Page({
  /**
   * 页面的初始数据
   */
  data: {
   calendar:[],
   width:0,
   currentIndex:0,
   currentTime: 0,
   winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
    username:app.globalData.userinfo,
    courtArr:["badminton","table-tennis","basketball"],
   timeArr: [
       { "time": "8:00-9:00", "status": "可预定" }, 
       { "time": "9:00-10:00", "status": "可预定" }, 
       { "time": "10:00-11:00", "status": "可预定" }, 
       { "time": "11:00-12:00", "status": "可预定" }, 
       { "time": "12:00-13:00", "status": "可预定" }, 
       { "time": "13:00-14:00", "status": "可预约" }, 
       { "time": "14:00-15:00", "status": "可预约" }, 
       { "time": "15:00-16:00", "status": "可预定" }, 
       { "time": "16:00-17:00", "status": "可预定" },
       { "time": "17:00-18:00", "status": "可预约" }, 
       { "time": "18:00-19:00", "status": "可预约" }, 
       { "time": "19:00-20:00", "status": "可预定" }, 
       { "time": "20:00-21:00", "status": "可预定" }
       ]  
  },
  /**
   * 弹出确认提示框
   */
  tobuy:function(){
    var that = this
    let tabPlace=that.data.courtArr[that.data.currentTab]


    console.log('登陆了')
    console.log('select day!  '+SelectDay)
    wx.showModal({
      title:'确认预定',
      content:"请确认您预定场地的信息\r\n场地名称:羽毛球\r\r\r\n\n\n场地时间:"+ SelectDay+"\r\n"+SelectTimes+"请在确认无误后点击确认",
      success:function(res){
        if(res.confirm){
           DB.add({
            data:{
              money:45,
              name:"创森体育馆",
              place: tabPlace,
              state:"待付款",
              status:"未进场",
              time:SelectDay+ " "+SelectTimes,
              userID:app.globalData.ID,
            },
             success(res){
               console.log("添加成功",res)
             },
          //   fail(res){
          //     console.log("添加失败",res)
          //   }
           }),
          wx.navigateTo({
            url:"/pages/pay/pay"
          })
          
          // wx.showModal({
          //   title: '提示',
          //   content: '预定成功！可在我的订单中查询',
          //   showCancel:false,
          //   success: function(res){
          //     if(res.confirm){
          //       console.log('用户点击了确认')
          //     }
          //   }
          // })
        
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var that=this;
    /**
     * 获取系统信息
     */
    wx.getSystemInfo( {
      success: function( res ) {
        that.setData( {
          winWidth: res.windowWidth/2,
          winHeight: res.windowHeight/2
        });
      }
    });
   function getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
   }
  // calculate this day is which day
   function getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
   }
   const date = new Date();
   const cur_year = date.getFullYear();
   const cur_month = date.getMonth() + 1;
   const cur_date=date.getDate();
   const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
   //create object
   function calendar(date,week){
    this.date=cur_year+'-'+cur_month+'-'+date;
    if(date==cur_date){
     this.week = "今天";
    }else if(date==cur_date+1){
     this.week = "明天";
    }else{
     this.week = '星期' + week;
    }
   }
   //how many days are there in a month
   var monthLength= getThisMonthDays(cur_year, cur_month)
   //当前月份的第一天是星期几
   var week = getFirstDayOfWeek(cur_year, cur_month)
   var x = week;
   for(var i=1;i<=monthLength;i++){
    //当循环完一周后，初始化再次循环
    if(x>6){
     x=0;
    }
    //利用构造函数创建对象
    that.data.calendar[i] = new calendar(i, [weeks_ch[x]][0])
    x++;
   }
   //限制要渲染的日历数据天数为7天以内（用户体验）
   var flag = that.data.calendar.splice(cur_date, that.data.calendar.length - cur_date <= 7 ? that.data.calendar.length:7)
   that.setData({
    calendar: flag
   })
   //设置scroll-view的子容器的宽度
   that.setData({
    width: 186 * parseInt(that.data.calendar.length - cur_date <= 7 ? that.data.calendar.length : 7)
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
    console.log('username is  '+ this.data.username +'   '+app.globalData.userinfo)
    var that = this
    that.setData({
      currentTab: that.data.currentTab,
      username:app.globalData.userinfo
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
  select(event){
   //为上半部分的点击事件
   
   SelectDay = event.currentTarget.dataset.date
   console.log(SelectDay)
   this.setData({
    SelectDay:SelectDay,
    currentIndex: event.currentTarget.dataset.index
   })
  },
  selectTime(event){
   //为下半部分的点击事件
   this.setData({
    currentTime: event.currentTarget.dataset.tindex,
   })
   SelectTimes = event.currentTarget.dataset.time
    //console.log(event.currentTarget.dataset.time)
    console.log(SelectTimes)
  },
 bindChange: function( e ) {
  var that = this;
  that.setData( { currentTab: e.detail.current });
},
/**
 * 点击tab切换
 */
swichNav: function( e ) {
  var that = this;
  if( this.data.currentTab === e.target.dataset.current ) {
    return false;
  } else {
    that.setData( {
      currentTab: e.target.dataset.current
    })
    console.log('currentTab:  '+that.data.courtArr[that.data.currentTab])
  }
},
pleaseLogin: function(){
  console.log('没登录呢')
  console.log(this.data.username)
  wx.showToast({
    title: '请先登录！',
    icon: 'none',
  })
}
})
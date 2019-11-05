// pages/player/player.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playUrl:'',
    videoName:'',
    vid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options);

    var vid=options.vid;
    this.loadData(vid);

  },
  loadData:function(vid){
    var that = this;
    this.data.vid = vid;
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'https://v.yuanmasoft.com/api/videoDetails',
      data:{vid:vid},//传递参数
      header:{
        'content-type': 'application/json'//固定写法
      },
      success:function(res){
        console.log(res);
        var serverData=res.data;//服务端数据
        var status=serverData.msg;//服务端返回状态
        if(status=='success'){
          var playData=serverData.data;
          var details=playData.details;
          //视频信息
          var videoName = details.VIDEO_NAME;//名字
          that.videoName = details.VIDEO_NAME;//这个是为了转发分享显示而定义的
          var douban = details.SCORE;//豆瓣评分
          var info = details.SYNOPSIS;//影视信息
          //线路部分
          var lines=playData.lines;//播放线路，获得的是一个数组
          var linSet=[];//外层定义一个集合
          for(var i=0;i<lines.length;i++){
            var lineTemp=lines[i];
            var lineName = lineTemp.LINE_NAME;
            var lineUrl = lineTemp.LINE_URL;
            var lineScoure = lineTemp.LINE_SOURE;
            //信息取出来了，下面进行包装;
            var dataTemp={
              name:lineName,
              soure:lineScoure,
              url:lineUrl
            }
            linSet.push(dataTemp);
          }
          console.log('linSet:'+linSet);
          console.log('playData:'+playData);
          var playUrl=playData.playUrl;//这样播放地址就拿到手了
          console.log('playUrl:'+playUrl);
          that.setData({
            playUrl:playUrl,
            videoName:videoName,
            douban:douban,
            info:info,
            lines:linSet

          });//将player.js中data中的playUrl赋值
        }
      },
      complete:function(){
        wx.hideLoading();
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
  onShareAppMessage: function (res) {
    console.log(res);
    console.log(this.data.videoName+'--------------'+this.data.vid);
    var name=this.data.videoName;
    var vid=this.data.vid;
    var path="page/player/player?vid="+vid;
    var title=name+"好看极了！";
    console.log(title);
    return{
      
      title:title,
      path:path
    }
  },
  changeLine:function(event){
    var that=this;
    wx.showLoading({
      title: '正在切换...',
     
      
    })
    //给服务端传递我们需要哪一剧集
    var url=event.target.dataset.url;
    var soure=event.target.dataset.soure;
    console.log("url:"+url+"soure:"+soure);
    wx.request({
      url: 'https://v.yuanmasoft.com/api/parse',
      data:{
        line_url:url,
        soure:soure
      },
      header:{
        'content-type': 'application/json'//固定写法
      },
      success:function(res){
        console.log(res);
        var serverData=res.data;
        var status=serverData.msg;
        if(status=='success'){
          var playUrl=serverData.data;
          that.setData({
            playUrl:playUrl
          });
        }
      },
      complete: function () {
        // console.log("this is in complete function")
        //成功与否，都执行回调方法
        wx.hideLoading();//跟wx.showLoading();相对应，有wx.showLoading()就一定要有wx.hideLoading()方法，这个是关闭加载信息
      }
      
    })
  }
})
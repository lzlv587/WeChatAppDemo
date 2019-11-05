var totalPage=0;
var pageno=1;
var currentPage=1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vlist:[],
    keyword:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
 
    this.data.vlist = [];
    var keyword = this.data.keyword
    this.loadData('1', keyword);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("触发onReachBottom函数" + "totalPage:" + totalPage + "    currentPage:" + currentPage);

    if (currentPage <totalPage) {
      currentPage++;
      console.log("currentPage:" + currentPage);
      var keyword=this.data.keyword;
      this.loadData(currentPage,keyword);
    }else if(currentPage=totalPage){}
    else if(currentPage>totalPage){
      currentPage=1;
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  submit: function(event) {
    console.log("event!!!"+event);
    this.data.vlist=[];
    var keyword = event.detail.value.keyword;
    this.data.keyword=keyword
   
   
    this.loadData('1', keyword);
  },
  loadData:function(pageNo,keyword){
    console.log("keyword!!!!!!!!"+keyword);
    wx.showLoading({
      title: '加载中..',
    })
    var that = this;
    wx.request({
      url: 'https://v.yuanmasoft.com/api/videoSearch ',
      data: {
        keywords: keyword,
        pageno: pageNo
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('执行search！！！！！！');
        console.log(res);
        var serverData = res.data;
        var status = serverData.msg;
        if (status == 'success') {
        
          var searchData = serverData.data;
          console.log('searchData!!!!' + searchData);
          var result = searchData.result;
          console.log('result!!!!' + result);
          totalPage=searchData.totalPage;
          var videoSet = [];
          for (var i = 0; i < result.length; i++) {
            var item = result[i];
            var videoTemp = {
              name: item.VIDEO_NAME,
              poster: item.VIDEO_POSTER_URL,
              vid: item.VIDEOBASIC_ID
            }
            videoSet.push(videoTemp);
          }
          var totalList=that.data.vlist;
          var newSet=totalList.concat(videoSet);
          console.log("videoSet :" + videoSet);
          that.setData({
            vlist: newSet
          });
        }
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  },
  toPlay:function(event){
    console.log("执行执行search的toPlay"+event);
    var vid=event.target.dataset.vid;
    wx:wx.navigateTo({
      url: '../player/player?vid='+vid,
    })
  },
  onImageError:function(event){
    var vid=event.target.dataset.vid;
    var totalList=this.data.vlist;
    for(var i=0;i<totalList.length;i++){
      var item=totalList[i];
      var itemId=item.vid;
      if(itemId==vid){
        item.poster='/images/default_200.png'
        break;
      }
      
    }
    this.setData({vlist:totalList});
  }
})
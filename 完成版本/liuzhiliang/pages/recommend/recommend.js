Page({

  /**
   * 页面的初始数据
   */
  data: {
    // name:'hello zhangsan！'
    name: 'tom',
    images: [],
    videos: []
  },


  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    this.loadData();
    this.onPullDownRefresh()

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
    //会做一些重新加载的操作，每一次展现就会执行的方法，比如说用户按了home键，下次打开会优先打开onShow方法，而不是onLoad方法
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
    //下拉刷新
    this.loadData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //上拉加载更多
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  loadData:function(){
    var that = this;
    wx.showLoading({
      title: '加载中...',//加载中函数方法
    })
    //console.log(this.data.name);

    //console.log(this.data.name);
    //初次打开调用的
    wx.request({
      url: 'https://v.yuanmasoft.com/api/hotVideos',
      data: '',//定义参数
      header: {
        'content-type': 'application/json'//固定写法
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        //回调函数
        // console.log("this is in success function");
        var serverData = res.data; //服务端数据
        var status = serverData.msg; //服务端返回状态，判断服务器返回状态
        if (status == 'success') {

          //console.log(status);
          var recommendData = serverData.data; //推荐页数据
          //console.log(recommendData);
          var bannerData = recommendData.banner;
          var movieData = recommendData.movie;
      
          //console.log(movieData);
          var movieSet = [];//声明一个空的集合,用来存放要封装的数据
          for (var i = 0; i < movieData.length; i++) {
            //遍历
           
            var movieTemp = movieData[i];
            var idTemp = movieTemp.VIDEOBASIC_ID;
            var posterTemp = movieTemp.LARGE_POSTER_URL != "" ? movieTemp.LARGE_POSTER_URL : movieTemp.VIDEO_POSTER_URL
            var videoName = movieTemp.VIDEO_NAME;
            var itemTemp = {
              poster: posterTemp,
              name: videoName,
              vid:idTemp
            }
            movieSet.push(itemTemp);
          }
          //console.log(movieSet);
          var bannerSet = [];
          for (var i = 0; i < bannerData.length; i++) {
           
            var bannerItemData = bannerData[i];
            var idTemp = bannerItemData.VIDEOBASIC_ID;
            var poster = bannerItemData.VIDEO_POSTER_URL;
            var largePoster = bannerItemData.LARGE_POSTER_URL;
            var tempPoster = largePoster != '' ? largePoster : poster; //三目运算符
            //console.log(bannerItemData);
            // console.log(largePoster);
            var bannerTemp = {
              poster: tempPoster,
              vid:idTemp
            }
            //console.log(bannerTemp);
            bannerSet.push(bannerTemp);
            //console.log(bannerSet);
            //对页面传递一个数据，里面有成员，成员是页面进行显示的变量，小程序特有的，属于page中的方法
          }
          that.setData({
            images: bannerSet,
            videos: movieSet
          });
        }
        // console.log(that.data.videos);
      },
      fail: function (e) {
        //  console.log("this is in fail function")
      },
      complete: function () {
        // console.log("this is in complete function")
        //成功与否，都执行回调方法
        wx.hideLoading();//跟wx.showLoading();相对应，有wx.showLoading()就一定要有wx.hideLoading()方法，这个是关闭加载信息
      },
    })
  },
  toPlay: function(event){
    console.log("on click:"+event.target.dataset.vid);
    var vid = event.target.dataset.vid
    wx.navigateTo({
      url: '../player/player?vid='+vid,
    })
  }
})
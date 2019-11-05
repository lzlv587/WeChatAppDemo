var totalPage = 0;
var currentPage = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData('1');
  },
  loadData: function (pageNo) {
    var that = this;
    wx.showLoading({
      title: '正在加载中...',
    })
    wx.request({
      url: 'https://v.yuanmasoft.com/api/section',
      data: {
        kind: '1',//电影
        pageno: pageNo
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        var serverData = res.data;
        var status = serverData.msg;
        if (status == 'success') {
          var movieData = serverData.data;
          var vlist = movieData.vlist;//返回数组，数组里面是影视
          totalPage = movieData.totalPage;//返回最大页数
          console.log("vlist:" + vlist + '    ' + 'totalPage:' + totalPage);
          var movieSet = [];
          for (var i = 0; i < vlist.length; i++) {
            var item = vlist[i];
            var movieTemp = {
              name: item.VIDEO_NAME,
              poster: item.VIDEO_POSTER_URL,
              vid: item.VIDEOBASIC_ID
            }
            movieSet.push(movieTemp);
          }
          var totalSet = that.data.movieList;
          //把新数据集合添加到原先数据集合中，产生新集合，即总数据
          var newSet = totalSet.concat(movieSet);//方法，将集合连接到另一个集合上，变成一个新的大集合
          console.log(newSet);
          //console.log(movieSet);
          that.setData({
            movieList: newSet//movieList同步到视图层，movieList内容跟movieSet相同
          })
        }
      },
      complete: function () {
        wx.hideLoading();
      }


    });
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
    this.data.movieList = [];
    this.loadData('1');
    var set = [1];
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("触发onReachBottom函数");
    if (currentPage < totalPage) {
      currentPage++;
      console.log("currentPage:" + currentPage);
      this.loadData(currentPage);
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  toPlay: function (event) {
    console.log('执行tv的toPlay！！！！！')
    var vid = event.target.dataset.vid;
    wx: wx.navigateTo({
      url: '../player/player?vid=' + vid,
    })
  }
})
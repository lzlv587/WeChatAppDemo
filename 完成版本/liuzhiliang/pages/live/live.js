var typeNo=0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    liveList:[],
    vid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  loadData: function (vid) {
    var that = this;
    this.data.vid = vid;
    wx: wx.showLoading({
      title: '加载中...'
    })
    wx: wx.request({
      url: 'https://v.yuanmasoft.com/api/section',
      data: {
        kind: '3',
        type: 2
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);
        var serverData = res.data;
        var status = serverData.msg;
        var liveSet = [];
        if (status == 'success') {
          var liveData = serverData.data;
          var vlist = liveData.vlist;
          for (var i = 0; i < vlist.length; i++) {
            var item = vlist[i];
            var live = {
              title: item.title,
              poster: item.poster,
              vid: item.live_id
            }
            console.log(live);
            liveSet.push(live);
          }
          that.setData({ liveList: liveSet });

        }
      },
      fail: function (res) { },
      complete: function (res) { wx.hideLoading(); },
    })
    },
  onLoad: function (options) {
    var vid = options.vid;
    this.loadData(vid);

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
    toPlay: function (event) {
    console.log('执行movie的toPlay！！！！！')
    var vid = event.target.dataset.vid;
    console.log("vid!!!!!!!!"+vid)
    wx: wx.navigateTo({
      url: '../player/player?vid=' + vid,
    })
  }
  
})
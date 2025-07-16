// 微信小程序入口文件
App({
  // 小程序全局数据
  globalData: {
    userInfo: null,
    baseUrl: 'http://localhost:3000/api', // API基础地址
    systemInfo: null
  },

  // 小程序初始化完成时触发
  onLaunch: function (options) {
    console.log('小程序启动', options);
    
    // 获取系统信息
    this.getSystemInfo();
    
    // 检查更新
    this.checkForUpdate();
    
    // 获取用户信息
    this.getUserInfo();
  },

  // 小程序显示时触发
  onShow: function (options) {
    console.log('小程序显示', options);
  },

  // 小程序隐藏时触发
  onHide: function () {
    console.log('小程序隐藏');
  },

  // 小程序发生脚本错误或API调用报错时触发
  onError: function (msg) {
    console.error('小程序错误:', msg);
  },

  // 获取系统信息
  getSystemInfo: function() {
    const that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.globalData.systemInfo = res;
        console.log('系统信息:', res);
      },
      fail: function(err) {
        console.error('获取系统信息失败:', err);
      }
    });
  },

  // 检查小程序更新
  checkForUpdate: function() {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager();
      
      updateManager.onCheckForUpdate(function (res) {
        console.log('检查更新结果:', res.hasUpdate);
      });

      updateManager.onUpdateReady(function () {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: function (res) {
            if (res.confirm) {
              updateManager.applyUpdate();
            }
          }
        });
      });

      updateManager.onUpdateFailed(function () {
        wx.showModal({
          title: '更新失败',
          content: '新版本下载失败，请检查网络后重试',
          showCancel: false
        });
      });
    }
  },

  // 获取用户信息
  getUserInfo: function() {
    const that = this;
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(userRes) {
              that.globalData.userInfo = userRes.userInfo;
              console.log('用户信息:', userRes.userInfo);
            },
            fail: function(err) {
              console.error('获取用户信息失败:', err);
            }
          });
    }
      }
    });
  },

  // 工具函数：显示加载提示
  showLoading: function(title = '加载中...') {
    wx.showLoading({
      title: title,
      mask: true
    });
  },

  // 工具函数：隐藏加载提示
  hideLoading: function() {
    wx.hideLoading();
  },

  // 工具函数：显示提示信息
  showToast: function(title, icon = 'success') {
    wx.showToast({
      title: title,
      icon: icon,
      duration: 2000
    });
  },

  // 工具函数：显示确认对话框
  showModal: function(title, content) {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: title,
        content: content,
        success: function(res) {
          if (res.confirm) {
            resolve(true);
          } else {
            resolve(false);
          }
        },
        fail: function(err) {
          reject(err);
        }
      });
    });
  }
});

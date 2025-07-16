// 引入工具函数
const util = require('../../utils/util.js');
const api = require('../category/api.js');

// 获取应用实例
const app = getApp();

Page({
  // 页面的初始数据
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    petCategories: [],
    recentPets: [],
    currentTime: '',
    appName: '宠物管家小程序'
  },

  // 页面加载时触发
  onLoad: function (options) {
    console.log('index页面加载', options);
    
    // 检查是否支持getUserProfile
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      });
    }
    
    // 初始化页面数据
    this.initPageData();
    
    // 更新当前时间
    this.updateCurrentTime();
    
    // 定时更新时间
    this.timeInterval = setInterval(() => {
      this.updateCurrentTime();
    }, 1000);
  },

  // 页面显示时触发
  onShow: function () {
    console.log('index页面显示');
    
    // 从全局数据获取用户信息
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    }
    
    // 刷新数据
    this.loadPetCategories();
  },

  // 页面隐藏时触发
  onHide: function () {
    console.log('index页面隐藏');
  },

  // 页面卸载时触发
  onUnload: function () {
    console.log('index页面卸载');
    // 清除定时器
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  },

  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
    console.log('用户下拉刷新');
    this.refreshPageData();
  },

  // 页面上拉触底事件的处理函数
  onReachBottom: function () {
    console.log('页面触底');
    // 可以在这里加载更多数据
  },

  // 用户点击右上角分享
  onShareAppMessage: function () {
    return {
      title: this.data.appName,
      path: '/pages/index/index'
    };
  },

  // 初始化页面数据
  initPageData: function() {
    this.loadPetCategories();
    this.loadRecentPets();
  },

  // 更新当前时间
  updateCurrentTime: function() {
    this.setData({
      currentTime: util.formatTime(new Date(), 'YYYY-MM-DD hh:mm:ss')
    });
  },

  // 加载宠物分类
  loadPetCategories: function() {
    app.showLoading('加载中...');
    
    api.getCategoryList()
      .then(res => {
        console.log('获取分类成功:', res);
        this.setData({
          petCategories: res.data || []
        });
        app.hideLoading();
      })
      .catch(err => {
        console.error('获取分类失败:', err);
        app.hideLoading();
        app.showToast('获取分类失败', 'error');
      });
  },

  // 加载最近的宠物（示例数据）
  loadRecentPets: function() {
    // 这里可以调用API获取最近添加的宠物
    const mockPets = [
      { id: 1, name: '小白', type: '猫', breed: '英短' },
      { id: 2, name: '旺财', type: '狗', breed: '金毛' },
      { id: 3, name: '小花', type: '猫', breed: '波斯猫' }
    ];
    
    this.setData({
      recentPets: mockPets
    });
  },

  // 刷新页面数据
  refreshPageData: function() {
    Promise.all([
      this.loadPetCategories(),
      this.loadRecentPets()
    ]).finally(() => {
      wx.stopPullDownRefresh();
    });
  },

  // 获取用户信息
  getUserProfile: function(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        console.log('获取用户信息成功:', res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
        // 更新全局数据
        app.globalData.userInfo = res.userInfo;
      },
      fail: (err) => {
        console.error('获取用户信息失败:', err);
        app.showToast('获取用户信息失败', 'error');
      }
    });
  },

  // 处理用户点击分类
  onCategoryTap: function(e) {
    const category = e.currentTarget.dataset.category;
    console.log('点击分类:', category);
    
    // 跳转到分类页面
    wx.navigateTo({
      url: `/pages/category/category_main?category=${category.type}`
    });
  },

  // 处理用户点击宠物
  onPetTap: function(e) {
    const pet = e.currentTarget.dataset.pet;
    console.log('点击宠物:', pet);
    
    // 跳转到宠物详情页面
    wx.navigateTo({
      url: `/pages/pet_detail/pet_detail?id=${pet.id}`
    });
  },

  // 跳转到AI助手
  goToAIAssistant: function() {
    wx.navigateTo({
      url: '/pages/ai_assistant/ai_main'
    });
  },

  // 跳转到疾病检查
  goToDiseaseCheck: function() {
    wx.navigateTo({
      url: '/pages/disease_check/dis_main'
    });
  },

  // 跳转到宠物日程
  goToPetSchedule: function() {
    wx.navigateTo({
      url: '/pages/pet_schedule/sch_main'
    });
  }
});

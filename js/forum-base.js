/**
 * Easy CityU - 学术资源管理平台
 * 论坛基础模块 - 处理论坛的核心功能
 * 版本: 1.0.0
 * 日期: 2025/09/07
 */

// 立即执行函数表达式(IIFE)创建独立作用域
(function() {
    'use strict';
    
    // 全局命名空间
    window.APP = window.APP || {};
    
    // 论坛基础模块
    APP.ForumBase = {
        // 当前选中的标签
        currentTab: 'upload',
        
        /**
         * 初始化论坛基础模块
         */
        init: function() {
            // 绑定事件
            this.bindEvents();
            
            // 加载论坛数据
            this.loadForumData();
            
            console.log('论坛基础模块初始化完成');
        },
        
        /**
         * 绑定事件
         */
        bindEvents: function() {
            // 绑定标签切换事件
            this.bindTabEvents();
        },
        
        /**
         * 绑定标签切换事件
         */
        bindTabEvents: function() {
            // 获取标签元素
            const tabs = document.querySelectorAll('.forum-tab');
            
            // 如果没有标签元素，直接返回
            if (!tabs || tabs.length === 0) return;
            
            // 绑定点击事件
            tabs.forEach(tab => {
                tab.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    // 获取标签ID
                    const tabId = tab.getAttribute('data-tab');
                    
                    // 切换标签
                    this.switchTab(tabId);
                });
            });
        },
        
        /**
         * 切换标签
         * @param {string} tabId - 标签ID
         */
        switchTab: function(tabId) {
            // 更新当前标签
            this.currentTab = tabId;
            
            // 获取标签和内容元素
            const tabs = document.querySelectorAll('.forum-tab');
            const contents = document.querySelectorAll('.forum-content');
            
            // 如果元素不存在，直接返回
            if (!tabs || !contents) return;
            
            // 移除所有标签的活动状态
            tabs.forEach(tab => {
                if (tab.getAttribute('data-tab') === tabId) {
                    tab.classList.add('active');
                } else {
                    tab.classList.remove('active');
                }
            });
            
            // 隐藏所有内容
            contents.forEach(content => {
                if (content.getAttribute('data-content') === tabId) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
            
            // 如果切换到最新帖子或热门讨论标签，加载相应数据
            if (tabId === 'recent' && APP.ForumPosts) {
                APP.ForumPosts.loadRecentPosts();
            } else if (tabId === 'popular' && APP.ForumPosts) {
                APP.ForumPosts.loadPopularPosts();
            }
        },
        
        /**
         * 加载论坛数据
         */
        loadForumData: function() {
            // 加载最新回复
            if (APP.ForumReplies) {
                APP.ForumReplies.loadLatestReplies();
            }
        },
        
        /**
         * 显示通知
         * @param {string} message - 通知消息
         * @param {string} type - 通知类型（success, error, warning, info）
         */
        showNotification: function(message, type) {
            // 如果APP.showNotification函数存在，使用它显示通知
            if (typeof APP.showNotification === 'function') {
                APP.showNotification(message, type);
            } else {
                // 否则使用console
                switch (type) {
                    case 'error':
                        console.error(message);
                        break;
                    case 'warning':
                        console.warn(message);
                        break;
                    case 'info':
                        console.info(message);
                        break;
                    default:
                        console.log(message);
                }
            }
        }
    };
})();
/**
 * Easy CityU - 学术资源管理平台
 * 论坛回复模块 - 处理论坛回复的加载和渲染
 * 版本: 1.0.0
 * 日期: 2025/09/07
 */

// 立即执行函数表达式(IIFE)创建独立作用域
(function() {
    'use strict';
    
    // 全局命名空间
    window.APP = window.APP || {};
    
    // 论坛回复模块
    APP.ForumReplies = {
        /**
         * 初始化论坛回复模块
         */
        init: function() {
            console.log('论坛回复模块初始化完成');
        },
        
        /**
         * 加载最新回复
         */
        loadLatestReplies: function() {
            // 获取最新回复容器
            const latestRepliesContainer = document.querySelector('.latest-replies-content');
            
            // 如果容器不存在，直接返回
            if (!latestRepliesContainer) return;
            
            // 模拟API请求
            setTimeout(() => {
                // 模拟最新回复数据
                const latestReplies = [
                    {
                        id: 1,
                        user: '张同学',
                        avatar: 'images/default-avatar.svg',
                        text: 'CS3103的课程笔记非常有用，谢谢分享！',
                        time: '5分钟前'
                    },
                    {
                        id: 2,
                        user: '李同学',
                        avatar: 'images/default-avatar.svg',
                        text: '有人有商学院的市场营销学复习资料吗？',
                        time: '15分钟前'
                    },
                    {
                        id: 3,
                        user: '王同学',
                        avatar: 'images/default-avatar.svg',
                        text: '工程数学的作业解答很详细，对我帮助很大！',
                        time: '30分钟前'
                    },
                    {
                        id: 4,
                        user: '陈同学',
                        avatar: 'images/default-avatar.svg',
                        text: '英语写作课程的讲义质量很高，推荐大家下载！',
                        time: '1小时前'
                    }
                ];
                
                // 渲染最新回复
                this.renderReplies(latestRepliesContainer, latestReplies);
            }, 500);
        },
        
        /**
         * 渲染回复
         * @param {Element} container - 容器元素
         * @param {Array} replies - 回复数据数组
         */
        renderReplies: function(container, replies) {
            // 如果容器不存在，直接返回
            if (!container) return;
            
            // 如果没有回复，显示空状态
            if (!replies || replies.length === 0) {
                container.innerHTML = '<div class="empty-state">暂无回复</div>';
                return;
            }
            
            // 清空容器
            container.innerHTML = '';
            
            // 渲染每个回复
            replies.forEach(reply => {
                // 创建回复元素
                const replyElement = document.createElement('div');
                replyElement.className = 'reply-message';
                
                // 设置回复内容
                replyElement.innerHTML = `
                    <div class="reply-avatar">
                        <img src="${reply.avatar}" alt="${reply.user}">
                    </div>
                    <div class="reply-info">
                        <div class="reply-user">${reply.user}</div>
                        <div class="reply-text">${reply.text}</div>
                        <div class="reply-time">${reply.time}</div>
                    </div>
                `;
                
                // 添加到容器
                container.appendChild(replyElement);
            });
        }
    };
})();
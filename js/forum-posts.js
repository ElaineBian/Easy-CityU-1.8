/**
 * Easy CityU - 学术资源管理平台
 * 论坛帖子模块 - 处理论坛帖子的加载和渲染
 * 版本: 1.0.0
 * 日期: 2025/09/07
 */

// 立即执行函数表达式(IIFE)创建独立作用域
(function() {
    'use strict';
    
    // 全局命名空间
    window.APP = window.APP || {};
    
    // 论坛帖子模块
    APP.ForumPosts = {
        /**
         * 初始化论坛帖子模块
         */
        init: function() {
            console.log('论坛帖子模块初始化完成');
        },
        
        /**
         * 加载最新帖子
         */
        loadRecentPosts: function() {
            // 获取最新帖子容器
            const recentPostsContainer = document.querySelector('.forum-content[data-content="recent"] .posts-grid');
            
            // 如果容器不存在，直接返回
            if (!recentPostsContainer) return;
            
            // 显示加载状态
            recentPostsContainer.innerHTML = '<div class="loading">加载中...</div>';
            
            // 模拟API请求
            setTimeout(() => {
                // 模拟最新帖子数据
                const recentPosts = [
                    {
                        id: 1,
                        title: 'CS3103 数据结构与算法笔记分享',
                        content: '这是我整理的数据结构与算法课程笔记，包含了所有重要概念和例题解析，希望对大家有帮助。',
                        author: '张同学',
                        avatar: 'images/default-avatar.svg',
                        time: '2025-09-06T10:30:00',
                        views: 128,
                        likes: 32,
                        comments: 8
                    },
                    {
                        id: 2,
                        title: '商学院市场营销学复习资料',
                        content: '分享一下市场营销学的期末复习资料，包含了重点知识点和往年考题分析。',
                        author: '李同学',
                        avatar: 'images/default-avatar.svg',
                        time: '2025-09-05T16:45:00',
                        views: 96,
                        likes: 24,
                        comments: 5
                    },
                    {
                        id: 3,
                        title: '工程数学作业解答',
                        content: '这是工程数学第三章的作业解答，有详细的解题步骤和思路分析。',
                        author: '王同学',
                        avatar: 'images/default-avatar.svg',
                        time: '2025-09-04T09:15:00',
                        views: 75,
                        likes: 18,
                        comments: 3
                    },
                    {
                        id: 4,
                        title: '英语写作课程讲义',
                        content: '分享英语写作课程的讲义，包含了论文写作的结构和技巧，对提高写作能力很有帮助。',
                        author: '陈同学',
                        avatar: 'images/default-avatar.svg',
                        time: '2025-09-03T14:20:00',
                        views: 64,
                        likes: 15,
                        comments: 2
                    }
                ];
                
                // 渲染最新帖子
                this.renderPosts(recentPostsContainer, recentPosts);
            }, 1000);
        },
        
        /**
         * 加载热门讨论
         */
        loadPopularPosts: function() {
            // 获取热门讨论容器
            const popularPostsContainer = document.querySelector('.forum-content[data-content="popular"] .posts-grid');
            
            // 如果容器不存在，直接返回
            if (!popularPostsContainer) return;
            
            // 显示加载状态
            popularPostsContainer.innerHTML = '<div class="loading">加载中...</div>';
            
            // 模拟API请求
            setTimeout(() => {
                // 模拟热门讨论数据
                const popularPosts = [
                    {
                        id: 5,
                        title: '如何准备计算机科学专业的研究生申请？',
                        content: '我是计算机科学专业大四学生，想申请国外名校的研究生，有什么建议和经验分享吗？',
                        author: '刘同学',
                        avatar: 'images/default-avatar.svg',
                        time: '2025-09-02T11:10:00',
                        views: 256,
                        likes: 64,
                        comments: 15
                    },
                    {
                        id: 6,
                        title: '城大学生实习经验分享',
                        content: '刚结束在某科技公司的暑期实习，想分享一下申请流程、面试技巧和实习体验。',
                        author: '赵同学',
                        avatar: 'images/default-avatar.svg',
                        time: '2025-09-01T15:30:00',
                        views: 192,
                        likes: 48,
                        comments: 12
                    },
                    {
                        id: 7,
                        title: '有人参加过数据科学竞赛吗？',
                        content: '想参加即将举办的数据科学竞赛，有没有同学参加过类似比赛，可以分享一下经验？',
                        author: '孙同学',
                        avatar: 'images/default-avatar.svg',
                        time: '2025-08-31T09:45:00',
                        views: 128,
                        likes: 32,
                        comments: 8
                    },
                    {
                        id: 8,
                        title: '推荐一些提高编程能力的资源',
                        content: '想提高自己的编程能力，有没有推荐的书籍、网站或课程？',
                        author: '钱同学',
                        avatar: 'images/default-avatar.svg',
                        time: '2025-08-30T16:20:00',
                        views: 160,
                        likes: 40,
                        comments: 10
                    }
                ];
                
                // 渲染热门讨论
                this.renderPosts(popularPostsContainer, popularPosts);
            }, 1000);
        },
        
        /**
         * 渲染帖子
         * @param {Element} container - 容器元素
         * @param {Array} posts - 帖子数据数组
         */
        renderPosts: function(container, posts) {
            // 如果容器不存在，直接返回
            if (!container) return;
            
            // 如果没有帖子，显示空状态
            if (!posts || posts.length === 0) {
                container.innerHTML = '<div class="empty-state">暂无帖子</div>';
                return;
            }
            
            // 清空容器
            container.innerHTML = '';
            
            // 渲染每个帖子
            posts.forEach(post => {
                // 创建帖子元素
                const postElement = document.createElement('div');
                postElement.className = 'post-card';
                postElement.setAttribute('data-post-id', post.id);
                
                // 设置帖子内容
                postElement.innerHTML = `
                    <div class="post-header">
                        <img src="${post.avatar}" alt="${post.author}" class="post-avatar">
                        <div class="post-author-info">
                            <div class="post-author">${post.author}</div>
                            <div class="post-time">${this.formatPostTime(post.time)}</div>
                        </div>
                    </div>
                    <div class="post-content">
                        <h3 class="post-title">${post.title}</h3>
                        <p class="post-text">${post.content}</p>
                    </div>
                    <div class="post-footer">
                        <div class="post-stats">
                            <div class="post-stat"><i class="fas fa-eye"></i><span>${post.views}</span></div>
                            <div class="post-stat"><i class="fas fa-heart"></i><span>${post.likes}</span></div>
                            <div class="post-stat"><i class="fas fa-comment"></i><span>${post.comments}</span></div>
                        </div>
                        <a href="#" class="post-read-more" data-translate="read_more">阅读更多</a>
                    </div>
                `;
                
                // 添加到容器
                container.appendChild(postElement);
            });
        },
        
        /**
         * 格式化帖子时间
         * @param {string} time - ISO格式的时间字符串
         * @returns {string} - 格式化后的时间字符串
         */
        formatPostTime: function(time) {
            try {
                const date = new Date(time);
                const now = new Date();
                const diff = now - date;
                
                // 如果时间差小于1天，显示相对时间
                if (diff < 24 * 60 * 60 * 1000) {
                    // 如果时间差小于1小时，显示分钟
                    if (diff < 60 * 60 * 1000) {
                        const minutes = Math.floor(diff / (60 * 1000));
                        return `${minutes}分钟前`;
                    }
                    
                    // 否则显示小时
                    const hours = Math.floor(diff / (60 * 60 * 1000));
                    return `${hours}小时前`;
                }
                
                // 否则显示日期
                return date.toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                });
            } catch (error) {
                console.error('格式化帖子时间失败:', error);
                return time;
            }
        }
    };
})();
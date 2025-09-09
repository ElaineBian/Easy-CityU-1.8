/**
 * Easy CityU - 学术资源管理平台
 * 主应用模块 - 初始化和协调所有模块
 * 版本: 1.0.0
 * 日期: 2025/09/07
 */

// 立即执行函数表达式(IIFE)创建独立作用域
(function() {
    'use strict';
    
    // 全局命名空间
    window.APP = window.APP || {};
    
    // 主应用模块
    APP.Main = {
        /**
         * 初始化应用
         */
        init: function() {
            // 开场动画：先标记加载中
            document.documentElement.classList.add('is-loading');
            document.body.classList.add('is-loading');

            // 确保DOM已加载
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.initModules());
            } else {
                this.initModules();
            }
        },
        
        /**
         * 初始化所有模块
         */
        initModules: function() {
            try {
                console.log('初始化 Easy CityU 应用...');
                
                // 初始化工具模块
                if (APP.Utils && typeof APP.Utils.init === 'function') {
                    APP.Utils.init();
                }
                
                // 初始化主题模块
                if (APP.Theme && typeof APP.Theme.init === 'function') {
                    APP.Theme.init();
                }
                
                // 初始化语言模块
                if (APP.Language && typeof APP.Language.init === 'function') {
                    APP.Language.init();
                }
                
                // 初始化滑块模块
                if (APP.Slider && typeof APP.Slider.init === 'function') {
                    APP.Slider.init();
                }
                
                // 初始化Hero滑块模块
                if (APP.HeroSlider && typeof APP.HeroSlider.init === 'function') {
                    APP.HeroSlider.init();
                }
                
                // 初始化搜索模块
                if (APP.Search && typeof APP.Search.init === 'function') {
                    APP.Search.init();
                }
                
                // 初始化论坛基础模块
                if (APP.ForumBase && typeof APP.ForumBase.init === 'function') {
                    APP.ForumBase.init();
                }
                
                // 初始化论坛帖子模块
                if (APP.ForumPosts && typeof APP.ForumPosts.init === 'function') {
                    APP.ForumPosts.init();
                }
                
                // 初始化论坛回复模块
                if (APP.ForumReplies && typeof APP.ForumReplies.init === 'function') {
                    APP.ForumReplies.init();
                }
                
                // 初始化论坛上传模块
                if (APP.ForumUpload && typeof APP.ForumUpload.init === 'function') {
                    APP.ForumUpload.init();
                }
                
                // 初始化资源模块
                if (APP.Resources && typeof APP.Resources.init === 'function') {
                    APP.Resources.init();
                }
                
                // 初始化相机模块
                if (APP.Camera && typeof APP.Camera.init === 'function') {
                    APP.Camera.init();
                }
                
                // 初始化通知模块
                if (APP.Notification && typeof APP.Notification.init === 'function') {
                    APP.Notification.init();
                }
                
                // 初始化几何效果模块
                if (APP.Geometric && typeof APP.Geometric.init === 'function') {
                    APP.Geometric.init();
                }
                
                // 绑定全局事件
                this.bindGlobalEvents();
                
                console.log('Easy CityU 应用初始化完成');

                // 开场动画：在下一帧移除加载态并显隐主标题/副标题
                requestAnimationFrame(() => {
                    document.documentElement.classList.remove('is-loading');
                    document.body.classList.remove('is-loading');
                    document.documentElement.classList.add('is-loaded');
                    document.body.classList.add('is-loaded');

                    const heroTitle = document.querySelector('.hero-title');
                    const heroSubtitle = document.querySelector('.hero-subtitle');
                    if (heroTitle) heroTitle.classList.add('is-revealed');
                    if (heroSubtitle) setTimeout(() => heroSubtitle.classList.add('is-revealed'), 120);
                });
                
                // 显示欢迎通知
                if (APP.Notification && typeof APP.Notification.show === 'function') {
                    setTimeout(() => {
                        APP.Notification.show('欢迎访问 Easy CityU 学术资源管理平台！', 'success', 5000);
                    }, 1000);
                }
            } catch (error) {
                console.error('应用初始化失败:', error);
            }
        },
        
        /**
         * 绑定全局事件
         */
        bindGlobalEvents: function() {
            try {
                // 移动端菜单切换
                const menuToggle = document.querySelector('.menu-toggle');
                const navMenu = document.querySelector('.nav-menu');
                
                if (menuToggle && navMenu) {
                    menuToggle.addEventListener('click', function() {
                        menuToggle.classList.toggle('active');
                        navMenu.classList.toggle('active');
                    });
                }
                
                // 平滑滚动
                document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                    anchor.addEventListener('click', function(e) {
                        const target = document.querySelector(this.getAttribute('href'));
                        
                        if (target) {
                            e.preventDefault();
                            
                            // 关闭移动菜单
                            if (menuToggle && menuToggle.classList.contains('active')) {
                                menuToggle.classList.remove('active');
                                navMenu.classList.remove('active');
                            }
                            
                            // 平滑滚动
                            window.scrollTo({
                                top: target.offsetTop - 80,
                                behavior: 'smooth'
                            });
                        }
                    });
                });
                
                // 监听滚动事件，添加导航栏阴影
                const navbar = document.querySelector('.navbar');
                if (navbar) {
                    window.addEventListener('scroll', function() {
                        if (window.scrollY > 10) {
                            navbar.classList.add('scrolled');
                        } else {
                            navbar.classList.remove('scrolled');
                        }
                    });
                    
                    // 初始检查
                    if (window.scrollY > 10) {
                        navbar.classList.add('scrolled');
                    }
                }
                
                // 监听窗口大小变化
                window.addEventListener('resize', this.handleResize.bind(this));
                
                // 初始调用一次
                this.handleResize();
                
                console.log('全局事件绑定完成');
            } catch (error) {
                console.error('绑定全局事件失败:', error);
            }
        },
        
        /**
         * 处理窗口大小变化
         */
        handleResize: function() {
            // 更新滑块高度
            if (APP.Slider && typeof APP.Slider.updateHeight === 'function') {
                APP.Slider.updateHeight();
            }
            
            // 更新几何元素
            if (APP.Geometric && typeof APP.Geometric.createElements === 'function') {
                APP.Geometric.createElements();
            }
        }
    };
    
    // 初始化应用
    APP.Main.init();
})();
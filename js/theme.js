/**
 * Easy CityU - 学术资源管理平台
 * 主题模块 - 处理网站的明暗主题切换
 * 版本: 1.0.0
 * 日期: 2025/09/07
 */

// 立即执行函数表达式(IIFE)创建独立作用域
(function() {
    'use strict';
    
    // 全局命名空间
    window.APP = window.APP || {};
    
    // 主题模块
    APP.Theme = {
        // 主题类型
        LIGHT: 'light',
        DARK: 'dark',
        
        // 当前主题
        currentTheme: 'light',
        
        // 本地存储键名
        storageKey: 'theme',
        
        /**
         * 初始化主题模块
         */
        init: function() {
            // 从本地存储加载主题
            this.loadTheme();
            
            // 绑定事件
            this.bindEvents();
            
            console.log('主题模块初始化完成');
        },
        
        /**
         * 绑定事件
         */
        bindEvents: function() {
            // 获取主题切换按钮
            const themeToggle = document.getElementById('themeToggle');
            
            // 如果按钮存在，绑定点击事件
            if (themeToggle) {
                themeToggle.addEventListener('click', () => {
                    this.toggleTheme();
                });
            }
            
            // 监听系统主题变化
            this.listenForSystemThemeChanges();
        },
        
        /**
         * 加载主题
         */
        loadTheme: function() {
            // 从本地存储获取主题
            let theme = null;
            
            try {
                theme = localStorage.getItem(this.storageKey);
            } catch (error) {
                console.error('从本地存储加载主题失败:', error);
            }
            
            // 如果没有保存的主题，使用系统主题
            if (!theme) {
                theme = this.getSystemTheme();
            }
            
            // 应用主题
            this.applyTheme(theme);
        },
        
        /**
         * 保存主题
         * @param {string} theme - 主题类型
         */
        saveTheme: function(theme) {
            try {
                localStorage.setItem(this.storageKey, theme);
            } catch (error) {
                console.error('保存主题到本地存储失败:', error);
            }
        },
        
        /**
         * 应用主题
         * @param {string} theme - 主题类型
         */
        applyTheme: function(theme) {
            // 更新当前主题
            this.currentTheme = theme;
            
            // 更新文档根元素的主题属性
            document.documentElement.setAttribute('data-theme', theme);
            
            // 更新主题切换按钮的图标
            this.updateThemeToggleIcon();
            
            // 保存主题
            this.saveTheme(theme);
        },
        
        /**
         * 切换主题
         */
        toggleTheme: function() {
            // 切换主题
            const newTheme = this.currentTheme === this.LIGHT ? this.DARK : this.LIGHT;
            
            // 应用新主题
            this.applyTheme(newTheme);
        },
        
        /**
         * 更新主题切换按钮的图标
         */
        updateThemeToggleIcon: function() {
            // 获取主题切换按钮
            const themeToggle = document.getElementById('themeToggle');
            
            // 如果按钮存在，更新图标
            if (themeToggle) {
                // 更新按钮的标题和ARIA标签
                if (this.currentTheme === this.LIGHT) {
                    themeToggle.setAttribute('title', '切换到暗色模式');
                    themeToggle.setAttribute('aria-label', '切换到暗色模式');
                } else {
                    themeToggle.setAttribute('title', '切换到亮色模式');
                    themeToggle.setAttribute('aria-label', '切换到亮色模式');
                }
                
                // 新的图标结构不需要添加/移除类，CSS会自动处理图标显示
            }
        },
        
        /**
         * 获取系统主题
         * @returns {string} - 主题类型
         */
        getSystemTheme: function() {
            // 检查是否支持媒体查询
            if (window.matchMedia) {
                // 检查系统是否为暗色主题
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    return this.DARK;
                }
            }
            
            // 默认返回亮色主题
            return this.LIGHT;
        },
        
        /**
         * 监听系统主题变化
         */
        listenForSystemThemeChanges: function() {
            // 检查是否支持媒体查询
            if (window.matchMedia) {
                // 创建媒体查询
                const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                
                // 添加变化监听器
                try {
                    // 新版API
                    mediaQuery.addEventListener('change', (e) => {
                        // 如果没有保存的主题，跟随系统主题
                        if (!localStorage.getItem(this.storageKey)) {
                            this.applyTheme(e.matches ? this.DARK : this.LIGHT);
                        }
                    });
                } catch (error) {
                    try {
                        // 旧版API
                        mediaQuery.addListener((e) => {
                            // 如果没有保存的主题，跟随系统主题
                            if (!localStorage.getItem(this.storageKey)) {
                                this.applyTheme(e.matches ? this.DARK : this.LIGHT);
                            }
                        });
                    } catch (error) {
                        console.error('监听系统主题变化失败:', error);
                    }
                }
            }
        }
    };
})();
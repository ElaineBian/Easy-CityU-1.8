/**
 * Easy CityU - 学术资源管理平台
 * Hero滑块模块 - 处理首页英雄区域的背景图片轮播
 * 版本: 1.0.0
 * 日期: 2025/09/07
 */

// 立即执行函数表达式(IIFE)创建独立作用域
(function() {
    'use strict';
    
    // 全局命名空间
    window.APP = window.APP || {};
    
    // Hero滑块模块
    APP.HeroSlider = {
        // 当前滑块索引
        currentSlide: 0,
        
        // 滑块总数
        totalSlides: 0,
        
        // 自动播放定时器
        autoplayTimer: null,
        
        // 自动播放间隔（毫秒）
        autoplayInterval: 3000,
        
        // 是否启用自动播放
        autoplayEnabled: true,
        
        /**
         * 初始化Hero滑块模块
         */
        init: function() {
            // 获取滑块容器
            const sliderContainer = document.querySelector('.hero-slider');
            
            // 如果滑块容器不存在，直接返回
            if (!sliderContainer) {
                console.log('Hero滑块容器未找到');
                return;
            }
            
            // 获取所有滑块
            const slides = sliderContainer.querySelectorAll('.hero-slide');
            this.totalSlides = slides.length;
            
            // 如果没有滑块，直接返回
            if (this.totalSlides === 0) {
                console.log('未找到Hero滑块');
                return;
            }
            
            console.log(`找到 ${this.totalSlides} 个Hero滑块`);
            
            // 绑定事件
            this.bindEvents();
            
            // 显示当前滑块
            this.showSlide(this.currentSlide);
            
            // 开始自动播放
            if (this.autoplayEnabled) {
                this.startAutoplay();
            }
            
            console.log('Hero滑块模块初始化完成');
        },
        
        /**
         * 绑定事件
         */
        bindEvents: function() {
            // 绑定上一个按钮
            const prevButton = document.querySelector('.slider-prev');
            if (prevButton) {
                prevButton.addEventListener('click', () => {
                    this.prevSlide();
                });
            }
            
            // 绑定下一个按钮
            const nextButton = document.querySelector('.slider-next');
            if (nextButton) {
                nextButton.addEventListener('click', () => {
                    this.nextSlide();
                });
            }
            
            // 绑定指示器点击事件
            const indicators = document.querySelectorAll('.slider-indicator');
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    this.showSlide(index);
                });
            });
            
            // 绑定键盘事件
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    this.prevSlide();
                } else if (e.key === 'ArrowRight') {
                    this.nextSlide();
                }
            });
            
            // 鼠标悬停时暂停自动播放
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                heroSection.addEventListener('mouseenter', () => {
                    this.pauseAutoplay();
                });
                
                heroSection.addEventListener('mouseleave', () => {
                    this.resumeAutoplay();
                });
            }
            
            // 触摸事件支持
            this.bindTouchEvents();
        },
        
        /**
         * 绑定触摸事件
         */
        bindTouchEvents: function() {
            const sliderContainer = document.querySelector('.hero-slider');
            if (!sliderContainer) return;
            
            let startX = 0;
            let startY = 0;
            let isDragging = false;
            
            sliderContainer.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                isDragging = true;
                this.pauseAutoplay();
            }, { passive: true });
            
            sliderContainer.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                
                const currentX = e.touches[0].clientX;
                const currentY = e.touches[0].clientY;
                const diffX = startX - currentX;
                const diffY = startY - currentY;
                
                // 如果垂直滑动距离大于水平滑动距离，不处理
                if (Math.abs(diffY) > Math.abs(diffX)) {
                    return;
                }
                
                // 阻止默认滚动行为
                e.preventDefault();
            }, { passive: false });
            
            sliderContainer.addEventListener('touchend', (e) => {
                if (!isDragging) return;
                
                const endX = e.changedTouches[0].clientX;
                const diffX = startX - endX;
                
                // 滑动距离阈值
                const threshold = 50;
                
                if (Math.abs(diffX) > threshold) {
                    if (diffX > 0) {
                        // 向左滑动，显示下一张
                        this.nextSlide();
                    } else {
                        // 向右滑动，显示上一张
                        this.prevSlide();
                    }
                }
                
                isDragging = false;
                this.resumeAutoplay();
            }, { passive: true });
        },
        
        /**
         * 显示指定滑块
         * @param {number} index - 滑块索引
         */
        showSlide: function(index) {
            // 确保索引在有效范围内
            if (index < 0) {
                index = this.totalSlides - 1;
            } else if (index >= this.totalSlides) {
                index = 0;
            }
            
            // 更新当前滑块索引
            this.currentSlide = index;
            
            // 获取所有滑块
            const slides = document.querySelectorAll('.hero-slide');
            
            // 更新滑块显示状态
            slides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });
            
            // 更新指示器状态
            this.updateIndicators();
            
            // 重置自动播放定时器
            if (this.autoplayEnabled) {
                this.resetAutoplayTimer();
            }
        },
        
        /**
         * 更新指示器状态
         */
        updateIndicators: function() {
            const indicators = document.querySelectorAll('.slider-indicator');
            
            indicators.forEach((indicator, index) => {
                if (index === this.currentSlide) {
                    indicator.classList.add('active');
                    indicator.setAttribute('aria-current', 'true');
                } else {
                    indicator.classList.remove('active');
                    indicator.removeAttribute('aria-current');
                }
            });
        },
        
        /**
         * 切换到上一个滑块
         */
        prevSlide: function() {
            this.showSlide(this.currentSlide - 1);
        },
        
        /**
         * 切换到下一个滑块
         */
        nextSlide: function() {
            this.showSlide(this.currentSlide + 1);
        },
        
        /**
         * 开始自动播放
         */
        startAutoplay: function() {
            // 如果只有一个滑块，不需要自动播放
            if (this.totalSlides <= 1) return;
            
            this.autoplayTimer = setInterval(() => {
                this.nextSlide();
            }, this.autoplayInterval);
        },
        
        /**
         * 停止自动播放
         */
        stopAutoplay: function() {
            if (this.autoplayTimer) {
                clearInterval(this.autoplayTimer);
                this.autoplayTimer = null;
            }
        },
        
        /**
         * 暂停自动播放
         */
        pauseAutoplay: function() {
            this.stopAutoplay();
        },
        
        /**
         * 恢复自动播放
         */
        resumeAutoplay: function() {
            if (this.autoplayEnabled && !this.autoplayTimer) {
                this.startAutoplay();
            }
        },
        
        /**
         * 重置自动播放定时器
         */
        resetAutoplayTimer: function() {
            this.stopAutoplay();
            if (this.autoplayEnabled) {
                this.startAutoplay();
            }
        },
        
        /**
         * 切换自动播放状态
         */
        toggleAutoplay: function() {
            this.autoplayEnabled = !this.autoplayEnabled;
            
            if (this.autoplayEnabled) {
                this.startAutoplay();
            } else {
                this.stopAutoplay();
            }
        }
    };
})();
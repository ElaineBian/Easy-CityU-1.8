/**
 * Easy CityU - 学术资源管理平台
 * 背景滑块模块 - 处理网站首页的背景图片切换效果
 * 版本: 1.0.0
 * 日期: 2025/09/07
 */

// 立即执行函数表达式(IIFE)创建独立作用域
(function() {
    'use strict';
    
    // 全局命名空间
    window.APP = window.APP || {};
    
    // 背景滑块模块
    APP.Slider = {
        // 当前滑块索引
        currentSlide: 0,
        
        // 滑块总数
        totalSlides: 0,
        
        // 自动播放定时器
        autoplayTimer: null,
        
        // 自动播放间隔（毫秒）
        autoplayInterval: 5000,
        
        // 是否启用自动播放
        autoplayEnabled: false,
        
        // 是否正在拖动
        isDragging: false,
        
        // 拖动起始位置
        dragStartX: 0,
        
        // 拖动距离阈值
        dragThreshold: 50,
        
        /**
         * 初始化背景滑块模块
         */
        init: function() {
            // 获取滑块元素
            const sliderContainer = document.querySelector('.background-slider');
            
            // 如果滑块容器不存在，直接返回
            if (!sliderContainer) return;
            
            // 获取滑块总数
            const slides = sliderContainer.querySelectorAll('.slide');
            this.totalSlides = slides.length;
            
            // 如果没有滑块，直接返回
            if (this.totalSlides === 0) return;
            
            // 创建导航点
            this.createNavDots();
            
            // 创建导航按钮
            this.createNavButtons();
            
            // 绑定事件
            this.bindEvents();
            
            // 显示当前滑块
            this.showSlide(this.currentSlide);
            
            // 添加几何特效
            this.addGeometricEffects();
            
            console.log('背景滑块模块初始化完成');
        },
        
        /**
         * 创建导航点
         */
        createNavDots: function() {
            // 获取滑块容器
            const sliderContainer = document.querySelector('.background-slider');
            
            // 如果滑块容器不存在，直接返回
            if (!sliderContainer) return;
            
            // 创建导航点容器
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'slider-dots';
            
            // 创建导航点
            for (let i = 0; i < this.totalSlides; i++) {
                const dot = document.createElement('button');
                dot.className = 'slider-dot';
                dot.setAttribute('aria-label', `滑块 ${i + 1}`);
                dot.setAttribute('data-slide', i);
                
                // 绑定点击事件
                dot.addEventListener('click', () => {
                    this.showSlide(i);
                });
                
                // 添加到容器
                dotsContainer.appendChild(dot);
            }
            
            // 添加到滑块容器
            sliderContainer.appendChild(dotsContainer);
        },
        
        /**
         * 创建导航按钮
         */
        createNavButtons: function() {
            // 获取滑块容器
            const sliderContainer = document.querySelector('.background-slider');
            
            // 如果滑块容器不存在，直接返回
            if (!sliderContainer) return;
            
            // 创建上一个按钮
            const prevButton = document.createElement('button');
            prevButton.className = 'slider-nav prev';
            prevButton.setAttribute('aria-label', '上一个');
            prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
            
            // 绑定点击事件
            prevButton.addEventListener('click', () => {
                this.prevSlide();
            });
            
            // 创建下一个按钮
            const nextButton = document.createElement('button');
            nextButton.className = 'slider-nav next';
            nextButton.setAttribute('aria-label', '下一个');
            nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
            
            // 绑定点击事件
            nextButton.addEventListener('click', () => {
                this.nextSlide();
            });
            
            // 添加到滑块容器
            sliderContainer.appendChild(prevButton);
            sliderContainer.appendChild(nextButton);
        },
        
        /**
         * 绑定事件
         */
        bindEvents: function() {
            // 获取滑块容器
            const sliderContainer = document.querySelector('.background-slider');
            
            // 如果滑块容器不存在，直接返回
            if (!sliderContainer) return;
            
            // 绑定触摸事件
            sliderContainer.addEventListener('touchstart', (e) => {
                this.handleDragStart(e.touches[0].clientX);
            }, { passive: true });
            
            sliderContainer.addEventListener('touchmove', (e) => {
                this.handleDragMove(e.touches[0].clientX);
            }, { passive: true });
            
            sliderContainer.addEventListener('touchend', () => {
                this.handleDragEnd();
            });
            
            // 绑定鼠标事件
            sliderContainer.addEventListener('mousedown', (e) => {
                this.handleDragStart(e.clientX);
            });
            
            document.addEventListener('mousemove', (e) => {
                this.handleDragMove(e.clientX);
            });
            
            document.addEventListener('mouseup', () => {
                this.handleDragEnd();
            });
            
            // 绑定键盘事件
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    this.prevSlide();
                } else if (e.key === 'ArrowRight') {
                    this.nextSlide();
                }
            });
            
            // 绑定自动播放控制按钮事件
            const autoplayButton = document.querySelector('.slider-autoplay');
            if (autoplayButton) {
                autoplayButton.addEventListener('click', () => {
                    this.toggleAutoplay();
                });
            }
            
            // 绑定窗口大小变化事件
            window.addEventListener('resize', () => {
                this.updateSlidePositions();
            });
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
            
            // 更新滑块位置
            this.updateSlidePositions();
            
            // 更新导航点状态
            this.updateNavDots();
            
            // 重置自动播放定时器
            this.resetAutoplayTimer();
        },
        
        /**
         * 更新滑块位置
         */
        updateSlidePositions: function() {
            // 获取所有滑块
            const slides = document.querySelectorAll('.background-slider .slide');
            
            // 如果没有滑块，直接返回
            if (!slides || slides.length === 0) return;
            
            // 更新每个滑块的位置
            slides.forEach((slide, index) => {
                // 计算位置偏移
                const offset = (index - this.currentSlide) * 100;
                
                // 设置滑块位置
                slide.style.transform = `translateX(${offset}%)`;
                
                // 设置滑块可见性
                if (index === this.currentSlide) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });
        },
        
        /**
         * 更新导航点状态
         */
        updateNavDots: function() {
            // 获取所有导航点
            const dots = document.querySelectorAll('.slider-dot');
            
            // 如果没有导航点，直接返回
            if (!dots || dots.length === 0) return;
            
            // 更新每个导航点的状态
            dots.forEach((dot, index) => {
                if (index === this.currentSlide) {
                    dot.classList.add('active');
                    dot.setAttribute('aria-current', 'true');
                } else {
                    dot.classList.remove('active');
                    dot.removeAttribute('aria-current');
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
         * 处理拖动开始
         * @param {number} clientX - 鼠标或触摸点的X坐标
         */
        handleDragStart: function(clientX) {
            // 如果只有一个滑块，不需要拖动
            if (this.totalSlides <= 1) return;
            
            // 设置拖动状态
            this.isDragging = true;
            
            // 记录拖动起始位置
            this.dragStartX = clientX;
            
            // 暂停自动播放
            this.pauseAutoplay();
        },
        
        /**
         * 处理拖动移动
         * @param {number} clientX - 鼠标或触摸点的X坐标
         */
        handleDragMove: function(clientX) {
            // 如果没有拖动，直接返回
            if (!this.isDragging) return;
            
            // 计算拖动距离
            const dragDistance = clientX - this.dragStartX;
            
            // 获取所有滑块
            const slides = document.querySelectorAll('.background-slider .slide');
            
            // 如果没有滑块，直接返回
            if (!slides || slides.length === 0) return;
            
            // 更新每个滑块的位置
            slides.forEach((slide, index) => {
                // 计算位置偏移
                const offset = (index - this.currentSlide) * 100 + (dragDistance / window.innerWidth * 100);
                
                // 设置滑块位置
                slide.style.transform = `translateX(${offset}%)`;
            });
        },
        
        /**
         * 处理拖动结束
         */
        handleDragEnd: function() {
            // 如果没有拖动，直接返回
            if (!this.isDragging) return;
            
            // 重置拖动状态
            this.isDragging = false;
            
            // 获取所有滑块
            const slides = document.querySelectorAll('.background-slider .slide');
            
            // 如果没有滑块，直接返回
            if (!slides || slides.length === 0) return;
            
            // 获取当前滑块（添加索引检查）
            if (this.currentSlide < 0 || this.currentSlide >= slides.length) {
                this.currentSlide = 0; // 重置为有效索引
            }
            
            const currentSlide = slides[this.currentSlide];
            
            // 确保当前滑块存在
            if (!currentSlide) {
                this.updateSlidePositions();
                return;
            }
            
            // 获取当前滑块的位置
            const transform = currentSlide.style.transform;
            
            // 确保transform属性存在
            if (!transform) {
                this.updateSlidePositions();
                return;
            }
            
            const match = transform.match(/translateX\(([-\d.]+)%\)/);
            
            if (match) {
                const offset = parseFloat(match[1]);
                
                // 如果偏移超过阈值，切换滑块
                if (offset > this.dragThreshold) {
                    this.prevSlide();
                } else if (offset < -this.dragThreshold) {
                    this.nextSlide();
                } else {
                    // 否则恢复原位置
                    this.updateSlidePositions();
                }
            } else {
                // 恢复原位置
                this.updateSlidePositions();
            }
            
            // 恢复自动播放
            this.resumeAutoplay();
        },
        
        /**
         * 切换自动播放
         */
        toggleAutoplay: function() {
            if (this.autoplayEnabled) {
                this.stopAutoplay();
            } else {
                this.startAutoplay();
            }
            
            // 更新自动播放按钮状态
            this.updateAutoplayButton();
        },
        
        /**
         * 开始自动播放
         */
        startAutoplay: function() {
            // 如果只有一个滑块，不需要自动播放
            if (this.totalSlides <= 1) return;
            
            // 设置自动播放状态
            this.autoplayEnabled = true;
            
            // 设置自动播放定时器
            this.autoplayTimer = setInterval(() => {
                this.nextSlide();
            }, this.autoplayInterval);
        },
        
        /**
         * 停止自动播放
         */
        stopAutoplay: function() {
            // 清除自动播放定时器
            if (this.autoplayTimer) {
                clearInterval(this.autoplayTimer);
                this.autoplayTimer = null;
            }
            
            // 设置自动播放状态
            this.autoplayEnabled = false;
        },
        
        /**
         * 暂停自动播放
         */
        pauseAutoplay: function() {
            // 如果自动播放已启用，暂停它
            if (this.autoplayEnabled && this.autoplayTimer) {
                clearInterval(this.autoplayTimer);
                this.autoplayTimer = null;
            }
        },
        
        /**
         * 恢复自动播放
         */
        resumeAutoplay: function() {
            // 如果自动播放已启用，恢复它
            if (this.autoplayEnabled && !this.autoplayTimer) {
                this.autoplayTimer = setInterval(() => {
                    this.nextSlide();
                }, this.autoplayInterval);
            }
        },
        
        /**
         * 重置自动播放定时器
         */
        resetAutoplayTimer: function() {
            // 如果自动播放已启用，重置定时器
            if (this.autoplayEnabled) {
                this.pauseAutoplay();
                this.resumeAutoplay();
            }
        },
        
        /**
         * 更新自动播放按钮状态
         */
        updateAutoplayButton: function() {
            // 获取自动播放按钮
            const autoplayButton = document.querySelector('.slider-autoplay');
            
            // 如果按钮不存在，直接返回
            if (!autoplayButton) return;
            
            // 更新按钮图标和文本
            if (this.autoplayEnabled) {
                autoplayButton.innerHTML = '<i class="fas fa-pause"></i>';
                autoplayButton.setAttribute('title', '暂停自动播放');
                autoplayButton.setAttribute('aria-label', '暂停自动播放');
            } else {
                autoplayButton.innerHTML = '<i class="fas fa-play"></i>';
                autoplayButton.setAttribute('title', '开始自动播放');
                autoplayButton.setAttribute('aria-label', '开始自动播放');
            }
        },
        
        /**
         * 添加几何特效
         */
        addGeometricEffects: function() {
            // 获取滑块容器
            const sliderContainer = document.querySelector('.background-slider');
            
            // 如果滑块容器不存在，直接返回
            if (!sliderContainer) return;
            
            // 创建几何特效容器
            const effectsContainer = document.createElement('div');
            effectsContainer.className = 'geometric-effects';
            
            // 添加几何形状
            for (let i = 0; i < 5; i++) {
                // 创建几何形状
                const shape = document.createElement('div');
                shape.className = 'geometric-shape';
                
                // 随机形状类型
                const shapeTypes = ['circle', 'square', 'triangle', 'diamond', 'hexagon'];
                const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
                shape.classList.add(shapeType);
                
                // 随机位置
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                shape.style.left = `${posX}%`;
                shape.style.top = `${posY}%`;
                
                // 随机大小
                const size = 20 + Math.random() * 60;
                shape.style.width = `${size}px`;
                shape.style.height = `${size}px`;
                
                // 随机透明度
                const opacity = 0.05 + Math.random() * 0.1;
                shape.style.opacity = opacity;
                
                // 随机旋转
                const rotation = Math.random() * 360;
                shape.style.transform = `rotate(${rotation}deg)`;
                
                // 随机动画延迟
                const delay = Math.random() * 5;
                shape.style.animationDelay = `${delay}s`;
                
                // 添加到容器
                effectsContainer.appendChild(shape);
            }
            
            // 添加到滑块容器
            sliderContainer.appendChild(effectsContainer);
        }
    };
})();
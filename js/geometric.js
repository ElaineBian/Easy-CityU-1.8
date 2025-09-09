/**
 * Easy CityU - 学术资源管理平台
 * 几何效果模块 - 处理网站的几何装饰元素
 * 版本: 1.0.0
 * 日期: 2025/09/07
 */

// 立即执行函数表达式(IIFE)创建独立作用域
(function() {
    'use strict';
    
    // 全局命名空间
    window.APP = window.APP || {};
    
    // 几何效果模块
    APP.Geometric = {
        // 几何元素
        elements: [],
        
        // 动画帧ID
        animationFrameId: null,
        
        // 是否已初始化
        initialized: false,
        
        /**
         * 初始化几何效果
         */
        init: function() {
            // 如果已经初始化，直接返回
            if (this.initialized) return;
            
            // 创建几何元素
            this.createElements();
            
            // 开始动画
            this.animate();
            
            // 标记为已初始化
            this.initialized = true;
            
            console.log('几何效果模块初始化完成');
        },
        
        /**
         * 创建几何元素
         */
        createElements: function() {
            // 获取几何元素容器
            const container = document.querySelector('.geometric-elements');
            if (!container) return;
            
            // 清空容器
            container.innerHTML = '';
            
            // 创建几何元素
            for (let i = 0; i < 15; i++) {
                // 创建元素
                const element = document.createElement('div');
                element.className = 'geo-element';
                
                // 随机形状
                const shapes = ['geo-circle', 'geo-square', 'geo-triangle', 'geo-line'];
                const shape = shapes[Math.floor(Math.random() * shapes.length)];
                element.classList.add(shape);
                
                // 随机大小
                const size = Math.random() * 30 + 10;
                element.style.width = `${size}px`;
                element.style.height = `${size}px`;
                
                // 随机位置
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                element.style.left = `${posX}%`;
                element.style.top = `${posY}%`;
                
                // 随机透明度
                const opacity = Math.random() * 0.5 + 0.1;
                element.style.opacity = opacity;
                
                // 随机旋转
                const rotation = Math.random() * 360;
                element.style.transform = `rotate(${rotation}deg)`;
                
                // 随机动画延迟
                const delay = Math.random() * 5;
                element.style.animationDelay = `${delay}s`;
                
                // 随机动画持续时间
                const duration = Math.random() * 10 + 10;
                element.style.animationDuration = `${duration}s`;
                
                // 添加到容器
                container.appendChild(element);
                
                // 添加到元素数组
                this.elements.push({
                    element: element,
                    shape: shape,
                    size: size,
                    posX: posX,
                    posY: posY,
                    opacity: opacity,
                    rotation: rotation,
                    speed: Math.random() * 0.5 + 0.1,
                    direction: Math.random() * Math.PI * 2
                });
            }
        },
        
        /**
         * 动画循环
         */
        animate: function() {
            // 更新元素位置
            this.updateElements();
            
            // 请求下一帧
            this.animationFrameId = requestAnimationFrame(() => this.animate());
        },
        
        /**
         * 更新元素位置
         */
        updateElements: function() {
            // 遍历所有元素
            this.elements.forEach(item => {
                // 更新旋转
                item.rotation += item.speed;
                item.element.style.transform = `rotate(${item.rotation}deg)`;
                
                // 缓慢移动
                const moveSpeed = 0.01;
                item.posX += Math.cos(item.direction) * moveSpeed;
                item.posY += Math.sin(item.direction) * moveSpeed;
                
                // 边界检查
                if (item.posX < 0 || item.posX > 100) {
                    item.direction = Math.PI - item.direction;
                }
                if (item.posY < 0 || item.posY > 100) {
                    item.direction = -item.direction;
                }
                
                // 更新位置
                item.element.style.left = `${item.posX}%`;
                item.element.style.top = `${item.posY}%`;
            });
        },
        
        /**
         * 停止动画
         */
        stop: function() {
            if (this.animationFrameId) {
                cancelAnimationFrame(this.animationFrameId);
                this.animationFrameId = null;
            }
        },
        
        /**
         * 重新开始动画
         */
        restart: function() {
            this.stop();
            this.animate();
        }
    };
    
    // 当DOM加载完成后初始化
    document.addEventListener('DOMContentLoaded', function() {
        // 检查是否已经初始化
        if (!APP.Geometric.initialized) {
            APP.Geometric.init();
        }
    });
})();
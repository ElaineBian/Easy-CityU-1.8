/**
 * Easy CityU - 学术资源管理平台
 * 通知模块 - 处理网站的通知消息
 * 版本: 1.0.0
 * 日期: 2025/09/07
 */

// 立即执行函数表达式(IIFE)创建独立作用域
(function() {
    'use strict';
    
    // 全局命名空间
    window.APP = window.APP || {};
    
    // 通知模块
    APP.Notification = {
        // 通知容器
        container: null,
        
        // 通知队列
        queue: [],
        
        // 最大通知数量
        maxNotifications: 3,
        
        // 通知显示时间（毫秒）
        displayDuration: 5000,
        
        /**
         * 初始化通知模块
         */
        init: function() {
            // 创建通知容器
            this.createContainer();
            
            console.log('通知模块初始化完成');
        },
        
        /**
         * 创建通知容器
         */
        createContainer: function() {
            // 如果容器已存在，直接返回
            if (this.container) return;
            
            // 创建容器元素
            this.container = document.createElement('div');
            this.container.id = 'notificationContainer';
            this.container.className = 'notification-container';
            this.container.setAttribute('role', 'region');
            this.container.setAttribute('aria-live', 'polite');
            
            // 添加到文档
            document.body.appendChild(this.container);
        },
        
        /**
         * 显示通知
         * @param {string} message - 通知消息
         * @param {string} [type='info'] - 通知类型（success, error, warning, info）
         * @param {number} [duration] - 显示时间（毫秒），默认为 displayDuration
         */
        show: function(message, type = 'info', duration) {
            // 确保容器存在
            if (!this.container) {
                this.createContainer();
            }
            
            // 创建通知元素
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.setAttribute('role', 'alert');
            
            // 设置通知内容
            notification.innerHTML = `
                <div class="notification-icon">
                    <i class="${this.getIconClass(type)}"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-message">${message}</div>
                </div>
                <button class="notification-close" aria-label="关闭通知">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            // 绑定关闭按钮事件
            const closeBtn = notification.querySelector('.notification-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    this.hide(notification);
                });
            }
            
            // 添加到容器
            this.container.appendChild(notification);
            
            // 显示通知
            setTimeout(() => {
                notification.classList.add('active');
            }, 10);
            
            // 添加到队列
            this.queue.push(notification);
            
            // 如果队列超过最大数量，隐藏最早的通知
            if (this.queue.length > this.maxNotifications) {
                this.hide(this.queue[0]);
            }
            
            // 自动隐藏通知
            setTimeout(() => {
                this.hide(notification);
            }, duration || this.displayDuration);
        },
        
        /**
         * 隐藏通知
         * @param {Element} notification - 通知元素
         */
        hide: function(notification) {
            // 如果通知不在队列中，直接返回
            const index = this.queue.indexOf(notification);
            if (index === -1) return;
            
            // 从队列中移除
            this.queue.splice(index, 1);
            
            // 移除活动状态
            notification.classList.remove('active');
            
            // 延迟移除元素
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        },
        
        /**
         * 隐藏所有通知
         */
        hideAll: function() {
            // 复制队列，避免在遍历过程中修改队列
            const notifications = [...this.queue];
            
            // 隐藏每个通知
            notifications.forEach(notification => {
                this.hide(notification);
            });
        },
        
        /**
         * 获取图标类名
         * @param {string} type - 通知类型
         * @returns {string} - 图标类名
         */
        getIconClass: function(type) {
            switch (type) {
                case 'success':
                    return 'fas fa-check-circle';
                case 'error':
                    return 'fas fa-exclamation-circle';
                case 'warning':
                    return 'fas fa-exclamation-triangle';
                case 'info':
                default:
                    return 'fas fa-info-circle';
            }
        }
    };
    
    // 全局通知函数
    APP.showNotification = function(message, type, duration) {
        APP.Notification.show(message, type, duration);
    };
})();
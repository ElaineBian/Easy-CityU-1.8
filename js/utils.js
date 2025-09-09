/**
 * Easy CityU - 学术资源管理平台
 * 工具模块 - 提供常用的辅助函数
 * 版本: 1.0.0
 * 日期: 2025/09/07
 */

// 立即执行函数表达式(IIFE)创建独立作用域
(function() {
    'use strict';
    
    // 全局命名空间
    window.APP = window.APP || {};
    
    // 工具模块
    APP.Utils = {
        /**
         * 初始化工具模块
         */
        init: function() {
            console.log('工具模块初始化完成');
        },
        
        /**
         * 获取元素
         * @param {string} selector - CSS选择器
         * @returns {Element|null} - 元素或null
         */
        getElement: function(selector) {
            try {
                return document.querySelector(selector);
            } catch (error) {
                console.error('获取元素失败:', error);
                return null;
            }
        },
        
        /**
         * 获取元素列表
         * @param {string} selector - CSS选择器
         * @returns {NodeList|null} - 元素列表或null
         */
        getElements: function(selector) {
            try {
                return document.querySelectorAll(selector);
            } catch (error) {
                console.error('获取元素列表失败:', error);
                return null;
            }
        },
        
        /**
         * 添加事件监听器
         * @param {Element} element - 元素
         * @param {string} event - 事件类型
         * @param {Function} callback - 回调函数
         */
        addEvent: function(element, event, callback) {
            if (!element) return;
            
            try {
                element.addEventListener(event, callback);
            } catch (error) {
                console.error('添加事件监听器失败:', error);
            }
        },
        
        /**
         * 移除事件监听器
         * @param {Element} element - 元素
         * @param {string} event - 事件类型
         * @param {Function} callback - 回调函数
         */
        removeEvent: function(element, event, callback) {
            if (!element) return;
            
            try {
                element.removeEventListener(event, callback);
            } catch (error) {
                console.error('移除事件监听器失败:', error);
            }
        },
        
        /**
         * 切换类名
         * @param {Element} element - 元素
         * @param {string} className - 类名
         * @param {boolean} [force] - 强制添加或移除
         */
        toggleClass: function(element, className, force) {
            if (!element) return;
            
            try {
                if (force === undefined) {
                    element.classList.toggle(className);
                } else {
                    if (force) {
                        element.classList.add(className);
                    } else {
                        element.classList.remove(className);
                    }
                }
            } catch (error) {
                console.error('切换类名失败:', error);
            }
        },
        
        /**
         * 防抖函数
         * @param {Function} func - 要防抖的函数
         * @param {number} wait - 等待时间（毫秒）
         * @returns {Function} - 防抖后的函数
         */
        debounce: function(func, wait) {
            let timeout;
            
            return function() {
                const context = this;
                const args = arguments;
                
                clearTimeout(timeout);
                
                timeout = setTimeout(function() {
                    func.apply(context, args);
                }, wait);
            };
        },
        
        /**
         * 节流函数
         * @param {Function} func - 要节流的函数
         * @param {number} limit - 限制时间（毫秒）
         * @returns {Function} - 节流后的函数
         */
        throttle: function(func, limit) {
            let inThrottle;
            
            return function() {
                const context = this;
                const args = arguments;
                
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    
                    setTimeout(function() {
                        inThrottle = false;
                    }, limit);
                }
            };
        },
        
        /**
         * 从本地存储获取数据
         * @param {string} key - 键名
         * @param {*} defaultValue - 默认值
         * @returns {*} - 存储的数据或默认值
         */
        getLocalStorage: function(key, defaultValue) {
            try {
                const value = localStorage.getItem(key);
                
                if (value === null) {
                    return defaultValue;
                }
                
                return JSON.parse(value);
            } catch (error) {
                console.error('从本地存储获取数据失败:', error);
                return defaultValue;
            }
        },
        
        /**
         * 设置本地存储数据
         * @param {string} key - 键名
         * @param {*} value - 值
         */
        setLocalStorage: function(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (error) {
                console.error('设置本地存储数据失败:', error);
            }
        },
        
        /**
         * 移除本地存储数据
         * @param {string} key - 键名
         */
        removeLocalStorage: function(key) {
            try {
                localStorage.removeItem(key);
            } catch (error) {
                console.error('移除本地存储数据失败:', error);
            }
        },
        
        /**
         * 格式化日期
         * @param {Date|string} date - 日期对象或日期字符串
         * @param {string} [format='yyyy-MM-dd'] - 格式化模式
         * @returns {string} - 格式化后的日期字符串
         */
        formatDate: function(date, format = 'yyyy-MM-dd') {
            try {
                date = typeof date === 'string' ? new Date(date) : date;
                
                if (!(date instanceof Date) || isNaN(date)) {
                    throw new Error('无效的日期');
                }
                
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                const hours = date.getHours();
                const minutes = date.getMinutes();
                const seconds = date.getSeconds();
                
                format = format.replace(/yyyy/g, year);
                format = format.replace(/MM/g, month < 10 ? '0' + month : month);
                format = format.replace(/M/g, month);
                format = format.replace(/dd/g, day < 10 ? '0' + day : day);
                format = format.replace(/d/g, day);
                format = format.replace(/HH/g, hours < 10 ? '0' + hours : hours);
                format = format.replace(/H/g, hours);
                format = format.replace(/mm/g, minutes < 10 ? '0' + minutes : minutes);
                format = format.replace(/m/g, minutes);
                format = format.replace(/ss/g, seconds < 10 ? '0' + seconds : seconds);
                format = format.replace(/s/g, seconds);
                
                return format;
            } catch (error) {
                console.error('格式化日期失败:', error);
                return '';
            }
        },
        
        /**
         * 格式化相对时间
         * @param {Date|string} date - 日期对象或日期字符串
         * @returns {string} - 格式化后的相对时间字符串
         */
        formatRelativeTime: function(date) {
            try {
                date = typeof date === 'string' ? new Date(date) : date;
                
                if (!(date instanceof Date) || isNaN(date)) {
                    throw new Error('无效的日期');
                }
                
                const now = new Date();
                const diff = now - date;
                
                // 如果时间差小于1分钟，显示"刚刚"
                if (diff < 60 * 1000) {
                    return '刚刚';
                }
                
                // 如果时间差小于1小时，显示分钟
                if (diff < 60 * 60 * 1000) {
                    const minutes = Math.floor(diff / (60 * 1000));
                    return `${minutes}分钟前`;
                }
                
                // 如果时间差小于1天，显示小时
                if (diff < 24 * 60 * 60 * 1000) {
                    const hours = Math.floor(diff / (60 * 60 * 1000));
                    return `${hours}小时前`;
                }
                
                // 如果时间差小于1周，显示天
                if (diff < 7 * 24 * 60 * 60 * 1000) {
                    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
                    return `${days}天前`;
                }
                
                // 否则显示日期
                return this.formatDate(date);
            } catch (error) {
                console.error('格式化相对时间失败:', error);
                return '';
            }
        },
        
        /**
         * 生成唯一ID
         * @returns {string} - 唯一ID
         */
        generateUniqueId: function() {
            return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
        },
        
        /**
         * 深拷贝对象
         * @param {*} obj - 要拷贝的对象
         * @returns {*} - 拷贝后的对象
         */
        deepClone: function(obj) {
            try {
                if (obj === null || typeof obj !== 'object') {
                    return obj;
                }
                
                if (obj instanceof Date) {
                    return new Date(obj);
                }
                
                if (obj instanceof Array) {
                    return obj.map(item => this.deepClone(item));
                }
                
                if (obj instanceof Object) {
                    const copy = {};
                    
                    Object.keys(obj).forEach(key => {
                        copy[key] = this.deepClone(obj[key]);
                    });
                    
                    return copy;
                }
                
                throw new Error('无法拷贝的对象类型');
            } catch (error) {
                console.error('深拷贝对象失败:', error);
                return obj;
            }
        },
        
        /**
         * 检查设备类型
         * @returns {string} - 设备类型（mobile, tablet, desktop）
         */
        getDeviceType: function() {
            const userAgent = navigator.userAgent.toLowerCase();
            const isMobile = /iphone|ipod|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec/i.test(userAgent);
            const isTablet = /ipad|android(?!.*mobile)|tablet|kindle|playbook|silk|(?=.*tablet)(?=.*firefox)/i.test(userAgent);
            
            if (isMobile) {
                return 'mobile';
            } else if (isTablet) {
                return 'tablet';
            } else {
                return 'desktop';
            }
        },
        
        /**
         * 检查浏览器类型
         * @returns {string} - 浏览器类型（chrome, firefox, safari, edge, ie, opera, other）
         */
        getBrowserType: function() {
            const userAgent = navigator.userAgent.toLowerCase();
            
            if (userAgent.indexOf('chrome') > -1 && userAgent.indexOf('edg') === -1) {
                return 'chrome';
            } else if (userAgent.indexOf('firefox') > -1) {
                return 'firefox';
            } else if (userAgent.indexOf('safari') > -1 && userAgent.indexOf('chrome') === -1) {
                return 'safari';
            } else if (userAgent.indexOf('edg') > -1) {
                return 'edge';
            } else if (userAgent.indexOf('msie') > -1 || userAgent.indexOf('trident') > -1) {
                return 'ie';
            } else if (userAgent.indexOf('opera') > -1 || userAgent.indexOf('opr') > -1) {
                return 'opera';
            } else {
                return 'other';
            }
        },
        
        /**
         * 检查操作系统类型
         * @returns {string} - 操作系统类型（windows, macos, ios, android, linux, other）
         */
        getOSType: function() {
            const userAgent = navigator.userAgent.toLowerCase();
            
            if (userAgent.indexOf('windows') > -1) {
                return 'windows';
            } else if (userAgent.indexOf('mac') > -1 && userAgent.indexOf('iphone') === -1 && userAgent.indexOf('ipad') === -1) {
                return 'macos';
            } else if (userAgent.indexOf('iphone') > -1 || userAgent.indexOf('ipad') > -1 || userAgent.indexOf('ipod') > -1) {
                return 'ios';
            } else if (userAgent.indexOf('android') > -1) {
                return 'android';
            } else if (userAgent.indexOf('linux') > -1) {
                return 'linux';
            } else {
                return 'other';
            }
        }
    };
})();
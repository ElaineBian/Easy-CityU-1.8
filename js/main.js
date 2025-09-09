/**
 * Easy CityU - 学术资源管理平台
 * 主JavaScript文件 - 初始化所有模块
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
        /**
         * 显示通知
         * @param {string} message - 通知消息
         * @param {string} type - 通知类型（success, error, warning, info）
         */
        show: function(message, type = 'info') {
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
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            // 获取通知容器
            let container = document.getElementById('notificationContainer');
            
            // 如果容器不存在，创建一个
            if (!container) {
                container = document.createElement('div');
                container.id = 'notificationContainer';
                document.body.appendChild(container);
            }
            
            // 添加到容器
            container.appendChild(notification);
            
            // 绑定关闭按钮事件
            const closeBtn = notification.querySelector('.notification-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    this.hide(notification);
                });
            }
            
            // 显示通知
            setTimeout(() => {
                notification.classList.add('active');
            }, 10);
            
            // 自动隐藏通知
            setTimeout(() => {
                this.hide(notification);
            }, 5000);
        },
        
        /**
         * 隐藏通知
         * @param {Element} notification - 通知元素
         */
        hide: function(notification) {
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
    APP.showNotification = function(message, type) {
        APP.Notification.show(message, type);
    };
    
    // 相机模块
    APP.Camera = {
        // 相机流
        stream: null,
        
        /**
         * 初始化相机模块
         */
        init: function() {
            console.log('相机模块初始化完成');
        },
        
        /**
         * 打开拍照搜索
         */
        openPhotoSearch: function() {
            // 创建相机模态框
            this.createCameraModal();
            
            // 打开相机
            this.openCamera();
        },
        
        /**
         * 创建相机模态框
         */
        createCameraModal: function() {
            // 创建模态框元素
            const modal = document.createElement('div');
            modal.className = 'modal camera-modal';
            modal.id = 'cameraModal';
            
            // 设置模态框内容
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>拍照搜索</h3>
                        <button class="modal-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="camera-container">
                            <video id="cameraPreview" autoplay playsinline></video>
                            <canvas id="cameraCanvas" hidden></canvas>
                            <div class="camera-overlay">
                                <div class="camera-frame"></div>
                            </div>
                        </div>
                        <div class="camera-controls">
                            <button id="captureBtn" class="btn btn-primary">
                                <i class="fas fa-camera"></i> 拍照
                            </button>
                            <button id="switchCameraBtn" class="btn btn-outline">
                                <i class="fas fa-sync"></i> 切换相机
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            // 添加到文档
            document.body.appendChild(modal);
            
            // 绑定关闭按钮事件
            const closeBtn = modal.querySelector('.modal-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    this.closeCamera();
                    this.closeCameraModal();
                });
            }
            
            // 绑定拍照按钮事件
            const captureBtn = document.getElementById('captureBtn');
            if (captureBtn) {
                captureBtn.addEventListener('click', () => {
                    this.capturePhoto();
                });
            }
            
            // 绑定切换相机按钮事件
            const switchCameraBtn = document.getElementById('switchCameraBtn');
            if (switchCameraBtn) {
                switchCameraBtn.addEventListener('click', () => {
                    this.switchCamera();
                });
            }
            
            // 显示模态框
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        },
        
        /**
         * 关闭相机模态框
         */
        closeCameraModal: function() {
            const modal = document.getElementById('cameraModal');
            
            if (modal) {
                // 移除活动状态
                modal.classList.remove('active');
                
                // 延迟移除元素
                setTimeout(() => {
                    if (modal.parentNode) {
                        modal.parentNode.removeChild(modal);
                    }
                }, 300);
            }
        },
        
        /**
         * 打开相机
         */
        openCamera: function() {
            // 获取相机预览元素
            const preview = document.getElementById('cameraPreview');
            
            // 如果元素不存在，直接返回
            if (!preview) return;
            
            // 检查浏览器是否支持getUserMedia
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                APP.showNotification('您的浏览器不支持拍照功能', 'error');
                return;
            }
            
            // 获取相机权限
            navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'environment',
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                },
                audio: false
            })
            .then(stream => {
                // 保存相机流
                this.stream = stream;
                
                // 设置预览源
                preview.srcObject = stream;
            })
            .catch(error => {
                console.error('获取相机权限失败:', error);
                APP.showNotification('获取相机权限失败', 'error');
            });
        },
        
        /**
         * 关闭相机
         */
        closeCamera: function() {
            // 如果相机流存在，关闭它
            if (this.stream) {
                this.stream.getTracks().forEach(track => {
                    track.stop();
                });
                
                this.stream = null;
            }
        },
        
        /**
         * 切换相机
         */
        switchCamera: function() {
            // 关闭当前相机
            this.closeCamera();
            
            // 获取相机预览元素
            const preview = document.getElementById('cameraPreview');
            
            // 如果元素不存在，直接返回
            if (!preview) return;
            
            // 获取当前相机模式
            const currentFacingMode = preview.srcObject && preview.srcObject.getVideoTracks().length > 0
                ? preview.srcObject.getVideoTracks()[0].getSettings().facingMode
                : null;
            
            // 切换相机模式
            const newFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';
            
            // 获取相机权限
            navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: newFacingMode,
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                },
                audio: false
            })
            .then(stream => {
                // 保存相机流
                this.stream = stream;
                
                // 设置预览源
                preview.srcObject = stream;
            })
            .catch(error => {
                console.error('切换相机失败:', error);
                APP.showNotification('切换相机失败', 'error');
            });
        },
        
        /**
         * 拍照
         */
        capturePhoto: function() {
            // 获取相机预览和画布元素
            const preview = document.getElementById('cameraPreview');
            const canvas = document.getElementById('cameraCanvas');
            
            // 如果元素不存在，直接返回
            if (!preview || !canvas) return;
            
            // 设置画布大小
            canvas.width = preview.videoWidth;
            canvas.height = preview.videoHeight;
            
            // 绘制视频帧到画布
            const context = canvas.getContext('2d');
            context.drawImage(preview, 0, 0, canvas.width, canvas.height);
            
            // 获取图像数据
            const imageData = canvas.toDataURL('image/jpeg');
            
            // 关闭相机
            this.closeCamera();
            
            // 关闭相机模态框
            this.closeCameraModal();
            
            // 处理拍照搜索结果
            if (APP.Search && typeof APP.Search.handlePhotoSearchResult === 'function') {
                APP.Search.handlePhotoSearchResult(imageData);
            }
        }
    };
    
    // 初始化函数
    APP.init = function() {
        // 初始化工具模块
        if (APP.Utils) {
            APP.Utils.init();
        }
        
        // 初始化主题模块
        if (APP.Theme) {
            APP.Theme.init();
        }
        
        // 初始化语言模块
        if (APP.Language) {
            APP.Language.init();
        }
        
        // 初始化背景滑块模块
        if (APP.Slider) {
            APP.Slider.init();
        }
        
        // 初始化搜索模块
        if (APP.Search) {
            APP.Search.init();
        }
        
        // 初始化相机模块
        if (APP.Camera) {
            APP.Camera.init();
        }
        
        // 初始化论坛模块
        if (APP.ForumBase) {
            APP.ForumBase.init();
        }
        
        // 初始化论坛帖子模块
        if (APP.ForumPosts) {
            APP.ForumPosts.init();
        }
        
        // 初始化论坛回复模块
        if (APP.ForumReplies) {
            APP.ForumReplies.init();
        }
        
        // 初始化论坛上传模块
        if (APP.ForumUpload) {
            APP.ForumUpload.init();
        }
        
        console.log('应用程序初始化完成');
    };
    
    // 当DOM加载完成时初始化应用程序
    document.addEventListener('DOMContentLoaded', APP.init);
})();
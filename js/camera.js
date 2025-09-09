/**
 * Easy CityU - 学术资源管理平台
 * 相机模块 - 处理拍照搜索功能
 * 版本: 1.0.0
 * 日期: 2025/09/07
 */

// 立即执行函数表达式(IIFE)创建独立作用域
(function() {
    'use strict';
    
    // 全局命名空间
    window.APP = window.APP || {};
    
    // 相机模块
    APP.Camera = {
        // 相机流
        stream: null,
        
        // 当前使用的相机设备ID
        currentDeviceId: null,
        
        // 可用的相机设备列表
        devices: [],
        
        /**
         * 初始化相机模块
         */
        init: function() {
            // 检查浏览器是否支持相机API
            if (!this.checkCameraSupport()) {
                console.warn('浏览器不支持相机功能');
                return;
            }
            
            // 枚举相机设备
            this.enumerateDevices();
            
            console.log('相机模块初始化完成');
        },
        
        /**
         * 检查浏览器是否支持相机API
         * @returns {boolean} - 是否支持相机API
         */
        checkCameraSupport: function() {
            return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
        },
        
        /**
         * 枚举相机设备
         */
        enumerateDevices: function() {
            // 如果浏览器不支持相机API，直接返回
            if (!this.checkCameraSupport()) return;
            
            // 获取所有媒体设备
            navigator.mediaDevices.enumerateDevices()
                .then(devices => {
                    // 过滤出视频输入设备（相机）
                    this.devices = devices.filter(device => device.kind === 'videoinput');
                    
                    console.log(`找到 ${this.devices.length} 个相机设备`);
                })
                .catch(error => {
                    console.error('枚举相机设备失败:', error);
                });
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
                        <h3><i class="fas fa-camera"></i> 拍照搜索</h3>
                        <button class="modal-close" aria-label="关闭">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="camera-status" id="cameraStatus">
                            <div class="status-loading">
                                <i class="fas fa-spinner fa-spin"></i>
                                <span>正在启动相机...</span>
                            </div>
                            <div class="status-error" style="display: none;">
                                <i class="fas fa-exclamation-triangle"></i>
                                <span>相机权限被拒绝</span>
                                <p>请允许浏览器访问相机以使用拍照搜索功能</p>
                            </div>
                        </div>
                        <div class="camera-container" style="display: none;">
                            <video id="cameraPreview" autoplay playsinline></video>
                            <canvas id="cameraCanvas" hidden></canvas>
                            <div class="camera-overlay">
                                <div class="camera-frame"></div>
                                <div class="camera-guide">
                                    <p>将文档或图片置于框内</p>
                                </div>
                            </div>
                        </div>
                        <div class="camera-controls" style="display: none;">
                            <button id="captureBtn" class="btn btn-primary btn-large">
                                <i class="fas fa-camera"></i> 拍照搜索
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
         * @param {string} [deviceId] - 相机设备ID
         */
        openCamera: function(deviceId) {
            // 获取相机预览元素和状态容器
            const preview = document.getElementById('cameraPreview');
            const cameraContainer = document.querySelector('.camera-container');
            const cameraControls = document.querySelector('.camera-controls');
            const cameraStatus = document.getElementById('cameraStatus');
            const loadingStatus = cameraStatus.querySelector('.status-loading');
            const errorStatus = cameraStatus.querySelector('.status-error');
            
            // 如果元素不存在，直接返回
            if (!preview || !cameraStatus) return;
            
            // 显示加载状态，隐藏错误状态
            loadingStatus.style.display = 'flex';
            errorStatus.style.display = 'none';
            cameraContainer.style.display = 'none';
            cameraControls.style.display = 'none';
            
            // 检查浏览器是否支持getUserMedia
            if (!this.checkCameraSupport()) {
                this.showCameraError('您的浏览器不支持拍照功能');
                if (typeof APP.showNotification === 'function') {
                    APP.showNotification('您的浏览器不支持拍照功能', 'error');
                }
                return;
            }
            
            // 构建相机约束
            const constraints = {
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                },
                audio: false
            };
            
            // 如果指定了设备ID，使用该设备
            if (deviceId) {
                constraints.video.deviceId = { exact: deviceId };
            } else {
                // 否则使用后置相机（如果可用）
                constraints.video.facingMode = { ideal: 'environment' };
            }
            
            // 关闭之前的相机流
            this.closeCamera();
            
            // 获取相机权限
            navigator.mediaDevices.getUserMedia(constraints)
                .then(stream => {
                    // 保存相机流
                    this.stream = stream;
                    
                    // 保存当前设备ID
                    const videoTrack = stream.getVideoTracks()[0];
                    if (videoTrack) {
                        const settings = videoTrack.getSettings();
                        this.currentDeviceId = settings.deviceId;
                    }
                    
                    // 设置预览源
                    preview.srcObject = stream;
                    
                    // 显示相机界面，隐藏状态
                    loadingStatus.style.display = 'none';
                    cameraContainer.style.display = 'block';
                    cameraControls.style.display = 'flex';
                    
                    // 更新切换相机按钮状态
                    this.updateSwitchCameraButton();
                })
                .catch(error => {
                    console.error('获取相机权限失败:', error);
                    this.showCameraError('获取相机权限失败');
                    
                    if (typeof APP.showNotification === 'function') {
                        APP.showNotification('获取相机权限失败', 'error');
                    }
                });
        },
        
        /**
         * 显示相机错误状态
         * @param {string} message - 错误消息
         */
        showCameraError: function(message) {
            const cameraStatus = document.getElementById('cameraStatus');
            const loadingStatus = cameraStatus.querySelector('.status-loading');
            const errorStatus = cameraStatus.querySelector('.status-error');
            
            loadingStatus.style.display = 'none';
            errorStatus.style.display = 'flex';
            
            if (message) {
                const errorMessage = errorStatus.querySelector('span');
                if (errorMessage) {
                    errorMessage.textContent = message;
                }
            }
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
            // 如果没有找到多个相机设备，直接返回
            if (this.devices.length <= 1) {
                if (typeof APP.showNotification === 'function') {
                    APP.showNotification('没有可用的其他相机设备', 'warning');
                }
                return;
            }
            
            // 找到当前设备的索引
            const currentIndex = this.devices.findIndex(device => device.deviceId === this.currentDeviceId);
            
            // 计算下一个设备的索引
            const nextIndex = (currentIndex + 1) % this.devices.length;
            
            // 获取下一个设备的ID
            const nextDeviceId = this.devices[nextIndex].deviceId;
            
            // 打开下一个相机
            this.openCamera(nextDeviceId);
        },
        
        /**
         * 更新切换相机按钮状态
         */
        updateSwitchCameraButton: function() {
            // 获取切换相机按钮
            const switchCameraBtn = document.getElementById('switchCameraBtn');
            
            // 如果按钮不存在，直接返回
            if (!switchCameraBtn) return;
            
            // 如果只有一个相机设备，禁用按钮
            if (this.devices.length <= 1) {
                switchCameraBtn.disabled = true;
                switchCameraBtn.classList.add('disabled');
            } else {
                switchCameraBtn.disabled = false;
                switchCameraBtn.classList.remove('disabled');
            }
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
})();
/**
 * Easy CityU - 学术资源管理平台
 * 论坛上传模块 - 处理论坛文件上传功能
 * 版本: 1.0.0
 * 日期: 2025/09/07
 */

// 立即执行函数表达式(IIFE)创建独立作用域
(function() {
    'use strict';
    
    // 全局命名空间
    window.APP = window.APP || {};
    
    // 论坛上传模块
    APP.ForumUpload = {
        // 已选择的文件
        selectedFiles: [],
        
        // 最大文件大小（字节）
        maxFileSize: 50 * 1024 * 1024, // 50MB
        
        // 允许的文件类型
        allowedFileTypes: ['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.txt', '.jpg', '.png'],
        
        /**
         * 初始化论坛上传模块
         */
        init: function() {
            // 绑定事件
            this.bindUploadEvents();
            this.bindFormEvents();
            
            console.log('论坛上传模块初始化完成');
        },
        
        /**
         * 绑定文件上传事件
         */
        bindUploadEvents: function() {
            // 获取上传区域元素
            const uploadArea = document.getElementById('uploadArea');
            const fileInput = document.getElementById('fileInput');
            const selectFilesBtn = document.getElementById('selectFilesBtn');
            
            // 如果元素不存在，直接返回
            if (!uploadArea || !fileInput) return;
            
            // 绑定拖放事件
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.stopPropagation();
                uploadArea.classList.add('drag-over');
            });
            
            uploadArea.addEventListener('dragleave', (e) => {
                e.preventDefault();
                e.stopPropagation();
                uploadArea.classList.remove('drag-over');
            });
            
            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                e.stopPropagation();
                uploadArea.classList.remove('drag-over');
                
                // 处理拖放的文件
                if (e.dataTransfer && e.dataTransfer.files) {
                    this.handleFiles(e.dataTransfer.files);
                }
            });
            
            // 绑定点击上传区域事件
            uploadArea.addEventListener('click', () => {
                // 触发文件输入框点击
                if (fileInput) {
                    fileInput.click();
                }
            });
            
            // 绑定选择文件按钮事件
            if (selectFilesBtn) {
                selectFilesBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // 触发文件输入框点击
                    if (fileInput) {
                        fileInput.click();
                    }
                });
            }
            
            // 绑定文件输入框变化事件
            if (fileInput) {
                fileInput.addEventListener('change', () => {
                    // 处理选择的文件
                    if (fileInput.files) {
                        this.handleFiles(fileInput.files);
                    }
                });
            }
        },
        
        /**
         * 绑定表单提交事件
         */
        bindFormEvents: function() {
            // 获取表单元素
            const fileInfoForm = document.getElementById('fileInfoForm');
            
            // 如果表单不存在，直接返回
            if (!fileInfoForm) return;
            
            // 绑定表单提交事件
            fileInfoForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // 验证表单
                if (this.validateForm()) {
                    // 提交表单
                    this.submitForm();
                }
            });
        },
        
        /**
         * 处理文件
         * @param {FileList} files - 文件列表
         */
        handleFiles: function(files) {
            // 清空已选择的文件
            this.selectedFiles = [];
            
            // 处理每个文件
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                
                // 验证文件类型
                if (!this.validateFileType(file)) {
                    this.showNotification(`不支持的文件类型: ${file.name}`, 'error');
                    continue;
                }
                
                // 验证文件大小
                if (!this.validateFileSize(file)) {
                    this.showNotification(`文件过大: ${file.name}`, 'error');
                    continue;
                }
                
                // 添加到已选择的文件
                this.selectedFiles.push(file);
            }
            
            // 更新上传区域
            this.updateUploadArea();
        },
        
        /**
         * 验证文件类型
         * @param {File} file - 文件对象
         * @returns {boolean} - 是否为允许的文件类型
         */
        validateFileType: function(file) {
            // 获取文件扩展名
            const extension = '.' + file.name.split('.').pop().toLowerCase();
            
            // 检查是否为允许的文件类型
            return this.allowedFileTypes.includes(extension);
        },
        
        /**
         * 验证文件大小
         * @param {File} file - 文件对象
         * @returns {boolean} - 是否小于最大文件大小
         */
        validateFileSize: function(file) {
            return file.size <= this.maxFileSize;
        },
        
        /**
         * 更新上传区域
         */
        updateUploadArea: function() {
            // 获取上传区域元素
            const uploadArea = document.getElementById('uploadArea');
            
            // 如果元素不存在，直接返回
            if (!uploadArea) return;
            
            // 如果没有选择文件，显示默认状态
            if (this.selectedFiles.length === 0) {
                uploadArea.innerHTML = `
                    <div class="upload-icon">
                        <i class="fas fa-cloud-upload-alt"></i>
                    </div>
                    <p data-translate="drag_drop_files">拖拽文件到此处或点击上传</p>
                    <input type="file" id="fileInput" multiple hidden>
                    <button class="btn btn-outline" id="selectFilesBtn" data-translate="select_files">选择文件</button>
                `;
                
                // 重新绑定事件
                this.bindUploadEvents();
                
                // 更新翻译
                if (APP.Language && typeof APP.Language.updateTextElements === 'function') {
                    APP.Language.updateTextElements();
                }
                
                return;
            }
            
            // 显示已选择的文件
            let fileListHTML = '<div class="selected-files">';
            
            // 添加文件列表标题
            fileListHTML += '<h3>已选择的文件</h3>';
            
            // 添加文件列表
            fileListHTML += '<ul class="file-list">';
            
            this.selectedFiles.forEach((file, index) => {
                fileListHTML += `
                    <li class="file-item">
                        <div class="file-icon">
                            <i class="${this.getFileIcon(file)}"></i>
                        </div>
                        <div class="file-info">
                            <div class="file-name">${file.name}</div>
                            <div class="file-size">${this.formatFileSize(file.size)}</div>
                        </div>
                        <button class="file-remove" data-index="${index}">
                            <i class="fas fa-times"></i>
                        </button>
                    </li>
                `;
            });
            
            fileListHTML += '</ul>';
            
            // 添加重新选择按钮
            fileListHTML += `
                <div class="file-actions">
                    <button class="btn btn-outline" id="selectFilesBtn">
                        <i class="fas fa-plus"></i> 添加更多文件
                    </button>
                    <button class="btn btn-outline" id="clearFilesBtn">
                        <i class="fas fa-trash"></i> 清空文件
                    </button>
                </div>
            `;
            
            fileListHTML += '</div>';
            
            // 更新上传区域内容
            uploadArea.innerHTML = fileListHTML;
            
            // 重新绑定文件输入框
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.id = 'fileInput';
            fileInput.multiple = true;
            fileInput.hidden = true;
            uploadArea.appendChild(fileInput);
            
            // 绑定选择文件按钮事件
            const selectFilesBtn = document.getElementById('selectFilesBtn');
            if (selectFilesBtn) {
                selectFilesBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // 触发文件输入框点击
                    if (fileInput) {
                        fileInput.click();
                    }
                });
            }
            
            // 绑定清空文件按钮事件
            const clearFilesBtn = document.getElementById('clearFilesBtn');
            if (clearFilesBtn) {
                clearFilesBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // 清空已选择的文件
                    this.selectedFiles = [];
                    
                    // 更新上传区域
                    this.updateUploadArea();
                });
            }
            
            // 绑定文件输入框变化事件
            if (fileInput) {
                fileInput.addEventListener('change', () => {
                    // 处理选择的文件
                    if (fileInput.files) {
                        this.handleFiles(fileInput.files);
                    }
                });
            }
            
            // 绑定移除文件按钮事件
            const removeButtons = document.querySelectorAll('.file-remove');
            if (removeButtons) {
                removeButtons.forEach(button => {
                    button.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // 获取文件索引
                        const index = parseInt(button.getAttribute('data-index'));
                        
                        // 移除文件
                        this.selectedFiles.splice(index, 1);
                        
                        // 更新上传区域
                        this.updateUploadArea();
                    });
                });
            }
        },
        
        /**
         * 获取文件图标
         * @param {File} file - 文件对象
         * @returns {string} - 图标类名
         */
        getFileIcon: function(file) {
            // 获取文件扩展名
            const extension = file.name.split('.').pop().toLowerCase();
            
            // 根据文件类型返回图标
            switch (extension) {
                case 'pdf':
                    return 'fas fa-file-pdf';
                case 'doc':
                case 'docx':
                    return 'fas fa-file-word';
                case 'ppt':
                case 'pptx':
                    return 'fas fa-file-powerpoint';
                case 'txt':
                    return 'fas fa-file-alt';
                case 'jpg':
                case 'jpeg':
                case 'png':
                case 'gif':
                    return 'fas fa-file-image';
                default:
                    return 'fas fa-file';
            }
        },
        
        /**
         * 格式化文件大小
         * @param {number} size - 文件大小（字节）
         * @returns {string} - 格式化后的文件大小
         */
        formatFileSize: function(size) {
            if (size < 1024) {
                return size + ' B';
            } else if (size < 1024 * 1024) {
                return (size / 1024).toFixed(2) + ' KB';
            } else if (size < 1024 * 1024 * 1024) {
                return (size / (1024 * 1024)).toFixed(2) + ' MB';
            } else {
                return (size / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
            }
        },
        
        /**
         * 验证表单
         * @returns {boolean} - 表单是否有效
         */
        validateForm: function() {
            // 如果没有选择文件，显示错误
            if (this.selectedFiles.length === 0) {
                this.showNotification('请选择要上传的文件', 'error');
                return false;
            }
            
            // 获取表单字段
            const courseName = document.getElementById('courseName');
            const fileType = document.getElementById('fileType');
            const college = document.getElementById('college');
            const difficulty = document.getElementById('difficulty');
            
            // 验证必填字段
            if (!courseName || !courseName.value.trim()) {
                this.showNotification('请输入课程名称', 'error');
                if (courseName) courseName.focus();
                return false;
            }
            
            if (!fileType || fileType.value === '') {
                this.showNotification('请选择文件类型', 'error');
                if (fileType) fileType.focus();
                return false;
            }
            
            if (!college || college.value === '') {
                this.showNotification('请选择学院', 'error');
                if (college) college.focus();
                return false;
            }
            
            if (!difficulty || difficulty.value === '') {
                this.showNotification('请选择难度等级', 'error');
                if (difficulty) difficulty.focus();
                return false;
            }
            
            return true;
        },
        
        /**
         * 提交表单
         */
        submitForm: function() {
            // 获取表单数据
            const formData = this.getFormData();
            
            // 显示加载状态
            this.showNotification('正在上传文件...', 'info');
            
            // 模拟API请求
            setTimeout(() => {
                // 模拟上传成功
                console.log('文件上传成功:', formData);
                
                // 显示成功通知
                this.showNotification('文件上传成功', 'success');
                
                // 重置表单
                this.resetForm();
                
                // 切换到最新帖子标签
                if (APP.ForumBase) {
                    APP.ForumBase.switchTab('recent');
                }
            }, 2000);
        },
        
        /**
         * 获取表单数据
         * @returns {Object} - 表单数据对象
         */
        getFormData: function() {
            // 获取表单字段
            const courseName = document.getElementById('courseName');
            const fileType = document.getElementById('fileType');
            const college = document.getElementById('college');
            const difficulty = document.getElementById('difficulty');
            const description = document.getElementById('description');
            const tags = document.getElementById('tags');
            
            // 构建表单数据对象
            const formData = {
                files: this.selectedFiles,
                courseName: courseName ? courseName.value : '',
                fileType: fileType ? fileType.value : '',
                college: college ? college.value : '',
                difficulty: difficulty ? difficulty.value : '',
                description: description ? description.value : '',
                tags: tags ? tags.value.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
                uploadTime: new Date().toISOString()
            };
            
            return formData;
        },
        
        /**
         * 重置表单
         */
        resetForm: function() {
            // 清空已选择的文件
            this.selectedFiles = [];
            
            // 更新上传区域
            this.updateUploadArea();
            
            // 重置表单字段
            const fileInfoForm = document.getElementById('fileInfoForm');
            if (fileInfoForm) {
                fileInfoForm.reset();
            }
        },
        
        /**
         * 显示通知
         * @param {string} message - 通知消息
         * @param {string} type - 通知类型（success, error, warning, info）
         */
        showNotification: function(message, type) {
            // 如果APP.showNotification函数存在，使用它显示通知
            if (typeof APP.showNotification === 'function') {
                APP.showNotification(message, type);
            } else {
                // 否则使用console
                switch (type) {
                    case 'error':
                        console.error(message);
                        break;
                    case 'warning':
                        console.warn(message);
                        break;
                    case 'info':
                        console.info(message);
                        break;
                    default:
                        console.log(message);
                }
            }
        }
    };
})();
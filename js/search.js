/**
 * Easy CityU - 学术资源管理平台
 * 搜索模块 - 处理网站的搜索功能，包括文本搜索和拍照搜索
 * 版本: 1.0.0
 * 日期: 2025/09/07
 */

// 立即执行函数表达式(IIFE)创建独立作用域
(function() {
    'use strict';
    
    // 全局命名空间
    window.APP = window.APP || {};
    
    // 搜索模块
    APP.Search = {
        // 搜索历史
        searchHistory: [],
        
        // 搜索建议缓存
        suggestionCache: {},
        
        // 搜索建议请求定时器
        suggestionTimer: null,
        
        // 搜索建议请求延迟（毫秒）
        suggestionDelay: 300,
        
        // 最大搜索历史记录数
        maxHistoryItems: 10,
        
        /**
         * 初始化搜索模块
         */
        init: function() {
            // 从本地存储加载搜索历史
            this.loadSearchHistory();
            
            // 绑定事件
            this.bindEvents();
            
            console.log('搜索模块初始化完成');
        },
        
        /**
         * 绑定事件
         */
        bindEvents: function() {
            // 获取搜索元素
            const searchInput = APP.Utils.getElement('#mainSearch');
            const searchBtn = APP.Utils.getElement('#searchBtn');
            const photoSearchBtn = APP.Utils.getElement('#photoSearchBtn');
            const searchSuggestions = APP.Utils.getElement('#searchSuggestions');
            
            // 绑定搜索输入框事件
            if (searchInput) {
                // 输入事件
                APP.Utils.addEvent(searchInput, 'input', APP.Utils.debounce((e) => {
                    const query = e.target.value.trim();
                    
                    if (query.length > 1) {
                        // 获取搜索建议
                        this.getSuggestions(query);
                    } else {
                        // 隐藏搜索建议
                        this.hideSuggestions();
                    }
                }, this.suggestionDelay));
                
                // 聚焦事件
                APP.Utils.addEvent(searchInput, 'focus', () => {
                    const query = searchInput.value.trim();
                    
                    if (query.length > 1) {
                        // 显示搜索建议
                        this.getSuggestions(query);
                    } else if (this.searchHistory.length > 0) {
                        // 显示搜索历史
                        this.showSearchHistory();
                    }
                });
                
                // 按键事件
                APP.Utils.addEvent(searchInput, 'keydown', (e) => {
                    // 回车键执行搜索
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        this.performSearch(searchInput.value.trim());
                    }
                    
                    // Esc键隐藏搜索建议
                    if (e.key === 'Escape') {
                        this.hideSuggestions();
                    }
                });
            }
            
            // 绑定搜索按钮事件
            if (searchBtn && searchInput) {
                APP.Utils.addEvent(searchBtn, 'click', (e) => {
                    e.preventDefault();
                    this.performSearch(searchInput.value.trim());
                });
            }
            
            // 绑定拍照搜索按钮事件
            if (photoSearchBtn) {
                APP.Utils.addEvent(photoSearchBtn, 'click', (e) => {
                    e.preventDefault();
                    
                    // 如果相机模块存在，打开拍照搜索
                    if (APP.Camera && typeof APP.Camera.openPhotoSearch === 'function') {
                        APP.Camera.openPhotoSearch();
                    }
                });
            }
            
            // 绑定点击文档其他区域隐藏搜索建议
            APP.Utils.addEvent(document, 'click', (e) => {
                if (searchInput && searchSuggestions && 
                    !searchInput.contains(e.target) && 
                    !searchSuggestions.contains(e.target)) {
                    this.hideSuggestions();
                }
            });
        },
        
        /**
         * 执行搜索
         * @param {string} query - 搜索关键词
         */
        performSearch: function(query) {
            // 如果搜索关键词为空，直接返回
            if (!query) return;
            
            // 添加到搜索历史
            this.addToSearchHistory(query);
            
            // 隐藏搜索建议
            this.hideSuggestions();
            
            // 检查是否是课程编号格式 (如 CS1215, CS1315)
            const courseCodePattern = /^[A-Z]{2,4}\d{4}$/i;
            if (courseCodePattern.test(query.trim())) {
                const courseCode = query.trim().toUpperCase();
                this.searchByCourseCode(courseCode);
                return;
            }
            
            // 跳转到香港城市大学搜索页面
            const cityuSearchUrl = `https://www.cityu.edu.hk/cityusearch/Default.aspx?q=${encodeURIComponent(query)}&hq=&submit=Search`;
            window.open(cityuSearchUrl, '_blank');
            
            // 显示搜索跳转提示
            this.showSearchJumpMessage(query);
        },
        
        /**
         * 根据课程编号搜索并跳转到笔记页面
         * @param {string} courseCode - 课程编号
         */
        searchByCourseCode: function(courseCode) {
            // 课程编号到笔记页面的映射
            const courseNoteMap = {
                'CS1315': 'note-cs1315.html',
                'CS1215': 'note-cs1215.html'
            };
            
            if (courseNoteMap[courseCode]) {
                // 直接跳转到笔记页面
                window.open(courseNoteMap[courseCode], '_blank');
                
                // 显示跳转提示
                this.showCourseJumpMessage(courseCode);
            } else {
                // 如果没有对应的笔记页面，执行普通搜索
                if (APP.Resources && typeof APP.Resources.searchResources === 'function') {
                    APP.Resources.searchResources(courseCode);
                    
                    // 滚动到资源区域
                    const resourcesSection = document.getElementById('resources');
                    if (resourcesSection) {
                        resourcesSection.scrollIntoView({ behavior: 'smooth' });
                    }
                    
                    // 显示搜索提示
                    this.showCourseSearchMessage(courseCode);
                }
            }
        },
        
        /**
         * 显示课程跳转提示
         * @param {string} courseCode - 课程编号
         */
        showCourseJumpMessage: function(courseCode) {
            // 创建提示消息
            const message = document.createElement('div');
            message.className = 'course-jump-message';
            message.innerHTML = `
                <div class="jump-message-content">
                    <i class="fas fa-external-link-alt"></i>
                    <span>已为您打开 ${courseCode} 课程笔记页面</span>
                </div>
            `;
            
            // 添加样式
            message.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #4CAF50, #45a049);
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 10000;
                animation: slideInRight 0.5s ease;
            `;
            
            // 添加到页面
            document.body.appendChild(message);
            
            // 3秒后自动移除
            setTimeout(() => {
                if (message.parentNode) {
                    message.remove();
                }
            }, 3000);
        },
        
        /**
         * 显示课程搜索提示
         * @param {string} courseCode - 课程编号
         */
        showCourseSearchMessage: function(courseCode) {
            // 创建提示消息
            const message = document.createElement('div');
            message.className = 'course-search-message';
            message.innerHTML = `
                <div class="search-message-content">
                    <i class="fas fa-search"></i>
                    <span>正在搜索 ${courseCode} 相关资源...</span>
                </div>
            `;
            
            // 添加样式
            message.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #2196F3, #1976D2);
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 10000;
                animation: slideInRight 0.5s ease;
            `;
            
            // 添加到页面
            document.body.appendChild(message);
            
            // 2秒后自动移除
            setTimeout(() => {
                if (message.parentNode) {
                    message.remove();
                }
            }, 2000);
        },
        
        /**
         * 显示搜索跳转提示
         * @param {string} query - 搜索关键词
         */
        showSearchJumpMessage: function(query) {
            // 创建提示消息
            const message = document.createElement('div');
            message.className = 'search-jump-message';
            message.innerHTML = `
                <div class="jump-message-content">
                    <i class="fas fa-external-link-alt"></i>
                    <span>已为您跳转到CityU搜索页面搜索"${query}"</span>
                </div>
            `;
            
            // 添加样式
            message.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #FF9800, #F57C00);
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 10000;
                animation: slideInRight 0.5s ease;
                max-width: 350px;
            `;
            
            // 添加到页面
            document.body.appendChild(message);
            
            // 3秒后自动移除
            setTimeout(() => {
                if (message.parentNode) {
                    message.remove();
                }
            }, 3000);
        },
        
        /**
         * 构建搜索URL
         * @param {string} query - 搜索关键词
         * @returns {string} - 搜索URL
         */
        buildSearchUrl: function(query) {
            // 获取当前筛选器值
            const degreeFilter = APP.Utils.getElement('#degreeFilter');
            const fieldFilter = APP.Utils.getElement('#fieldFilter');
            const yearFilter = APP.Utils.getElement('#yearFilter');
            
            // 构建URL参数
            const params = new URLSearchParams();
            params.append('q', query);
            
            // 添加筛选器参数
            if (degreeFilter && degreeFilter.value !== 'all') {
                params.append('degree', degreeFilter.value);
            }
            
            if (fieldFilter && fieldFilter.value !== 'all') {
                params.append('field', fieldFilter.value);
            }
            
            if (yearFilter && yearFilter.value !== 'all') {
                params.append('year', yearFilter.value);
            }
            
            // 返回搜索URL
            return `#resources?${params.toString()}`;
        },
        
        /**
         * 获取搜索建议
         * @param {string} query - 搜索关键词
         */
        getSuggestions: function(query) {
            // 如果有缓存的建议，直接使用
            if (this.suggestionCache[query]) {
                this.showSuggestions(this.suggestionCache[query], query);
                return;
            }
            
            // 清除之前的定时器
            if (this.suggestionTimer) {
                clearTimeout(this.suggestionTimer);
            }
            
            // 设置新的定时器
            this.suggestionTimer = setTimeout(() => {
                // 模拟API请求
                this.fetchSuggestions(query)
                    .then(suggestions => {
                        // 缓存建议
                        this.suggestionCache[query] = suggestions;
                        
                        // 显示建议
                        this.showSuggestions(suggestions, query);
                    })
                    .catch(error => {
                        console.error('获取搜索建议失败:', error);
                        
                        // 显示搜索历史作为回退
                        this.showSearchHistory();
                    });
            }, this.suggestionDelay);
        },
        
        /**
         * 模拟获取搜索建议的API请求
         * @param {string} query - 搜索关键词
         * @returns {Promise<Array>} - 搜索建议数组
         */
        fetchSuggestions: function(query) {
            return new Promise((resolve) => {
                // 模拟API延迟
                setTimeout(() => {
                    // 模拟搜索建议数据
                    const suggestions = [
                        `${query} 课程`,
                        `${query} 笔记`,
                        `${query} 作业`,
                        `${query} 试题`,
                        `${query} 项目`
                    ];
                    
                    resolve(suggestions);
                }, 200);
            });
        },
        
        /**
         * 显示搜索建议
         * @param {Array} suggestions - 搜索建议数组
         * @param {string} query - 搜索关键词
         */
        showSuggestions: function(suggestions, query) {
            const searchSuggestions = APP.Utils.getElement('#searchSuggestions');
            
            if (!searchSuggestions) return;
            
            // 清空搜索建议容器
            searchSuggestions.innerHTML = '';
            
            // 如果没有建议，隐藏容器
            if (!suggestions || suggestions.length === 0) {
                APP.Utils.toggleClass(searchSuggestions, 'active', false);
                return;
            }
            
            // 创建建议项
            suggestions.forEach(suggestion => {
                const item = document.createElement('div');
                item.className = 'suggestion-item';
                
                // 高亮匹配的关键词
                const highlightedText = this.highlightQuery(suggestion, query);
                item.innerHTML = highlightedText;
                
                // 添加点击事件
                APP.Utils.addEvent(item, 'click', () => {
                    // 执行搜索
                    this.performSearch(suggestion);
                });
                
                // 添加到容器
                searchSuggestions.appendChild(item);
            });
            
            // 显示搜索建议容器
            APP.Utils.toggleClass(searchSuggestions, 'active', true);
        },
        
        /**
         * 显示搜索历史
         */
        showSearchHistory: function() {
            const searchSuggestions = APP.Utils.getElement('#searchSuggestions');
            
            if (!searchSuggestions) return;
            
            // 清空搜索建议容器
            searchSuggestions.innerHTML = '';
            
            // 如果没有搜索历史，隐藏容器
            if (this.searchHistory.length === 0) {
                APP.Utils.toggleClass(searchSuggestions, 'active', false);
                return;
            }
            
            // 创建历史记录标题
            const title = document.createElement('div');
            title.className = 'suggestion-title';
            title.textContent = APP.Language ? APP.Language.getTranslation('search_history') : '搜索历史';
            searchSuggestions.appendChild(title);
            
            // 创建历史记录项
            this.searchHistory.forEach(item => {
                const historyItem = document.createElement('div');
                historyItem.className = 'suggestion-item';
                
                // 创建历史记录图标
                const icon = document.createElement('i');
                icon.className = 'fas fa-history';
                historyItem.appendChild(icon);
                
                // 创建历史记录文本
                const text = document.createElement('span');
                text.textContent = ` ${item}`;
                historyItem.appendChild(text);
                
                // 添加点击事件
                APP.Utils.addEvent(historyItem, 'click', () => {
                    // 执行搜索
                    this.performSearch(item);
                });
                
                // 添加到容器
                searchSuggestions.appendChild(historyItem);
            });
            
            // 创建清除历史按钮
            const clearBtn = document.createElement('div');
            clearBtn.className = 'suggestion-clear';
            clearBtn.textContent = APP.Language ? APP.Language.getTranslation('clear_history') : '清除历史';
            
            // 添加点击事件
            APP.Utils.addEvent(clearBtn, 'click', (e) => {
                e.stopPropagation();
                this.clearSearchHistory();
                this.hideSuggestions();
            });
            
            // 添加到容器
            searchSuggestions.appendChild(clearBtn);
            
            // 显示搜索建议容器
            APP.Utils.toggleClass(searchSuggestions, 'active', true);
        },
        
        /**
         * 隐藏搜索建议
         */
        hideSuggestions: function() {
            const searchSuggestions = APP.Utils.getElement('#searchSuggestions');
            
            if (searchSuggestions) {
                APP.Utils.toggleClass(searchSuggestions, 'active', false);
            }
        },
        
        /**
         * 高亮搜索关键词
         * @param {string} text - 原始文本
         * @param {string} query - 搜索关键词
         * @returns {string} - 高亮后的HTML
         */
        highlightQuery: function(text, query) {
            if (!query) return text;
            
            try {
                // 转义正则表达式特殊字符
                const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                
                // 创建正则表达式
                const regex = new RegExp(`(${escapedQuery})`, 'gi');
                
                // 替换匹配的文本
                return text.replace(regex, '<strong>$1</strong>');
            } catch (error) {
                console.error('高亮搜索关键词失败:', error);
                return text;
            }
        },
        
        /**
         * 加载搜索历史
         */
        loadSearchHistory: function() {
            // 从本地存储获取搜索历史
            const history = APP.Utils.getLocalStorage('searchHistory', []);
            
            // 验证搜索历史格式
            if (Array.isArray(history)) {
                this.searchHistory = history;
            } else {
                this.searchHistory = [];
            }
        },
        
        /**
         * 添加到搜索历史
         * @param {string} query - 搜索关键词
         */
        addToSearchHistory: function(query) {
            // 如果关键词为空，直接返回
            if (!query) return;
            
            // 移除相同的历史记录
            this.searchHistory = this.searchHistory.filter(item => item !== query);
            
            // 添加到历史记录开头
            this.searchHistory.unshift(query);
            
            // 限制历史记录数量
            if (this.searchHistory.length > this.maxHistoryItems) {
                this.searchHistory = this.searchHistory.slice(0, this.maxHistoryItems);
            }
            
            // 保存到本地存储
            this.saveSearchHistory();
        },
        
        /**
         * 清除搜索历史
         */
        clearSearchHistory: function() {
            // 清空搜索历史
            this.searchHistory = [];
            
            // 保存到本地存储
            this.saveSearchHistory();
        },
        
        /**
         * 保存搜索历史
         */
        saveSearchHistory: function() {
            // 保存到本地存储
            APP.Utils.setLocalStorage('searchHistory', this.searchHistory);
        },
        
        /**
         * 处理拍照搜索结果
         * @param {string} imageData - 图片数据（Base64）
         */
        handlePhotoSearchResult: function(imageData) {
            // 显示图像处理状态
            this.showImageProcessingState();
            
            // 模拟图像识别和搜索
            console.log('处理拍照搜索结果...');
            
            // 显示加载状态
            if (typeof APP.showNotification === 'function') {
                APP.showNotification(
                    APP.Language ? APP.Language.getTranslation('processing_image') : '正在分析图像内容...',
                    'info'
                );
            }
            
            // 模拟API延迟
            setTimeout(() => {
                // 模拟识别结果 - 随机选择一些常见的课程
                const coursePatterns = [
                    'CS1315 程序设计基础',
                    'CS1215 计算机科学导论', 
                    'CS3103 数据结构与算法',
                    'MA1200 线性代数',
                    'EN2101 学术英语',
                    'PHY1201 大学物理',
                    'EE3107 电路分析',
                    'BU3101 管理学原理'
                ];
                
                const recognizedText = coursePatterns[Math.floor(Math.random() * coursePatterns.length)];
                
                // 显示识别结果
                this.showImageRecognitionResult(recognizedText, imageData);
                
                // 自动执行搜索
                this.performSearch(recognizedText);
            }, 2000);
        },
        
        /**
         * 显示图像处理状态
         */
        showImageProcessingState: function() {
            // 创建处理状态模态框
            const modal = document.createElement('div');
            modal.className = 'modal image-processing-modal';
            modal.id = 'imageProcessingModal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-cog fa-spin"></i> 图像分析中</h3>
                    </div>
                    <div class="modal-body">
                        <div class="processing-content">
                            <div class="processing-spinner">
                                <i class="fas fa-spinner fa-spin"></i>
                            </div>
                            <div class="processing-text">
                                <p>正在分析图像内容...</p>
                                <p class="processing-subtext">识别课程代码、文档内容</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // 添加到文档
            document.body.appendChild(modal);
            
            // 显示模态框
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            
            // 保存模态框引用
            this.imageProcessingModal = modal;
        },
        
        /**
         * 显示图像识别结果
         * @param {string} recognizedText - 识别出的文本
         * @param {string} imageData - 原始图像数据
         */
        showImageRecognitionResult: function(recognizedText, imageData) {
            // 移除处理状态模态框
            if (this.imageProcessingModal) {
                this.imageProcessingModal.classList.remove('active');
                setTimeout(() => {
                    if (this.imageProcessingModal.parentNode) {
                        this.imageProcessingModal.parentNode.removeChild(this.imageProcessingModal);
                    }
                }, 300);
            }
            
            // 创建识别结果模态框
            const modal = document.createElement('div');
            modal.className = 'modal image-result-modal';
            modal.id = 'imageResultModal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-check-circle"></i> 图像识别完成</h3>
                        <button class="modal-close" aria-label="关闭">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="recognition-result">
                            <div class="result-image">
                                <img src="${imageData}" alt="识别图像" />
                                <div class="image-overlay">
                                    <i class="fas fa-search"></i>
                                </div>
                            </div>
                            <div class="result-content">
                                <h4>识别内容：</h4>
                                <div class="recognized-text">
                                    <i class="fas fa-quote-left"></i>
                                    <span>${recognizedText}</span>
                                    <i class="fas fa-quote-right"></i>
                                </div>
                                <div class="result-actions">
                                    <button class="btn btn-primary" id="searchRecognizedText">
                                        <i class="fas fa-search"></i> 搜索识别内容
                                    </button>
                                    <button class="btn btn-outline" id="retakePhoto">
                                        <i class="fas fa-camera"></i> 重新拍照
                                    </button>
                                </div>
                            </div>
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
                    modal.classList.remove('active');
                    setTimeout(() => {
                        if (modal.parentNode) {
                            modal.parentNode.removeChild(modal);
                        }
                    }, 300);
                });
            }
            
            // 绑定搜索按钮事件
            const searchBtn = document.getElementById('searchRecognizedText');
            if (searchBtn) {
                searchBtn.addEventListener('click', () => {
                    this.performSearch(recognizedText);
                    modal.classList.remove('active');
                    setTimeout(() => {
                        if (modal.parentNode) {
                            modal.parentNode.removeChild(modal);
                        }
                    }, 300);
                });
            }
            
            // 绑定重新拍照按钮事件
            const retakeBtn = document.getElementById('retakePhoto');
            if (retakeBtn) {
                retakeBtn.addEventListener('click', () => {
                    modal.classList.remove('active');
                    setTimeout(() => {
                        if (modal.parentNode) {
                            modal.parentNode.removeChild(modal);
                        }
                        // 重新打开相机
                        if (APP.Camera && typeof APP.Camera.openPhotoSearch === 'function') {
                            APP.Camera.openPhotoSearch();
                        }
                    }, 300);
                });
            }
            
            // 显示模态框
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        }
    };
})();
 /**
 * Easy CityU - 学术资源管理平台
 * 资源模块 - 处理资源浏览和筛选功能
 * 版本: 1.0.0
 * 日期: 2025/09/07
 */

// 立即执行函数表达式(IIFE)创建独立作用域
(function() {
    'use strict';
    
    // 全局命名空间
    window.APP = window.APP || {};
    
    // 资源模块
    APP.Resources = {
        // 资源数据
        data: [],
        
        // 当前筛选条件
        filters: {
            college: 'all',
            courseType: 'all',
            difficulty: 'all',
            degree: 'all',
            field: 'all',
            year: 'all'
        },
        
        // 分页设置
        pagination: {
            currentPage: 1,
            itemsPerPage: 12,
            totalPages: 1
        },
        
        /**
         * 初始化资源模块
         */
        init: function() {
            // 加载示例资源数据
            this.loadSampleData();
            
            // 绑定筛选器事件
            this.bindFilterEvents();
            
            // 初始渲染资源
            this.renderResources();
            
            console.log('资源模块初始化完成');
        },
        
        /**
         * 加载示例资源数据
         */
        loadSampleData: function() {
            // 示例资源数据
            this.data = [
                {
                    id: 1,
                    title: '计算机科学导论',
                    type: 'notes',
                    college: 'engineering',
                    difficulty: 'beginner',
                    degree: 'bachelor',
                    field: 'engineering',
                    year: '2025',
                    author: '张同学',
                    uploadDate: '2025-08-15',
                    downloads: 128,
                    rating: 4.8,
                    description: 'CS1315计算机程序设计导论课程笔记，涵盖编程概念、算法基础和面向对象编程。',
                    tags: ['计算机科学', '导论', '算法', '数据结构', 'C++', '编程'],
                    fileType: 'pdf',
                    fileSize: '2.5MB',
                    resourceNumber: 'CS1315-001',
                    noteUrl: 'note-cs1315.html',
                    searchableContent: 'This document outlines the syllabus for CS1315: Introduction to Computer Programming, covering course details, learning outcomes, assessment, and content. Course Basics Title: Introduction to Computer Programming Code: CS1315 Academic Unit: Computer Science (CS), College of Engineering (EG) Duration: 1 semester Credits: 3 Level: Bachelor\'s Degree (B1-B4) Language: English (instruction and assessment) Prerequisites: None Equivalent Course: CS2315 Computer Programming Exclusive Courses: CS2310, CS2311, CS2313, CS2360 Java Programming Learning Objectives Aim: Teach programming concepts, techniques, and object-oriented basics; develop practical programming skills. No prior experience needed. CILOs (Course Intended Learning Outcomes): Explain object-oriented program structure (10%). Analyze, test, and debug programs (15%). Solve tasks using simple algorithms and data structures (60%). Design well-structured programs with good practices (15%). DEC Dimensions: A1 (Attitude): Curiosity, inquiry, and challenging assumptions. A2 (Ability): Critical thinking, research skills, and interdisciplinary application. A3 (Accomplishments): Creating solutions or artefacts. Teaching Activities Lectures (3 hours/week): Introduce programming concepts with examples (covers all CILOs). Labs (1 hour/week): Practical coding in an IDE, with feedback (covers all CILOs). Assignments (after class): Comprehensive tasks requiring design, implementation, and documentation (covers CILOs 2, 3, 4). Assessment Continuous Assessment (40%): Quiz (20%): Explain program structure (CILOs 1, 3, 4). Assignment (20%): Test program correctness (CILOs 2, 3, 4); at least one every 4 weeks. Examination (60%, 2 hours): Pass requires ≥30% of maximum marks (CILO 3 focus). Rubrics: Grading criteria for Quiz, Assignment, and Exam range from "Excellent (A+–A-)" to "Failure (F)", evaluating skills like program explanation, technique application, and analysis. Course Content Keywords: Program design, algorithms, programming language, control structures, data types, arrays, file I/O, object-based programming, testing. Modules: Computers & Programming: Software hierarchy, development process, environments. Programming Techniques: Algorithms, modular decomposition, variables, control flow. Data Structures: Types, arrays, strings, files, classes, encapsulation. Development Practice: Coding style, testing, documentation. Reading List Compulsory: Fundamentals of C++ Programming by Richard L. Halterman (2018).'
                },
                {
                    id: 2,
                    title: '计算机系统基础',
                    type: 'notes',
                    college: 'engineering',
                    difficulty: 'intermediate',
                    degree: 'bachelor',
                    field: 'engineering',
                    year: '2025',
                    author: '计算机科学系',
                    uploadDate: '2025-09-01',
                    downloads: 980,
                    rating: 4.7,
                    description: 'CS1215计算机系统基础课程笔记，涵盖计算机系统架构、操作系统原理、网络基础和系统编程。',
                    tags: ['计算机系统', '操作系统', '系统编程', '计算机架构', '网络'],
                    fileType: 'pdf',
                    fileSize: '3.2MB',
                    resourceNumber: 'CS1215-001',
                    noteUrl: 'note-cs1215.html',
                    searchableContent: 'CS1215 Computer Systems Introduction hardware software operating system network programming assembly language processor memory cache virtual memory file system TCP IP protocol system calls process thread synchronization concurrent programming performance optimization computer architecture instruction set pipeline branch prediction memory hierarchy storage devices I/O management distributed systems'
                },
                {
                    id: 3,
                    title: '数据库系统原理',
                    type: 'slides',
                    college: 'engineering',
                    difficulty: 'intermediate',
                    degree: 'bachelor',
                    field: 'engineering',
                    year: '2024',
                    author: '李教授',
                    uploadDate: '2024-12-10',
                    downloads: 256,
                    rating: 4.5,
                    description: 'CS3402数据库系统原理课程课件，包含关系代数、SQL和数据库设计。',
                    tags: ['数据库', 'SQL', '关系模型'],
                    fileType: 'pptx',
                    fileSize: '5.8MB',
                    resourceNumber: 'CS3402-002',
                    searchableContent: '数据库系统原理 关系代数 SQL 数据库设计 关系模型 数据库管理系统 DBMS'
                },
                {
                    id: 3,
                    title: '市场营销学',
                    type: 'assignment',
                    college: 'business',
                    difficulty: 'intermediate',
                    degree: 'bachelor',
                    field: 'business',
                    year: '2025',
                    author: '王同学',
                    uploadDate: '2025-07-22',
                    downloads: 89,
                    rating: 4.2,
                    description: 'MKT2103市场营销学作业答案，包含市场分析和营销策略案例。',
                    tags: ['市场营销', '商业', '案例分析'],
                    fileType: 'docx',
                    fileSize: '1.2MB',
                    resourceNumber: 'MKT2103-003',
                    searchableContent: '市场营销学 市场分析 营销策略 案例分析 商业 消费者行为 品牌管理'
                },
                {
                    id: 4,
                    title: '量子力学',
                    type: 'review',
                    college: 'science',
                    difficulty: 'advanced',
                    degree: 'master',
                    field: 'science',
                    year: '2024',
                    author: '刘教授',
                    uploadDate: '2024-11-05',
                    downloads: 76,
                    rating: 4.9,
                    description: 'PHY5201量子力学复习资料，包含薛定谔方程和量子纠缠理论。',
                    tags: ['量子力学', '物理学', '复习资料'],
                    fileType: 'pdf',
                    fileSize: '4.3MB',
                    resourceNumber: 'PHY5201-004',
                    searchableContent: '量子力学 薛定谔方程 量子纠缠 物理学 波函数 量子态 测量理论'
                },
                {
                    id: 5,
                    title: '人工智能',
                    type: 'exams',
                    college: 'engineering',
                    difficulty: 'advanced',
                    degree: 'master',
                    field: 'engineering',
                    year: '2023',
                    author: '赵教授',
                    uploadDate: '2023-06-18',
                    downloads: 312,
                    rating: 4.7,
                    description: 'CS5483人工智能往年试题，包含机器学习和神经网络问题。',
                    tags: ['人工智能', '机器学习', '神经网络', '试题'],
                    fileType: 'pdf',
                    fileSize: '3.1MB',
                    resourceNumber: 'CS5483-005',
                    searchableContent: '人工智能 机器学习 神经网络 深度学习 算法 模式识别 自然语言处理'
                },
                {
                    id: 6,
                    title: '环境法学',
                    type: 'notes',
                    college: 'law',
                    difficulty: 'intermediate',
                    degree: 'bachelor',
                    field: 'arts',
                    year: '2025',
                    author: '陈同学',
                    uploadDate: '2025-09-01',
                    downloads: 45,
                    rating: 4.3,
                    description: 'LAW3423环境法学课程笔记，涵盖环境保护法规和案例分析。',
                    tags: ['环境法', '法学', '案例分析'],
                    fileType: 'pdf',
                    fileSize: '2.8MB',
                    resourceNumber: 'LAW3423-006',
                    searchableContent: '环境法学 环境保护法规 案例分析 法学 环境政策 可持续发展 环境责任'
                }
            ];
            
            // 生成更多示例数据
            for (let i = 7; i <= 30; i++) {
                const types = ['notes', 'slides', 'assignment', 'review', 'exams', 'project'];
                const colleges = ['engineering', 'business', 'science', 'liberal', 'law', 'creative', 'energy', 'data', 'veterinary'];
                const difficulties = ['beginner', 'intermediate', 'advanced', 'expert'];
                const degrees = ['bachelor', 'master', 'phd'];
                const fields = ['engineering', 'business', 'science', 'arts'];
                const years = ['2022', '2023', '2024', '2025'];
                
                this.data.push({
                    id: i,
                    title: `示例资源 ${i}`,
                    type: types[Math.floor(Math.random() * types.length)],
                    college: colleges[Math.floor(Math.random() * colleges.length)],
                    difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
                    degree: degrees[Math.floor(Math.random() * degrees.length)],
                    field: fields[Math.floor(Math.random() * fields.length)],
                    year: years[Math.floor(Math.random() * years.length)],
                    author: `用户${i}`,
                    uploadDate: `2025-${Math.floor(Math.random() * 9) + 1}-${Math.floor(Math.random() * 28) + 1}`,
                    downloads: Math.floor(Math.random() * 300),
                    rating: (Math.random() * 2 + 3).toFixed(1),
                    description: `示例资源${i}的描述信息。`,
                    tags: ['示例', '资源', `标签${i}`],
                    fileType: ['pdf', 'docx', 'pptx'][Math.floor(Math.random() * 3)],
                    fileSize: `${(Math.random() * 5 + 1).toFixed(1)}MB`
                });
            }
        },
        
        /**
         * 绑定筛选器事件
         */
        bindFilterEvents: function() {
            // 安全获取元素
            const collegeFilter = document.getElementById('collegeFilter');
            const courseTypeFilter = document.getElementById('courseTypeFilter');
            const difficultyFilter = document.getElementById('difficultyFilter');
            const degreeFilter = document.getElementById('degreeFilter');
            const fieldFilter = document.getElementById('fieldFilter');
            const yearFilter = document.getElementById('yearFilter');
            
            // 学院筛选器
            if (collegeFilter) {
                collegeFilter.addEventListener('change', () => {
                    this.filters.college = collegeFilter.value;
                    this.pagination.currentPage = 1;
                    this.renderResources();
                });
            }
            
            // 课程类型筛选器
            if (courseTypeFilter) {
                courseTypeFilter.addEventListener('change', () => {
                    this.filters.courseType = courseTypeFilter.value;
                    this.pagination.currentPage = 1;
                    this.renderResources();
                });
            }
            
            // 难度等级筛选器
            if (difficultyFilter) {
                difficultyFilter.addEventListener('change', () => {
                    this.filters.difficulty = difficultyFilter.value;
                    this.pagination.currentPage = 1;
                    this.renderResources();
                });
            }
            
            // 学位类型筛选器
            if (degreeFilter) {
                degreeFilter.addEventListener('change', () => {
                    this.filters.degree = degreeFilter.value;
                    this.pagination.currentPage = 1;
                    this.renderResources();
                });
            }
            
            // 领域筛选器
            if (fieldFilter) {
                fieldFilter.addEventListener('change', () => {
                    this.filters.field = fieldFilter.value;
                    this.pagination.currentPage = 1;
                    this.renderResources();
                });
            }
            
            // 年份筛选器
            if (yearFilter) {
                yearFilter.addEventListener('change', () => {
                    this.filters.year = yearFilter.value;
                    this.pagination.currentPage = 1;
                    this.renderResources();
                });
            }
        },
        
        /**
         * 筛选资源
         * @returns {Array} - 筛选后的资源数组
         */
        filterResources: function() {
            return this.data.filter(resource => {
                // 搜索关键词筛选
                if (this.filters.searchQuery) {
                    const query = this.filters.searchQuery.toLowerCase();
                    const searchableText = [
                        resource.title,
                        resource.description,
                        resource.author,
                        resource.resourceNumber || '',
                        resource.searchableContent || '',
                        ...resource.tags
                    ].join(' ').toLowerCase();
                    
                    if (!searchableText.includes(query)) {
                        return false;
                    }
                }
                
                // 学院筛选
                if (this.filters.college !== 'all' && resource.college !== this.filters.college) {
                    return false;
                }
                
                // 课程类型筛选
                if (this.filters.courseType !== 'all' && resource.type !== this.filters.courseType) {
                    return false;
                }
                
                // 难度等级筛选
                if (this.filters.difficulty !== 'all' && resource.difficulty !== this.filters.difficulty) {
                    return false;
                }
                
                // 学位类型筛选
                if (this.filters.degree !== 'all' && resource.degree !== this.filters.degree) {
                    return false;
                }
                
                // 领域筛选
                if (this.filters.field !== 'all' && resource.field !== this.filters.field) {
                    return false;
                }
                
                // 年份筛选
                if (this.filters.year !== 'all' && resource.year !== this.filters.year) {
                    return false;
                }
                
                return true;
            });
        },
        
        /**
         * 搜索资源
         * @param {string} query - 搜索关键词
         */
        searchResources: function(query) {
            // 设置搜索关键词
            this.filters.searchQuery = query;
            
            // 重置到第一页
            this.pagination.currentPage = 1;
            
            // 重新渲染资源
            this.renderResources();
            
            // 显示搜索结果提示
            this.showSearchResultsMessage(query);
        },
        
        /**
         * 清除搜索
         */
        clearSearch: function() {
            this.filters.searchQuery = '';
            this.pagination.currentPage = 1;
            this.renderResources();
            this.hideSearchResultsMessage();
        },
        
        /**
         * 显示搜索结果提示
         * @param {string} query - 搜索关键词
         */
        showSearchResultsMessage: function(query) {
            const resourcesSection = document.getElementById('resources');
            if (!resourcesSection) return;
            
            // 移除现有的搜索结果提示
            const existingMessage = resourcesSection.querySelector('.search-results-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            // 创建搜索结果提示
            const message = document.createElement('div');
            message.className = 'search-results-message';
            message.innerHTML = `
                <div class="search-results-info">
                    <i class="fas fa-search"></i>
                    <span>搜索关键词: "${query}"</span>
                    <button class="clear-search-btn" onclick="APP.Resources.clearSearch()">
                        <i class="fas fa-times"></i> 清除搜索
                    </button>
                </div>
            `;
            
            // 插入到资源区域的开头
            const container = resourcesSection.querySelector('.container');
            if (container) {
                const title = container.querySelector('.section-title');
                if (title) {
                    title.insertAdjacentElement('afterend', message);
                }
            }
        },
        
        /**
         * 隐藏搜索结果提示
         */
        hideSearchResultsMessage: function() {
            const message = document.querySelector('.search-results-message');
            if (message) {
                message.remove();
            }
        },
        
        /**
         * 渲染资源
         */
        renderResources: function() {
            // 获取资源网格元素
            const resourcesGrid = document.getElementById('resourcesGrid');
            if (!resourcesGrid) return;
            
            // 筛选资源
            const filteredResources = this.filterResources();
            
            // 计算分页
            const startIndex = (this.pagination.currentPage - 1) * this.pagination.itemsPerPage;
            const endIndex = startIndex + this.pagination.itemsPerPage;
            const paginatedResources = filteredResources.slice(startIndex, endIndex);
            
            // 更新总页数
            this.pagination.totalPages = Math.ceil(filteredResources.length / this.pagination.itemsPerPage);
            
            // 清空资源网格
            resourcesGrid.innerHTML = '';
            
            // 如果没有资源
            if (paginatedResources.length === 0) {
                const noResults = document.createElement('div');
                noResults.className = 'no-results';
                // 安全地使用翻译函数
                let noResourcesText = '没有找到符合条件的资源';
                if (APP.Language && typeof APP.Language.translate === 'function') {
                    noResourcesText = APP.Language.translate('no_resources_found');
                } else if (APP.Language && typeof APP.Language.getTranslation === 'function') {
                    noResourcesText = APP.Language.getTranslation('no_resources_found');
                }
                noResults.textContent = noResourcesText;
                resourcesGrid.appendChild(noResults);
                
                // 隐藏分页
                const pagination = document.getElementById('pagination');
                if (pagination) {
                    pagination.innerHTML = '';
                }
                
                return;
            }
            
            // 渲染资源卡片
            paginatedResources.forEach(resource => {
                const card = document.createElement('div');
                card.className = 'resource-card';
                card.setAttribute('data-id', resource.id);
                
                // 获取资源类型图标
                const typeIcon = this.getResourceTypeIcon(resource.type);
                
                // 获取难度标签
                let difficultyLabel = resource.difficulty;
                // 安全地使用翻译函数
                if (APP.Language && typeof APP.Language.translate === 'function') {
                    difficultyLabel = APP.Language.translate(resource.difficulty);
                } else if (APP.Language && typeof APP.Language.getTranslation === 'function') {
                    difficultyLabel = APP.Language.getTranslation(resource.difficulty);
                }
                
                // 构建卡片内容
                card.innerHTML = `
                    <div class="resource-image">
                        <i class="${typeIcon}"></i>
                        <div class="resource-number">${resource.resourceNumber || `RES-${resource.id.toString().padStart(3, '0')}`}</div>
                    </div>
                    <div class="resource-content">
                        <h3 class="resource-title">${resource.resourceNumber || resource.courseCode || resource.title}</h3>
                        <div class="resource-meta">
                            <div class="resource-meta-row">
                                <div class="resource-meta-item">
                                    <i class="fas fa-download"></i>
                                    <span>${resource.downloads}</span>
                                </div>
                                <div class="resource-meta-item">
                                    <i class="fas fa-star"></i>
                                    <span>${resource.rating}</span>
                                </div>
                                <div class="resource-meta-item">
                                    <i class="fas fa-file"></i>
                                    <span>${resource.fileSize}</span>
                                </div>
                            </div>
                            <div class="resource-meta-row">
                                <div class="resource-meta-item">
                                    <i class="fas fa-user"></i>
                                    <span>${resource.author}</span>
                                </div>
                                <div class="resource-meta-item">
                                    <i class="fas fa-calendar"></i>
                                    <span>${this.formatDate(resource.uploadDate)}</span>
                                </div>
                            </div>
                        </div>
                        <p class="resource-description">${resource.description}</p>
                        <div class="resource-tags">
                            ${resource.tags.map(tag => `<span class="resource-tag">${tag}</span>`).join('')}
                        </div>
                        <div class="resource-actions">
                            ${resource.noteUrl ? 
                                `<button class="btn btn-primary view-note-btn" onclick="window.open('${resource.noteUrl}', '_blank')">
                                    <i class="fas fa-eye"></i> 查看笔记
                                </button>` : 
                                `<button class="btn btn-outline download-btn">
                                    <i class="fas fa-download"></i> 下载
                                </button>`
                            }
                        </div>
                    </div>
                `;
                
                // 添加到网格
                resourcesGrid.appendChild(card);
            });
            
            // 渲染分页
            this.renderPagination();
        },
        
        /**
         * 渲染分页
         */
        renderPagination: function() {
            const pagination = document.getElementById('pagination');
            if (!pagination) return;
            
            // 清空分页
            pagination.innerHTML = '';
            
            // 如果只有一页，不显示分页
            if (this.pagination.totalPages <= 1) {
                return;
            }
            
            // 上一页按钮
            const prevButton = document.createElement('button');
            prevButton.className = 'pagination-btn prev';
            prevButton.disabled = this.pagination.currentPage === 1;
            prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
            prevButton.addEventListener('click', () => {
                if (this.pagination.currentPage > 1) {
                    this.pagination.currentPage--;
                    this.renderResources();
                }
            });
            pagination.appendChild(prevButton);
            
            // 页码按钮
            const maxVisiblePages = 5;
            let startPage = Math.max(1, this.pagination.currentPage - Math.floor(maxVisiblePages / 2));
            let endPage = Math.min(this.pagination.totalPages, startPage + maxVisiblePages - 1);
            
            // 调整起始页
            if (endPage - startPage + 1 < maxVisiblePages) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }
            
            // 第一页
            if (startPage > 1) {
                const firstPageBtn = document.createElement('button');
                firstPageBtn.className = 'pagination-btn';
                firstPageBtn.textContent = '1';
                firstPageBtn.addEventListener('click', () => {
                    this.pagination.currentPage = 1;
                    this.renderResources();
                });
                pagination.appendChild(firstPageBtn);
                
                // 省略号
                if (startPage > 2) {
                    const ellipsis = document.createElement('span');
                    ellipsis.className = 'pagination-ellipsis';
                    ellipsis.textContent = '...';
                    pagination.appendChild(ellipsis);
                }
            }
            
            // 页码
            for (let i = startPage; i <= endPage; i++) {
                const pageBtn = document.createElement('button');
                pageBtn.className = 'pagination-btn';
                if (i === this.pagination.currentPage) {
                    pageBtn.classList.add('active');
                }
                pageBtn.textContent = i;
                pageBtn.addEventListener('click', () => {
                    this.pagination.currentPage = i;
                    this.renderResources();
                });
                pagination.appendChild(pageBtn);
            }
            
            // 最后一页
            if (endPage < this.pagination.totalPages) {
                // 省略号
                if (endPage < this.pagination.totalPages - 1) {
                    const ellipsis = document.createElement('span');
                    ellipsis.className = 'pagination-ellipsis';
                    ellipsis.textContent = '...';
                    pagination.appendChild(ellipsis);
                }
                
                const lastPageBtn = document.createElement('button');
                lastPageBtn.className = 'pagination-btn';
                lastPageBtn.textContent = this.pagination.totalPages;
                lastPageBtn.addEventListener('click', () => {
                    this.pagination.currentPage = this.pagination.totalPages;
                    this.renderResources();
                });
                pagination.appendChild(lastPageBtn);
            }
            
            // 下一页按钮
            const nextButton = document.createElement('button');
            nextButton.className = 'pagination-btn next';
            nextButton.disabled = this.pagination.currentPage === this.pagination.totalPages;
            nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
            nextButton.addEventListener('click', () => {
                if (this.pagination.currentPage < this.pagination.totalPages) {
                    this.pagination.currentPage++;
                    this.renderResources();
                }
            });
            pagination.appendChild(nextButton);
        },
        
        /**
         * 获取资源类型图标
         * @param {string} type - 资源类型
         * @returns {string} - 图标类名
         */
        getResourceTypeIcon: function(type) {
            switch (type) {
                case 'notes':
                    return 'fas fa-book';
                case 'slides':
                    return 'fas fa-file-powerpoint';
                case 'assignment':
                    return 'fas fa-tasks';
                case 'review':
                    return 'fas fa-clipboard-check';
                case 'exams':
                    return 'fas fa-file-alt';
                case 'project':
                    return 'fas fa-project-diagram';
                default:
                    return 'fas fa-file';
            }
        },
        
        /**
         * 格式化日期
         * @param {string} dateString - 日期字符串（YYYY-MM-DD）
         * @returns {string} - 格式化后的日期
         */
        formatDate: function(dateString) {
            const date = new Date(dateString);
            // 安全地获取当前语言
            let currentLanguage = 'zh-CN';
            if (APP.Language && typeof APP.Language.getCurrentLanguage === 'function') {
                currentLanguage = APP.Language.getCurrentLanguage();
            }
            
            try {
                return date.toLocaleDateString(currentLanguage, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
            } catch (error) {
                // 如果出错，使用默认格式
                return date.toLocaleDateString('zh-CN');
            }
        }
    };
    
    // 当DOM加载完成后初始化
    document.addEventListener('DOMContentLoaded', function() {
        // 检查是否已经初始化
        if (!APP.Resources.initialized) {
            APP.Resources.init();
            APP.Resources.initialized = true;
        }
    });
})();
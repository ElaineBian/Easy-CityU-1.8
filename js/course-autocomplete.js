/**
 * Easy CityU - 学术资源管理平台
 * 课程编号自动完成模块
 * 版本: 1.0.0
 * 日期: 2025/09/09
 */

// 立即执行函数表达式(IIFE)创建独立作用域
(function() {
    'use strict';
    
    // 全局命名空间
    window.APP = window.APP || {};
    
    // 课程编号自动完成模块
    APP.CourseAutocomplete = {
        // 常用课程编号列表
        courseList: [
            // 通识教育课程
            'GE1401', 'GE2410', 'GE1501', 'GE2302', 'GE1305', 'GE2412',
            
            // 计算机科学课程
            'CS1102', 'CS1103', 'CS2115', 'CS2204', 'CS2311', 'CS2312', 
            'CS2313', 'CS3103', 'CS3334', 'CS3342', 'CS3343', 'CS3402', 
            'CS3481', 'CS4185', 'CS4278', 'CS4280', 'CS4386', 'CS4487',
            
            // 商学院课程
            'FB1003', 'FB2100', 'FB2101', 'FB3100', 'FB3200', 'FB3300',
            'FB4001', 'FB4002', 'FB4003', 'FB4004', 'FB4005', 'FB4006',
            
            // 工程学院课程
            'EE1001', 'EE2000', 'EE2001', 'EE2005', 'EE2331', 'EE3001',
            'EE3114', 'EE3206', 'EE4214', 'EE4301', 'EE4304', 'EE4307',
            
            // 理学院课程
            'MA1200', 'MA1201', 'MA2172', 'MA2185', 'MA2503', 'MA2506',
            'MA3511', 'MA4513', 'MA4531', 'MA4533', 'MA4535', 'MA4591',
            
            // 人文社科学院课程
            'LT1101', 'LT1201', 'LT1301', 'LT2201', 'LT2301', 'LT3101',
            'LT3201', 'LT3301', 'LT4101', 'LT4201', 'LT4301', 'LT4401',
            
            // 法学院课程
            'LW1001', 'LW1002', 'LW2001', 'LW2002', 'LW3001', 'LW3002',
            'LW4001', 'LW4002', 'LW4003', 'LW4004', 'LW4005', 'LW4006',
            
            // 创意媒体学院课程
            'CM1001', 'CM1002', 'CM2001', 'CM2002', 'CM3001', 'CM3002',
            'CM4001', 'CM4002', 'CM4003', 'CM4004', 'CM4005', 'CM4006',
            
            // 能源与环境学院课程
            'SEE1001', 'SEE1002', 'SEE2001', 'SEE2002', 'SEE3001', 'SEE3002',
            'SEE4001', 'SEE4002', 'SEE4003', 'SEE4004', 'SEE4005', 'SEE4006',
            
            // 数据科学学院课程
            'DS1001', 'DS1002', 'DS2001', 'DS2002', 'DS3001', 'DS3002',
            'DS4001', 'DS4002', 'DS4003', 'DS4004', 'DS4005', 'DS4006',
            
            // 兽医学院课程
            'VM1001', 'VM1002', 'VM2001', 'VM2002', 'VM3001', 'VM3002',
            'VM4001', 'VM4002', 'VM4003', 'VM4004', 'VM4005', 'VM4006'
        ],
        
        /**
         * 初始化自动完成功能
         */
        init: function() {
            console.log('初始化课程编号自动完成功能...');
            
            // 获取课程编号输入框
            const courseCodeInput = document.getElementById('courseCode');
            
            // 如果输入框存在，设置自动完成功能
            if (courseCodeInput) {
                // 创建自动完成容器
                this.createAutocompleteContainer(courseCodeInput);
                
                // 绑定输入事件
                courseCodeInput.addEventListener('input', () => {
                    this.handleInput(courseCodeInput);
                });
                
                // 绑定焦点事件
                courseCodeInput.addEventListener('focus', () => {
                    this.handleInput(courseCodeInput);
                });
                
                // 绑定点击事件，防止点击输入框时关闭自动完成列表
                courseCodeInput.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
                
                // 点击文档其他地方时关闭自动完成列表
                document.addEventListener('click', () => {
                    this.closeAutocomplete();
                });
                
                console.log('课程编号自动完成功能初始化完成');
            } else {
                console.warn('未找到课程编号输入框 #courseCode');
                
                // 延迟重试初始化
                setTimeout(() => {
                    console.log('延迟重试初始化课程编号自动完成功能...');
                    this.init();
                }, 500);
            }
        },
        
        /**
         * 创建自动完成容器
         * @param {HTMLElement} inputElement - 输入框元素
         */
        createAutocompleteContainer: function(inputElement) {
            // 检查输入框元素是否存在
            if (!inputElement) {
                console.error('输入框元素不存在，无法创建自动完成容器');
                return null;
            }
            
            // 检查是否已存在自动完成容器
            let autocompleteContainer = document.getElementById('courseCodeAutocomplete');
            
            // 如果不存在，创建一个新的
            if (!autocompleteContainer) {
                autocompleteContainer = document.createElement('div');
                autocompleteContainer.id = 'courseCodeAutocomplete';
                autocompleteContainer.className = 'autocomplete-container';
                
                // 获取输入框的位置和尺寸
                const inputRect = inputElement.getBoundingClientRect();
                
                // 设置自动完成容器的样式
                autocompleteContainer.style.position = 'absolute';
                autocompleteContainer.style.width = inputElement.offsetWidth + 'px';
                autocompleteContainer.style.maxHeight = '200px';
                autocompleteContainer.style.overflowY = 'auto';
                autocompleteContainer.style.backgroundColor = 'white';
                autocompleteContainer.style.border = '1px solid #ddd';
                autocompleteContainer.style.borderRadius = '4px';
                autocompleteContainer.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                autocompleteContainer.style.zIndex = '1000';
                autocompleteContainer.style.display = 'none';
                
                // 将自动完成容器添加到输入框的父元素
                inputElement.parentNode.appendChild(autocompleteContainer);
            }
            
            return autocompleteContainer;
        },
        
        /**
         * 处理输入事件
         * @param {HTMLElement} inputElement - 输入框元素
         */
        handleInput: function(inputElement) {
            const query = inputElement.value.trim().toUpperCase();
            
            // 获取自动完成容器
            const autocompleteContainer = document.getElementById('courseCodeAutocomplete');
            
            // 如果查询为空，显示所有课程
            if (query === '') {
                this.showAutocomplete(autocompleteContainer, this.courseList.slice(0, 10), inputElement);
                return;
            }
            
            // 过滤匹配的课程
            const matchedCourses = this.courseList.filter(course => 
                course.toUpperCase().includes(query)
            );
            
            // 显示匹配的课程
            this.showAutocomplete(autocompleteContainer, matchedCourses, inputElement);
        },
        
        /**
         * 显示自动完成列表
         * @param {HTMLElement} container - 自动完成容器
         * @param {Array} courses - 课程列表
         * @param {HTMLElement} inputElement - 输入框元素
         */
        showAutocomplete: function(container, courses, inputElement) {
            // 清空容器
            container.innerHTML = '';
            
            // 如果没有匹配的课程，隐藏容器
            if (courses.length === 0) {
                container.style.display = 'none';
                return;
            }
            
            // 更新容器位置
            this.updateContainerPosition(container, inputElement);
            
            // 添加匹配的课程
            courses.forEach(course => {
                const item = document.createElement('div');
                item.className = 'autocomplete-item';
                item.textContent = course;
                
                // 设置项目样式
                item.style.padding = '8px 12px';
                item.style.cursor = 'pointer';
                item.style.transition = 'background-color 0.2s';
                
                // 鼠标悬停效果
                item.addEventListener('mouseenter', () => {
                    item.style.backgroundColor = '#f0f0f0';
                });
                
                item.addEventListener('mouseleave', () => {
                    item.style.backgroundColor = 'transparent';
                });
                
                // 点击事件
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    inputElement.value = course;
                    this.closeAutocomplete();
                });
                
                container.appendChild(item);
            });
            
            // 显示容器
            container.style.display = 'block';
        },
        
        /**
         * 更新自动完成容器位置
         * @param {HTMLElement} container - 自动完成容器
         * @param {HTMLElement} inputElement - 输入框元素
         */
        updateContainerPosition: function(container, inputElement) {
            // 使用相对于父元素的定位，而不是绝对定位
            // 因为.form-group已经设置为相对定位
            container.style.position = 'absolute';
            container.style.top = inputElement.offsetHeight + 'px';
            container.style.left = '0';
            container.style.width = '100%';
        },
        
        /**
         * 关闭自动完成列表
         */
        closeAutocomplete: function() {
            const container = document.getElementById('courseCodeAutocomplete');
            if (container) {
                container.style.display = 'none';
            }
        }
    };
    
    // 页面加载完成后初始化
    document.addEventListener('DOMContentLoaded', function() {
        APP.CourseAutocomplete.init();
    });
})();
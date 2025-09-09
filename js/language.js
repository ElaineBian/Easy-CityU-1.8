/**
 * Easy CityU - 学术资源管理平台
 * 语言模块 - 处理网站的多语言支持
 * 版本: 1.0.0
 * 日期: 2025/09/07
 */

// 立即执行函数表达式(IIFE)创建独立作用域
(function() {
    'use strict';
    
    // 全局命名空间
    window.APP = window.APP || {};
    
    // 语言模块
    APP.Language = {
        // 语言类型
        ZH_CN: 'zh-CN', // 简体中文
        ZH_TW: 'zh-TW', // 繁体中文
        EN: 'en',       // 英文
        
        // 当前语言
        currentLanguage: 'zh-CN',
        
        // 本地存储键名
        storageKey: 'language',
        
        // 翻译数据
        translations: {
            // 简体中文
            'zh-CN': {
                // 网站名称
                'site_name': 'Easy CityU',
                
                // 导航
                'home': '首页',
                'resources': '资源浏览',
                'forum': '学生论坛',
                'about': '关于我们',
                
                // 英雄区域
                'hero_title': 'Easy CityU',
                'hero_subtitle': '城大学术资源管理平台',
                'hero_description': '轻松获取、分享和管理城市大学的学术资源',
                'search_placeholder': '搜索课程、专业、论文...',
                'search_button': '搜索',
                'photo_search': '拍照搜索',
                
                // 筛选器
                'filter_degree': '学位',
                'filter_field': '专业领域',
                'filter_year': '年份',
                'filter_all': '全部',
                'filter_bachelor': '本科',
                'filter_master': '硕士',
                'filter_phd': '博士',
                'filter_cs': '计算机科学',
                'filter_business': '商学',
                
                // 新增筛选器相关翻译
                'degree_type': '学位类型',
                'field': '专业领域', 
                'year': '年份',
                'all_degrees': '所有学位',
                'all_fields': '所有专业',
                'all_years': '所有年份',
                'bachelor': '本科',
                'master': '硕士', 
                'phd': '博士',
                'engineering': '工程学',
                'business': '商学',
                'science': '自然科学',
                'arts': '人文艺术',
                
                // 浏览相关
                'browse': '浏览',
                'browse_resources': '浏览资源',
                'filter_engineering': '工程学',
                'filter_arts': '人文艺术',
                'filter_science': '自然科学',
                'filter_social': '社会科学',
                
                // 特色功能
                'features_title': '特色功能',
                'feature_search_title': '智能搜索',
                'feature_search_desc': '支持文本搜索和拍照搜索，快速找到所需资源',
                'feature_filter_title': '精细筛选',
                'feature_filter_desc': '按学位、专业、年份等多维度筛选，精准定位资源',
                'feature_upload_title': '资源共享',
                'feature_upload_desc': '上传笔记、作业、复习资料，与同学共享学习成果',
                'feature_forum_title': '学生论坛',
                'feature_forum_desc': '交流学习经验，讨论学术问题，建立学习社区',
                
                // 论坛
                'forum_title': '学生论坛',
                'forum_description': '分享经验，解答疑惑，共同进步',
                'forum_tab_upload': '上传资料',
                'forum_tab_recent': '最新帖子',
                'forum_tab_popular': '热门讨论',
                'latest_replies': '最新回复',
                'drag_drop_files': '拖拽文件到此处或点击上传',
                'select_files': '选择文件',
                'file_info': '文件信息',
                'course_name': '课程名称',
                'course_name_placeholder': '例如：CS3103 数据结构与算法',
                'course_code': '课程编号',
                'course_code_placeholder': '例如：GE1401',
                'file_type': '文件类型',
                'file_type_notes': '笔记',
                'file_type_assignment': '作业',
                'file_type_exam': '考试资料',
                'file_type_project': '项目报告',
                'file_type_other': '其他',
                'college': '学院',
                'college_cs': '计算机学院',
                'college_business': '商学院',
                'college_engineering': '工程学院',
                'college_science': '理学院',
                'college_humanities': '人文学院',
                'college_social': '社会科学学院',
                'college_law': '法学院',
                'college_other': '其他学院',
                'difficulty': '难度等级',
                'difficulty_beginner': '入门级',
                'difficulty_intermediate': '中级',
                'difficulty_advanced': '高级',
                'difficulty_expert': '专家级',
                'description': '描述',
                'description_placeholder': '请简要描述文件内容，帮助其他同学了解...',
                'tags': '标签',
                'tags_placeholder': '输入标签，用逗号分隔',
                'submit': '提交',
                'search_history': '搜索历史',
                'clear_history': '清除历史',
                'processing_image': '正在处理图像...',
                
                // 资源浏览
                'resources_title': '资源浏览',
                'resources_description': '浏览和下载学习资源',
                'sort_by': '排序方式',
                'sort_newest': '最新上传',
                'sort_popular': '最受欢迎',
                
                // 新增缺失的翻译键
                'all_course_types': '所有课程类型',
                'all_difficulties': '所有难度级别',
                'all_rights_reserved': '版权所有',
                'assignment_answers': '作业答案',
                'cancel': '取消',
                'capture': '拍照',
                'cloud_storage': '云存储',
                'cloud_storage_desc': '安全存储和访问您的学术资源',
                'confirm': '确认',
                'confirm_action': '确认操作',
                'course_notes': '课程笔记',
                'course_slides': '课程幻灯片',
                'file_information': '文件信息',
                'file_type': '文件类型',
                'follow_us': '关注我们',
                'home': '首页',
                'login': '登录',
                'past_exams': '往年试卷',
                'phone': '电话',
                'platform_features': '平台特色',
                'popular_posts': '热门帖子',
                'project_reports': '项目报告',
                'quick_links': '快速链接',
                'recent_posts': '最新帖子',
                'register': '注册',
                'resource_management': '资源管理',
                'resource_management_desc': '高效管理您的学术资源',
                'review_materials': '复习资料',
                'search_button': '搜索',
                'site_name': 'Easy CityU',
                'smart_search': '智能搜索',
                'smart_search_desc': '快速找到您需要的资源',
                'student_forum': '学生论坛',
                'student_forum_desc': '交流学习经验和问题',
                'upload_file': '上传文件',
                'upload_resources': '上传资源',
                
                // 关于我们
                'about': '关于',
                'about_description': '关于我们的描述',
                'about_us': '关于我们',
                'contact_us': '联系我们',
                'sort_rating': '评分最高',
                'advanced_filter': '高级筛选',
                'filter_college': '学院',
                'filter_course_type': '课程类型',
                'filter_difficulty': '难度等级',
                'apply_filter': '应用筛选',
                'reset_filter': '重置筛选',
                
                // 关于我们
                'about_title': '关于我们',
                'about_description': '了解Easy CityU的使命和团队',
                'our_mission': '我们的使命',
                'mission_text': 'Easy CityU致力于为城市大学的学生提供一个便捷、高效的学术资源管理平台，帮助学生更好地获取、分享和管理学习资源，提高学习效率，促进学术交流。',
                'our_team': '我们的团队',
                'contact_us': '联系我们',
                'email': '电子邮件',
                'social_media': '社交媒体',
                
                // 页脚
                'footer_description': 'Easy CityU - 城大学术资源管理平台',
                'quick_links': '快速链接',
                'privacy_policy': '隐私政策',
                'terms_of_service': '服务条款',
                'faq': '常见问题',
                'copyright': '版权所有 © 2025 Easy CityU. 保留所有权利。',
                
                // 通用
                'loading': '加载中...',
                'view_more': '查看更多',
                'view_details': '查看详情',
                'download': '下载',
                'share': '分享',
                'like': '点赞',
                'comment': '评论',
                'views': '浏览',
                'likes': '点赞',
                'comments': '评论',
                'upload_time': '上传时间',
                'author': '作者',
                'rating': '评分',
                'submit_success': '提交成功',
                'submit_error': '提交失败',
                'network_error': '网络错误',
                'login_required': '需要登录',
                'login': '登录',
                'register': '注册',
                'logout': '退出',
                'profile': '个人资料',
                'settings': '设置',
                'language': '语言',
                'theme': '主题',
                'light_mode': '亮色模式',
                'dark_mode': '暗色模式',
                'system_theme': '跟随系统',
                'simplified_chinese': '简体中文',
                'traditional_chinese': '繁体中文',
                'english': '英文',
                
                // 认证相关
                'login_description': '欢迎回到 Easy CityU',
                'register_description': '加入 Easy CityU 学习社区',
                'email_placeholder': '请输入您的邮箱地址',
                'password_placeholder': '请输入您的密码',
                'first_name': '名',
                'last_name': '姓',
                'first_name_placeholder': '请输入您的名',
                'last_name_placeholder': '请输入您的姓',
                'student_id': '学号',
                'student_id_placeholder': '请输入您的学号',
                'confirm_password': '确认密码',
                'confirm_password_placeholder': '请再次输入您的密码',
                'password_strength': '密码强度',
                'remember_me': '记住我',
                'forgot_password': '忘记密码？',
                'or': '或',
                'login_with_google': '使用 Google 登录',
                'login_with_microsoft': '使用 Microsoft 登录',
                'register_with_google': '使用 Google 注册',
                'register_with_microsoft': '使用 Microsoft 注册',
                'no_account': '还没有账户？',
                'have_account': '已有账户？',
                'register_now': '立即注册',
                'login_now': '立即登录',
                'agree_to': '我同意',
                'and': '和',
                'back_home': '返回首页',
                'academic_resources': '学术资源',
                'cloud_storage': '云端存储',
                'community': '学习社区',
                'resource_sharing': '资源共享',
                
                // 一键直达功能
                'quick_access': '一键直达',
                'cityu_portal': '又一城',
                'canvas': 'Canvas',
                'aims': 'AIMS',
                'outlook': 'Outlook邮箱',
                'calendar': '日程表'
            },
            
            // 繁体中文
            'zh-TW': {
                // 網站名稱
                'site_name': 'Easy CityU',
                
                // 導航
                'home': '首頁',
                'resources': '資源瀏覽',
                'forum': '學生論壇',
                'about': '關於我們',
                
                // 英雄區域
                'hero_title': 'Easy CityU',
                'hero_subtitle': '城大學術資源管理平台',
                'hero_description': '輕鬆獲取、分享和管理城市大學的學術資源',
                'search_placeholder': '搜索課程、專業、論文...',
                'search_button': '搜索',
                'photo_search': '拍照搜索',
                
                // 篩選器
                'filter_degree': '學位',
                'filter_field': '專業領域',
                'filter_year': '年份',
                'filter_all': '全部',
                'filter_bachelor': '本科',
                'filter_master': '碩士',
                'filter_phd': '博士',
                'filter_cs': '計算機科學',
                'filter_business': '商學',
                'filter_engineering': '工程學',
                'filter_arts': '人文藝術',
                'filter_science': '自然科學',
                'filter_social': '社會科學',
                
                // 特色功能
                'features_title': '特色功能',
                'feature_search_title': '智能搜索',
                'feature_search_desc': '支持文本搜索和拍照搜索，快速找到所需資源',
                'feature_filter_title': '精細篩選',
                'feature_filter_desc': '按學位、專業、年份等多維度篩選，精準定位資源',
                'feature_upload_title': '資源共享',
                'feature_upload_desc': '上傳筆記、作業、複習資料，與同學共享學習成果',
                'feature_forum_title': '學生論壇',
                'feature_forum_desc': '交流學習經驗，討論學術問題，建立學習社區',
                
                // 論壇
                'forum_title': '學生論壇',
                'forum_description': '分享經驗，解答疑惑，共同進步',
                'forum_tab_upload': '上傳資料',
                'forum_tab_recent': '最新帖子',
                'forum_tab_popular': '熱門討論',
                'latest_replies': '最新回覆',
                'drag_drop_files': '拖拽文件到此處或點擊上傳',
                'select_files': '選擇文件',
                'file_info': '文件信息',
                'course_name': '課程名稱',
                'course_name_placeholder': '例如：CS3103 數據結構與算法',
                'course_code': '課程編號',
                'course_code_placeholder': '例如：GE1401',
                'file_type': '文件類型',
                'file_type_notes': '筆記',
                'file_type_assignment': '作業',
                'file_type_exam': '考試資料',
                'file_type_project': '項目報告',
                'file_type_other': '其他',
                'college': '學院',
                'college_cs': '計算機學院',
                'college_business': '商學院',
                'college_engineering': '工程學院',
                'college_science': '理學院',
                'college_humanities': '人文學院',
                'college_social': '社會科學學院',
                'college_law': '法學院',
                'college_other': '其他學院',
                'difficulty': '難度等級',
                'difficulty_beginner': '入門級',
                'difficulty_intermediate': '中級',
                'difficulty_advanced': '高級',
                'difficulty_expert': '專家級',
                'description': '描述',
                'description_placeholder': '請簡要描述文件內容，幫助其他同學了解...',
                'tags': '標籤',
                'tags_placeholder': '輸入標籤，用逗號分隔',
                'submit': '提交',
                'search_history': '搜索歷史',
                'clear_history': '清除歷史',
                'processing_image': '正在處理圖像...',
                
                // 資源瀏覽
                'resources_title': '資源瀏覽',
                'resources_description': '瀏覽和下載學習資源',
                'sort_by': '排序方式',
                'sort_newest': '最新上傳',
                'sort_popular': '最受歡迎',
                
                // 新增缺失的翻譯鍵
                'all_course_types': '所有課程類型',
                'all_difficulties': '所有難度級別',
                'all_rights_reserved': '版權所有',
                'assignment_answers': '作業答案',
                'cancel': '取消',
                'capture': '拍照',
                'cloud_storage': '雲存儲',
                'cloud_storage_desc': '安全存儲和訪問您的學術資源',
                'confirm': '確認',
                'confirm_action': '確認操作',
                'course_notes': '課程筆記',
                'course_slides': '課程幻燈片',
                'file_information': '文件信息',
                'file_type': '文件類型',
                'follow_us': '關注我們',
                'home': '首頁',
                'login': '登錄',
                'past_exams': '往年試卷',
                'phone': '電話',
                'platform_features': '平台特色',
                'popular_posts': '熱門帖子',
                'project_reports': '項目報告',
                'quick_links': '快速鏈接',
                'recent_posts': '最新帖子',
                'register': '註冊',
                'resource_management': '資源管理',
                'resource_management_desc': '高效管理您的學術資源',
                'review_materials': '複習資料',
                'search_button': '搜索',
                'site_name': 'Easy CityU',
                'smart_search': '智能搜索',
                'smart_search_desc': '快速找到您需要的資源',
                'student_forum': '學生論壇',
                'student_forum_desc': '交流學習經驗和問題',
                'upload_file': '上傳文件',
                'upload_resources': '上傳資源',
                
                // 關於我們
                'about': '關於',
                'about_description': '關於我們的描述',
                'about_us': '關於我們',
                'contact_us': '聯繫我們',
                
                // 篩選器相關
                'degree_type': '學位類型',
                'field': '專業領域', 
                'year': '年份',
                'all_degrees': '所有學位',
                'all_fields': '所有專業',
                'all_years': '所有年份',
                'bachelor': '本科',
                'master': '碩士', 
                'phd': '博士',
                'engineering': '工程學',
                'business': '商學',
                'science': '自然科學',
                'arts': '人文藝術',
                
                // 瀏覽相關
                'browse': '瀏覽',
                'browse_resources': '瀏覽資源',
                
                // 難度級別
                'beginner': '初學者',
                'intermediate': '中級',
                'advanced': '高級',
                'expert': '專家',
                'all_difficulties': '所有難度級別',
                'difficulty': '難度級別',
                
                // 學院相關
                'college': '學院',
                'all_colleges': '所有學院',
                'select_college': '選擇學院',
                'select_difficulty': '選擇難度',
                'select_type': '選擇類型',
                'sort_rating': '評分最高',
                'advanced_filter': '高級篩選',
                'filter_college': '學院',
                'filter_course_type': '課程類型',
                'filter_difficulty': '難度等級',
                'apply_filter': '應用篩選',
                'reset_filter': '重置篩選',
                
                // 關於我們
                'about_title': '關於我們',
                'about_description': '了解Easy CityU的使命和團隊',
                'our_mission': '我們的使命',
                'mission_text': 'Easy CityU致力於為城市大學的學生提供一個便捷、高效的學術資源管理平台，幫助學生更好地獲取、分享和管理學習資源，提高學習效率，促進學術交流。',
                'our_team': '我們的團隊',
                'contact_us': '聯繫我們',
                'email': '電子郵件',
                'social_media': '社交媒體',
                
                // 頁腳
                'footer_description': 'Easy CityU - 城大學術資源管理平台',
                'quick_links': '快速鏈接',
                'privacy_policy': '隱私政策',
                'terms_of_service': '服務條款',
                'faq': '常見問題',
                'copyright': '版權所有 © 2025 Easy CityU. 保留所有權利。',
                
                // 通用
                'loading': '加載中...',
                'view_more': '查看更多',
                'view_details': '查看詳情',
                'download': '下載',
                'share': '分享',
                'like': '點贊',
                'comment': '評論',
                'views': '瀏覽',
                'likes': '點贊',
                'comments': '評論',
                'upload_time': '上傳時間',
                'author': '作者',
                'rating': '評分',
                'submit_success': '提交成功',
                'submit_error': '提交失敗',
                'network_error': '網絡錯誤',
                'login_required': '需要登錄',
                'login': '登錄',
                'register': '註冊',
                'logout': '退出',
                'profile': '個人資料',
                'settings': '設置',
                'language': '語言',
                'theme': '主題',
                'light_mode': '亮色模式',
                'dark_mode': '暗色模式',
                'system_theme': '跟隨系統',
                'simplified_chinese': '簡體中文',
                'traditional_chinese': '繁體中文',
                'english': '英文',
                
                // 認證相關
                'login_description': '歡迎回到 Easy CityU',
                'register_description': '加入 Easy CityU 學習社區',
                'email_placeholder': '請輸入您的郵箱地址',
                'password_placeholder': '請輸入您的密碼',
                'first_name': '名',
                'last_name': '姓',
                'first_name_placeholder': '請輸入您的名',
                'last_name_placeholder': '請輸入您的姓',
                'student_id': '學號',
                'student_id_placeholder': '請輸入您的學號',
                'confirm_password': '確認密碼',
                'confirm_password_placeholder': '請再次輸入您的密碼',
                'password_strength': '密碼強度',
                'remember_me': '記住我',
                'forgot_password': '忘記密碼？',
                'or': '或',
                'login_with_google': '使用 Google 登錄',
                'login_with_microsoft': '使用 Microsoft 登錄',
                'register_with_google': '使用 Google 註冊',
                'register_with_microsoft': '使用 Microsoft 註冊',
                'no_account': '還沒有賬戶？',
                'have_account': '已有賬戶？',
                'register_now': '立即註冊',
                'login_now': '立即登錄',
                'agree_to': '我同意',
                'and': '和',
                'back_home': '返回首頁',
                'academic_resources': '學術資源',
                'cloud_storage': '雲端存儲',
                'community': '學習社區',
                'resource_sharing': '資源共享',
                
                // 一鍵直達功能
                'quick_access': '一鍵直達',
                'cityu_portal': '又一城',
                'canvas': 'Canvas',
                'aims': 'AIMS',
                'outlook': 'Outlook郵箱',
                'calendar': '日程表'
            },
            
            // 英文
            'en': {
                // Site Name
                'site_name': 'Easy CityU',
                
                // Navigation
                'home': 'Home',
                'resources': 'Resources',
                'forum': 'Forum',
                'about': 'About',
                
                // Hero Section
                'hero_title': 'Easy CityU',
                'hero_subtitle': 'CityU Academic Resource Platform',
                'hero_description': 'Easily access, share and manage academic resources at City University',
                'search_placeholder': 'Search courses, materials, notes...',
                'search_button': 'Search',
                'photo_search': 'Photo Search',
                
                // Filters
                'filter_degree': 'Degree',
                'filter_field': 'Field',
                'filter_year': 'Year',
                'filter_all': 'All',
                'filter_bachelor': 'Bachelor',
                'filter_master': 'Master',
                'filter_phd': 'PhD',
                
                // New filter related translations
                'degree_type': 'Degree Type',
                'field': 'Field',
                'year': 'Year',
                'all_degrees': 'All Degrees',
                'all_fields': 'All Fields',
                'all_years': 'All Years',
                'bachelor': 'Bachelor',
                'master': 'Master',
                'phd': 'PhD',
                'engineering': 'Engineering',
                'business': 'Business',
                'science': 'Science',
                'arts': 'Arts',
                
                // Browse related
                'browse': 'Browse',
                'browse_resources': 'Browse Resources',
                
                // Difficulty levels
                'beginner': 'Beginner',
                'intermediate': 'Intermediate',
                'advanced': 'Advanced',
                'expert': 'Expert',
                'all_difficulties': 'All Difficulties',
                'difficulty': 'Difficulty',
                
                // College related
                'college': 'College',
                'all_colleges': 'All Colleges',
                'select_college': 'Select College',
                'select_difficulty': 'Select Difficulty',
                'select_type': 'Select Type',
                
                // New missing translations
                'all_course_types': 'All Course Types',
                'all_difficulties': 'All Difficulties',
                'all_rights_reserved': 'All Rights Reserved',
                'assignment_answers': 'Assignment Answers',
                'cancel': 'Cancel',
                'capture': 'Capture',
                'cloud_storage': 'Cloud Storage',
                'cloud_storage_desc': 'Securely store and access your academic resources',
                'confirm': 'Confirm',
                'confirm_action': 'Confirm Action',
                'course_notes': 'Course Notes',
                'course_slides': 'Course Slides',
                'file_information': 'File Information',
                'file_type': 'File Type',
                'follow_us': 'Follow Us',
                'home': 'Home',
                'login': 'Login',
                'past_exams': 'Past Exams',
                'phone': 'Phone',
                'platform_features': 'Platform Features',
                'popular_posts': 'Popular Posts',
                'project_reports': 'Project Reports',
                'quick_links': 'Quick Links',
                'recent_posts': 'Recent Posts',
                'register': 'Register',
                'resource_management': 'Resource Management',
                'resource_management_desc': 'Efficiently manage your academic resources',
                'review_materials': 'Review Materials',
                'search_button': 'Search',
                'site_name': 'Easy CityU',
                'smart_search': 'Smart Search',
                'smart_search_desc': 'Quickly find the resources you need',
                'student_forum': 'Student Forum',
                'student_forum_desc': 'Exchange learning experiences and questions',
                'upload_file': 'Upload File',
                'upload_resources': 'Upload Resources',
                
                // About us
                'about': 'About',
                'about_description': 'About us description',
                'about_us': 'About Us',
                'contact_us': 'Contact Us',
                'filter_cs': 'Computer Science',
                'filter_business': 'Business',
                'filter_engineering': 'Engineering',
                'filter_arts': 'Arts & Humanities',
                'filter_science': 'Natural Sciences',
                'filter_social': 'Social Sciences',
                
                // Features
                'features_title': 'Features',
                'feature_search_title': 'Smart Search',
                'feature_search_desc': 'Text and photo search to quickly find resources',
                'feature_filter_title': 'Precise Filtering',
                'feature_filter_desc': 'Filter by degree, field, year and more',
                'feature_upload_title': 'Resource Sharing',
                'feature_upload_desc': 'Share notes, assignments and study materials',
                'feature_forum_title': 'Student Forum',
                'feature_forum_desc': 'Discuss academic topics and build a learning community',
                
                // Forum
                'forum_title': 'Student Forum',
                'forum_description': 'Share experiences, ask questions, grow together',
                'forum_tab_upload': 'Upload',
                'forum_tab_recent': 'Recent Posts',
                'forum_tab_popular': 'Popular',
                'latest_replies': 'Latest Replies',
                'drag_drop_files': 'Drag and drop files here or click to upload',
                'select_files': 'Select Files',
                'file_info': 'File Information',
                'course_name': 'Course Name',
                'course_name_placeholder': 'e.g., CS3103 Data Structures and Algorithms',
                'course_code': 'Course Code',
                'course_code_placeholder': 'e.g., GE1401',
                'file_type': 'File Type',
                'file_type_notes': 'Notes',
                'file_type_assignment': 'Assignment',
                'file_type_exam': 'Exam Materials',
                'file_type_project': 'Project Report',
                'file_type_other': 'Other',
                'college': 'College',
                'college_cs': 'College of Computer Science',
                'college_business': 'Business School',
                'college_engineering': 'College of Engineering',
                'college_science': 'College of Science',
                'college_humanities': 'College of Humanities',
                'college_social': 'College of Social Sciences',
                'college_law': 'School of Law',
                'college_other': 'Other Colleges',
                'difficulty': 'Difficulty Level',
                'difficulty_beginner': 'Beginner',
                'difficulty_intermediate': 'Intermediate',
                'difficulty_advanced': 'Advanced',
                'difficulty_expert': 'Expert',
                'description': 'Description',
                'description_placeholder': 'Briefly describe the content to help others understand...',
                'tags': 'Tags',
                'tags_placeholder': 'Enter tags, separated by commas',
                'submit': 'Submit',
                'search_history': 'Search History',
                'clear_history': 'Clear History',
                'processing_image': 'Processing image...',
                
                // Resources
                'resources_title': 'Resources',
                'resources_description': 'Browse and download learning resources',
                'sort_by': 'Sort by',
                'sort_newest': 'Newest',
                'sort_popular': 'Most Popular',
                'sort_rating': 'Highest Rated',
                'advanced_filter': 'Advanced Filter',
                'filter_college': 'College',
                'filter_course_type': 'Course Type',
                'filter_difficulty': 'Difficulty',
                'apply_filter': 'Apply Filter',
                'reset_filter': 'Reset',
                
                // About
                'about_title': 'About Us',
                'about_description': 'Learn about Easy CityU\'s mission and team',
                'our_mission': 'Our Mission',
                'mission_text': 'Easy CityU is dedicated to providing City University students with a convenient and efficient academic resource management platform, helping students better access, share and manage learning resources, improve learning efficiency, and promote academic exchange.',
                'our_team': 'Our Team',
                'contact_us': 'Contact Us',
                'email': 'Email',
                'social_media': 'Social Media',
                
                // Footer
                'footer_description': 'Easy CityU - CityU Academic Resource Platform',
                'quick_links': 'Quick Links',
                'privacy_policy': 'Privacy Policy',
                'terms_of_service': 'Terms of Service',
                'faq': 'FAQ',
                'copyright': 'Copyright © 2025 Easy CityU. All rights reserved.',
                
                // Common
                'loading': 'Loading...',
                'view_more': 'View More',
                'view_details': 'View Details',
                'download': 'Download',
                'share': 'Share',
                'like': 'Like',
                'comment': 'Comment',
                'views': 'Views',
                'likes': 'Likes',
                'comments': 'Comments',
                'upload_time': 'Upload Time',
                'author': 'Author',
                'rating': 'Rating',
                'submit_success': 'Submitted Successfully',
                'submit_error': 'Submission Failed',
                'network_error': 'Network Error',
                'login_required': 'Login Required',
                'login': 'Login',
                'register': 'Register',
                'logout': 'Logout',
                'profile': 'Profile',
                'settings': 'Settings',
                'language': 'Language',
                'theme': 'Theme',
                'light_mode': 'Light Mode',
                'dark_mode': 'Dark Mode',
                'system_theme': 'System Theme',
                'simplified_chinese': 'Simplified Chinese',
                'traditional_chinese': 'Traditional Chinese',
                'english': 'English',
                
                // Authentication related
                'login_description': 'Welcome back to Easy CityU',
                'register_description': 'Join the Easy CityU learning community',
                'email_placeholder': 'Enter your email address',
                'password_placeholder': 'Enter your password',
                'first_name': 'First Name',
                'last_name': 'Last Name',
                'first_name_placeholder': 'Enter your first name',
                'last_name_placeholder': 'Enter your last name',
                'student_id': 'Student ID',
                'student_id_placeholder': 'Enter your student ID',
                'confirm_password': 'Confirm Password',
                'confirm_password_placeholder': 'Re-enter your password',
                'password_strength': 'Password Strength',
                'remember_me': 'Remember me',
                'forgot_password': 'Forgot password?',
                'or': 'or',
                'login_with_google': 'Login with Google',
                'login_with_microsoft': 'Login with Microsoft',
                'register_with_google': 'Register with Google',
                'register_with_microsoft': 'Register with Microsoft',
                'no_account': 'Don\'t have an account?',
                'have_account': 'Already have an account?',
                'register_now': 'Register now',
                'login_now': 'Login now',
                'agree_to': 'I agree to the',
                'and': 'and',
                'back_home': 'Back to Home',
                'academic_resources': 'Academic Resources',
                'cloud_storage': 'Cloud Storage',
                'community': 'Learning Community',
                'resource_sharing': 'Resource Sharing',
                
                // Quick Access Features
                'quick_access': 'Quick Access',
                'cityu_portal': 'CityU Portal',
                'canvas': 'Canvas',
                'aims': 'AIMS',
                'outlook': 'Outlook',
                'calendar': 'Calendar'
            }
        },
        
        /**
         * 初始化语言模块
         */
        init: function() {
            console.log('开始初始化语言模块...');
            
            // 从本地存储加载语言
            this.loadLanguage();
            
            // 绑定事件
            this.bindEvents();
            
            // 确保DOM完全加载后再次更新文本元素
            setTimeout(() => {
                console.log('延迟更新文本元素...');
                this.updateTextElements();
            }, 100);
            
            // 再次延迟更新，确保所有动态内容都已加载
            setTimeout(() => {
                console.log('二次延迟更新文本元素...');
                this.updateTextElements();
            }, 500);
            
            console.log('语言模块初始化完成，当前语言:', this.currentLanguage);
        },
        
        /**
         * 绑定事件
         */
        bindEvents: function() {
            // 获取语言选择器
            const languageSelect = document.getElementById('languageSelect');
            
            // 绑定change事件
            if (languageSelect) {
                console.log('找到语言选择器，绑定事件...');
                languageSelect.addEventListener('change', (e) => {
                    const selectedValue = e.target.value;
                    let language;
                    
                    switch (selectedValue) {
                        case 'zh':
                            language = this.ZH_CN; // 'zh-CN'
                            break;
                        case 'zh-tw':
                            language = this.ZH_TW; // 'zh-TW'
                            break;
                        case 'en':
                            language = this.EN; // 'en'
                            break;
                        default:
                            language = this.ZH_CN;
                    }
                    
                    console.log('语言切换:', selectedValue, '->', language);
                    this.changeLanguage(language);
                });
            } else {
                console.warn('未找到语言选择器 #languageSelect');
                // 延迟重试绑定
                setTimeout(() => {
                    console.log('延迟重试绑定语言选择器...');
                    this.bindEvents();
                }, 500);
            }
            
            // 兼容旧的按钮方式（如果存在）
            const zhCNBtn = document.getElementById('langZhCN');
            const zhTWBtn = document.getElementById('langZhTW');
            const enBtn = document.getElementById('langEn');
            
            if (zhCNBtn) {
                zhCNBtn.addEventListener('click', () => {
                    this.changeLanguage(this.ZH_CN);
                });
            }
            
            if (zhTWBtn) {
                zhTWBtn.addEventListener('click', () => {
                    this.changeLanguage(this.ZH_TW);
                });
            }
            
            if (enBtn) {
                enBtn.addEventListener('click', () => {
                    this.changeLanguage(this.EN);
                });
            }
        },
        
        /**
         * 加载语言
         */
        loadLanguage: function() {
            console.log('开始加载语言设置...');
            
            // 从本地存储获取语言
            let language = null;
            
            try {
                language = localStorage.getItem(this.storageKey);
                console.log('从本地存储获取的语言:', language);
            } catch (error) {
                console.error('从本地存储加载语言失败:', error);
            }
            
            // 如果没有保存的语言，使用浏览器语言
            if (!language) {
                language = this.getBrowserLanguage();
                console.log('使用浏览器默认语言:', language);
            }
            
            // 设置当前语言
            this.currentLanguage = language;
            console.log('设置当前语言为:', this.currentLanguage);
            
            // 应用语言
            this.applyLanguage(language);
        },
        
        /**
         * 保存语言
         * @param {string} language - 语言类型
         */
        saveLanguage: function(language) {
            try {
                localStorage.setItem(this.storageKey, language);
            } catch (error) {
                console.error('保存语言到本地存储失败:', error);
            }
        },
        
        /**
         * 应用语言
         * @param {string} language - 语言类型
         */
        applyLanguage: function(language) {
            // 确保语言类型有效
            if (!this.translations[language]) {
                language = this.ZH_CN;
            }
            
            // 更新当前语言
            this.currentLanguage = language;
            
            // 更新文档语言
            document.documentElement.setAttribute('lang', language);
            
            // 更新语言切换按钮的活动状态
            this.updateLanguageButtonsState();
            
            // 更新页面上的文本
            this.updateTextElements();
            
            // 保存语言
            this.saveLanguage(language);
        },
        
        /**
         * 更改语言
         * @param {string} language - 语言类型
         */
        changeLanguage: function(language) {
            console.log('开始切换语言到:', language);
            
            // 应用新语言
            this.applyLanguage(language);
            
            // 强制更新所有文本元素
            setTimeout(() => {
                console.log('延迟更新文本元素...');
                this.updateTextElements();
                
                // 通知其他模块语言已更改
                this.notifyLanguageChange(language);
            }, 50);
        },
        
        /**
         * 通知其他模块语言已更改
         * @param {string} language - 新语言
         */
        notifyLanguageChange: function(language) {
            // 触发自定义事件
            const event = new CustomEvent('languageChanged', {
                detail: { language: language }
            });
            document.dispatchEvent(event);
            
            // 更新资源模块
            if (window.APP && APP.Resources && typeof APP.Resources.updateLanguage === 'function') {
                APP.Resources.updateLanguage();
            }
            
            // 更新论坛模块
            if (window.APP && APP.ForumPosts && typeof APP.ForumPosts.updateLanguage === 'function') {
                APP.ForumPosts.updateLanguage();
            }
        },
        
        /**
         * 更新语言切换按钮的活动状态
         */
        updateLanguageButtonsState: function() {
            // 更新语言选择器
            const languageSelect = document.getElementById('languageSelect');
            if (languageSelect) {
                let selectValue;
                switch (this.currentLanguage) {
                    case this.ZH_CN: // 'zh-CN'
                        selectValue = 'zh';
                        break;
                    case this.ZH_TW: // 'zh-TW'
                        selectValue = 'zh-tw';
                        break;
                    case this.EN: // 'en'
                        selectValue = 'en';
                        break;
                    default:
                        selectValue = 'zh';
                }
                languageSelect.value = selectValue;
                console.log('更新语言选择器:', this.currentLanguage, '->', selectValue);
            }
            
            // 获取语言切换按钮（兼容旧版本）
            const zhCNBtn = document.getElementById('langZhCN');
            const zhTWBtn = document.getElementById('langZhTW');
            const enBtn = document.getElementById('langEn');
            
            // 移除所有按钮的活动状态
            if (zhCNBtn) zhCNBtn.classList.remove('active');
            if (zhTWBtn) zhTWBtn.classList.remove('active');
            if (enBtn) enBtn.classList.remove('active');
            
            // 添加当前语言按钮的活动状态
            switch (this.currentLanguage) {
                case this.ZH_CN:
                    if (zhCNBtn) zhCNBtn.classList.add('active');
                    break;
                case this.ZH_TW:
                    if (zhTWBtn) zhTWBtn.classList.add('active');
                    break;
                case this.EN:
                    if (enBtn) enBtn.classList.add('active');
                    break;
            }
        },
        
        /**
         * 更新页面上的文本元素
         */
        updateTextElements: function() {
            console.log('开始更新文本元素，当前语言:', this.currentLanguage);
            
            // 获取所有带有data-translate属性的元素
            const elements = document.querySelectorAll('[data-translate]');
            console.log('找到', elements.length, '个需要翻译的元素');
            
            // 更新每个元素的文本
            elements.forEach(element => {
                const key = element.getAttribute('data-translate');
                const translation = this.getTranslation(key);
                
                if (translation && translation !== key) {
                    // 如果元素是输入框或文本区域，更新placeholder
                    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        if (element.getAttribute('placeholder')) {
                            element.setAttribute('placeholder', translation);
                        } else {
                            element.value = translation;
                        }
                    } else {
                        element.textContent = translation;
                    }
                    console.log('已更新元素:', key, '->', translation);
                } else {
                    console.warn('未找到翻译或翻译无效:', key, '当前语言:', this.currentLanguage);
                }
            });
            
            // 更新所有带有data-translate-title属性的元素的title属性
            const titleElements = document.querySelectorAll('[data-translate-title]');
            titleElements.forEach(element => {
                const key = element.getAttribute('data-translate-title');
                const translation = this.getTranslation(key);
                
                if (translation) {
                    element.setAttribute('title', translation);
                }
            });
            
            // 更新所有带有data-translate-aria-label属性的元素的aria-label属性
            const ariaLabelElements = document.querySelectorAll('[data-translate-aria-label]');
            ariaLabelElements.forEach(element => {
                const key = element.getAttribute('data-translate-aria-label');
                const translation = this.getTranslation(key);
                
                if (translation) {
                    element.setAttribute('aria-label', translation);
                }
            });

            // 更新所有带有data-translate-placeholder属性的元素的placeholder属性
            const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
            placeholderElements.forEach(element => {
                const key = element.getAttribute('data-translate-placeholder');
                const translation = this.getTranslation(key);
                
                if (translation) {
                    element.setAttribute('placeholder', translation);
                    console.log('已更新placeholder:', key, '->', translation);
                } else {
                    console.warn('未找到placeholder翻译:', key);
                }
            });
        },
        
        /**
         * 获取翻译
         * @param {string} key - 翻译键
         * @returns {string} - 翻译文本
         */
        getTranslation: function(key) {
            // 获取当前语言的翻译
            const translations = this.translations[this.currentLanguage];
            
            // 如果没有找到翻译，返回键名
            if (!translations || !translations[key]) {
                return key;
            }
            
            return translations[key];
        },
        
        /**
         * 翻译函数 - 为了兼容性提供的别名
         * @param {string} key - 翻译键
         * @returns {string} - 翻译文本
         */
        translate: function(key) {
            return this.getTranslation(key);
        },
        
        /**
         * 获取当前语言
         * @returns {string} - 当前语言代码
         */
        getCurrentLanguage: function() {
            return this.currentLanguage;
        },
        
        /**
         * 获取浏览器语言
         * @returns {string} - 语言类型
         */
        getBrowserLanguage: function() {
            // 获取浏览器语言
            const browserLanguage = navigator.language || navigator.userLanguage;
            console.log('检测到浏览器语言:', browserLanguage);
            
            // 根据浏览器语言返回对应的语言类型
            if (browserLanguage.startsWith('zh')) {
                if (browserLanguage === 'zh-TW' || browserLanguage === 'zh-HK') {
                    return this.ZH_TW;
                } else {
                    return this.ZH_CN;
                }
            } else if (browserLanguage.startsWith('en')) {
                return this.EN;
            }
            
            // 默认返回简体中文
            return this.ZH_CN;
        }
    };
})();
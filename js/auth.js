/**
 * Easy CityU - 学术资源管理平台
 * 认证模块 - 处理登录和注册功能
 * 版本: 1.0.0
 * 日期: 2025/09/09
 */

(function() {
    'use strict';
    
    // 全局命名空间
    window.APP = window.APP || {};
    
    // 认证模块
    APP.Auth = {
        /**
         * 初始化认证模块
         */
        init: function() {
            console.log('初始化认证模块...');
            
            // 初始化语言系统
            if (APP.Language && typeof APP.Language.init === 'function') {
                APP.Language.init();
            }
            
            // 绑定事件
            this.bindEvents();
            
            // 初始化表单验证
            this.initFormValidation();
            
            console.log('认证模块初始化完成');
        },
        
        /**
         * 绑定事件
         */
        bindEvents: function() {
            // 密码显示/隐藏切换
            const passwordToggles = document.querySelectorAll('.password-toggle');
            passwordToggles.forEach(toggle => {
                toggle.addEventListener('click', this.togglePassword.bind(this));
            });
            
            // 登录表单提交
            const loginForm = document.getElementById('loginForm');
            if (loginForm) {
                loginForm.addEventListener('submit', this.handleLogin.bind(this));
            }
            
            // 注册表单提交
            const registerForm = document.getElementById('registerForm');
            if (registerForm) {
                registerForm.addEventListener('submit', this.handleRegister.bind(this));
                
                // 密码强度检测
                const passwordInput = registerForm.querySelector('#password');
                if (passwordInput) {
                    passwordInput.addEventListener('input', this.checkPasswordStrength.bind(this));
                }
                
                // 确认密码验证
                const confirmPasswordInput = registerForm.querySelector('#confirmPassword');
                if (confirmPasswordInput) {
                    confirmPasswordInput.addEventListener('input', this.validatePasswordMatch.bind(this));
                }
            }
            
            // 社交登录按钮
            const socialBtns = document.querySelectorAll('.social-btn');
            socialBtns.forEach(btn => {
                btn.addEventListener('click', this.handleSocialLogin.bind(this));
            });
        },
        
        /**
         * 初始化表单验证
         */
        initFormValidation: function() {
            const inputs = document.querySelectorAll('input[required]');
            inputs.forEach(input => {
                input.addEventListener('blur', this.validateField.bind(this));
                input.addEventListener('input', this.clearFieldError.bind(this));
            });
        },
        
        /**
         * 切换密码显示/隐藏
         */
        togglePassword: function(e) {
            const toggle = e.currentTarget;
            const input = toggle.parentElement.querySelector('input');
            const icon = toggle.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        },
        
        /**
         * 处理登录
         */
        handleLogin: function(e) {
            e.preventDefault();
            
            const form = e.target;
            const submitBtn = form.querySelector('.auth-btn.primary');
            const formData = new FormData(form);
            
            // 验证表单
            if (!this.validateForm(form)) {
                return;
            }
            
            // 显示加载状态
            this.setButtonLoading(submitBtn, true);
            
            // 模拟登录请求
            setTimeout(() => {
                // 这里应该是实际的登录API调用
                console.log('登录数据:', {
                    email: formData.get('email'),
                    password: formData.get('password'),
                    remember: formData.get('remember')
                });
                
                // 模拟成功登录
                this.setButtonLoading(submitBtn, false);
                this.showMessage('登录成功！正在跳转...', 'success');
                
                // 跳转到主页
                setTimeout(() => {
                    window.location.href = 'main.html';
                }, 1500);
                
            }, 2000);
        },
        
        /**
         * 处理注册
         */
        handleRegister: function(e) {
            e.preventDefault();
            
            const form = e.target;
            const submitBtn = form.querySelector('.auth-btn.primary');
            const formData = new FormData(form);
            
            // 验证表单
            if (!this.validateForm(form)) {
                return;
            }
            
            // 验证密码匹配
            if (!this.validatePasswordMatch()) {
                return;
            }
            
            // 显示加载状态
            this.setButtonLoading(submitBtn, true);
            
            // 模拟注册请求
            setTimeout(() => {
                // 这里应该是实际的注册API调用
                console.log('注册数据:', {
                    firstName: formData.get('firstName'),
                    lastName: formData.get('lastName'),
                    email: formData.get('email'),
                    studentId: formData.get('studentId'),
                    password: formData.get('password')
                });
                
                // 模拟成功注册
                this.setButtonLoading(submitBtn, false);
                this.showMessage('注册成功！请查收验证邮件', 'success');
                
                // 跳转到登录页
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
                
            }, 2000);
        },
        
        /**
         * 处理社交登录
         */
        handleSocialLogin: function(e) {
            const btn = e.currentTarget;
            const provider = btn.classList.contains('google') ? 'Google' : 'Microsoft';
            
            this.setButtonLoading(btn, true);
            
            // 模拟社交登录
            setTimeout(() => {
                this.setButtonLoading(btn, false);
                this.showMessage(`${provider} 登录功能即将推出`, 'info');
            }, 1500);
        },
        
        /**
         * 验证表单
         */
        validateForm: function(form) {
            const inputs = form.querySelectorAll('input[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!this.validateField({ target: input })) {
                    isValid = false;
                }
            });
            
            return isValid;
        },
        
        /**
         * 验证单个字段
         */
        validateField: function(e) {
            const input = e.target;
            const value = input.value.trim();
            const type = input.type;
            const name = input.name;
            
            // 清除之前的错误
            this.clearFieldError({ target: input });
            
            // 必填验证
            if (input.required && !value) {
                this.showFieldError(input, '此字段为必填项');
                return false;
            }
            
            // 邮箱验证
            if (type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    this.showFieldError(input, '请输入有效的邮箱地址');
                    return false;
                }
            }
            
            // 密码验证
            if (name === 'password' && value) {
                if (value.length < 6) {
                    this.showFieldError(input, '密码长度至少6位');
                    return false;
                }
            }
            
            // 学号验证
            if (name === 'studentId' && value) {
                const studentIdRegex = /^[0-9]{8,10}$/;
                if (!studentIdRegex.test(value)) {
                    this.showFieldError(input, '请输入有效的学号');
                    return false;
                }
            }
            
            // 显示成功状态
            this.showFieldSuccess(input);
            return true;
        },
        
        /**
         * 检查密码强度
         */
        checkPasswordStrength: function(e) {
            const input = e.target;
            const password = input.value;
            const strengthBar = document.querySelector('.strength-fill');
            const strengthText = document.querySelector('.strength-text');
            
            if (!strengthBar || !strengthText) return;
            
            let strength = 0;
            let strengthLabel = '';
            
            // 长度检查
            if (password.length >= 6) strength += 1;
            if (password.length >= 10) strength += 1;
            
            // 复杂度检查
            if (/[a-z]/.test(password)) strength += 1;
            if (/[A-Z]/.test(password)) strength += 1;
            if (/[0-9]/.test(password)) strength += 1;
            if (/[^A-Za-z0-9]/.test(password)) strength += 1;
            
            // 设置强度等级
            if (strength <= 2) {
                strengthBar.className = 'strength-fill weak';
                strengthLabel = '弱';
            } else if (strength <= 4) {
                strengthBar.className = 'strength-fill medium';
                strengthLabel = '中等';
            } else {
                strengthBar.className = 'strength-fill strong';
                strengthLabel = '强';
            }
            
            strengthText.textContent = `密码强度: ${strengthLabel}`;
        },
        
        /**
         * 验证密码匹配
         */
        validatePasswordMatch: function(e) {
            const passwordInput = document.getElementById('password');
            const confirmPasswordInput = document.getElementById('confirmPassword');
            
            if (!passwordInput || !confirmPasswordInput) return true;
            
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            
            if (confirmPassword && password !== confirmPassword) {
                this.showFieldError(confirmPasswordInput, '两次输入的密码不一致');
                return false;
            } else if (confirmPassword) {
                this.showFieldSuccess(confirmPasswordInput);
            }
            
            return true;
        },
        
        /**
         * 显示字段错误
         */
        showFieldError: function(input, message) {
            const formGroup = input.closest('.form-group');
            formGroup.classList.remove('success');
            formGroup.classList.add('error');
            
            // 移除之前的错误消息
            const existingError = formGroup.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            // 添加错误消息
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
            formGroup.appendChild(errorDiv);
        },
        
        /**
         * 显示字段成功
         */
        showFieldSuccess: function(input) {
            const formGroup = input.closest('.form-group');
            formGroup.classList.remove('error');
            formGroup.classList.add('success');
            
            // 移除错误消息
            const existingError = formGroup.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
        },
        
        /**
         * 清除字段错误
         */
        clearFieldError: function(e) {
            const input = e.target;
            const formGroup = input.closest('.form-group');
            formGroup.classList.remove('error', 'success');
            
            const existingError = formGroup.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
        },
        
        /**
         * 设置按钮加载状态
         */
        setButtonLoading: function(button, loading) {
            if (loading) {
                button.classList.add('loading');
                button.disabled = true;
            } else {
                button.classList.remove('loading');
                button.disabled = false;
            }
        },
        
        /**
         * 显示消息
         */
        showMessage: function(message, type = 'info') {
            // 创建消息元素
            const messageDiv = document.createElement('div');
            messageDiv.className = `auth-message ${type}`;
            messageDiv.innerHTML = `
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            `;
            
            // 添加样式
            messageDiv.style.cssText = `
                position: fixed;
                top: 30px;
                right: 30px;
                padding: 16px 20px;
                background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
                color: white;
                border-radius: 12px;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                z-index: 1000;
                display: flex;
                align-items: center;
                gap: 12px;
                font-weight: 500;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            `;
            
            document.body.appendChild(messageDiv);
            
            // 显示动画
            setTimeout(() => {
                messageDiv.style.transform = 'translateX(0)';
            }, 100);
            
            // 自动隐藏
            setTimeout(() => {
                messageDiv.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (messageDiv.parentNode) {
                        messageDiv.parentNode.removeChild(messageDiv);
                    }
                }, 300);
            }, 3000);
        }
    };
    
    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => APP.Auth.init());
    } else {
        APP.Auth.init();
    }
})();
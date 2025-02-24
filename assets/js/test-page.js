// 通用工具函数
const utils = {
    // 显示加载动画
    showLoading: function(message = '加载中...') {
        const loading = document.getElementById('loadingOverlay');
        const loadingText = loading.querySelector('.loading-text');
        loadingText.textContent = message;
        loading.style.display = 'flex';
    },

    // 隐藏加载动画
    hideLoading: function() {
        const loading = document.getElementById('loadingOverlay');
        loading.style.display = 'none';
    },

    // 显示错误提示
    showError: function(message) {
        // 创建错误提示元素
        const error = document.createElement('div');
        error.classList.add('error-message');
        error.textContent = message;
        
        // 添加错误提示样式
        Object.assign(error.style, {
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#ff4444',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '4px',
            zIndex: '1000',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        });
        
        // 添加到页面
        document.body.appendChild(error);
        
        // 3秒后自动移除
        setTimeout(() => {
            error.style.opacity = '0';
            error.style.transform = 'translateX(-50%) translateY(-20px)';
            error.style.transition = 'all 0.3s ease';
            setTimeout(() => error.remove(), 300);
        }, 3000);
    },

    // 显示成功提示
    showSuccess: function(message) {
        // 创建成功提示元素
        const success = document.createElement('div');
        success.classList.add('success-message');
        success.textContent = message;
        
        // 添加成功提示样式
        Object.assign(success.style, {
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '4px',
            zIndex: '1000',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        });
        
        // 添加到页面
        document.body.appendChild(success);
        
        // 3秒后自动移除
        setTimeout(() => {
            success.style.opacity = '0';
            success.style.transform = 'translateX(-50%) translateY(-20px)';
            success.style.transition = 'all 0.3s ease';
            setTimeout(() => success.remove(), 300);
        }, 3000);
    },

    // 表单验证
    validateForm: function(form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                this.showInputError(input, '此项为必填项');
            } else if (input.pattern && input.value && !new RegExp(input.pattern).test(input.value)) {
                isValid = false;
                this.showInputError(input, '输入格式不正确');
            }
        });
        
        return isValid;
    },

    // 显示输入错误
    showInputError: function(input, message) {
        // 移除已有的错误提示
        const existingError = input.parentElement.querySelector('.input-error');
        if (existingError) {
            existingError.remove();
        }
        
        // 创建错误提示
        const error = document.createElement('div');
        error.classList.add('input-error');
        error.textContent = message;
        
        // 添加错误提示样式
        Object.assign(error.style, {
            color: '#ff4444',
            fontSize: '0.875rem',
            marginTop: '4px'
        });
        
        // 添加到输入框后面
        input.parentElement.appendChild(error);
        
        // 添加输入框错误状态样式
        input.style.borderColor = '#ff4444';
        
        // 监听输入，移除错误提示
        input.addEventListener('input', () => {
            error.remove();
            input.style.borderColor = '';
        }, { once: true });
    },

    // 防抖函数
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 添加表单提交前验证
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (utils.validateForm(form)) {
                // 触发表单的自定义提交事件
                const event = new CustomEvent('validSubmit', {
                    detail: {
                        formData: new FormData(form)
                    }
                });
                form.dispatchEvent(event);
            }
        });
    }

    // 添加字符计数功能
    const textareas = document.querySelectorAll('textarea[maxlength]');
    textareas.forEach(textarea => {
        const counter = textarea.parentElement.querySelector('.char-counter span');
        if (counter) {
            // 初始更新计数
            counter.textContent = textarea.value.length;
            
            // 监听输入更新计数
            textarea.addEventListener('input', utils.debounce(function() {
                counter.textContent = this.value.length;
            }, 100));
        }
    });

    // 处理返回按钮点击事件
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href) {
                window.location.href = href;
            }
        });
    }
});

// 导出工具函数
window.testUtils = utils; 
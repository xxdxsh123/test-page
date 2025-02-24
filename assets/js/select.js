// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有测试卡片
    const testCards = document.querySelectorAll('.test-card');
    
    // 为每个卡片添加点击事件
    testCards.forEach(card => {
        const button = card.querySelector('.select-button');
        
        // 卡片整体的点击事件
        card.addEventListener('click', function(e) {
            // 如果点击的是按钮，不执行卡片的点击事件
            if (e.target.classList.contains('select-button')) {
                return;
            }
            // 触发按钮点击
            button.click();
        });
        
        // 按钮点击事件
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡
            
            // 获取测试类型
            const testType = card.dataset.test;
            
            // 添加加载动画
            showLoading();
            
            // 根据测试类型跳转到对应页面
            setTimeout(() => {
                switch(testType) {
                    case 'naming':
                        window.location.href = 'tests/naming.html';
                        break;
                    case 'fortune':
                        window.location.href = 'tests/fortune.html';
                        break;
                    case 'bazi':
                        window.location.href = 'tests/bazi.html';
                        break;
                    case 'dream':
                        window.location.href = 'tests/dream.html';
                        break;
                    case 'zodiac':
                        window.location.href = 'tests/zodiac.html';
                        break;
                    default:
                        hideLoading();
                        showError('未知的测试类型');
                }
            }, 500); // 添加短暂延迟以显示加载动画
        });
        
        // 添加悬停效果
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// 显示加载动画
function showLoading() {
    // 创建加载动画元素
    const loading = document.createElement('div');
    loading.classList.add('loading');
    document.body.appendChild(loading);
}

// 隐藏加载动画
function hideLoading() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.remove();
    }
}

// 显示错误提示
function showError(message) {
    // 创建错误提示元素
    const error = document.createElement('div');
    error.classList.add('error-message');
    error.textContent = message;
    
    // 添加错误提示样式
    error.style.position = 'fixed';
    error.style.top = '20px';
    error.style.left = '50%';
    error.style.transform = 'translateX(-50%)';
    error.style.backgroundColor = '#ff4444';
    error.style.color = 'white';
    error.style.padding = '10px 20px';
    error.style.borderRadius = '4px';
    error.style.zIndex = '1000';
    
    // 添加到页面
    document.body.appendChild(error);
    
    // 3秒后自动移除
    setTimeout(() => {
        error.remove();
    }, 3000);
}

// 添加错误处理
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Error: ', msg, '\nURL: ', url, '\nLine: ', lineNo, '\nColumn: ', columnNo, '\nError object: ', error);
    showError('发生错误，请刷新页面重试');
    return false;
};

// 性能优化：防抖函数
function debounce(func, wait) {
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

// 添加窗口大小变化处理
window.addEventListener('resize', debounce(() => {
    // 更新卡片布局
    const testCards = document.querySelector('.test-cards');
    if (testCards) {
        if (window.innerWidth <= 768) {
            testCards.style.gridTemplateColumns = '1fr';
        } else {
            testCards.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
        }
    }
}, 250)); 
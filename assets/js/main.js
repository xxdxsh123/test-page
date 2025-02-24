// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 添加平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 添加特性项目的悬停效果
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // 开始按钮点击效果
    const startButton = document.querySelector('.start-button');
    if (startButton) {
        startButton.addEventListener('click', function(e) {
            // 添加点击波纹效果
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            // 移除波纹元素
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    }

    // 添加页面加载动画
    document.body.classList.add('loaded');
});

// 添加页面离开确认
window.addEventListener('beforeunload', function(e) {
    // 如果在测试过程中，显示提示
    if (document.querySelector('.test-in-progress')) {
        e.preventDefault();
        e.returnValue = '';
    }
});

// 检测设备类型并优化交互
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
    // 为移动设备优化触摸事件
    document.body.classList.add('mobile-device');
}

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

// 监听窗口大小变化，优化响应式布局
window.addEventListener('resize', debounce(() => {
    // 更新布局相关的逻辑
    const container = document.querySelector('.container');
    if (container) {
        if (window.innerWidth <= 768) {
            container.classList.add('mobile-layout');
        } else {
            container.classList.remove('mobile-layout');
        }
    }
}, 250));

// 添加错误处理
window.onerror = function(msg, url, lineNo, columnNo, error) {
    // 可以在这里添加错误上报逻辑
    console.error('Error: ', msg, '\nURL: ', url, '\nLine: ', lineNo, '\nColumn: ', columnNo, '\nError object: ', error);
    return false;
};

// 添加页面加载时间统计
const pageLoadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
console.log('页面加载时间：', pageLoadTime + 'ms'); 
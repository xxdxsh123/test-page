// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 监听表单有效提交事件
    const form = document.getElementById('fortuneForm');
    form.addEventListener('validSubmit', handleFormSubmit);
});

// 处理表单提交
async function handleFormSubmit(event) {
    const formData = event.detail.formData;
    
    // 显示加载动画
    testUtils.showLoading('正在分析姓名运势...');
    
    try {
        // 模拟API调用
        const result = await analyzeFortune(formData);
        displayResults(result);
        testUtils.showSuccess('分析完成！');
    } catch (error) {
        testUtils.showError(error.message || '分析运势时出现错误，请重试');
    } finally {
        testUtils.hideLoading();
    }
}

// 分析运势（模拟API调用）
function analyzeFortune(formData) {
    return new Promise((resolve, reject) => {
        // 模拟API延迟
        setTimeout(() => {
            try {
                // 获取表单数据
                const fullName = formData.get('fullName');
                const gender = formData.get('gender');
                
                // 模拟分析结果
                const result = {
                    basicInfo: {
                        name: fullName,
                        gender: gender === 'male' ? '男' : '女'
                    },
                    analysis: {
                        summary: '您的姓名蕴含着独特的能量场，整体运势呈上升趋势。',
                        wuxing: '您的姓名五行属性为：金木水火土分布均衡，显示出良好的平衡性。',
                        career: '事业发展稳健，有望在未来3-5年内获得重要突破。',
                        love: '感情生活和谐，易得贵人相助，桃花运旺盛。',
                        wealth: '财运走势良好，适合进行稳健的理财投资。',
                        health: '健康状况整体良好，建议注意作息规律。'
                    },
                    suggestions: [
                        '建议在事业上保持积极进取的态度',
                        '感情方面可以适当主动出击',
                        '理财投资宜稳健为主',
                        '注意保持良好的作息习惯'
                    ]
                };
                
                resolve(result);
            } catch (error) {
                reject(new Error('分析运势时出现错误'));
            }
        }, 2000); // 模拟2秒的API延迟
    });
}

// 显示结果
function displayResults(result) {
    const resultSection = document.getElementById('resultSection');
    const nameResults = document.querySelector('.fortune-results');
    
    // 清空之前的结果
    nameResults.innerHTML = '';
    
    // 创建基本信息卡片
    const basicInfoCard = document.createElement('div');
    basicInfoCard.className = 'result-card';
    basicInfoCard.innerHTML = `
        <h3>基本信息</h3>
        <p>姓名：${result.basicInfo.name}</p>
        <p>性别：${result.basicInfo.gender}</p>
    `;
    nameResults.appendChild(basicInfoCard);
    
    // 创建分析结果卡片
    const analysisCard = document.createElement('div');
    analysisCard.className = 'result-card';
    analysisCard.innerHTML = `
        <h3>运势分析</h3>
        <p class="analysis-summary">${result.analysis.summary}</p>
        <div class="analysis-details">
            <p>${result.analysis.wuxing}</p>
            <p>${result.analysis.career}</p>
            <p>${result.analysis.love}</p>
            <p>${result.analysis.wealth}</p>
            <p>${result.analysis.health}</p>
        </div>
    `;
    nameResults.appendChild(analysisCard);
    
    // 创建建议卡片
    const suggestionsCard = document.createElement('div');
    suggestionsCard.className = 'result-card';
    suggestionsCard.innerHTML = `
        <h3>运势建议</h3>
        <ul>
            ${result.suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
        </ul>
    `;
    nameResults.appendChild(suggestionsCard);
    
    // 显示结果区域
    resultSection.style.display = 'block';
    
    // 平滑滚动到结果区域
    resultSection.scrollIntoView({ behavior: 'smooth' });
} 
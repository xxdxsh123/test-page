// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 设置日期选择器的最大值为今天
    const birthDateInput = document.getElementById('birthDate');
    const today = new Date().toISOString().split('T')[0];
    birthDateInput.max = today;
    
    // 监听表单有效提交事件
    const form = document.getElementById('fortuneForm');
    form.addEventListener('validSubmit', handleFormSubmit);

    // 确保至少选择一个分析维度
    const checkboxes = document.querySelectorAll('input[name="dimensions"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', validateDimensions);
    });
});

// 验证至少选择一个分析维度
function validateDimensions() {
    const checkboxes = document.querySelectorAll('input[name="dimensions"]:checked');
    const submitButton = document.querySelector('.submit-button');
    
    if (checkboxes.length === 0) {
        testUtils.showError('请至少选择一个分析维度');
        submitButton.disabled = true;
    } else {
        submitButton.disabled = false;
    }
}

// 处理表单提交
async function handleFormSubmit(event) {
    const formData = event.detail.formData;
    
    // 显示加载动画
    testUtils.showLoading('正在分析命理...');
    
    try {
        // 模拟API调用
        const result = await analyzeFortune(formData);
        displayResults(result);
        testUtils.showSuccess('分析完成！');
    } catch (error) {
        testUtils.showError(error.message || '分析过程中出现错误，请重试');
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
                const birthDate = formData.get('birthDate');
                const dimensions = formData.getAll('dimensions');
                
                // 模拟分析结果
                const result = {
                    basicInfo: {
                        name: fullName,
                        gender: gender === 'male' ? '男' : '女',
                        birthDate: new Date(birthDate).toLocaleDateString('zh-CN'),
                        nameScore: Math.floor(Math.random() * 20 + 80) // 80-100分
                    },
                    analysis: {
                        wuxing: dimensions.includes('wuxing') ? {
                            title: '五行分析',
                            content: '您的名字五行属性为水木相生，具有很强的成长性和适应能力。',
                            score: Math.floor(Math.random() * 20 + 80)
                        } : null,
                        career: dimensions.includes('career') ? {
                            title: '事业运势',
                            content: '事业发展稳健，有望在未来3-5年内获得重要突破。领导能力突出，适合管理岗位。',
                            score: Math.floor(Math.random() * 20 + 80)
                        } : null,
                        love: dimensions.includes('love') ? {
                            title: '感情姻缘',
                            content: '感情运势温和，明年有望遇到理想伴侣。建议多参加社交活动，保持开放心态。',
                            score: Math.floor(Math.random() * 20 + 80)
                        } : null,
                        wealth: dimensions.includes('wealth') ? {
                            title: '财运分析',
                            content: '财运走势向上，适合稳健投资。今年下半年可能有意外收获。',
                            score: Math.floor(Math.random() * 20 + 80)
                        } : null,
                        health: dimensions.includes('health') ? {
                            title: '健康运势',
                            content: '整体健康状况良好，建议注意作息规律，适当运动。',
                            score: Math.floor(Math.random() * 20 + 80)
                        } : null
                    },
                    suggestions: [
                        '建议在事业上保持积极进取的态度',
                        '感情方面要学会适度表达',
                        '投资理财需要稳健为主',
                        '注意保持良好的作息习惯'
                    ]
                };
                
                resolve(result);
            } catch (error) {
                reject(new Error('生成分析结果时出现错误'));
            }
        }, 2000); // 模拟2秒的API延迟
    });
}

// 显示结果
function displayResults(result) {
    const resultSection = document.getElementById('resultSection');
    const fortuneResults = resultSection.querySelector('.fortune-results');
    
    // 清空现有结果
    fortuneResults.innerHTML = '';
    
    // 创建基本信息卡片
    const basicInfoCard = document.createElement('div');
    basicInfoCard.classList.add('result-card', 'basic-info');
    basicInfoCard.innerHTML = `
        <h3>基本信息</h3>
        <div class="info-grid">
            <div class="info-item">
                <span class="label">姓名：</span>
                <span class="value">${result.basicInfo.name}</span>
            </div>
            <div class="info-item">
                <span class="label">性别：</span>
                <span class="value">${result.basicInfo.gender}</span>
            </div>
            <div class="info-item">
                <span class="label">出生日期：</span>
                <span class="value">${result.basicInfo.birthDate}</span>
            </div>
            <div class="info-item">
                <span class="label">姓名评分：</span>
                <span class="value score">${result.basicInfo.nameScore}分</span>
            </div>
        </div>
    `;
    fortuneResults.appendChild(basicInfoCard);
    
    // 创建各维度分析卡片
    Object.values(result.analysis).forEach(analysis => {
        if (analysis) {
            const analysisCard = document.createElement('div');
            analysisCard.classList.add('result-card', 'analysis-item');
            analysisCard.innerHTML = `
                <div class="analysis-header">
                    <h3>${analysis.title}</h3>
                    <span class="score">${analysis.score}分</span>
                </div>
                <p class="analysis-content">${analysis.content}</p>
            `;
            fortuneResults.appendChild(analysisCard);
        }
    });
    
    // 创建建议卡片
    const suggestionsCard = document.createElement('div');
    suggestionsCard.classList.add('result-card', 'suggestions');
    suggestionsCard.innerHTML = `
        <h3>改善建议</h3>
        <ul>
            ${result.suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
        </ul>
    `;
    fortuneResults.appendChild(suggestionsCard);
    
    // 添加结果样式
    const style = document.createElement('style');
    style.textContent = `
        .result-card {
            background: white;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .result-card h3 {
            color: var(--primary-color);
            margin-bottom: 15px;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        
        .info-item {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .info-item .label {
            color: var(--light-text);
        }
        
        .info-item .value {
            font-weight: 500;
        }
        
        .score {
            color: var(--primary-color);
            font-weight: bold;
        }
        
        .analysis-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        
        .analysis-content {
            color: var(--text-color);
            line-height: 1.6;
        }
        
        .suggestions ul {
            list-style: none;
            padding: 0;
        }
        
        .suggestions li {
            position: relative;
            padding-left: 20px;
            margin-bottom: 10px;
            color: var(--text-color);
        }
        
        .suggestions li::before {
            content: '•';
            position: absolute;
            left: 0;
            color: var(--primary-color);
        }
    `;
    document.head.appendChild(style);
    
    // 显示结果区域
    resultSection.style.display = 'block';
    
    // 平滑滚动到结果区域
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
} 
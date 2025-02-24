// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化日期选择器
    initDateInput();
    
    // 监听表单有效提交事件
    const form = document.getElementById('dreamForm');
    form.addEventListener('validSubmit', handleFormSubmit);

    // 确保至少选择一个分析维度
    const checkboxes = document.querySelectorAll('input[name="aspects"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', validateAspects);
    });

    // 监听文本输入，实时更新字数
    const dreamContent = document.getElementById('dreamContent');
    const charCount = document.getElementById('charCount');
    dreamContent.addEventListener('input', function() {
        charCount.textContent = this.value.length;
    });
});

// 初始化日期选择器
function initDateInput() {
    const dreamDateInput = document.getElementById('dreamDate');
    const today = new Date().toISOString().split('T')[0];
    dreamDateInput.max = today;
    dreamDateInput.value = today;
}

// 验证至少选择一个分析维度
function validateAspects() {
    const checkboxes = document.querySelectorAll('input[name="aspects"]:checked');
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
    testUtils.showLoading('正在解析梦境...');
    
    try {
        // 模拟API调用
        const result = await analyzeDream(formData);
        displayResults(result);
        testUtils.showSuccess('解梦完成！');
    } catch (error) {
        testUtils.showError(error.message || '解梦过程中出现错误，请重试');
    } finally {
        testUtils.hideLoading();
    }
}

// 解析梦境（模拟API调用）
function analyzeDream(formData) {
    return new Promise((resolve, reject) => {
        // 模拟API延迟
        setTimeout(() => {
            try {
                // 获取表单数据
                const dreamContent = formData.get('dreamContent');
                const dreamDate = formData.get('dreamDate');
                const mood = formData.get('mood');
                const aspects = formData.getAll('aspects');
                
                // 模拟解梦结果
                const result = {
                    summary: {
                        keywords: ['水', '飞翔', '家人', '阳光'],
                        theme: '心理暗示',
                        mood: getMoodText(mood),
                        dreamDate: new Date(dreamDate).toLocaleDateString('zh-CN')
                    },
                    analysis: {
                        meaning: aspects.includes('meaning') ? {
                            title: '梦境寓意',
                            content: '这个梦境反映了您内心的渴望和担忧。水象征着情感和潜意识，飞翔代表自由和突破，家人暗示着安全感的需求，阳光则预示着希望和光明。',
                            keywords: ['情感', '自由', '安全感', '希望']
                        } : null,
                        fortune: aspects.includes('fortune') ? {
                            title: '运势预测',
                            content: '近期运势平稳向上，工作或学习方面可能会有突破性进展。人际关系和谐，有贵人相助。建议保持积极乐观的心态，把握机会。',
                            aspects: {
                                career: '上升',
                                love: '稳定',
                                wealth: '增长',
                                health: '良好'
                            }
                        } : null,
                        suggestion: aspects.includes('suggestion') ? {
                            title: '行动建议',
                            content: '1. 保持开放和积极的心态\n2. 多关注家人，增进感情\n3. 适时表达自己的想法和情感\n4. 注意工作与休息的平衡',
                            priority: ['立即行动', '近期关注', '长期坚持']
                        } : null
                    }
                };
                
                resolve(result);
            } catch (error) {
                reject(new Error('解析梦境时出现错误'));
            }
        }, 2000); // 模拟2秒的API延迟
    });
}

// 获取心情文本
function getMoodText(mood) {
    const moodMap = {
        happy: '开心',
        neutral: '平静',
        anxious: '焦虑',
        scared: '害怕',
        confused: '困惑'
    };
    return moodMap[mood] || '未知';
}

// 显示结果
function displayResults(result) {
    const resultSection = document.getElementById('resultSection');
    const dreamResults = resultSection.querySelector('.dream-results');
    
    // 清空现有结果
    dreamResults.innerHTML = '';
    
    // 创建梦境概要卡片
    const summaryCard = document.createElement('div');
    summaryCard.classList.add('result-card', 'dream-summary');
    summaryCard.innerHTML = `
        <h3>梦境概要</h3>
        <div class="summary-grid">
            <div class="summary-item">
                <span class="label">关键词：</span>
                <div class="keywords">
                    ${result.summary.keywords.map(keyword => `
                        <span class="keyword">${keyword}</span>
                    `).join('')}
                </div>
            </div>
            <div class="summary-item">
                <span class="label">主题：</span>
                <span class="value">${result.summary.theme}</span>
            </div>
            <div class="summary-item">
                <span class="label">心情：</span>
                <span class="value">${result.summary.mood}</span>
            </div>
            <div class="summary-item">
                <span class="label">日期：</span>
                <span class="value">${result.summary.dreamDate}</span>
            </div>
        </div>
    `;
    dreamResults.appendChild(summaryCard);
    
    // 创建分析结果卡片
    if (result.analysis.meaning) {
        const meaningCard = document.createElement('div');
        meaningCard.classList.add('result-card', 'meaning-analysis');
        meaningCard.innerHTML = `
            <h3>${result.analysis.meaning.title}</h3>
            <p class="analysis-content">${result.analysis.meaning.content}</p>
            <div class="keywords">
                ${result.analysis.meaning.keywords.map(keyword => `
                    <span class="keyword">${keyword}</span>
                `).join('')}
            </div>
        `;
        dreamResults.appendChild(meaningCard);
    }
    
    if (result.analysis.fortune) {
        const fortuneCard = document.createElement('div');
        fortuneCard.classList.add('result-card', 'fortune-analysis');
        fortuneCard.innerHTML = `
            <h3>${result.analysis.fortune.title}</h3>
            <p class="analysis-content">${result.analysis.fortune.content}</p>
            <div class="aspects-grid">
                ${Object.entries(result.analysis.fortune.aspects).map(([aspect, trend]) => `
                    <div class="aspect-item">
                        <span class="aspect-label">${getAspectLabel(aspect)}</span>
                        <span class="aspect-trend">${trend}</span>
                    </div>
                `).join('')}
            </div>
        `;
        dreamResults.appendChild(fortuneCard);
    }
    
    if (result.analysis.suggestion) {
        const suggestionCard = document.createElement('div');
        suggestionCard.classList.add('result-card', 'suggestion-analysis');
        suggestionCard.innerHTML = `
            <h3>${result.analysis.suggestion.title}</h3>
            <div class="suggestions">
                ${result.analysis.suggestion.content.split('\n').map(suggestion => `
                    <div class="suggestion-item">${suggestion}</div>
                `).join('')}
            </div>
            <div class="priority-list">
                ${result.analysis.suggestion.priority.map((priority, index) => `
                    <div class="priority-item priority-${index + 1}">
                        <span class="priority-label">优先级 ${index + 1}</span>
                        <span class="priority-value">${priority}</span>
                    </div>
                `).join('')}
            </div>
        `;
        dreamResults.appendChild(suggestionCard);
    }
    
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
        
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        
        .summary-item {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        
        .keywords {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        
        .keyword {
            background: rgba(108, 99, 255, 0.1);
            color: var(--primary-color);
            padding: 4px 12px;
            border-radius: 16px;
            font-size: 14px;
        }
        
        .label {
            color: var(--light-text);
            font-size: 14px;
        }
        
        .value {
            font-weight: 500;
        }
        
        .analysis-content {
            color: var(--text-color);
            line-height: 1.6;
            margin-bottom: 15px;
        }
        
        .aspects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 10px;
            margin-top: 15px;
        }
        
        .aspect-item {
            background: #f8f9fa;
            padding: 10px;
            border-radius: 8px;
            text-align: center;
        }
        
        .aspect-label {
            display: block;
            color: var(--light-text);
            font-size: 14px;
            margin-bottom: 5px;
        }
        
        .aspect-trend {
            color: var(--primary-color);
            font-weight: 500;
        }
        
        .suggestions {
            margin-bottom: 20px;
        }
        
        .suggestion-item {
            padding: 10px 0;
            border-bottom: 1px solid #eee;
        }
        
        .suggestion-item:last-child {
            border-bottom: none;
        }
        
        .priority-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 10px;
            margin-top: 15px;
        }
        
        .priority-item {
            background: #f8f9fa;
            padding: 10px;
            border-radius: 8px;
            text-align: center;
        }
        
        .priority-label {
            display: block;
            color: var(--light-text);
            font-size: 12px;
            margin-bottom: 5px;
        }
        
        .priority-value {
            color: var(--primary-color);
            font-weight: 500;
        }
        
        .priority-1 { border-left: 3px solid #ff4444; }
        .priority-2 { border-left: 3px solid #ffa700; }
        .priority-3 { border-left: 3px solid #4CAF50; }
        
        @media (max-width: 768px) {
            .summary-grid,
            .aspects-grid,
            .priority-list {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
    
    // 显示结果区域
    resultSection.style.display = 'block';
    
    // 平滑滚动到结果区域
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// 获取运势方面的标签文本
function getAspectLabel(aspect) {
    const aspectMap = {
        career: '事业运',
        love: '感情运',
        wealth: '财运',
        health: '健康运'
    };
    return aspectMap[aspect] || aspect;
} 
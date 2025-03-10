// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 监听表单有效提交事件
    const form = document.getElementById('zodiacForm');
    form.addEventListener('validSubmit', handleFormSubmit);
});

// 处理表单提交
async function handleFormSubmit(event) {
    const formData = event.detail.formData;
    
    // 显示加载动画
    testUtils.showLoading('正在分析星座运势...');
    
    try {
        // 模拟API调用
        const result = await analyzeZodiac(formData);
        displayResults(result);
        testUtils.showSuccess('分析完成！');
    } catch (error) {
        testUtils.showError(error.message || '分析过程中出现错误，请重试');
    } finally {
        testUtils.hideLoading();
    }
}

// 分析星座运势（模拟API调用）
function analyzeZodiac(formData) {
    return new Promise((resolve, reject) => {
        // 模拟API延迟
        setTimeout(() => {
            try {
                // 获取表单数据
                const zodiacSign = formData.get('zodiacSign');
                const period = formData.get('period');
                
                // 获取星座名称
                const zodiacNames = {
                    aries: '白羊座',
                    taurus: '金牛座',
                    gemini: '双子座',
                    cancer: '巨蟹座',
                    leo: '狮子座',
                    virgo: '处女座',
                    libra: '天秤座',
                    scorpio: '天蝎座',
                    sagittarius: '射手座',
                    capricorn: '摩羯座',
                    aquarius: '水瓶座',
                    pisces: '双鱼座'
                };
                
                // 获取周期文本
                const periodTexts = {
                    today: '今日',
                    week: '本周',
                    month: '本月',
                    year: '年度'
                };
                
                // 模拟分析结果
                const result = {
                    basicInfo: {
                        zodiac: zodiacNames[zodiacSign] || '未知星座',
                        period: periodTexts[period] || '未知周期',
                        luckyNumber: Math.floor(Math.random() * 9) + 1,
                        luckyColor: ['红色', '蓝色', '绿色', '紫色', '金色'][Math.floor(Math.random() * 5)],
                        luckyDirection: ['东', '南', '西', '北'][Math.floor(Math.random() * 4)]
                    },
                    analysis: {
                        overview: {
                            title: '综合运势',
                            content: '整体运势不错，充满活力和创造力。建议保持积极乐观的心态，把握机会。',
                            score: Math.floor(Math.random() * 20 + 80),
                            keywords: ['活力', '创造力', '机遇']
                        },
                        love: {
                            title: '感情运势',
                            content: '感情运势稳定，单身者有机会遇到心仪对象，已有伴侣的感情更加甜蜜。',
                            score: Math.floor(Math.random() * 20 + 80),
                            suggestions: ['保持开放心态', '多参与社交活动', '关心伴侣感受']
                        },
                        career: {
                            title: '事业运势',
                            content: '事业发展顺利，有望获得上司赏识。工作中要注意细节，保持谨慎态度。',
                            score: Math.floor(Math.random() * 20 + 80),
                            opportunities: ['升职机会', '项目合作', '技能提升']
                        },
                        wealth: {
                            title: '财运分析',
                            content: '财运走势向好，可能有意外收获。投资理财需要谨慎，避免冲动消费。',
                            score: Math.floor(Math.random() * 20 + 80),
                            tips: ['合理投资', '控制支出', '储蓄计划']
                        },
                        health: {
                            title: '健康运势',
                            content: '身体状况良好，但要注意作息规律，适当运动，保持充足睡眠。',
                            score: Math.floor(Math.random() * 20 + 80),
                            advice: ['规律作息', '均衡饮食', '适量运动']
                        }
                    },
                    suggestions: [
                        '保持积极乐观的心态',
                        '把握机会，勇于尝试',
                        '注意劳逸结合',
                        '与家人朋友多交流'
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
    const zodiacResults = resultSection.querySelector('.zodiac-results');
    
    // 清空现有结果
    zodiacResults.innerHTML = '';
    
    // 创建基本信息卡片
    const basicInfoCard = document.createElement('div');
    basicInfoCard.classList.add('result-card', 'basic-info');
    basicInfoCard.innerHTML = `
        <h3>${result.basicInfo.zodiac} - ${result.basicInfo.period}运势</h3>
        <div class="lucky-info">
            <div class="lucky-item">
                <span class="label">幸运数字</span>
                <span class="value">${result.basicInfo.luckyNumber}</span>
            </div>
            <div class="lucky-item">
                <span class="label">幸运颜色</span>
                <span class="value">${result.basicInfo.luckyColor}</span>
            </div>
            <div class="lucky-item">
                <span class="label">幸运方位</span>
                <span class="value">${result.basicInfo.luckyDirection}</span>
            </div>
        </div>
    `;
    zodiacResults.appendChild(basicInfoCard);
    
    // 创建各维度分析卡片
    Object.values(result.analysis).forEach(analysis => {
        if (analysis) {
            const analysisCard = document.createElement('div');
            analysisCard.classList.add('result-card', 'analysis-item');
            
            let extraContent = '';
            if (analysis.keywords) {
                extraContent = `
                    <div class="keywords">
                        ${analysis.keywords.map(keyword => `
                            <span class="keyword">${keyword}</span>
                        `).join('')}
                    </div>
                `;
            } else if (analysis.suggestions) {
                extraContent = `
                    <div class="suggestions">
                        <h4>建议：</h4>
                        <ul>
                            ${analysis.suggestions.map(suggestion => `
                                <li>${suggestion}</li>
                            `).join('')}
                        </ul>
                    </div>
                `;
            } else if (analysis.opportunities) {
                extraContent = `
                    <div class="opportunities">
                        <h4>机会：</h4>
                        <ul>
                            ${analysis.opportunities.map(opportunity => `
                                <li>${opportunity}</li>
                            `).join('')}
                        </ul>
                    </div>
                `;
            } else if (analysis.tips) {
                extraContent = `
                    <div class="tips">
                        <h4>小贴士：</h4>
                        <ul>
                            ${analysis.tips.map(tip => `
                                <li>${tip}</li>
                            `).join('')}
                        </ul>
                    </div>
                `;
            } else if (analysis.advice) {
                extraContent = `
                    <div class="advice">
                        <h4>健康建议：</h4>
                        <ul>
                            ${analysis.advice.map(item => `
                                <li>${item}</li>
                            `).join('')}
                        </ul>
                    </div>
                `;
            }
            
            analysisCard.innerHTML = `
                <div class="analysis-header">
                    <h3>${analysis.title}</h3>
                    <span class="score">${analysis.score}分</span>
                </div>
                <p class="analysis-content">${analysis.content}</p>
                ${extraContent}
            `;
            zodiacResults.appendChild(analysisCard);
        }
    });
    
    // 创建建议卡片
    const suggestionsCard = document.createElement('div');
    suggestionsCard.classList.add('result-card', 'suggestions');
    suggestionsCard.innerHTML = `
        <h3>综合建议</h3>
        <ul>
            ${result.suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
        </ul>
    `;
    zodiacResults.appendChild(suggestionsCard);
    
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
        
        .lucky-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }
        
        .lucky-item {
            text-align: center;
            padding: 10px;
            background: #f8f9fa;
            border-radius: 8px;
        }
        
        .lucky-item .label {
            display: block;
            color: var(--light-text);
            font-size: 14px;
            margin-bottom: 5px;
        }
        
        .lucky-item .value {
            color: var(--primary-color);
            font-weight: 500;
        }
        
        .analysis-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        
        .score {
            color: var(--primary-color);
            font-weight: bold;
        }
        
        .analysis-content {
            color: var(--text-color);
            line-height: 1.6;
            margin-bottom: 15px;
        }
        
        .keywords {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 10px;
        }
        
        .keyword {
            background: rgba(108, 99, 255, 0.1);
            color: var(--primary-color);
            padding: 4px 12px;
            border-radius: 16px;
            font-size: 14px;
        }
        
        .suggestions h4,
        .opportunities h4,
        .tips h4,
        .advice h4 {
            color: var(--text-color);
            margin-bottom: 10px;
            font-size: 16px;
        }
        
        ul {
            list-style: none;
            padding: 0;
        }
        
        li {
            position: relative;
            padding-left: 20px;
            margin-bottom: 8px;
            color: var(--text-color);
        }
        
        li::before {
            content: '•';
            position: absolute;
            left: 0;
            color: var(--primary-color);
        }
        
        @media (max-width: 768px) {
            .lucky-info {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        
        @media (max-width: 480px) {
            .lucky-info {
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
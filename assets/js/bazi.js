// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化日期和时间选择器
    initDateTimeInputs();
    
    // 初始化地区选择器
    initLocationSelects();
    
    // 监听表单有效提交事件
    const form = document.getElementById('baziForm');
    form.addEventListener('validSubmit', handleFormSubmit);

    // 确保至少选择一个分析范围
    const checkboxes = document.querySelectorAll('input[name="aspects"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', validateAspects);
    });
});

// 初始化日期和时间选择器
function initDateTimeInputs() {
    const birthDateInput = document.getElementById('birthDate');
    const birthTimeInput = document.getElementById('birthTime');
    
    // 设置日期范围
    const today = new Date().toISOString().split('T')[0];
    birthDateInput.max = today;
    birthDateInput.min = '1900-01-01';
    
    // 设置默认时间为12:00
    birthTimeInput.value = '12:00';
}

// 初始化地区选择器
function initLocationSelects() {
    // 省份数据（示例）
    const provinces = [
        '北京市', '上海市', '天津市', '重庆市',
        '河北省', '山西省', '辽宁省', '吉林省',
        '黑龙江省', '江苏省', '浙江省', '安徽省',
        '福建省', '江西省', '山东省', '河南省',
        '湖北省', '湖南省', '广东省', '海南省',
        '四川省', '贵州省', '云南省', '陕西省',
        '甘肃省', '青海省', '台湾省',
        '内蒙古自治区', '广西壮族自治区', '西藏自治区',
        '宁夏回族自治区', '新疆维吾尔自治区',
        '香港特别行政区', '澳门特别行政区'
    ];
    
    const provinceSelect = document.getElementById('province');
    const citySelect = document.getElementById('city');
    const districtSelect = document.getElementById('district');
    
    // 填充省份选项
    provinces.forEach(province => {
        const option = document.createElement('option');
        option.value = province;
        option.textContent = province;
        provinceSelect.appendChild(option);
    });
    
    // 省份变化时更新城市
    provinceSelect.addEventListener('change', function() {
        // 这里应该根据选择的省份加载对应的城市
        // 示例中使用模拟数据
        citySelect.innerHTML = '<option value="">请选择城市</option>';
        districtSelect.innerHTML = '<option value="">请选择区县</option>';
        
        if (this.value) {
            ['市辖区', '市辖县'].forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });
        }
    });
    
    // 城市变化时更新区县
    citySelect.addEventListener('change', function() {
        // 这里应该根据选择的城市加载对应的区县
        // 示例中使用模拟数据
        districtSelect.innerHTML = '<option value="">请选择区县</option>';
        
        if (this.value) {
            ['第一区', '第二区', '第三区'].forEach(district => {
                const option = document.createElement('option');
                option.value = district;
                option.textContent = district;
                districtSelect.appendChild(option);
            });
        }
    });
}

// 验证至少选择一个分析范围
function validateAspects() {
    const checkboxes = document.querySelectorAll('input[name="aspects"]:checked');
    const submitButton = document.querySelector('.submit-button');
    
    if (checkboxes.length === 0) {
        testUtils.showError('请至少选择一个分析范围');
        submitButton.disabled = true;
    } else {
        submitButton.disabled = false;
    }
}

// 处理表单提交
async function handleFormSubmit(event) {
    const formData = event.detail.formData;
    
    // 显示加载动画
    testUtils.showLoading('正在排盘分析...');
    
    try {
        // 模拟API调用
        const result = await analyzeBazi(formData);
        displayResults(result);
        testUtils.showSuccess('分析完成！');
    } catch (error) {
        testUtils.showError(error.message || '分析过程中出现错误，请重试');
    } finally {
        testUtils.hideLoading();
    }
}

// 分析八字（模拟API调用）
function analyzeBazi(formData) {
    return new Promise((resolve, reject) => {
        // 模拟API延迟
        setTimeout(() => {
            try {
                // 获取表单数据
                const fullName = formData.get('fullName');
                const gender = formData.get('gender');
                const birthDate = formData.get('birthDate');
                const birthTime = formData.get('birthTime');
                const province = formData.get('province');
                const city = formData.get('city');
                const district = formData.get('district');
                const aspects = formData.getAll('aspects');
                
                // 模拟八字排盘结果
                const result = {
                    basicInfo: {
                        name: fullName,
                        gender: gender === 'male' ? '男' : '女',
                        birthDateTime: `${birthDate} ${birthTime}`,
                        location: `${province}${city}${district}`,
                        bazi: {
                            year: '甲子',
                            month: '乙丑',
                            day: '丙寅',
                            hour: '丁卯'
                        }
                    },
                    analysis: {
                        personality: aspects.includes('personality') ? {
                            title: '性格分析',
                            content: '性格开朗，富有同情心，具有领导才能。但有时过于理想化，需要更务实。',
                            score: Math.floor(Math.random() * 20 + 80)
                        } : null,
                        career: aspects.includes('career') ? {
                            title: '事业运势',
                            content: '今年事业运势较好，有升职加薪机会。建议把握6月和9月的关键机遇。',
                            score: Math.floor(Math.random() * 20 + 80)
                        } : null,
                        wealth: aspects.includes('wealth') ? {
                            title: '财运分析',
                            content: '财运稳定上升，适合进行稳健型投资。今年下半年可能有意外收获。',
                            score: Math.floor(Math.random() * 20 + 80)
                        } : null,
                        love: aspects.includes('love') ? {
                            title: '感情姻缘',
                            content: '桃花运旺盛，易遇到心仪对象。已婚者夫妻关系和睦，感情稳定。',
                            score: Math.floor(Math.random() * 20 + 80)
                        } : null,
                        health: aspects.includes('health') ? {
                            title: '健康运势',
                            content: '整体健康状况良好，但要注意消化系统，建议规律作息，适量运动。',
                            score: Math.floor(Math.random() * 20 + 80)
                        } : null,
                        yearly: aspects.includes('yearly') ? {
                            title: '流年运势',
                            content: '今年整体运势平稳，春季最为顺遂。需注意秋季可能的小波折。',
                            score: Math.floor(Math.random() * 20 + 80)
                        } : null
                    },
                    suggestions: [
                        '建议在事业上保持积极进取的态度',
                        '投资理财需要稳健为主',
                        '注意保持良好的作息习惯',
                        '可以适当参加社交活动，扩展人脉'
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
    const baziResults = resultSection.querySelector('.bazi-results');
    
    // 清空现有结果
    baziResults.innerHTML = '';
    
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
                <span class="label">出生时间：</span>
                <span class="value">${result.basicInfo.birthDateTime}</span>
            </div>
            <div class="info-item">
                <span class="label">出生地点：</span>
                <span class="value">${result.basicInfo.location}</span>
            </div>
        </div>
        <div class="bazi-grid">
            <div class="bazi-item">
                <span class="label">年柱：</span>
                <span class="value">${result.basicInfo.bazi.year}</span>
            </div>
            <div class="bazi-item">
                <span class="label">月柱：</span>
                <span class="value">${result.basicInfo.bazi.month}</span>
            </div>
            <div class="bazi-item">
                <span class="label">日柱：</span>
                <span class="value">${result.basicInfo.bazi.day}</span>
            </div>
            <div class="bazi-item">
                <span class="label">时柱：</span>
                <span class="value">${result.basicInfo.bazi.hour}</span>
            </div>
        </div>
    `;
    baziResults.appendChild(basicInfoCard);
    
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
            baziResults.appendChild(analysisCard);
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
    baziResults.appendChild(suggestionsCard);
    
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
            margin-bottom: 20px;
        }
        
        .bazi-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
        }
        
        .info-item, .bazi-item {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .label {
            color: var(--light-text);
        }
        
        .value {
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
        
        @media (max-width: 768px) {
            .bazi-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    `;
    document.head.appendChild(style);
    
    // 显示结果区域
    resultSection.style.display = 'block';
    
    // 平滑滚动到结果区域
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
} 
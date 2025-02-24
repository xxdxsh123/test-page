// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 监听表单有效提交事件
    const form = document.getElementById('namingForm');
    form.addEventListener('validSubmit', handleFormSubmit);
});

// 处理表单提交
async function handleFormSubmit(event) {
    const formData = event.detail.formData;
    
    // 显示加载动画
    testUtils.showLoading('正在智能分析姓名...');
    
    try {
        // 模拟API调用
        const result = await generateNames(formData);
        displayResults(result);
        testUtils.showSuccess('起名完成！');
    } catch (error) {
        testUtils.showError(error.message || '生成名字时出现错误，请重试');
    } finally {
        testUtils.hideLoading();
    }
}

// 生成名字（模拟API调用）
function generateNames(formData) {
    return new Promise((resolve, reject) => {
        // 模拟API延迟
        setTimeout(() => {
            try {
                // 获取表单数据
                const lastName = formData.get('lastName');
                const gender = formData.get('gender');
                const requirements = formData.get('requirements');
                
                // 模拟生成的名字和解释
                const names = [
                    {
                        fullName: `${lastName}${gender === 'male' ? '宇轩' : '语嫣'}`,
                        meaning: '寓意：胸怀宇宙，气质高雅',
                        analysis: {
                            wuxing: '五行：木水相生',
                            luck: '运势：事业昌盛，人缘美好',
                            personality: '性格：聪慧开朗，领导气质'
                        }
                    },
                    {
                        fullName: `${lastName}${gender === 'male' ? '浩然' : '梦瑶'}`,
                        meaning: '寓意：品德高尚，如梦似幻',
                        analysis: {
                            wuxing: '五行：水火相济',
                            luck: '运势：学业有成，姻缘和美',
                            personality: '性格：温和坚毅，富有同情心'
                        }
                    },
                    {
                        fullName: `${lastName}${gender === 'male' ? '泽阳' : '欣怡'}`,
                        meaning: '寓意：恩泽四方，阳光温暖',
                        analysis: {
                            wuxing: '五行：金水相辅',
                            luck: '运势：财运亨通，贵人相助',
                            personality: '性格：乐观向上，善解人意'
                        }
                    }
                ];
                
                resolve(names);
            } catch (error) {
                reject(new Error('生成名字时出现错误'));
            }
        }, 2000); // 模拟2秒的API延迟
    });
}

// 显示结果
function displayResults(names) {
    const resultSection = document.getElementById('resultSection');
    const nameResults = resultSection.querySelector('.name-results');
    
    // 清空现有结果
    nameResults.innerHTML = '';
    
    // 添加新结果
    names.forEach(name => {
        const nameCard = document.createElement('div');
        nameCard.classList.add('name-card');
        
        nameCard.innerHTML = `
            <h3 class="name-title">${name.fullName}</h3>
            <p class="name-meaning">${name.meaning}</p>
            <div class="name-analysis">
                <p>${name.analysis.wuxing}</p>
                <p>${name.analysis.luck}</p>
                <p>${name.analysis.personality}</p>
            </div>
        `;
        
        // 添加选择按钮
        const selectButton = document.createElement('button');
        selectButton.classList.add('select-name-button');
        selectButton.textContent = '选择此名字';
        selectButton.onclick = () => selectName(name);
        nameCard.appendChild(selectButton);
        
        nameResults.appendChild(nameCard);
    });
    
    // 添加名字卡片样式
    const style = document.createElement('style');
    style.textContent = `
        .name-card {
            background: white;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        }
        
        .name-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        
        .name-title {
            font-size: 24px;
            color: var(--primary-color);
            margin-bottom: 10px;
        }
        
        .name-meaning {
            color: var(--text-color);
            margin-bottom: 15px;
        }
        
        .name-analysis {
            color: var(--light-text);
            font-size: 14px;
            line-height: 1.6;
        }
        
        .select-name-button {
            background-color: var(--primary-color);
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            margin-top: 15px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .select-name-button:hover {
            background-color: var(--hover-color);
        }
    `;
    document.head.appendChild(style);
    
    // 显示结果区域
    resultSection.style.display = 'block';
    
    // 平滑滚动到结果区域
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// 选择名字
function selectName(name) {
    testUtils.showSuccess(`您已选择名字：${name.fullName}`);
    // 这里可以添加保存选择或其他操作
} 
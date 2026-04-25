// 推荐系统逻辑

// 产品数据库
const productsDatabase = {
    gemini: {
        id: 'gemini',
        nameZh: '双子座生肖手链',
        nameEn: 'Gemini Zodiac Bracelet',
        icon: '♊',
        element: 'air',
        colors: ['黄色', '橙色'],
        properties: ['沟通', '灵活', '智慧'],
        zodiacMatch: ['gemini', 'libra', 'aquarius']
    },
    leo: {
        id: 'leo',
        nameZh: '狮子座生肖手链',
        nameEn: 'Leo Zodiac Bracelet',
        icon: '♌',
        element: 'fire',
        colors: ['金色', '橙色'],
        properties: ['自信', '领导力', '热情'],
        zodiacMatch: ['leo', 'aries', 'sagittarius']
    },
    scorpio: {
        id: 'scorpio',
        nameZh: '天蝎座生肖手链',
        nameEn: 'Scorpio Zodiac Bracelet',
        icon: '♏',
        element: 'water',
        colors: ['深紫', '黑色'],
        properties: ['直觉', '深度', '转化'],
        zodiacMatch: ['scorpio', 'cancer', 'pisces']
    },
    pisces: {
        id: 'pisces',
        nameZh: '双鱼座生肖手链',
        nameEn: 'Pisces Zodiac Bracelet',
        icon: '♓',
        element: 'water',
        colors: ['海蓝', '紫色'],
        properties: ['同理心', '创造力', '灵性'],
        zodiacMatch: ['pisces', 'cancer', 'scorpio']
    },
    virgo: {
        id: 'virgo',
        nameZh: '处女座生肖手链',
        nameEn: 'Virgo Zodiac Bracelet',
        icon: '♍',
        element: 'earth',
        colors: ['绿色', '棕色'],
        properties: ['细致', '实用', '治愈'],
        zodiacMatch: ['virgo', 'taurus', 'capricorn']
    },
    taurus: {
        id: 'taurus',
        nameZh: '金牛座生肖手链',
        nameEn: 'Taurus Zodiac Bracelet',
        icon: '♉',
        element: 'earth',
        colors: ['粉色', '绿色'],
        properties: ['稳定', '务实', '美感'],
        zodiacMatch: ['taurus', 'virgo', 'capricorn']
    },
    libra: {
        id: 'libra',
        nameZh: '天秤座生肖手链',
        nameEn: 'Libra Zodiac Bracelet',
        icon: '♎',
        element: 'air',
        colors: ['粉色', '蓝色'],
        properties: ['平衡', '和谐', '美丽'],
        zodiacMatch: ['libra', 'gemini', 'aquarius']
    },
    cancer: {
        id: 'cancer',
        nameZh: '巨蟹座生肖手链',
        nameEn: 'Cancer Zodiac Bracelet',
        icon: '♋',
        element: 'water',
        colors: ['白色', '银色'],
        properties: ['情感', '保护', '直觉'],
        zodiacMatch: ['cancer', 'scorpio', 'pisces']
    },
    aries: {
        id: 'aries',
        nameZh: '白羊座生肖手链',
        nameEn: 'Aries Zodiac Bracelet',
        icon: '♈',
        element: 'fire',
        colors: ['红色', '橙色'],
        properties: ['勇气', '行动力', '热情'],
        zodiacMatch: ['aries', 'leo', 'sagittarius']
    },
    capricorn: {
        id: 'capricorn',
        nameZh: '摩羯座生肖手链',
        nameEn: 'Capricorn Zodiac Bracelet',
        icon: '♑',
        element: 'earth',
        colors: ['黑色', '棕色'],
        properties: ['责任', '坚韧', '成就'],
        zodiacMatch: ['capricorn', 'taurus', 'virgo']
    },
    aquarius: {
        id: 'aquarius',
        nameZh: '水瓶座生肖手链',
        nameEn: 'Aquarius Zodiac Bracelet',
        icon: '♒',
        element: 'air',
        colors: ['蓝色', '银色'],
        properties: ['创新', '独立', '人道'],
        zodiacMatch: ['aquarius', 'gemini', 'libra']
    },
    sagittarius: {
        id: 'sagittarius',
        nameZh: '射手座生肖手链',
        nameEn: 'Sagittarius Zodiac Bracelet',
        icon: '♐',
        element: 'fire',
        colors: ['紫色', '蓝色'],
        properties: ['自由', '乐观', '智慧'],
        zodiacMatch: ['sagittarius', 'aries', 'leo']
    }
};

// 五行对应关系
const elementMapping = {
    metal: { name: '金', colors: ['白色', '金色', '银色'], crystals: ['白水晶', '金发晶'] },
    wood: { name: '木', colors: ['绿色', '青色'], crystals: ['绿幽灵', '东陵玉'] },
    water: { name: '水', colors: ['黑色', '蓝色'], crystals: ['黑曜石', '海蓝宝'] },
    fire: { name: '火', colors: ['红色', '紫色'], crystals: ['红玛瑙', '紫水晶'] },
    earth: { name: '土', colors: ['黄色', '棕色'], crystals: ['黄水晶', '虎眼石'] }
};

// 星座日期范围
const zodiacDates = {
    aries: { start: [3, 21], end: [4, 19] },
    taurus: { start: [4, 20], end: [5, 20] },
    gemini: { start: [5, 21], end: [6, 21] },
    cancer: { start: [6, 22], end: [7, 22] },
    leo: { start: [7, 23], end: [8, 22] },
    virgo: { start: [8, 23], end: [9, 22] },
    libra: { start: [9, 23], end: [10, 23] },
    scorpio: { start: [10, 24], end: [11, 22] },
    sagittarius: { start: [11, 23], end: [12, 21] },
    capricorn: { start: [12, 22], end: [1, 19] },
    aquarius: { start: [1, 20], end: [2, 18] },
    pisces: { start: [2, 19], end: [3, 20] }
};

let selectedGender = null;
let selectedZodiac = null;

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initGenderSelection();
    initZodiacSelection();
    initSubmitButtons();
});

// 标签页切换
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');
            
            // 更新按钮状态
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // 更新内容显示
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`${tabName}-content`).classList.add('active');
        });
    });
}

// 性别选择
function initGenderSelection() {
    const genderOptions = document.querySelectorAll('.gender-option');
    
    genderOptions.forEach(option => {
        option.addEventListener('click', () => {
            genderOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            selectedGender = option.getAttribute('data-gender');
        });
    });
}

// 星座选择
function initZodiacSelection() {
    const zodiacButtons = document.querySelectorAll('.zodiac-btn');
    
    zodiacButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            zodiacButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedZodiac = btn.getAttribute('data-zodiac');
        });
    });
}

// 提交按钮
function initSubmitButtons() {
    // 八字分析提交
    document.getElementById('submitBazi').addEventListener('click', () => {
        const year = document.getElementById('year').value;
        const month = document.getElementById('month').value;
        const day = document.getElementById('day').value;
        
        if (!year || !month || !day) {
            alert('请填写完整的出生日期！');
            return;
        }
        
        if (!selectedGender) {
            alert('请选择性别！');
            return;
        }
        
        analyzeBazi(year, month, day, selectedGender);
    });
    
    // 星座推荐提交
    document.getElementById('submitZodiac').addEventListener('click', () => {
        if (!selectedZodiac) {
            alert('请选择您的星座！');
            return;
        }
        
        analyzeZodiac(selectedZodiac);
    });
}

// 根据日期计算星座
function getZodiacFromDate(month, day) {
    month = parseInt(month);
    day = parseInt(day);
    
    for (const [zodiac, dates] of Object.entries(zodiacDates)) {
        const [startMonth, startDay] = dates.start;
        const [endMonth, endDay] = dates.end;
        
        if (startMonth === endMonth) {
            if (month === startMonth && day >= startDay && day <= endDay) {
                return zodiac;
            }
        } else {
            if ((month === startMonth && day >= startDay) || 
                (month === endMonth && day <= endDay)) {
                return zodiac;
            }
        }
    }
    
    return 'capricorn'; // 默认
}

// 八字分析
function analyzeBazi(year, month, day, gender) {
    // 计算星座
    const zodiac = getZodiacFromDate(month, day);
    
    // 简化的五行计算（基于年份尾数）
    const yearLastDigit = parseInt(year.toString().slice(-1));
    let mainElement;
    
    if (yearLastDigit === 0 || yearLastDigit === 1) mainElement = 'metal';
    else if (yearLastDigit === 2 || yearLastDigit === 3) mainElement = 'water';
    else if (yearLastDigit === 4 || yearLastDigit === 5) mainElement = 'wood';
    else if (yearLastDigit === 6 || yearLastDigit === 7) mainElement = 'fire';
    else mainElement = 'earth';
    
    // 生成推荐
    const recommendations = generateRecommendations(zodiac, mainElement, gender);
    
    // 显示结果
    displayResults({
        type: 'bazi',
        year, month, day, gender,
        zodiac,
        mainElement,
        recommendations
    });
}

// 星座分析
function analyzeZodiac(zodiac) {
    const product = productsDatabase[zodiac];
    const element = product.element;
    
    // 生成推荐
    const recommendations = generateRecommendations(zodiac, element, null);
    
    // 显示结果
    displayResults({
        type: 'zodiac',
        zodiac,
        mainElement: element,
        recommendations
    });
}

// 生成推荐
function generateRecommendations(zodiac, element, gender) {
    const recommendations = [];
    
    // 主推荐：对应星座
    const mainProduct = productsDatabase[zodiac];
    if (mainProduct) {
        recommendations.push({
            product: mainProduct,
            score: 95,
            isBest: true,
            reasons: [
                '完美匹配您的星座能量',
                '增强您的天赋特质',
                '带来好运和保护'
            ]
        });
    }
    
    // 次要推荐：相同元素
    for (const [id, product] of Object.entries(productsDatabase)) {
        if (id !== zodiac && product.element === element) {
            recommendations.push({
                product,
                score: 85,
                isBest: false,
                reasons: [
                    '与您的能量属性相符',
                    '平衡和增强运势',
                    '适合日常佩戴'
                ]
            });
            
            if (recommendations.length >= 4) break;
        }
    }
    
    // 补充推荐：相配星座
    if (recommendations.length < 4 && mainProduct) {
        for (const matchZodiac of mainProduct.zodiacMatch) {
            if (matchZodiac !== zodiac && recommendations.length < 4) {
                const matchProduct = productsDatabase[matchZodiac];
                if (matchProduct && !recommendations.find(r => r.product.id === matchProduct.id)) {
                    recommendations.push({
                        product: matchProduct,
                        score: 75,
                        isBest: false,
                        reasons: [
                            '与您的星座相配',
                            '带来和谐能量',
                            '提升人际关系'
                        ]
                    });
                }
            }
        }
    }
    
    return recommendations.slice(0, 4);
}

// 显示结果
function displayResults(data) {
    const resultsCard = document.getElementById('resultsCard');
    const currentLang = localStorage.getItem('preferredLang') || 'zh';
    
    let html = '<div class="results-header">';
    html += '<h2>✨ ' + (currentLang === 'zh' ? '您的专属推荐' : 'Your Personalized Recommendations') + '</h2>';
    html += '</div>';
    
    // 用户信息
    html += '<div class="user-info">';
    if (data.type === 'bazi') {
        html += `<div class="user-info-item">
            <span class="user-info-label">${currentLang === 'zh' ? '出生日期' : 'Birth Date'}:</span>
            <span class="user-info-value">${data.year}年${data.month}月${data.day}日</span>
        </div>`;
        html += `<div class="user-info-item">
            <span class="user-info-label">${currentLang === 'zh' ? '性别' : 'Gender'}:</span>
            <span class="user-info-value">${data.gender === 'male' ? (currentLang === 'zh' ? '男' : 'Male') : (currentLang === 'zh' ? '女' : 'Female')}</span>
        </div>`;
    }
    
    const zodiacName = productsDatabase[data.zodiac][currentLang === 'zh' ? 'nameZh' : 'nameEn'].replace('手链', '').replace('Bracelet', '');
    html += `<div class="user-info-item">
        <span class="user-info-label">${currentLang === 'zh' ? '星座' : 'Zodiac Sign'}:</span>
        <span class="user-info-value">${productsDatabase[data.zodiac].icon} ${zodiacName}</span>
    </div>`;
    html += '</div>';
    
    // 元素分析
    const elementInfo = elementMapping[data.mainElement] || elementMapping.earth;
    html += '<div class="element-analysis">';
    html += `<h3>${currentLang === 'zh' ? '能量属性分析' : 'Energy Analysis'}</h3>`;
    html += '<div class="element-tags">';
    html += `<span class="element-tag ${data.mainElement}">${currentLang === 'zh' ? '主属性' : 'Main Element'}: ${elementInfo.name}</span>`;
    elementInfo.colors.forEach(color => {
        html += `<span class="element-tag ${data.mainElement}">${currentLang === 'zh' ? '幸运色' : 'Lucky Color'}: ${color}</span>`;
    });
    html += '</div>';
    html += '</div>';
    
    // 详细分析（前半部分）
    html += generateDetailedAnalysis(data, currentLang, 'first');
    
    // 推荐产品
    html += `<h3 class="recommendations-title">${currentLang === 'zh' ? '为您推荐以下水晶手链' : 'Recommended Crystal Bracelets'}</h3>`;
    html += '<div class="recommended-products">';
    
    data.recommendations.forEach(rec => {
        const product = rec.product;
        const imageData = localStorage.getItem(`product-image-${product.id}`);
        const customNameZh = localStorage.getItem(`product-name-zh-${product.id}`) || product.nameZh;
        const customNameEn = localStorage.getItem(`product-name-en-${product.id}`) || product.nameEn;
        const customPrice = localStorage.getItem(`product-price-${product.id}`) || 'RM 113.00';
        
        html += `<a href="product-detail.html?id=${product.id}" class="product-card recommended-product ${rec.isBest ? 'best-match' : ''}">`;
        
        if (rec.isBest) {
            html += `<div class="best-match-badge">${currentLang === 'zh' ? '⭐ 最佳匹配' : '⭐ Best Match'}</div>`;
        }
        
        html += `<div class="match-score">${currentLang === 'zh' ? '匹配度' : 'Match'}: ${rec.score}%</div>`;
        
        if (imageData) {
            html += `<div class="product-image-wrapper">
                <img src="${imageData}" alt="${currentLang === 'zh' ? customNameZh : customNameEn}" class="product-img">
            </div>`;
        } else {
            html += `<div class="product-image" style="background: linear-gradient(135deg, #f5e6d3 0%, #e8d4c0 100%);">
                <span class="product-placeholder">${product.icon}</span>
            </div>`;
        }
        
        html += '<div class="product-info">';
        html += `<h3 class="product-name">${currentLang === 'zh' ? customNameZh : customNameEn}</h3>`;
        html += `<p class="product-price">${customPrice}</p>`;
        html += '<div class="product-rating">★★★★★</div>';
        html += '</div>';
        html += '</a>';
    });
    
    html += '</div>';
    
    // 推荐理由
    if (data.recommendations.length > 0) {
        const bestMatch = data.recommendations[0];
        html += '<div class="reason-box">';
        html += `<h4>${currentLang === 'zh' ? '💎 为什么推荐这款？' : '💎 Why This Recommendation?'}</h4>`;
        html += '<ul>';
        bestMatch.reasons.forEach(reason => {
            html += `<li>${reason}</li>`;
        });
        html += '</ul>';
        html += '</div>';
    }
    
    // 详细分析（后半部分）
    html += generateDetailedAnalysis(data, currentLang, 'second');
    
    // 操作按钮
    html += '<div class="action-buttons">';
    html += `<button class="btn-secondary-action" onclick="window.location.href='products.html'">${currentLang === 'zh' ? '查看全部产品' : 'View All Products'}</button>`;
    html += `<button class="btn-secondary-action" onclick="location.reload()">${currentLang === 'zh' ? '重新测试' : 'Test Again'}</button>`;
    html += '</div>';
    
    resultsCard.innerHTML = html;
    resultsCard.classList.add('show');
    
    // 滚动到结果
    setTimeout(() => {
        resultsCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // 监听滚动，在看到一半内容时显示微信弹窗
        setTimeout(() => {
            setupScrollTrigger();
        }, 1000);
    }, 100);
}

// 生成详细分析内容
function generateDetailedAnalysis(data, lang, part) {
    const product = productsDatabase[data.zodiac];
    const elementInfo = elementMapping[data.mainElement] || elementMapping.earth;
    
    let html = '<div class="detailed-analysis">';
    
    if (part === 'first') {
        html += `<h3>${lang === 'zh' ? '📊 详细命理分析' : '📊 Detailed Analysis'}</h3>`;
        
        // 星座性格分析
        html += '<div class="analysis-section">';
        html += `<h4>${lang === 'zh' ? '🌟 星座性格特质' : '🌟 Zodiac Personality'}</h4>`;
        if (lang === 'zh') {
            html += `<p>作为${product.nameZh.replace('手链', '')}，您天生具有${product.properties.join('、')}的特质。这些特质使您在人际交往中展现出独特的魅力。您的能量属性为${elementInfo.name}，这意味着您的性格中蕴含着${elementInfo.name}元素的力量。${elementInfo.name}属性的人通常${getElementPersonality(data.mainElement)}。在日常生活中，您可能会发现自己特别擅长${getElementStrength(data.mainElement)}，这正是您的天赋所在。</p>`;
        } else {
            html += `<p>As a ${product.nameEn.replace('Bracelet', '')}, you naturally possess qualities of ${product.properties.join(', ')}. These traits make you stand out in interpersonal relationships. Your energy element is ${elementInfo.name}, which means your personality contains the power of this element. People with this element typically ${getElementPersonality(data.mainElement)}. In daily life, you may find yourself particularly good at ${getElementStrength(data.mainElement)}, which is your natural gift.</p>`;
        }
        html += '</div>';
        
        // 能量场分析
        html += '<div class="analysis-section">';
        html += `<h4>${lang === 'zh' ? '💫 能量场与运势' : '💫 Energy Field & Fortune'}</h4>`;
        if (lang === 'zh') {
            html += `<p>根据您的出生信息分析，您的能量场呈现出${elementInfo.name}属性的特征。${elementInfo.name}能量在五行中${getElementCycle(data.mainElement)}，这对您的运势发展有着重要影响。建议您在日常生活中多接触${elementInfo.colors.join('、')}等颜色，这些颜色能够增强您的能量场，带来更好的运势。同时，佩戴相应属性的水晶饰品，可以帮助您平衡能量，化解不利因素，提升整体运势。</p>`;
        } else {
            html += `<p>Based on your birth information, your energy field shows characteristics of the ${elementInfo.name} element. This element ${getElementCycle(data.mainElement)} in the Five Elements cycle, which has an important impact on your fortune development. It is recommended that you surround yourself with colors like ${elementInfo.colors.join(', ')} in daily life, as these colors can enhance your energy field and bring better fortune. Wearing crystal jewelry with corresponding properties can help you balance energy and improve overall fortune.</p>`;
        }
        html += '</div>';
        
    } else {
        // 水晶能量解析
        html += '<div class="analysis-section">';
        html += `<h4>${lang === 'zh' ? '💎 水晶能量解析' : '💎 Crystal Energy Analysis'}</h4>`;
        if (lang === 'zh') {
            html += `<p>我们为您推荐的${product.nameZh}，其水晶能量与您的命理属性高度契合。这款手链中的水晶能够与您的能量场产生共振，帮助您发挥天赋优势，同时弥补不足之处。长期佩戴可以帮助您保持能量平衡，增强自信心，提升人际关系，并在事业和生活中获得更多机遇。水晶的天然能量会随着佩戴时间的增长而与您的气场更加融合，形成独特的能量保护层。</p>`;
        } else {
            html += `<p>The ${product.nameEn} we recommend for you has crystal energy that highly matches your numerological attributes. The crystals in this bracelet can resonate with your energy field, helping you leverage your natural advantages while compensating for weaknesses. Long-term wearing can help you maintain energy balance, enhance confidence, improve relationships, and gain more opportunities in career and life. The natural energy of crystals will increasingly merge with your aura over time, forming a unique energy protection layer.</p>`;
        }
        html += '</div>';
        
        // 佩戴建议
        html += '<div class="analysis-section">';
        html += `<h4>${lang === 'zh' ? '🎯 佩戴建议与注意事项' : '🎯 Wearing Suggestions'}</h4>`;
        if (lang === 'zh') {
            html += `<p>建议您将水晶手链佩戴在${data.gender === 'male' ? '左手' : '右手'}，这样可以更好地吸收和释放能量。初次佩戴时，建议先用清水冲洗，然后在阳光下晾晒1-2小时进行净化。日常佩戴时，避免接触化学物质和高温环境。每月可以用月光或水晶簇为手链充能一次，保持其能量活性。如果感觉能量减弱，可以将手链放在盐水中浸泡一晚进行深度净化。记住，水晶是有灵性的，用心对待它，它也会给予您更多的能量回馈。</p>`;
        } else {
            html += `<p>It is recommended to wear the crystal bracelet on your ${data.gender === 'male' ? 'left' : 'right'} hand for better energy absorption and release. For first-time wear, rinse with clean water and dry in sunlight for 1-2 hours for purification. During daily wear, avoid contact with chemicals and high-temperature environments. You can recharge the bracelet monthly using moonlight or crystal clusters to maintain its energy activity. If you feel the energy weakening, soak the bracelet in salt water overnight for deep purification. Remember, crystals are spiritual - treat them with care, and they will give you more energy in return.</p>`;
        }
        html += '</div>';
    }
    
    html += '</div>';
    return html;
}

// 获取元素性格描述
function getElementPersonality(element) {
    const personalities = {
        metal: '坚韧果断，注重原则，具有很强的执行力和判断力',
        wood: '生机勃勃，富有创造力，善于成长和发展',
        water: '灵活变通，智慧深邃，善于适应环境变化',
        fire: '热情洋溢，充满活力，具有强大的感染力和领导力',
        earth: '稳重踏实，值得信赖，具有很强的包容性和耐心'
    };
    return personalities[element] || personalities.earth;
}

// 获取元素优势
function getElementStrength(element) {
    const strengths = {
        metal: '决策和执行，在需要果断判断的场合表现出色',
        wood: '创新和发展，在需要创意和成长的领域游刃有余',
        water: '沟通和协调，在复杂的人际关系中如鱼得水',
        fire: '激励和领导，在需要热情和动力的环境中大放异彩',
        earth: '稳定和支持，在需要可靠和耐心的工作中表现卓越'
    };
    return strengths[element] || strengths.earth;
}

// 获取元素循环关系
function getElementCycle(element) {
    const cycles = {
        metal: '生水克木，与水、土元素相生相助',
        wood: '生火克土，与火、水元素相生相助',
        water: '生木克火，与木、金元素相生相助',
        fire: '生土克金，与土、木元素相生相助',
        earth: '生金克水，与金、火元素相生相助'
    };
    return cycles[element] || cycles.earth;
}

// 设置滚动触发器
function setupScrollTrigger() {
    let triggered = false;
    
    window.addEventListener('scroll', function() {
        if (triggered) return;
        
        const resultsCard = document.getElementById('resultsCard');
        const rect = resultsCard.getBoundingClientRect();
        const scrolled = window.pageYOffset || document.documentElement.scrollTop;
        const cardHeight = resultsCard.offsetHeight;
        const cardTop = resultsCard.offsetTop;
        
        // 当滚动到结果卡片的50%位置时触发
        if (scrolled > cardTop + cardHeight * 0.5) {
            triggered = true;
            showWechatModal();
        }
    });
}

// 显示微信弹窗
function showWechatModal() {
    const modal = document.getElementById('wechatModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // 禁止背景滚动
}

// 关闭微信弹窗
function closeWechatModal() {
    const modal = document.getElementById('wechatModal');
    modal.classList.remove('show');
    document.body.style.overflow = ''; // 恢复滚动
}

// 复制微信号
function copyWechatId() {
    const wechatId = 'NorthernSky2024';
    
    // 创建临时输入框
    const tempInput = document.createElement('input');
    tempInput.value = wechatId;
    document.body.appendChild(tempInput);
    tempInput.select();
    
    try {
        document.execCommand('copy');
        alert('微信号已复制：' + wechatId + '\n请打开微信添加好友！');
        closeWechatModal();
    } catch (err) {
        alert('复制失败，请手动复制微信号：' + wechatId);
    }
    
    document.body.removeChild(tempInput);
}

// 点击弹窗外部关闭
document.addEventListener('click', function(e) {
    const modal = document.getElementById('wechatModal');
    if (e.target === modal) {
        closeWechatModal();
    }
});

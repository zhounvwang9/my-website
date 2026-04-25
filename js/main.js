// ==================== 返回功能 ====================
function goBack() {
    // 如果有历史记录，返回上一页
    if (window.history.length > 1) {
        window.history.back();
    } else {
        // 否则返回首页
        window.location.href = 'index.html';
    }
}

// ==================== 语言切换功能 ====================
let currentLang = 'zh'; // 默认中文

const translations = {
    zh: {
        langButton: 'EN'
    },
    en: {
        langButton: '中文'
    }
};

// 切换语言
function toggleLanguage() {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    updateLanguage();
    
    // 保存语言偏好到本地存储
    localStorage.setItem('preferredLang', currentLang);
}

// 更新页面语言
function updateLanguage() {
    const elements = document.querySelectorAll('[data-zh][data-en]');
    
    elements.forEach(element => {
        const zhText = element.getAttribute('data-zh');
        const enText = element.getAttribute('data-en');
        
        if (currentLang === 'zh') {
            element.textContent = zhText;
        } else {
            element.textContent = enText;
        }
    });
    
    // 更新语言切换按钮
    const langSwitch = document.getElementById('langSwitch');
    if (langSwitch) {
        langSwitch.textContent = translations[currentLang].langButton;
    }
    
    // 更新HTML lang属性
    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
}

// ==================== 菜单功能 ====================
function initMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const sideMenu = document.getElementById('sideMenu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sideMenu.classList.add('active');
        });
    }
    
    if (menuClose) {
        menuClose.addEventListener('click', () => {
            sideMenu.classList.remove('active');
        });
    }
    
    // 点击菜单外部关闭
    document.addEventListener('click', (e) => {
        if (sideMenu && sideMenu.classList.contains('active')) {
            if (!sideMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                sideMenu.classList.remove('active');
            }
        }
    });
    
    // 点击菜单链接后关闭菜单
    const menuLinks = document.querySelectorAll('.menu-list a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            sideMenu.classList.remove('active');
        });
    });
}

// ==================== 产品筛选功能 ====================
function initProductFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card[data-category]');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 更新按钮状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            
            // 筛选产品
            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    // 添加淡入动画
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ==================== 产品详情页功能 ====================
function initProductDetail() {
    // 图片画廊切换
    const galleryThumbs = document.querySelectorAll('.gallery-thumb');
    const mainImage = document.querySelector('.main-image');
    
    if (galleryThumbs.length > 0 && mainImage) {
        galleryThumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                // 更新激活状态
                galleryThumbs.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
                
                // 更新主图
                const bgStyle = thumb.style.background;
                const icon = thumb.querySelector('span').textContent;
                mainImage.style.background = bgStyle;
                mainImage.querySelector('.product-placeholder-large').textContent = icon;
            });
        });
    }
    
    // 选项按钮切换
    const optionGroups = document.querySelectorAll('.option-group');
    
    optionGroups.forEach(group => {
        const buttons = group.querySelectorAll('.option-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                // 同一组内只能选择一个
                buttons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    });
    
    // 加入购物车按钮
    const addToCartBtn = document.querySelector('.btn-add-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            // 获取选中的选项
            const selectedSize = document.querySelector('.option-btn.active')?.textContent;
            
            // 显示提示
            showNotification(currentLang === 'zh' ? '已加入购物车！' : 'Added to cart!');
        });
    }
    
    // 立即购买按钮
    const buyNowBtn = document.querySelector('.btn-buy-now');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            showNotification(currentLang === 'zh' ? '正在跳转到支付页面...' : 'Redirecting to checkout...');
        });
    }
}

// ==================== 通知提示 ====================
function showNotification(message) {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: #2c2c2c;
        color: white;
        padding: 15px 30px;
        border-radius: 25px;
        font-size: 14px;
        z-index: 9999;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        animation: slideDown 0.3s ease;
    `;
    notification.textContent = message;
    
    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // 3秒后自动移除
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ==================== 平滑滚动 ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // 如果是 # 开头但不是单独的 #
            if (href !== '#' && href.startsWith('#')) {
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 70; // 减去导航栏高度
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ==================== 滚动动画 ====================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察所有产品卡片和分类卡片
    const animatedElements = document.querySelectorAll('.product-card, .category-card, .value-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// ==================== URL参数处理 ====================
function handleURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const sale = urlParams.get('sale');
    
    // 如果有分类参数，自动筛选
    if (category) {
        const filterBtn = document.querySelector(`[data-category="${category}"]`);
        if (filterBtn) {
            filterBtn.click();
        }
    }
}

// ==================== 返回顶部按钮 ====================
function initBackToTop() {
    // 创建返回顶部按钮
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    
    document.body.appendChild(backToTopBtn);
    
    // 滚动时显示/隐藏按钮
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // 点击返回顶部
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== 图片懒加载 ====================
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// ==================== 从LocalStorage加载产品图片和信息 ====================
function loadProductImages() {
    // 产品ID列表
    const productIds = [
        'gemini', 'leo', 'scorpio', 'pisces',
        'virgo', 'taurus', 'libra', 'cancer',
        'aries', 'capricorn', 'aquarius', 'sagittarius'
    ];

    productIds.forEach(id => {
        // 加载图片
        const imageData = localStorage.getItem(`product-image-${id}`);
        if (imageData) {
            // 查找所有包含该产品ID的图片元素
            const imgElements = document.querySelectorAll(`img[src*="${id}-bracelet"]`);
            imgElements.forEach(img => {
                img.src = imageData;
                img.style.display = 'block';
                // 隐藏后备元素
                const fallback = img.nextElementSibling;
                if (fallback && fallback.classList.contains('product-image-fallback')) {
                    fallback.style.display = 'none';
                }
            });
        }

        // 加载自定义产品名称
        const customNameZh = localStorage.getItem(`product-name-zh-${id}`);
        const customNameEn = localStorage.getItem(`product-name-en-${id}`);
        
        if (customNameZh || customNameEn) {
            // 查找所有包含该产品的名称元素
            const nameElements = document.querySelectorAll(`.product-name[data-product-id="${id}"]`);
            nameElements.forEach(nameEl => {
                if (currentLang === 'zh' && customNameZh) {
                    nameEl.textContent = customNameZh;
                    nameEl.setAttribute('data-zh', customNameZh);
                }
                if (currentLang === 'en' && customNameEn) {
                    nameEl.textContent = customNameEn;
                    nameEl.setAttribute('data-en', customNameEn);
                }
            });
        }

        // 加载自定义价格
        const customPrice = localStorage.getItem(`product-price-${id}`);
        if (customPrice) {
            const priceElements = document.querySelectorAll(`.product-price[data-product-id="${id}"]`);
            priceElements.forEach(priceEl => {
                priceEl.textContent = customPrice;
            });
        }
    });
}

// 更新语言时也要更新自定义名称
function updateLanguage() {
    const elements = document.querySelectorAll('[data-zh][data-en]');
    
    elements.forEach(element => {
        const zhText = element.getAttribute('data-zh');
        const enText = element.getAttribute('data-en');
        
        if (currentLang === 'zh') {
            element.textContent = zhText;
        } else {
            element.textContent = enText;
        }
    });
    
    // 更新语言切换按钮
    const langSwitch = document.getElementById('langSwitch');
    if (langSwitch) {
        langSwitch.textContent = translations[currentLang].langButton;
    }
    
    // 更新HTML lang属性
    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
    
    // 重新加载产品信息以应用自定义名称
    loadProductImages();
}

// ==================== 页面加载完成后初始化 ====================
document.addEventListener('DOMContentLoaded', () => {
    // 从本地存储加载语言偏好
    const savedLang = localStorage.getItem('preferredLang');
    if (savedLang) {
        currentLang = savedLang;
        updateLanguage();
    }
    
    // 初始化语言切换
    const langSwitch = document.getElementById('langSwitch');
    if (langSwitch) {
        langSwitch.addEventListener('click', toggleLanguage);
    }
    
    // 加载产品图片
    loadProductImages();
    
    // 初始化各种功能
    initMenu();
    initProductFilter();
    initProductDetail();
    initSmoothScroll();
    initScrollAnimations();
    initBackToTop();
    initLazyLoading();
    handleURLParams();
    
    // 页面加载动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==================== 窗口大小改变时的处理 ====================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // 可以在这里添加响应式调整逻辑
    }, 250);
});

// ==================== 防止双击缩放（移动端） ====================
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

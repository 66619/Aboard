/**
 * Internationalization (i18n) Module
 * Provides multi-language support for the Aboard application
 * 
 * Supported Languages:
 * - zh-CN: Chinese (Simplified)
 * - en-US: English (United States)
 * - ja-JP: Japanese
 * - ko-KR: Korean
 * - fr-FR: French
 * - de-DE: German
 * - es-ES: Spanish
 */

class I18n {
    constructor() {
        this.currentLocale = 'zh-CN'; // Default language
        this.translations = {};
        this.fallbackLocale = 'zh-CN';
        
        // Available languages
        this.availableLocales = {
            'zh-CN': '中文简体',
            'en-US': 'English',
            'ja-JP': '日本語',
            'ko-KR': '한국어',
            'fr-FR': 'Français',
            'de-DE': 'Deutsch',
            'es-ES': 'Español'
        };
    }

    /**
     * Initialize i18n system
     */
    async init() {
        // Load saved language preference or detect browser language
        this.currentLocale = this.getSavedLocale() || this.detectBrowserLocale();
        
        // Load translation files
        await this.loadTranslations();
        
        // Apply translations to the page
        this.applyTranslations();
        
        // Update HTML lang attribute
        document.documentElement.lang = this.currentLocale;
    }

    /**
     * Get saved locale from localStorage
     */
    getSavedLocale() {
        return localStorage.getItem('locale');
    }

    /**
     * Save locale to localStorage
     */
    saveLocale(locale) {
        localStorage.setItem('locale', locale);
    }

    /**
     * Detect browser language
     */
    detectBrowserLocale() {
        const browserLang = navigator.language || navigator.userLanguage;
        
        // Check if we support the exact locale
        if (this.availableLocales[browserLang]) {
            return browserLang;
        }
        
        // Check if we support the language family (e.g., 'en' for 'en-GB')
        const langFamily = browserLang.split('-')[0];
        const matchingLocale = Object.keys(this.availableLocales).find(
            locale => locale.startsWith(langFamily)
        );
        
        return matchingLocale || this.fallbackLocale;
    }

    /**
     * Load translation files
     */
    async loadTranslations() {
        try {
            const response = await fetch(`js/locales/${this.currentLocale}.js`);
            if (!response.ok) {
                console.warn(`Failed to load ${this.currentLocale}, falling back to ${this.fallbackLocale}`);
                this.currentLocale = this.fallbackLocale;
                const fallbackResponse = await fetch(`js/locales/${this.fallbackLocale}.js`);
                const fallbackText = await fallbackResponse.text();
                eval(fallbackText);
            } else {
                const text = await response.text();
                eval(text);
            }
            
            // Translations are now in window.translations
            this.translations = window.translations || {};
        } catch (error) {
            console.error('Error loading translations:', error);
            this.translations = {};
        }
    }

    /**
     * Get translation for a key
     */
    t(key, params = {}) {
        const keys = key.split('.');
        let value = this.translations;
        
        for (const k of keys) {
            value = value[k];
            if (value === undefined) {
                console.warn(`Translation missing for key: ${key}`);
                return key;
            }
        }
        
        // Replace parameters in translation
        if (typeof value === 'string') {
            return value.replace(/\{(\w+)\}/g, (match, param) => {
                return params[param] !== undefined ? params[param] : match;
            });
        }
        
        return value;
    }

    /**
     * Apply translations to all elements with data-i18n attribute
     */
    applyTranslations() {
        // Translate elements with data-i18n attribute for text content
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (translation !== key) {
                // Update element content based on element type
                if (el.tagName === 'INPUT' && (el.type === 'button' || el.type === 'submit')) {
                    el.value = translation;
                } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    // For input elements, only update placeholder if specified
                    const placeholderKey = el.getAttribute('data-i18n-placeholder');
                    if (placeholderKey) {
                        el.placeholder = this.t(placeholderKey);
                    }
                } else {
                    // For regular elements, update text content
                    // Only update if element has no children with data-i18n attribute
                    if (!el.querySelector('[data-i18n]')) {
                        el.textContent = translation;
                    }
                }
            }
        });
        
        // Translate title attributes
        const titleElements = document.querySelectorAll('[data-i18n-title]');
        titleElements.forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            const translation = this.t(key);
            if (translation !== key) {
                el.title = translation;
            }
        });
        
        // Update document title
        const titleKey = document.documentElement.getAttribute('data-i18n-title');
        if (titleKey) {
            document.title = this.t(titleKey);
        } else {
            // Default title translation
            document.title = this.t('app.title');
        }
        
        // Auto-translate common elements based on their ID or class
        this.autoTranslateElements();
    }
    
    /**
     * Auto-translate elements based on common patterns
     * This reduces the need to manually add data-i18n to every element
     */
    autoTranslateElements() {
        // Translate toolbar buttons
        const toolbarMappings = {
            'undo-btn': { span: 'toolbar.undo', title: 'toolbar.undo' },
            'redo-btn': { span: 'toolbar.redo', title: 'toolbar.redo' },
            'pen-btn': { span: 'toolbar.pen', title: 'toolbar.pen' },
            'pan-btn': { span: 'toolbar.move', title: 'toolbar.move' },
            'eraser-btn': { span: 'toolbar.eraser', title: 'toolbar.eraser' },
            'clear-btn': { span: 'toolbar.clear', title: 'toolbar.clear' },
            'background-btn': { span: 'toolbar.background', title: 'toolbar.background' },
            'more-btn': { span: 'toolbar.more', title: 'toolbar.more' },
            'settings-btn': { span: 'toolbar.settings', title: 'toolbar.settings' },
            'export-btn-top': { title: 'toolbar.export' },
            'zoom-out-btn': { title: 'toolbar.zoomOut' },
            'zoom-in-btn': { title: 'toolbar.zoomIn' },
            'fullscreen-btn': { title: 'toolbar.fullscreen' }
        };
        
        Object.entries(toolbarMappings).forEach(([id, mapping]) => {
            const el = document.getElementById(id);
            if (el) {
                if (mapping.span) {
                    const span = el.querySelector('span');
                    if (span) {
                        span.textContent = this.t(mapping.span);
                    }
                }
                if (mapping.title) {
                    el.title = this.t(mapping.title);
                }
            }
        });
        
        // Translate zoom input placeholder
        const zoomInput = document.getElementById('zoom-input');
        if (zoomInput) {
            zoomInput.title = this.t('toolbar.zoomPlaceholder');
        }
        
        // Translate configuration panel labels
        this.translateConfigPanels();
        
        // Translate settings modal
        this.translateSettingsModal();
        
        // Translate modals
        this.translateModals();
        
        // Translate pagination and other controls
        this.translatePageControls();
    }
    
    translatePageControls() {
        // Translate pagination buttons
        const prevBtn = document.getElementById('prev-page-btn');
        if (prevBtn) {
            prevBtn.title = this.t('page.previous');
        }
        
        const nextBtn = document.getElementById('next-or-add-page-btn');
        if (nextBtn) {
            const isLastPage = true; // This will be determined by context
            nextBtn.title = this.t('page.next');
        }
        
        const pageInput = document.getElementById('page-input');
        if (pageInput) {
            pageInput.title = this.t('page.jumpPlaceholder');
        }
    }
    
    translateConfigPanels() {
        // Translate all config panel labels
        const labelMappings = {
            '笔触类型': 'tools.pen.type',
            '颜色与粗细': 'tools.pen.colorAndSize',
            '形状': 'tools.eraser.shape',
            '橡皮擦大小': 'tools.eraser.sizeLabel',
            '背景颜色': 'background.color',
            '背景图案': 'background.pattern',
            '密度': 'background.density',
            '大小': 'background.size',
            '更多功能': 'features.moreFeatures',
            '小功能': 'features.title',
            '时间显示选项': 'timeDisplay.options'
        };
        
        // Translate labels in config panels
        document.querySelectorAll('#config-area label, #feature-area label, #time-display-area label').forEach(label => {
            const text = label.childNodes[0]?.textContent?.trim();
            if (text && labelMappings[text]) {
                const translation = this.t(labelMappings[text]);
                if (translation !== labelMappings[text]) {
                    // Preserve the structure (e.g., keep span elements for values)
                    if (label.childNodes.length === 1) {
                        label.textContent = translation;
                    } else {
                        label.childNodes[0].textContent = translation;
                    }
                }
            }
        });
        
        // Pen configuration
        const penTypeButtons = {
            'normal': 'tools.pen.normal',
            'pencil': 'tools.pen.pencil',
            'ballpoint': 'tools.pen.ballpoint',
            'fountain': 'tools.pen.fountain',
            'brush': 'tools.pen.brush'
        };
        
        document.querySelectorAll('.pen-type-btn').forEach(btn => {
            const penType = btn.getAttribute('data-pen-type');
            if (penType && penTypeButtons[penType]) {
                btn.textContent = this.t(penTypeButtons[penType]);
            }
        });
        
        // Eraser shape buttons
        const eraserShapes = {
            'circle': 'tools.eraser.shapeCircle',
            'rectangle': 'tools.eraser.shapeRectangle'
        };
        
        document.querySelectorAll('.eraser-shape-btn').forEach(btn => {
            const shape = btn.getAttribute('data-eraser-shape');
            if (shape) {
                btn.textContent = shape === 'circle' ? this.t('tools.eraser.shapeCircle') || '圆形' : this.t('tools.eraser.shapeRectangle') || '方形';
            }
        });
        
        // Background patterns
        const patterns = {
            'blank': 'background.blank',
            'dots': 'background.dots',
            'grid': 'background.grid',
            'tianzige': 'background.tianzige',
            'english-lines': 'background.english4line',
            'music-staff': 'background.musicStaff',
            'coordinate': 'background.coordinate'
        };
        
        document.querySelectorAll('.pattern-option-btn').forEach(btn => {
            const pattern = btn.getAttribute('data-pattern');
            if (pattern && patterns[pattern]) {
                btn.textContent = this.t(patterns[pattern]);
            }
        });
        
        // Feature area buttons
        this.translateFeatureArea();
    }
    
    translateFeatureArea() {
        // Translate feature buttons
        const timeDisplayBtn = document.getElementById('time-display-feature-btn');
        if (timeDisplayBtn) {
            const span = timeDisplayBtn.querySelector('span');
            if (span) {
                span.textContent = this.t('features.time');
            }
            timeDisplayBtn.title = this.t('timeDisplay.title');
        }
        
        const timerBtn = document.getElementById('timer-feature-btn');
        if (timerBtn) {
            const span = timerBtn.querySelector('span');
            if (span) {
                span.textContent = this.t('features.timer');
            }
            timerBtn.title = this.t('timer.title');
        }
        
        // Translate close button titles
        const closeButtons = [
            { id: 'feature-close-btn', key: 'common.close' },
            { id: 'config-close-btn', key: 'common.close' },
            { id: 'time-display-area-close-btn', key: 'common.close' }
        ];
        
        closeButtons.forEach(({ id, key }) => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.title = this.t(key);
            }
        });
    }
    
    translateSettingsModal() {
        // Translate settings modal title
        const settingsTitle = document.querySelector('#settings-modal h2');
        if (settingsTitle) {
            settingsTitle.textContent = this.t('settings.title');
        }
        
        // Settings tab labels
        const tabs = document.querySelectorAll('.settings-tab-icon span');
        const tabNames = ['general', 'display', 'canvas', 'background', 'about', 'announcement', 'more'];
        
        tabs.forEach((span, index) => {
            if (tabNames[index]) {
                // Use the translated tab name
                const key = `settings.tabs.${tabNames[index]}`;
                const translation = this.t(key);
                if (translation !== key) {
                    span.textContent = translation;
                }
            }
        });
        
        // Translate settings section headers (h3 tags)
        const headerMappings = {
            '通用设置': 'settings.general.title',
            '显示设置': 'settings.display.title',
            '画布设置': 'settings.canvas.title',
            '背景设置': 'settings.background.title',
            '关于 Aboard': 'settings.about.title',
            '公告': 'settings.announcement.title',
            '更多设置': 'settings.more.title'
        };
        
        document.querySelectorAll('.settings-tab-content h3').forEach(h3 => {
            const text = h3.textContent.trim();
            if (headerMappings[text]) {
                const translation = this.t(headerMappings[text]);
                if (translation !== headerMappings[text]) {
                    h3.textContent = translation;
                }
            }
        });
        
        // Translate settings labels
        this.translateSettingsLabels();
    }
    
    translateSettingsLabels() {
        // Map Chinese labels to translation keys
        const labelMappings = {
            '语言 / Language': 'settings.general.language',
            '全局字体': 'settings.general.globalFont',
            '启用边缘吸附': 'settings.general.edgeSnap',
            '控制按钮位置': 'settings.general.controlPosition',
            '显示缩放控件': 'settings.display.showZoomControls',
            '显示全屏按钮': 'settings.display.showFullscreenBtn',
            '工具栏大小': 'settings.display.toolbarSize',
            '属性栏大小': 'settings.display.configScale',
            '主题色': 'settings.display.themeColor',
            '画布模式': 'settings.canvas.mode',
            '画布尺寸': 'settings.canvas.size',
            '背景透明度': 'settings.background.opacity',
            '图案透明度': 'settings.background.patternIntensity',
            '背景图案偏好': 'settings.background.preference',
            '显示时间和日期': 'settings.more.showTimeDisplay',
            '显示选项': 'settings.time.displayOptions',
            '时区': 'settings.time.timezone',
            '时间格式': 'settings.time.timeFormat',
            '日期格式': 'settings.time.dateFormat',
            '颜色设置': 'settings.time.colorSettings',
            '字体颜色': 'settings.time.textColor',
            '背景颜色': 'settings.time.bgColor',
            '字体大小': 'settings.time.fontSize',
            '透明度': 'settings.time.opacity',
            '全屏模式': 'settings.time.fullscreenMode',
            '全屏字体大小': 'settings.time.fullscreenFontSize'
        };
        
        // Translate labels in settings
        document.querySelectorAll('.settings-tab-content label').forEach(label => {
            const text = label.childNodes[0]?.textContent?.trim();
            if (text && labelMappings[text]) {
                const translation = this.t(labelMappings[text]);
                if (translation !== labelMappings[text]) {
                    if (label.childNodes.length === 1) {
                        label.textContent = translation;
                    } else {
                        label.childNodes[0].textContent = translation;
                    }
                }
            }
        });
        
        // Translate checkbox labels
        document.querySelectorAll('.checkbox-label span').forEach(span => {
            const text = span.textContent.trim();
            if (labelMappings[text]) {
                const translation = this.t(labelMappings[text]);
                if (translation !== labelMappings[text]) {
                    span.textContent = translation;
                }
            }
        });
        
        // Translate canvas mode buttons
        const canvasModeButtons = document.querySelectorAll('.canvas-mode-btn');
        canvasModeButtons.forEach(btn => {
            const mode = btn.getAttribute('data-mode');
            if (mode === 'infinite') {
                btn.textContent = this.t('settings.canvas.infiniteCanvas');
            } else if (mode === 'paginated') {
                btn.textContent = this.t('settings.canvas.pagination');
            }
        });
        
        // Translate position buttons
        const positionMappings = {
            'top-left': 'settings.general.positionTopLeft',
            'top-right': 'settings.general.positionTopRight',
            'bottom-left': 'settings.general.positionBottomLeft',
            'bottom-right': 'settings.general.positionBottomRight'
        };
        
        document.querySelectorAll('.position-option-btn').forEach(btn => {
            const position = btn.getAttribute('data-position');
            if (position && positionMappings[position]) {
                btn.textContent = this.t(positionMappings[position]);
            }
        });
        
        // Translate hints
        this.translateSettingsHints();
    }
    
    translateSettingsHints() {
        const hintMappings = {
            '选择界面语言 / Choose interface language': 'settings.general.languageHint',
            '选择应用程序使用的字体': 'settings.general.globalFontHint',
            '拖动控制面板时自动吸附到屏幕边缘': 'settings.general.edgeSnapHint',
            '选择缩放和分页控件在屏幕上的显示位置': 'settings.general.controlPositionHint',
            '勾选后，在画布上方显示缩放控件': 'settings.display.showZoomControlsHint',
            '勾选后，在缩放控件旁显示全屏按钮': 'settings.display.showFullscreenBtnHint',
            '调整底部工具栏的大小': 'settings.display.toolbarSizeHint',
            '调整弹出具体属性面板的大小': 'settings.display.configScaleHint',
            '工具栏被选中时的颜色': 'settings.display.themeColorHint',
            '选择画布的显示模式': 'settings.canvas.modeHint',
            '选择预设尺寸或自定义画布比例和大小': 'settings.canvas.sizeHint',
            '调整背景的透明度,100%为完全不透明': 'settings.background.opacityHint',
            '调整背景图案线条的明暗程度': 'settings.background.patternIntensityHint',
            '选择在属性栏中显示的图案': 'settings.background.preferenceHint',
            '在右上角显示当前时间和日期': 'settings.more.showTimeDisplayHint',
            '选择要显示的时区': 'settings.time.timezoneHint',
            '选择时间的显示格式': 'settings.time.timeFormatHint',
            '选择日期的显示格式': 'settings.time.dateFormatHint',
            '设置时间显示的字体和背景颜色': 'settings.time.colorSettingsHint',
            '调整时间显示的字体大小': 'settings.time.fontSizeHint',
            '调整时间显示的透明度': 'settings.time.opacityHint',
            '选择如何触发时间全屏显示': 'settings.time.fullscreenModeHint',
            '调整全屏时间显示的字体大小，范围10%-85%': 'settings.time.fullscreenFontSizeHint'
        };
        
        document.querySelectorAll('.settings-hint').forEach(hint => {
            const text = hint.textContent.trim();
            if (hintMappings[text]) {
                const translation = this.t(hintMappings[text]);
                if (translation !== hintMappings[text]) {
                    hint.textContent = translation;
                }
            }
        });
    }
    
    translateModals() {
        // Clear confirmation modal
        const confirmTitle = document.querySelector('#confirm-modal h2');
        if (confirmTitle) {
            confirmTitle.textContent = this.t('tools.clear.confirm');
        }
        
        const confirmMessage = document.querySelector('#confirm-modal .confirm-message');
        if (confirmMessage) {
            confirmMessage.textContent = this.t('tools.clear.message');
        }
        
        const confirmOk = document.getElementById('confirm-ok-btn');
        if (confirmOk) {
            confirmOk.textContent = this.t('common.confirm');
        }
        
        const confirmCancel = document.getElementById('confirm-cancel-btn');
        if (confirmCancel) {
            confirmCancel.textContent = this.t('common.cancel');
        }
        
        // Welcome modal
        const welcomeTitle = document.querySelector('#welcome-modal h2');
        if (welcomeTitle) {
            welcomeTitle.textContent = this.t('welcome.title');
        }
        
        const welcomeContent = document.querySelector('#welcome-modal .modal-content p');
        if (welcomeContent) {
            welcomeContent.textContent = this.t('welcome.content');
        }
        
        const welcomeOk = document.getElementById('welcome-ok-btn');
        if (welcomeOk) {
            welcomeOk.textContent = this.t('welcome.confirm');
        }
        
        const welcomeNoShow = document.getElementById('welcome-no-show-btn');
        if (welcomeNoShow) {
            welcomeNoShow.textContent = this.t('welcome.noShowAgain');
        }
        
        // Announcement modal
        const announcementTitle = document.getElementById('announcement-title');
        if (announcementTitle) {
            announcementTitle.textContent = this.t('settings.announcement.title');
        }
        
        // Time Display Settings Modal
        this.translateTimeDisplaySettings();
        
        // Timer Settings Modal  
        this.translateTimerSettings();
    }
    
    translateTimeDisplaySettings() {
        // Modal title
        const tdSettingsTitle = document.querySelector('#time-display-settings-modal h2');
        if (tdSettingsTitle) {
            tdSettingsTitle.textContent = this.t('timeDisplay.settingsTitle');
        }
        
        // Close button
        const tdCloseBtn = document.getElementById('time-display-settings-close-btn');
        if (tdCloseBtn) {
            tdCloseBtn.title = this.t('common.close');
        }
        
        // Checkbox labels in time display area
        document.querySelectorAll('#time-display-area .checkbox-label span').forEach(span => {
            if (span.textContent.trim() === '显示日期') {
                span.textContent = this.t('timeDisplay.showDate');
            } else if (span.textContent.trim() === '显示时间') {
                span.textContent = this.t('timeDisplay.showTime');
            }
        });
        
        // Settings button
        const tdSettingsBtn = document.getElementById('time-display-area-settings-btn');
        if (tdSettingsBtn) {
            tdSettingsBtn.title = this.t('timeDisplay.settings');
        }
        
        // Label mappings for time display settings
        const labelMappings = {
            '显示选项': 'timeDisplay.displayOptions',
            '时区': 'timeDisplay.timezone',
            '时间格式': 'timeDisplay.timeFormat',
            '日期格式': 'timeDisplay.dateFormat',
            '颜色设置': 'timeDisplay.colorSettings',
            '字体颜色': 'timeDisplay.textColor',
            '背景颜色': 'timeDisplay.bgColor',
            '字体大小': 'timeDisplay.fontSize',
            '透明度': 'timeDisplay.opacity',
            '全屏模式': 'timeDisplay.fullscreenMode',
            '全屏字体大小': 'timeDisplay.fullscreenFontSize',
            '自定义颜色': 'timeDisplay.customColor'
        };
        
        // Translate labels in time display settings modal
        document.querySelectorAll('#time-display-settings-modal label').forEach(label => {
            const text = label.childNodes[0]?.textContent?.trim();
            if (text && labelMappings[text]) {
                const translation = this.t(labelMappings[text]);
                if (translation !== labelMappings[text]) {
                    if (label.childNodes.length === 1) {
                        label.textContent = translation;
                    } else {
                        label.childNodes[0].textContent = translation + ' ';
                    }
                }
            }
        });
        
        // Translate display option buttons
        document.querySelectorAll('.display-option-btn').forEach(btn => {
            const type = btn.getAttribute('data-td-display-type');
            if (type === 'both') {
                btn.textContent = this.t('timeDisplay.dateAndTime');
            } else if (type === 'date-only') {
                btn.textContent = this.t('timeDisplay.dateOnly');
            } else if (type === 'time-only') {
                btn.textContent = this.t('timeDisplay.timeOnly');
            }
        });
        
        // Translate fullscreen mode buttons
        document.querySelectorAll('.fullscreen-mode-btn').forEach(btn => {
            const mode = btn.getAttribute('data-td-mode');
            if (mode === 'disabled') {
                btn.textContent = this.t('settings.time.fullscreenDisabled');
            } else if (mode === 'single') {
                btn.textContent = this.t('settings.time.fullscreenSingle');
            } else if (mode === 'double') {
                btn.textContent = this.t('settings.time.fullscreenDouble');
            }
        });
        
        // Translate color button titles in time display settings
        document.querySelectorAll('#time-display-settings-modal .color-btn').forEach(btn => {
            const colorValue = btn.getAttribute('data-td-time-color') || btn.getAttribute('data-td-time-bg-color');
            if (colorValue === 'transparent') {
                btn.title = this.t('timeDisplay.transparent');
            } else {
                // Translate color names
                const colorMap = {
                    '#000000': 'colors.black',
                    '#FFFFFF': 'colors.white',
                    '#007AFF': 'colors.blue',
                    '#FF0000': 'colors.red',
                    '#00FF00': 'colors.green',
                    '#FFFF00': 'colors.yellow',
                    '#FF8800': 'colors.orange',
                    '#8800FF': 'colors.purple'
                };
                if (colorMap[colorValue]) {
                    btn.title = this.t(colorMap[colorValue]);
                }
            }
        });
        
        // Translate fullscreen slider labels
        const timeFullscreenLabel = document.querySelector('.time-fullscreen-slider-label');
        if (timeFullscreenLabel) {
            timeFullscreenLabel.textContent = this.t('timeDisplay.fullscreenSliderLabel');
        }
        
        const timerFullscreenLabel = document.querySelector('.timer-fullscreen-slider-label');
        if (timerFullscreenLabel) {
            timerFullscreenLabel.textContent = this.t('timeDisplay.fullscreenSliderLabel');
        }
    }
    
    translateTimerSettings() {
        // Timer fullscreen close button
        const timerFullscreenClose = document.getElementById('timer-fullscreen-close-btn');
        if (timerFullscreenClose) {
            timerFullscreenClose.title = this.t('common.close');
        }
        
        const timeFullscreenClose = document.getElementById('time-fullscreen-close-btn');
        if (timeFullscreenClose) {
            timeFullscreenClose.title = this.t('common.close');
        }
    }

    /**
     * Change language
     */
    async changeLocale(newLocale) {
        if (!this.availableLocales[newLocale]) {
            console.error(`Locale ${newLocale} not supported`);
            return;
        }
        
        this.currentLocale = newLocale;
        this.saveLocale(newLocale);
        
        // Reload translations
        await this.loadTranslations();
        
        // Reapply translations
        this.applyTranslations();
        
        // Update HTML lang attribute
        document.documentElement.lang = newLocale;
        
        // Dispatch event for other modules to react to language change
        window.dispatchEvent(new CustomEvent('localeChanged', { detail: { locale: newLocale } }));
    }

    /**
     * Get current locale
     */
    getCurrentLocale() {
        return this.currentLocale;
    }

    /**
     * Get available locales
     */
    getAvailableLocales() {
        return this.availableLocales;
    }
}

// Create global i18n instance
window.i18n = new I18n();

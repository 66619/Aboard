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
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (translation !== key) {
                // Check if element is an input with placeholder
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    const placeholderKey = el.getAttribute('data-i18n-placeholder');
                    if (placeholderKey) {
                        el.placeholder = this.t(placeholderKey);
                    }
                }
                
                // Update element content
                if (el.tagName === 'INPUT' && el.type === 'button') {
                    el.value = translation;
                } else if (el.hasAttribute('title')) {
                    const titleKey = el.getAttribute('data-i18n-title');
                    if (titleKey) {
                        el.title = this.t(titleKey);
                    }
                }
                
                // Update text content for regular elements
                if (!el.querySelector('[data-i18n]')) {
                    el.textContent = translation;
                }
            }
        });
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

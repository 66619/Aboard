// Time Display Settings Modal Module
// Handles the standalone settings modal for time display configuration

class TimeDisplaySettingsModal {
    constructor(timeDisplayManager) {
        this.timeDisplayManager = timeDisplayManager;
        this.modal = document.getElementById('time-display-settings-modal');
        this.setupEventListeners();
        this.setupSettingsControls();
    }
    
    setupEventListeners() {
        // Open buttons
        const areaSettingsBtn = document.getElementById('time-display-area-settings-btn');
        const widgetSettingsBtn = document.getElementById('time-display-settings-btn');
        
        if (areaSettingsBtn) {
            areaSettingsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.show();
            });
        }
        if (widgetSettingsBtn) {
            widgetSettingsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.show();
            });
        }
        
        // Close button
        const closeBtn = document.getElementById('time-display-settings-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hide());
        }
        
        // Close on background click
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.hide();
                }
            });
        }
    }
    
    setupSettingsControls() {
        // Display type buttons - instant apply
        document.querySelectorAll('.display-option-btn[data-td-display-type]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.display-option-btn[data-td-display-type]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.applySettings(); // Instant apply
            });
        });
        
        // Fullscreen mode buttons - instant apply
        document.querySelectorAll('.fullscreen-mode-btn[data-td-mode]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.fullscreen-mode-btn[data-td-mode]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.applySettings(); // Instant apply
            });
        });
        
        // Color buttons - instant apply
        document.querySelectorAll('.color-btn[data-td-time-color]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.color-btn[data-td-time-color]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.applySettings(); // Instant apply
            });
        });
        
        document.querySelectorAll('.color-btn[data-td-time-bg-color]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.color-btn[data-td-time-bg-color]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.applySettings(); // Instant apply
            });
        });
        
        // Custom color pickers - instant apply
        const customTimeColorPicker = document.getElementById('td-custom-time-color-picker');
        if (customTimeColorPicker) {
            customTimeColorPicker.addEventListener('change', (e) => {
                // Deactivate all preset color buttons
                document.querySelectorAll('.color-btn[data-td-time-color]').forEach(b => b.classList.remove('active'));
                // Store custom color as data attribute for later use
                customTimeColorPicker.dataset.selectedColor = e.target.value;
                this.applySettings(); // Instant apply
            });
        }
        
        const customBgColorPicker = document.getElementById('td-custom-bg-color-picker');
        if (customBgColorPicker) {
            customBgColorPicker.addEventListener('change', (e) => {
                // Deactivate all preset background color buttons
                document.querySelectorAll('.color-btn[data-td-time-bg-color]').forEach(b => b.classList.remove('active'));
                // Store custom color as data attribute for later use
                customBgColorPicker.dataset.selectedColor = e.target.value;
                this.applySettings(); // Instant apply
            });
        }
        
        // Timezone, time format, date format - instant apply
        const tzSelect = document.getElementById('td-timezone-select');
        if (tzSelect) {
            tzSelect.addEventListener('change', () => this.applySettings());
        }
        
        const tfSelect = document.getElementById('td-time-format-select');
        if (tfSelect) {
            tfSelect.addEventListener('change', () => this.applySettings());
        }
        
        const dfSelect = document.getElementById('td-date-format-select');
        if (dfSelect) {
            dfSelect.addEventListener('change', () => this.applySettings());
        }
        
        // Font size slider sync - instant apply
        const fontSlider = document.getElementById('td-time-font-size-slider');
        const fontInput = document.getElementById('td-time-font-size-input');
        const fontValue = document.getElementById('td-time-font-size-value');
        
        if (fontSlider && fontInput) {
            fontSlider.addEventListener('input', () => {
                fontInput.value = fontSlider.value;
                if (fontValue) fontValue.textContent = fontSlider.value;
            });
            fontSlider.addEventListener('change', () => this.applySettings()); // Instant apply on release
            fontInput.addEventListener('input', () => {
                fontSlider.value = fontInput.value;
                if (fontValue) fontValue.textContent = fontInput.value;
            });
            fontInput.addEventListener('change', () => this.applySettings()); // Instant apply on change
        }
        
        // Opacity slider sync - instant apply
        const opacitySlider = document.getElementById('td-time-opacity-slider');
        const opacityInput = document.getElementById('td-time-opacity-input');
        const opacityValue = document.getElementById('td-time-opacity-value');
        
        if (opacitySlider && opacityInput) {
            opacitySlider.addEventListener('input', () => {
                opacityInput.value = opacitySlider.value;
                if (opacityValue) opacityValue.textContent = opacitySlider.value;
            });
            opacitySlider.addEventListener('change', () => this.applySettings()); // Instant apply on release
            opacityInput.addEventListener('input', () => {
                opacitySlider.value = opacityInput.value;
                if (opacityValue) opacityValue.textContent = opacityInput.value;
            });
            opacityInput.addEventListener('change', () => this.applySettings()); // Instant apply on change
        }
        
        // Fullscreen font size slider sync - instant apply
        const fsFontSlider = document.getElementById('td-time-fullscreen-font-size-slider');
        const fsFontInput = document.getElementById('td-time-fullscreen-font-size-input');
        const fsFontValue = document.getElementById('td-time-fullscreen-font-size-value');
        
        if (fsFontSlider && fsFontInput) {
            fsFontSlider.addEventListener('input', () => {
                fsFontInput.value = fsFontSlider.value;
                if (fsFontValue) fsFontValue.textContent = fsFontSlider.value;
            });
            fsFontSlider.addEventListener('change', () => this.applySettings()); // Instant apply on release
            fsFontInput.addEventListener('input', () => {
                fsFontSlider.value = fsFontInput.value;
                if (fsFontValue) fsFontValue.textContent = fsFontInput.value;
            });
            fsFontInput.addEventListener('change', () => this.applySettings()); // Instant apply on change
        }
    }
    
    show() {
        if (this.modal) {
            this.modal.classList.add('show');
            this.syncSettings();
        }
    }
    
    hide() {
        if (this.modal) {
            this.modal.classList.remove('show');
        }
    }
    
    syncSettings() {
        if (!this.timeDisplayManager) return;
        
        // Sync display type
        const displayType = this.timeDisplayManager.showTime && this.timeDisplayManager.showDate ? 'both' :
                           this.timeDisplayManager.showDate ? 'date-only' : 'time-only';
        document.querySelectorAll('.display-option-btn[data-td-display-type]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tdDisplayType === displayType);
        });
        
        // Sync timezone
        const tzSelect = document.getElementById('td-timezone-select');
        if (tzSelect) tzSelect.value = this.timeDisplayManager.timezone || 'Asia/Shanghai';
        
        // Sync time format
        const tfSelect = document.getElementById('td-time-format-select');
        if (tfSelect) tfSelect.value = this.timeDisplayManager.timeFormat || '24h';
        
        // Sync date format
        const dfSelect = document.getElementById('td-date-format-select');
        if (dfSelect) dfSelect.value = this.timeDisplayManager.dateFormat || 'yyyy-mm-dd';
        
        // Sync font size
        const fontSlider = document.getElementById('td-time-font-size-slider');
        const fontInput = document.getElementById('td-time-font-size-input');
        const fontValue = document.getElementById('td-time-font-size-value');
        if (fontSlider && fontInput) {
            fontSlider.value = this.timeDisplayManager.fontSize || 16;
            fontInput.value = this.timeDisplayManager.fontSize || 16;
            if (fontValue) fontValue.textContent = this.timeDisplayManager.fontSize || 16;
        }
        
        // Sync opacity
        const opacitySlider = document.getElementById('td-time-opacity-slider');
        const opacityInput = document.getElementById('td-time-opacity-input');
        const opacityValue = document.getElementById('td-time-opacity-value');
        const opacity = this.timeDisplayManager.opacity || 100; // Already in 0-100 range, no need to multiply
        if (opacitySlider && opacityInput) {
            opacitySlider.value = opacity;
            opacityInput.value = opacity;
            if (opacityValue) opacityValue.textContent = opacity;
        }
        
        // Sync fullscreen mode
        const fsMode = this.timeDisplayManager.fullscreenMode || 'double';
        document.querySelectorAll('.fullscreen-mode-btn[data-td-mode]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tdMode === fsMode);
        });
        
        // Sync fullscreen font size
        const fsFontSlider = document.getElementById('td-time-fullscreen-font-size-slider');
        const fsFontInput = document.getElementById('td-time-fullscreen-font-size-input');
        const fsFontValue = document.getElementById('td-time-fullscreen-font-size-value');
        if (fsFontSlider && fsFontInput) {
            fsFontSlider.value = this.timeDisplayManager.fullscreenFontSize || 15;
            fsFontInput.value = this.timeDisplayManager.fullscreenFontSize || 15;
            if (fsFontValue) fsFontValue.textContent = this.timeDisplayManager.fullscreenFontSize || 15;
        }
    }
    
    applySettings() {
        if (!this.timeDisplayManager) return;
        
        // Get display type
        const activeDisplayBtn = document.querySelector('.display-option-btn[data-td-display-type].active');
        const displayType = activeDisplayBtn ? activeDisplayBtn.dataset.tdDisplayType : 'both';
        this.timeDisplayManager.showDate = displayType === 'both' || displayType === 'date-only';
        this.timeDisplayManager.showTime = displayType === 'both' || displayType === 'time-only';
        
        // Get timezone
        const tzSelect = document.getElementById('td-timezone-select');
        if (tzSelect) this.timeDisplayManager.timezone = tzSelect.value;
        
        // Get time format
        const tfSelect = document.getElementById('td-time-format-select');
        if (tfSelect) this.timeDisplayManager.timeFormat = tfSelect.value;
        
        // Get date format
        const dfSelect = document.getElementById('td-date-format-select');
        if (dfSelect) this.timeDisplayManager.dateFormat = dfSelect.value;
        
        // Get colors
        const activeColorBtn = document.querySelector('.color-btn[data-td-time-color].active');
        const customTimeColorPicker = document.getElementById('td-custom-time-color-picker');
        
        if (activeColorBtn) {
            this.timeDisplayManager.timeColor = activeColorBtn.dataset.tdTimeColor;
        } else if (customTimeColorPicker && customTimeColorPicker.dataset.selectedColor) {
            // Use custom color if no preset is active
            this.timeDisplayManager.timeColor = customTimeColorPicker.dataset.selectedColor;
        }
        
        const activeBgColorBtn = document.querySelector('.color-btn[data-td-time-bg-color].active');
        const customBgColorPicker = document.getElementById('td-custom-bg-color-picker');
        
        if (activeBgColorBtn) {
            this.timeDisplayManager.bgColor = activeBgColorBtn.dataset.tdTimeBgColor;
        } else if (customBgColorPicker && customBgColorPicker.dataset.selectedColor) {
            // Use custom background color if no preset is active
            this.timeDisplayManager.bgColor = customBgColorPicker.dataset.selectedColor;
        }
        
        // Get font size
        const fontInput = document.getElementById('td-time-font-size-input');
        if (fontInput) this.timeDisplayManager.fontSize = parseInt(fontInput.value);
        
        // Get opacity
        const opacityInput = document.getElementById('td-time-opacity-input');
        if (opacityInput) this.timeDisplayManager.opacity = parseInt(opacityInput.value); // Store as 0-100, not 0-1
        
        // Get fullscreen mode
        const activeFsBtn = document.querySelector('.fullscreen-mode-btn[data-td-mode].active');
        if (activeFsBtn) this.timeDisplayManager.fullscreenMode = activeFsBtn.dataset.tdMode;
        
        // Get fullscreen font size
        const fsFontInput = document.getElementById('td-time-fullscreen-font-size-input');
        if (fsFontInput) this.timeDisplayManager.fullscreenFontSize = parseInt(fsFontInput.value);
        
        // Apply changes to the time display
        this.timeDisplayManager.applySettings();
        this.timeDisplayManager.updateDisplay();
        // Note: saveSettings() is called within applySettings() in time-display.js
    }
}

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimeDisplaySettingsModal;
}

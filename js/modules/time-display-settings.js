// Time Display Settings Modal Module
// Handles the standalone settings modal for time display configuration

class TimeDisplaySettingsModal {
    constructor(timeDisplayManager) {
        this.timeDisplayManager = timeDisplayManager;
        this.modal = document.getElementById('time-display-settings-modal');
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Open buttons
        const areaSettingsBtn = document.getElementById('time-display-area-settings-btn');
        const widgetSettingsBtn = document.getElementById('time-display-settings-btn');
        
        if (areaSettingsBtn) {
            areaSettingsBtn.addEventListener('click', () => this.show());
        }
        if (widgetSettingsBtn) {
            widgetSettingsBtn.addEventListener('click', () => this.show());
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
        // Sync current settings to the modal
        // This will be populated with actual sync logic
    }
}

// Settings Management Module
// Handles application settings and preferences

class SettingsManager {
    constructor() {
        this.toolbarSize = parseInt(localStorage.getItem('toolbarSize')) || 40;
        this.configScale = parseFloat(localStorage.getItem('configScale')) || 1.0;
        this.controlPosition = localStorage.getItem('controlPosition') || 'top-right';
        this.edgeSnapEnabled = localStorage.getItem('edgeSnapEnabled') !== 'false';
        this.infiniteCanvas = localStorage.getItem('infiniteCanvas') !== 'false';
    }
    
    switchTab(tabName) {
        document.querySelectorAll('.settings-tab-icon').forEach(tab => {
            tab.classList.remove('active');
        });
        
        document.querySelectorAll('.settings-tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        document.querySelector(`.settings-tab-icon[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(`${tabName}-settings`).classList.add('active');
    }
    
    updateToolbarSize() {
        const toolbar = document.getElementById('toolbar');
        const buttons = toolbar.querySelectorAll('.tool-btn');
        
        // Size ratios for responsive toolbar scaling
        const PADDING_VERTICAL_RATIO = 5;    // Vertical padding = toolbarSize / 5
        const PADDING_HORIZONTAL_RATIO = 3;  // Horizontal padding = toolbarSize / 3
        const SVG_SIZE_RATIO = 2;            // Icon size = toolbarSize / 2
        const FONT_SIZE_RATIO = 4.5;         // Font size = toolbarSize / 4.5
        
        buttons.forEach(btn => {
            btn.style.padding = `${this.toolbarSize / PADDING_VERTICAL_RATIO}px ${this.toolbarSize / PADDING_HORIZONTAL_RATIO}px`;
            btn.style.minWidth = `${this.toolbarSize}px`;
            
            const svg = btn.querySelector('svg');
            if (svg) {
                const svgSize = this.toolbarSize / SVG_SIZE_RATIO;
                svg.style.width = `${svgSize}px`;
                svg.style.height = `${svgSize}px`;
            }
            
            const span = btn.querySelector('span');
            if (span) {
                span.style.fontSize = `${this.toolbarSize / FONT_SIZE_RATIO}px`;
            }
        });
        
        localStorage.setItem('toolbarSize', this.toolbarSize);
    }
    
    updateConfigScale() {
        const configArea = document.getElementById('config-area');
        configArea.style.transform = `translateX(-50%) scale(${this.configScale})`;
        localStorage.setItem('configScale', this.configScale);
    }
    
    setControlPosition(position) {
        this.controlPosition = position;
        localStorage.setItem('controlPosition', position);
        
        const historyControls = document.getElementById('history-controls');
        const paginationControls = document.getElementById('pagination-controls');
        
        historyControls.className = '';
        historyControls.classList.add(position);
        
        paginationControls.className = '';
        if (!this.infiniteCanvas) {
            paginationControls.classList.add('show');
        }
        paginationControls.classList.add(position);
        
        document.querySelectorAll('.position-option-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.position === position) {
                btn.classList.add('active');
            }
        });
    }
    
    loadSettings() {
        document.getElementById('toolbar-size-slider').value = this.toolbarSize;
        document.getElementById('toolbar-size-value').textContent = this.toolbarSize;
        this.updateToolbarSize();
        
        document.getElementById('config-scale-slider').value = Math.round(this.configScale * 100);
        document.getElementById('config-scale-value').textContent = Math.round(this.configScale * 100);
        this.updateConfigScale();
        
        this.setControlPosition(this.controlPosition);
        
        document.getElementById('edge-snap-checkbox').checked = this.edgeSnapEnabled;
        document.getElementById('infinite-canvas-checkbox').checked = this.infiniteCanvas;
    }
}

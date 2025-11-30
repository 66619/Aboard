/**
 * Line Style Modal Module
 * Independent modal for configuring line styles for both Pen and Shape tools
 */

class LineStyleModal {
    constructor(drawingEngine, shapeDrawingManager) {
        this.drawingEngine = drawingEngine;
        this.shapeDrawingManager = shapeDrawingManager;
        
        // Current mode: 'pen' or 'shape'
        this.currentMode = 'pen';
        
        // Preview canvas
        this.previewCanvas = null;
        this.previewCtx = null;
        
        // Create modal elements
        this.createModal();
        this.setupEventListeners();
    }
    
    createModal() {
        const modalHTML = `
            <div id="line-style-modal" class="modal">
                <div class="modal-content line-style-modal-content">
                    <div class="line-style-modal-header">
                        <h2 data-i18n="tools.lineStyle.title">Line Style</h2>
                        <button id="line-style-modal-close" class="line-style-modal-close" title="Close">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <div class="line-style-modal-body">
                        <!-- Line Style Type Selection -->
                        <div class="line-style-modal-group">
                            <label data-i18n="tools.lineStyle.title">Line Style</label>
                            <div class="line-style-type-grid" id="modal-line-style-grid">
                                <button class="line-style-type-btn active" data-modal-line-style="solid">
                                    <svg viewBox="0 0 50 20">
                                        <line x1="2" y1="10" x2="48" y2="10" stroke="currentColor" stroke-width="2"/>
                                    </svg>
                                    <span data-i18n="tools.lineStyle.solid">Solid</span>
                                </button>
                                <button class="line-style-type-btn" data-modal-line-style="dashed">
                                    <svg viewBox="0 0 50 20">
                                        <line x1="2" y1="10" x2="48" y2="10" stroke="currentColor" stroke-width="2" stroke-dasharray="8,4"/>
                                    </svg>
                                    <span data-i18n="tools.lineStyle.dashed">Dashed</span>
                                </button>
                                <button class="line-style-type-btn" data-modal-line-style="dotted">
                                    <svg viewBox="0 0 50 20">
                                        <line x1="2" y1="10" x2="48" y2="10" stroke="currentColor" stroke-width="2" stroke-dasharray="2,6"/>
                                    </svg>
                                    <span data-i18n="tools.lineStyle.dotted">Dotted</span>
                                </button>
                                <button class="line-style-type-btn" data-modal-line-style="wavy">
                                    <svg viewBox="0 0 50 20">
                                        <path d="M2 10 Q8 4, 14 10 T26 10 T38 10 T48 10" stroke="currentColor" stroke-width="2" fill="none"/>
                                    </svg>
                                    <span data-i18n="tools.lineStyle.wavy">Wavy</span>
                                </button>
                                <button class="line-style-type-btn" data-modal-line-style="double">
                                    <svg viewBox="0 0 50 20">
                                        <line x1="2" y1="6" x2="48" y2="6" stroke="currentColor" stroke-width="1.5"/>
                                        <line x1="2" y1="14" x2="48" y2="14" stroke="currentColor" stroke-width="1.5"/>
                                    </svg>
                                    <span data-i18n="tools.lineStyle.double">Double</span>
                                </button>
                                <button class="line-style-type-btn" data-modal-line-style="triple">
                                    <svg viewBox="0 0 50 20">
                                        <line x1="2" y1="4" x2="48" y2="4" stroke="currentColor" stroke-width="1"/>
                                        <line x1="2" y1="10" x2="48" y2="10" stroke="currentColor" stroke-width="1"/>
                                        <line x1="2" y1="16" x2="48" y2="16" stroke="currentColor" stroke-width="1"/>
                                    </svg>
                                    <span data-i18n="tools.lineStyle.triple">Triple</span>
                                </button>
                            </div>
                        </div>
                        
                        <!-- Line Style Settings (dynamic based on selected style) -->
                        <div class="line-style-modal-settings" id="modal-line-style-settings">
                            <!-- Dash Density Setting -->
                            <div class="line-style-modal-setting" id="modal-dash-density-setting" style="display: none;">
                                <label><span data-i18n="tools.lineStyle.dashDensity">Dash Density</span>: <span id="modal-dash-density-value">10</span></label>
                                <input type="range" id="modal-dash-density-slider" min="5" max="40" value="10" class="slider">
                            </div>
                            
                            <!-- Wave Density Setting -->
                            <div class="line-style-modal-setting" id="modal-wave-density-setting" style="display: none;">
                                <label><span data-i18n="tools.lineStyle.waveDensity">Wave Density</span>: <span id="modal-wave-density-value">10</span></label>
                                <input type="range" id="modal-wave-density-slider" min="5" max="30" value="10" class="slider">
                            </div>
                            
                            <!-- Multi-line Spacing Setting -->
                            <div class="line-style-modal-setting" id="modal-line-spacing-setting" style="display: none;">
                                <label><span data-i18n="tools.lineStyle.lineSpacing">Line Spacing</span>: <span id="modal-line-spacing-value">4</span>px</label>
                                <input type="range" id="modal-line-spacing-slider" min="2" max="20" value="4" class="slider">
                            </div>
                        </div>
                        
                        <!-- Preview Area -->
                        <div class="line-style-modal-group">
                            <label data-i18n="lineStyleModal.preview">Preview</label>
                            <div class="line-style-preview-area">
                                <canvas id="line-style-preview-canvas" width="320" height="80"></canvas>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Modal Footer -->
                    <div class="line-style-modal-footer">
                        <button id="line-style-modal-apply" class="btn-primary" data-i18n="common.apply">Apply</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Store references
        this.modal = document.getElementById('line-style-modal');
        this.previewCanvas = document.getElementById('line-style-preview-canvas');
        this.previewCtx = this.previewCanvas.getContext('2d');
    }
    
    setupEventListeners() {
        // Close button
        document.getElementById('line-style-modal-close').addEventListener('click', () => {
            this.hide();
        });
        
        // Click outside to close
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hide();
            }
        });
        
        // Apply button
        document.getElementById('line-style-modal-apply').addEventListener('click', () => {
            this.applySettings();
            this.hide();
        });
        
        // Line style type buttons
        document.querySelectorAll('#modal-line-style-grid .line-style-type-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('#modal-line-style-grid .line-style-type-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.updateSettingsVisibility(btn.dataset.modalLineStyle);
                this.updatePreview();
            });
        });
        
        // Slider event listeners
        document.getElementById('modal-dash-density-slider').addEventListener('input', (e) => {
            document.getElementById('modal-dash-density-value').textContent = e.target.value;
            this.updatePreview();
        });
        
        document.getElementById('modal-wave-density-slider').addEventListener('input', (e) => {
            document.getElementById('modal-wave-density-value').textContent = e.target.value;
            this.updatePreview();
        });
        
        document.getElementById('modal-line-spacing-slider').addEventListener('input', (e) => {
            document.getElementById('modal-line-spacing-value').textContent = e.target.value;
            this.updatePreview();
        });
    }
    
    show(mode = 'pen') {
        this.currentMode = mode;
        this.loadCurrentSettings();
        this.modal.classList.add('show');
        this.updatePreview();
        
        // Apply i18n translations if available
        if (window.i18n) {
            window.i18n.updatePageTranslations();
        }
    }
    
    hide() {
        this.modal.classList.remove('show');
    }
    
    loadCurrentSettings() {
        let lineStyle, dashDensity, waveDensity, lineSpacing;
        
        if (this.currentMode === 'pen') {
            lineStyle = this.drawingEngine.penLineStyle || 'solid';
            dashDensity = this.drawingEngine.penDashDensity || 10;
            // Pen mode doesn't have wave/multi-line settings yet
            waveDensity = 10;
            lineSpacing = 4;
        } else {
            lineStyle = this.shapeDrawingManager.lineStyle || 'solid';
            dashDensity = this.shapeDrawingManager.dashDensity || 10;
            waveDensity = this.shapeDrawingManager.waveDensity || 10;
            lineSpacing = this.shapeDrawingManager.multiLineSpacing || 4;
        }
        
        // Update buttons
        document.querySelectorAll('#modal-line-style-grid .line-style-type-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.modalLineStyle === lineStyle);
        });
        
        // Update sliders
        document.getElementById('modal-dash-density-slider').value = dashDensity;
        document.getElementById('modal-dash-density-value').textContent = dashDensity;
        
        document.getElementById('modal-wave-density-slider').value = waveDensity;
        document.getElementById('modal-wave-density-value').textContent = waveDensity;
        
        document.getElementById('modal-line-spacing-slider').value = lineSpacing;
        document.getElementById('modal-line-spacing-value').textContent = lineSpacing;
        
        // Update visibility
        this.updateSettingsVisibility(lineStyle);
    }
    
    updateSettingsVisibility(lineStyle) {
        const dashSetting = document.getElementById('modal-dash-density-setting');
        const waveSetting = document.getElementById('modal-wave-density-setting');
        const spacingSetting = document.getElementById('modal-line-spacing-setting');
        
        // Hide all first
        dashSetting.style.display = 'none';
        waveSetting.style.display = 'none';
        spacingSetting.style.display = 'none';
        
        // Show relevant settings
        switch (lineStyle) {
            case 'dashed':
            case 'dotted':
                dashSetting.style.display = 'block';
                break;
            case 'wavy':
                waveSetting.style.display = 'block';
                break;
            case 'double':
            case 'triple':
                spacingSetting.style.display = 'block';
                break;
        }
    }
    
    getCurrentLineStyle() {
        const activeBtn = document.querySelector('#modal-line-style-grid .line-style-type-btn.active');
        return activeBtn ? activeBtn.dataset.modalLineStyle : 'solid';
    }
    
    updatePreview() {
        const ctx = this.previewCtx;
        const width = this.previewCanvas.width;
        const height = this.previewCanvas.height;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Get current settings
        const lineStyle = this.getCurrentLineStyle();
        const dashDensity = parseInt(document.getElementById('modal-dash-density-slider').value);
        const waveDensity = parseInt(document.getElementById('modal-wave-density-slider').value);
        const lineSpacing = parseInt(document.getElementById('modal-line-spacing-slider').value);
        
        // Setup context
        ctx.strokeStyle = '#333333';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        const startX = 30;
        const endX = width - 30;
        const centerY = height / 2;
        
        // Draw based on style
        ctx.setLineDash([]);
        
        switch (lineStyle) {
            case 'solid':
                ctx.beginPath();
                ctx.moveTo(startX, centerY);
                ctx.lineTo(endX, centerY);
                ctx.stroke();
                break;
                
            case 'dashed':
                ctx.setLineDash([dashDensity, dashDensity / 2]);
                ctx.beginPath();
                ctx.moveTo(startX, centerY);
                ctx.lineTo(endX, centerY);
                ctx.stroke();
                ctx.setLineDash([]);
                break;
                
            case 'dotted':
                ctx.setLineDash([3, dashDensity / 2]);
                ctx.beginPath();
                ctx.moveTo(startX, centerY);
                ctx.lineTo(endX, centerY);
                ctx.stroke();
                ctx.setLineDash([]);
                break;
                
            case 'wavy':
                this.drawWavyPreview(ctx, startX, centerY, endX, centerY, waveDensity);
                break;
                
            case 'double':
                this.drawMultiLinePreview(ctx, startX, centerY, endX, centerY, 2, lineSpacing);
                break;
                
            case 'triple':
                this.drawMultiLinePreview(ctx, startX, centerY, endX, centerY, 3, lineSpacing);
                break;
        }
    }
    
    drawWavyPreview(ctx, startX, startY, endX, endY, waveDensity) {
        const length = endX - startX;
        const waveAmplitude = 8;
        const numWaves = Math.max(3, Math.floor(length / waveDensity));
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        
        for (let i = 0; i <= numWaves; i++) {
            const x = startX + (length * i / numWaves);
            const cpX = startX + (length * (i - 0.5) / numWaves);
            const direction = (i % 2 === 0) ? -1 : 1;
            const cpY = startY + (waveAmplitude * direction);
            
            if (i > 0) {
                ctx.quadraticCurveTo(cpX, cpY, x, startY);
            }
        }
        
        ctx.stroke();
    }
    
    drawMultiLinePreview(ctx, startX, startY, endX, endY, count, spacing) {
        const totalHeight = (count - 1) * spacing;
        const startOffset = -totalHeight / 2;
        
        for (let i = 0; i < count; i++) {
            const offset = startOffset + i * spacing;
            ctx.beginPath();
            ctx.moveTo(startX, startY + offset);
            ctx.lineTo(endX, endY + offset);
            ctx.stroke();
        }
    }
    
    applySettings() {
        const lineStyle = this.getCurrentLineStyle();
        const dashDensity = parseInt(document.getElementById('modal-dash-density-slider').value);
        const waveDensity = parseInt(document.getElementById('modal-wave-density-slider').value);
        const lineSpacing = parseInt(document.getElementById('modal-line-spacing-slider').value);
        
        if (this.currentMode === 'pen') {
            // Apply to pen tool
            this.drawingEngine.setPenLineStyle(lineStyle);
            this.drawingEngine.setPenDashDensity(dashDensity);
            
            // Update pen config UI
            this.updatePenConfigUI(lineStyle, dashDensity);
        } else {
            // Apply to shape tool
            this.shapeDrawingManager.setLineStyle(lineStyle);
            this.shapeDrawingManager.setDashDensity(dashDensity);
            this.shapeDrawingManager.setWaveDensity(waveDensity);
            this.shapeDrawingManager.setMultiLineSpacing(lineSpacing);
            
            // Update shape config UI
            this.updateShapeConfigUI(lineStyle, dashDensity, waveDensity, lineSpacing);
        }
    }
    
    updatePenConfigUI(lineStyle, dashDensity) {
        // Update pen line style buttons in config panel
        document.querySelectorAll('.pen-line-style-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.penLineStyle === lineStyle);
        });
        
        // Update slider values
        const penDashSlider = document.getElementById('pen-dash-density-slider');
        const penDashValue = document.getElementById('pen-dash-density-value');
        if (penDashSlider && penDashValue) {
            penDashSlider.value = dashDensity;
            penDashValue.textContent = dashDensity;
        }
        
        // Show/hide settings based on line style
        const penSettingsPanel = document.getElementById('pen-line-style-settings');
        const penDashSetting = document.getElementById('pen-dash-density-setting');
        if (penSettingsPanel && penDashSetting) {
            if (lineStyle === 'dashed' || lineStyle === 'dotted') {
                penSettingsPanel.style.display = 'block';
                penDashSetting.style.display = 'block';
            } else {
                penSettingsPanel.style.display = 'none';
                penDashSetting.style.display = 'none';
            }
        }
    }
    
    updateShapeConfigUI(lineStyle, dashDensity, waveDensity, lineSpacing) {
        // Update shape line style buttons in config panel
        document.querySelectorAll('.line-style-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lineStyle === lineStyle);
        });
        
        // Update slider values
        const dashSlider = document.getElementById('dash-density-slider');
        const dashValue = document.getElementById('dash-density-value');
        if (dashSlider && dashValue) {
            dashSlider.value = dashDensity;
            dashValue.textContent = dashDensity;
        }
        
        const waveSlider = document.getElementById('wave-density-slider');
        const waveValue = document.getElementById('wave-density-value');
        if (waveSlider && waveValue) {
            waveSlider.value = waveDensity;
            waveValue.textContent = waveDensity;
        }
        
        const spacingSlider = document.getElementById('multi-line-spacing-slider');
        const spacingValue = document.getElementById('multi-line-spacing-value');
        if (spacingSlider && spacingValue) {
            spacingSlider.value = lineSpacing;
            spacingValue.textContent = lineSpacing;
        }
    }
}

// Export for use
if (typeof window !== 'undefined') {
    window.LineStyleModal = LineStyleModal;
}

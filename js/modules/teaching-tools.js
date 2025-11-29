// Teaching Tools Module - Ruler and Set Square for classroom use
// Allows inserting, moving, rotating, and resizing rulers and set squares

class TeachingToolsManager {
    constructor(canvas, ctx, historyManager) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.historyManager = historyManager;
        
        // Tools on canvas
        this.tools = [];
        this.selectedTool = null;
        this.isDragging = false;
        this.isRotating = false;
        this.isResizing = false;
        this.dragOffset = { x: 0, y: 0 };
        this.rotateStart = 0;
        this.resizeStart = { width: 0, height: 0 };
        
        // Tool images
        this.rulerImage = null;
        this.setSquareImage = null;
        this.imagesLoaded = false;
        
        // Modal state
        this.rulerCount = 1;
        this.setSquareCount = 1;
        
        // Control overlay
        this.controlOverlay = null;
        
        this.loadImages();
        this.createModal();
        this.createControlOverlay();
        this.setupEventListeners();
    }
    
    loadImages() {
        let loadedCount = 0;
        const checkLoaded = () => {
            loadedCount++;
            if (loadedCount === 2) {
                this.imagesLoaded = true;
            }
        };
        
        this.rulerImage = new Image();
        this.rulerImage.onload = checkLoaded;
        this.rulerImage.onerror = () => console.error('Failed to load ruler image');
        this.rulerImage.src = 'img/ruler_1.svg';
        
        this.setSquareImage = new Image();
        this.setSquareImage.onload = checkLoaded;
        this.setSquareImage.onerror = () => console.error('Failed to load set square image');
        this.setSquareImage.src = 'img/set_square_1.svg';
    }
    
    createModal() {
        // Create the modal HTML
        const modal = document.createElement('div');
        modal.id = 'teaching-tools-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content teaching-tools-modal-content">
                <div class="modal-header">
                    <h2 data-i18n="teachingTools.title">教具</h2>
                    <button id="teaching-tools-close-btn" class="modal-close-btn" title="关闭">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div class="teaching-tools-body">
                    <!-- Ruler Section -->
                    <div class="teaching-tool-item">
                        <div class="teaching-tool-preview">
                            <img src="img/ruler_1.svg" alt="Ruler" class="teaching-tool-image">
                        </div>
                        <div class="teaching-tool-label" data-i18n="teachingTools.ruler">直尺</div>
                        <div class="teaching-tool-counter">
                            <button class="counter-btn minus-btn" data-tool="ruler" data-action="minus">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                            </button>
                            <input type="number" id="ruler-count-input" class="counter-input" value="1" min="0" max="10">
                            <button class="counter-btn plus-btn" data-tool="ruler" data-action="plus">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Set Square Section -->
                    <div class="teaching-tool-item">
                        <div class="teaching-tool-preview">
                            <img src="img/set_square_1.svg" alt="Set Square" class="teaching-tool-image set-square-image">
                        </div>
                        <div class="teaching-tool-label" data-i18n="teachingTools.setSquare">三角板</div>
                        <div class="teaching-tool-counter">
                            <button class="counter-btn minus-btn" data-tool="setSquare" data-action="minus">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                            </button>
                            <input type="number" id="set-square-count-input" class="counter-input" value="1" min="0" max="10">
                            <button class="counter-btn plus-btn" data-tool="setSquare" data-action="plus">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="teaching-tools-footer">
                    <button id="teaching-tools-confirm-btn" class="teaching-tools-confirm-btn" data-i18n="common.confirm">确定</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Setup modal event listeners
        this.setupModalListeners();
    }
    
    setupModalListeners() {
        // Close button
        document.getElementById('teaching-tools-close-btn').addEventListener('click', () => {
            this.hideModal();
        });
        
        // Click outside to close
        document.getElementById('teaching-tools-modal').addEventListener('click', (e) => {
            if (e.target.id === 'teaching-tools-modal') {
                this.hideModal();
            }
        });
        
        // Counter buttons
        document.querySelectorAll('#teaching-tools-modal .counter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tool = btn.dataset.tool;
                const action = btn.dataset.action;
                const input = tool === 'ruler' 
                    ? document.getElementById('ruler-count-input')
                    : document.getElementById('set-square-count-input');
                
                let value = parseInt(input.value) || 0;
                if (action === 'plus' && value < 10) {
                    value++;
                } else if (action === 'minus' && value > 0) {
                    value--;
                }
                input.value = value;
                
                if (tool === 'ruler') {
                    this.rulerCount = value;
                } else {
                    this.setSquareCount = value;
                }
            });
        });
        
        // Input change
        document.getElementById('ruler-count-input').addEventListener('change', (e) => {
            let value = parseInt(e.target.value) || 0;
            value = Math.max(0, Math.min(10, value));
            e.target.value = value;
            this.rulerCount = value;
        });
        
        document.getElementById('set-square-count-input').addEventListener('change', (e) => {
            let value = parseInt(e.target.value) || 0;
            value = Math.max(0, Math.min(10, value));
            e.target.value = value;
            this.setSquareCount = value;
        });
        
        // Confirm button
        document.getElementById('teaching-tools-confirm-btn').addEventListener('click', () => {
            this.insertTools();
            this.hideModal();
        });
    }
    
    createControlOverlay() {
        // Create control overlay for selected tool
        const overlay = document.createElement('div');
        overlay.id = 'teaching-tool-controls';
        overlay.className = 'teaching-tool-controls';
        overlay.style.display = 'none';
        overlay.innerHTML = `
            <div class="teaching-tool-control-handle rotate-handle" title="旋转">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                    <path d="M3 3v5h5"></path>
                    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
                    <path d="M21 21v-5h-5"></path>
                </svg>
            </div>
            <div class="teaching-tool-control-handle resize-handle" title="调整大小">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <polyline points="9 21 3 21 3 15"></polyline>
                    <line x1="21" y1="3" x2="14" y2="10"></line>
                    <line x1="3" y1="21" x2="10" y2="14"></line>
                </svg>
            </div>
            <div class="teaching-tool-control-handle delete-handle" title="删除">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                </svg>
            </div>
        `;
        document.body.appendChild(overlay);
        this.controlOverlay = overlay;
        
        // Setup control event listeners
        this.setupControlListeners();
    }
    
    setupControlListeners() {
        const overlay = this.controlOverlay;
        
        // Delete handle
        overlay.querySelector('.delete-handle').addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.selectedTool) {
                this.removeTool(this.selectedTool);
            }
        });
        
        // Rotate handle
        overlay.querySelector('.rotate-handle').addEventListener('mousedown', (e) => {
            e.stopPropagation();
            if (this.selectedTool) {
                this.isRotating = true;
                const rect = this.canvas.getBoundingClientRect();
                const centerX = this.selectedTool.x + this.selectedTool.width / 2;
                const centerY = this.selectedTool.y + this.selectedTool.height / 2;
                this.rotateStart = Math.atan2(e.clientY - rect.top - centerY, e.clientX - rect.left - centerX);
            }
        });
        
        // Resize handle
        overlay.querySelector('.resize-handle').addEventListener('mousedown', (e) => {
            e.stopPropagation();
            if (this.selectedTool) {
                this.isResizing = true;
                this.resizeStart = {
                    width: this.selectedTool.width,
                    height: this.selectedTool.height,
                    mouseX: e.clientX,
                    mouseY: e.clientY
                };
            }
        });
    }
    
    setupEventListeners() {
        // Double-click to show controls
        this.canvas.addEventListener('dblclick', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const tool = this.getToolAtPosition(x, y);
            if (tool) {
                this.selectTool(tool);
                this.showControls();
            }
        });
        
        // Mouse events for dragging tools
        document.addEventListener('mousemove', (e) => {
            if (this.isDragging && this.selectedTool) {
                const rect = this.canvas.getBoundingClientRect();
                this.selectedTool.x = e.clientX - rect.left - this.dragOffset.x;
                this.selectedTool.y = e.clientY - rect.top - this.dragOffset.y;
                this.updateControlPosition();
                this.redrawTools();
            } else if (this.isRotating && this.selectedTool) {
                const rect = this.canvas.getBoundingClientRect();
                const centerX = this.selectedTool.x + this.selectedTool.width / 2;
                const centerY = this.selectedTool.y + this.selectedTool.height / 2;
                const angle = Math.atan2(e.clientY - rect.top - centerY, e.clientX - rect.left - centerX);
                this.selectedTool.rotation += (angle - this.rotateStart) * (180 / Math.PI);
                this.rotateStart = angle;
                this.updateControlPosition();
                this.redrawTools();
            } else if (this.isResizing && this.selectedTool) {
                const deltaX = e.clientX - this.resizeStart.mouseX;
                const deltaY = e.clientY - this.resizeStart.mouseY;
                const scale = 1 + (deltaX + deltaY) / 200;
                this.selectedTool.width = Math.max(50, this.resizeStart.width * scale);
                this.selectedTool.height = Math.max(50, this.resizeStart.height * scale);
                this.updateControlPosition();
                this.redrawTools();
            }
        });
        
        document.addEventListener('mouseup', () => {
            this.isDragging = false;
            this.isRotating = false;
            this.isResizing = false;
        });
        
        // Click outside to deselect
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#teaching-tool-controls') && 
                !e.target.closest('#teaching-tools-modal') &&
                !e.target.closest('.teaching-tool-overlay')) {
                // Check if clicking on a tool
                const rect = this.canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const tool = this.getToolAtPosition(x, y);
                if (!tool) {
                    this.hideControls();
                }
            }
        });
    }
    
    showModal() {
        // Reset counts
        this.rulerCount = 1;
        this.setSquareCount = 1;
        document.getElementById('ruler-count-input').value = 1;
        document.getElementById('set-square-count-input').value = 1;
        
        // Update i18n if available
        if (window.i18n && window.i18n.applyTranslations) {
            window.i18n.applyTranslations();
        }
        
        document.getElementById('teaching-tools-modal').classList.add('show');
    }
    
    hideModal() {
        document.getElementById('teaching-tools-modal').classList.remove('show');
    }
    
    insertTools() {
        const canvasRect = this.canvas.getBoundingClientRect();
        const centerX = canvasRect.width / 2;
        const centerY = canvasRect.height / 2;
        
        // Insert rulers
        for (let i = 0; i < this.rulerCount; i++) {
            const offsetX = (i - this.rulerCount / 2) * 50;
            const offsetY = (i - this.rulerCount / 2) * 30;
            this.addTool({
                type: 'ruler',
                x: centerX - 150 + offsetX,
                y: centerY - 100 + offsetY,
                width: 300,
                height: 60,
                rotation: 0,
                image: this.rulerImage
            });
        }
        
        // Insert set squares
        for (let i = 0; i < this.setSquareCount; i++) {
            const offsetX = (i - this.setSquareCount / 2) * 50;
            const offsetY = (i - this.setSquareCount / 2) * 30;
            this.addTool({
                type: 'setSquare',
                x: centerX - 75 + offsetX,
                y: centerY + 50 + offsetY,
                width: 150,
                height: 150,
                rotation: 0,
                image: this.setSquareImage
            });
        }
        
        this.redrawTools();
    }
    
    addTool(tool) {
        tool.id = Date.now() + Math.random();
        this.tools.push(tool);
        this.createToolOverlay(tool);
    }
    
    createToolOverlay(tool) {
        const overlay = document.createElement('div');
        overlay.className = 'teaching-tool-overlay';
        overlay.dataset.toolId = tool.id;
        overlay.style.cssText = `
            position: fixed;
            cursor: move;
            z-index: 100;
            pointer-events: auto;
        `;
        
        this.updateToolOverlay(tool, overlay);
        
        // Drag events
        overlay.addEventListener('mousedown', (e) => {
            if (e.target.closest('.teaching-tool-control-handle')) return;
            
            this.selectTool(tool);
            this.isDragging = true;
            const rect = this.canvas.getBoundingClientRect();
            this.dragOffset.x = e.clientX - rect.left - tool.x;
            this.dragOffset.y = e.clientY - rect.top - tool.y;
        });
        
        // Double-click to show controls
        overlay.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            this.selectTool(tool);
            this.showControls();
        });
        
        document.body.appendChild(overlay);
        tool.overlay = overlay;
    }
    
    updateToolOverlay(tool, overlay = null) {
        overlay = overlay || tool.overlay;
        if (!overlay) return;
        
        const canvasRect = this.canvas.getBoundingClientRect();
        
        overlay.style.left = (canvasRect.left + tool.x) + 'px';
        overlay.style.top = (canvasRect.top + tool.y) + 'px';
        overlay.style.width = tool.width + 'px';
        overlay.style.height = tool.height + 'px';
        overlay.style.transform = `rotate(${tool.rotation}deg)`;
        overlay.style.transformOrigin = 'center center';
        overlay.style.backgroundImage = `url(${tool.image.src})`;
        overlay.style.backgroundSize = 'contain';
        overlay.style.backgroundRepeat = 'no-repeat';
        overlay.style.backgroundPosition = 'center';
    }
    
    removeTool(tool) {
        const index = this.tools.indexOf(tool);
        if (index > -1) {
            this.tools.splice(index, 1);
            if (tool.overlay) {
                tool.overlay.remove();
            }
        }
        this.hideControls();
        this.selectedTool = null;
        this.redrawTools();
    }
    
    selectTool(tool) {
        this.selectedTool = tool;
        this.updateControlPosition();
    }
    
    getToolAtPosition(x, y) {
        // Check tools in reverse order (top-most first)
        for (let i = this.tools.length - 1; i >= 0; i--) {
            const tool = this.tools[i];
            // Simple bounding box check (doesn't account for rotation)
            if (x >= tool.x && x <= tool.x + tool.width &&
                y >= tool.y && y <= tool.y + tool.height) {
                return tool;
            }
        }
        return null;
    }
    
    showControls() {
        if (this.selectedTool && this.controlOverlay) {
            this.controlOverlay.style.display = 'flex';
            this.updateControlPosition();
        }
    }
    
    hideControls() {
        if (this.controlOverlay) {
            this.controlOverlay.style.display = 'none';
        }
        this.selectedTool = null;
    }
    
    updateControlPosition() {
        if (!this.selectedTool || !this.controlOverlay) return;
        
        const tool = this.selectedTool;
        const canvasRect = this.canvas.getBoundingClientRect();
        
        // Position controls above the tool
        this.controlOverlay.style.left = (canvasRect.left + tool.x + tool.width / 2) + 'px';
        this.controlOverlay.style.top = (canvasRect.top + tool.y - 40) + 'px';
        this.controlOverlay.style.transform = 'translateX(-50%)';
    }
    
    redrawTools() {
        // Update all tool overlays
        this.tools.forEach(tool => {
            this.updateToolOverlay(tool);
        });
    }
    
    // Check if a point is near the edge of a tool (for drawing along edges)
    isNearToolEdge(x, y, tolerance = 10) {
        for (const tool of this.tools) {
            // Check if near edges
            if (this.isNearRectEdge(x, y, tool, tolerance)) {
                return { tool, edge: this.getNearestEdge(x, y, tool) };
            }
        }
        return null;
    }
    
    isNearRectEdge(x, y, tool, tolerance) {
        const { x: tx, y: ty, width, height } = tool;
        
        // Check each edge
        const nearTop = Math.abs(y - ty) < tolerance && x >= tx && x <= tx + width;
        const nearBottom = Math.abs(y - (ty + height)) < tolerance && x >= tx && x <= tx + width;
        const nearLeft = Math.abs(x - tx) < tolerance && y >= ty && y <= ty + height;
        const nearRight = Math.abs(x - (tx + width)) < tolerance && y >= ty && y <= ty + height;
        
        return nearTop || nearBottom || nearLeft || nearRight;
    }
    
    getNearestEdge(x, y, tool) {
        const { x: tx, y: ty, width, height } = tool;
        const distances = [
            { edge: 'top', dist: Math.abs(y - ty) },
            { edge: 'bottom', dist: Math.abs(y - (ty + height)) },
            { edge: 'left', dist: Math.abs(x - tx) },
            { edge: 'right', dist: Math.abs(x - (tx + width)) }
        ];
        distances.sort((a, b) => a.dist - b.dist);
        return distances[0].edge;
    }
    
    // Snap point to tool edge
    snapToEdge(x, y, tool, edge) {
        switch (edge) {
            case 'top':
                return { x, y: tool.y };
            case 'bottom':
                return { x, y: tool.y + tool.height };
            case 'left':
                return { x: tool.x, y };
            case 'right':
                return { x: tool.x + tool.width, y };
            default:
                return { x, y };
        }
    }
    
    // Clean up when destroyed
    destroy() {
        // Remove all tool overlays
        this.tools.forEach(tool => {
            if (tool.overlay) {
                tool.overlay.remove();
            }
        });
        this.tools = [];
        
        // Remove control overlay
        if (this.controlOverlay) {
            this.controlOverlay.remove();
        }
        
        // Remove modal
        const modal = document.getElementById('teaching-tools-modal');
        if (modal) {
            modal.remove();
        }
    }
}

// Export for use
if (typeof window !== 'undefined') {
    window.TeachingToolsManager = TeachingToolsManager;
}

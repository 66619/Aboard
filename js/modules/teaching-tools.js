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
        this.activeResizeHandle = null;
        this.dragOffset = { x: 0, y: 0 };
        this.rotateStart = 0;
        this.resizeStart = { width: 0, height: 0, x: 0, y: 0 };
        
        // Flag to prevent drawing while interacting with tools
        this.isInteracting = false;
        
        // Touch/pinch state for tools
        this.toolPinchState = {
            active: false,
            initialDistance: 0,
            initialWidth: 0,
            initialHeight: 0,
            initialRotation: 0,
            initialAngle: 0
        };
        
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
        this.rulerImage.src = 'img/ruler_1.png';
        
        this.setSquareImage = new Image();
        this.setSquareImage.onload = checkLoaded;
        this.setSquareImage.onerror = () => console.error('Failed to load set square image');
        this.setSquareImage.src = 'img/set_square_1.png';
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
                    <div class="teaching-tools-current-count">
                        <span data-i18n="teachingTools.currentOnCanvas">画布上当前数量</span>: 
                        <span id="current-ruler-count">0</span> <span data-i18n="teachingTools.ruler">直尺</span>, 
                        <span id="current-set-square-count">0</span> <span data-i18n="teachingTools.setSquare">三角板</span>
                    </div>
                    <div class="teaching-tools-row">
                        <!-- Ruler Section -->
                        <div class="teaching-tool-item">
                            <div class="teaching-tool-preview">
                                <img src="img/ruler_1.png" alt="Ruler" class="teaching-tool-image">
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
                                <img src="img/set_square_1.png" alt="Set Square" class="teaching-tool-image set-square-image">
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
                    <div class="teaching-tools-hint">
                        <span data-i18n="teachingTools.hint">提示：双击教具可调整大小、旋转和删除</span>
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
    
    // Get counts of tools currently on canvas
    getToolCounts() {
        const rulerCount = this.tools.filter(t => t.type === 'ruler').length;
        const setSquareCount = this.tools.filter(t => t.type === 'setSquare').length;
        return { rulerCount, setSquareCount };
    }
    
    // Update the current count display in modal
    updateCurrentCountDisplay() {
        const counts = this.getToolCounts();
        const rulerEl = document.getElementById('current-ruler-count');
        const setSquareEl = document.getElementById('current-set-square-count');
        if (rulerEl) rulerEl.textContent = counts.rulerCount;
        if (setSquareEl) setSquareEl.textContent = counts.setSquareCount;
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
    
    setupEventListeners() {
        // Store bound handlers for cleanup
        this._boundHandlers = {
            mouseMove: (e) => this.handleMouseMove(e),
            mouseUp: (e) => this.handleMouseUp(e),
            touchMove: (e) => this.handleTouchMove(e),
            touchEnd: (e) => this.handleTouchEnd(e),
            click: (e) => {
                if (!e.target.closest('#teaching-tools-modal') &&
                    !e.target.closest('.teaching-tool-overlay')) {
                    this.deselectTool();
                }
            }
        };
        
        // Mouse events for dragging/resizing tools
        document.addEventListener('mousemove', this._boundHandlers.mouseMove);
        document.addEventListener('mouseup', this._boundHandlers.mouseUp);
        
        // Touch events for pinch zoom on tools
        document.addEventListener('touchmove', this._boundHandlers.touchMove, { passive: false });
        document.addEventListener('touchend', this._boundHandlers.touchEnd);
        
        // Click outside to deselect
        document.addEventListener('click', this._boundHandlers.click);
    }
    
    handleMouseMove(e) {
        // Dragging can work with _draggedTool (any tool being dragged)
        if (this.isDragging && this._draggedTool) {
            const rect = this.canvas.getBoundingClientRect();
            this._draggedTool.x = e.clientX - rect.left - this.dragOffset.x;
            this._draggedTool.y = e.clientY - rect.top - this.dragOffset.y;
            this.updateToolOverlay(this._draggedTool);
            return;
        }
        
        // Rotating and resizing only work with selectedTool (double-clicked)
        if (!this.selectedTool) return;
        
        if (this.isRotating) {
            const rect = this.canvas.getBoundingClientRect();
            const centerX = this.selectedTool.x + this.selectedTool.width / 2;
            const centerY = this.selectedTool.y + this.selectedTool.height / 2;
            const angle = Math.atan2(e.clientY - rect.top - centerY, e.clientX - rect.left - centerX);
            this.selectedTool.rotation += (angle - this.rotateStart) * (180 / Math.PI);
            this.rotateStart = angle;
            this.updateToolOverlay(this.selectedTool);
        } else if (this.isResizing && this.activeResizeHandle) {
            this.handleResize(e);
        }
    }
    
    handleResize(e) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const tool = this.selectedTool;
        const handle = this.activeResizeHandle;
        
        // Get the center of the tool for rotation calculations
        const centerX = this.resizeStart.x + this.resizeStart.width / 2;
        const centerY = this.resizeStart.y + this.resizeStart.height / 2;
        
        // Transform mouse position to local coordinate space (accounting for rotation)
        const localMouse = this.rotatePoint(mouseX, mouseY, centerX, centerY, -tool.rotation);
        
        let newX = tool.x;
        let newY = tool.y;
        let newWidth = tool.width;
        let newHeight = tool.height;
        
        // Prevent division by zero
        if (this.resizeStart.height === 0) return;
        const aspectRatio = this.resizeStart.width / this.resizeStart.height;
        
        switch (handle) {
            case 'nw':
                newWidth = this.resizeStart.x + this.resizeStart.width - localMouse.x;
                newHeight = newWidth / aspectRatio;
                newX = this.resizeStart.x + this.resizeStart.width - newWidth;
                newY = this.resizeStart.y + this.resizeStart.height - newHeight;
                break;
            case 'ne':
                newWidth = localMouse.x - this.resizeStart.x;
                newHeight = newWidth / aspectRatio;
                newY = this.resizeStart.y + this.resizeStart.height - newHeight;
                break;
            case 'sw':
                newWidth = this.resizeStart.x + this.resizeStart.width - localMouse.x;
                newHeight = newWidth / aspectRatio;
                newX = this.resizeStart.x + this.resizeStart.width - newWidth;
                break;
            case 'se':
                newWidth = localMouse.x - this.resizeStart.x;
                newHeight = newWidth / aspectRatio;
                break;
            case 'n':
                newHeight = this.resizeStart.y + this.resizeStart.height - localMouse.y;
                newY = this.resizeStart.y + this.resizeStart.height - newHeight;
                break;
            case 's':
                newHeight = localMouse.y - this.resizeStart.y;
                break;
            case 'w':
                newWidth = this.resizeStart.x + this.resizeStart.width - localMouse.x;
                newX = this.resizeStart.x + this.resizeStart.width - newWidth;
                break;
            case 'e':
                newWidth = localMouse.x - this.resizeStart.x;
                break;
        }
        
        // Apply minimum size constraints
        const minSize = 30;
        if (newWidth >= minSize) {
            tool.width = newWidth;
            tool.x = newX;
        }
        if (newHeight >= minSize) {
            tool.height = newHeight;
            tool.y = newY;
        }
        
        this.updateToolOverlay(tool);
    }
    
    handleMouseUp(e) {
        if (this.isDragging || this.isRotating || this.isResizing) {
            this.isDragging = false;
            this.isRotating = false;
            this.isResizing = false;
            this.activeResizeHandle = null;
            this.isInteracting = false;
            this._draggedTool = null;
        }
    }
    
    handleTouchMove(e) {
        if (!this.selectedTool) return;
        
        // Handle pinch zoom for teaching tools
        if (e.touches.length === 2 && this.toolPinchState.active) {
            e.preventDefault();
            e.stopPropagation();
            
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            
            // Calculate current distance and angle
            const dx = touch2.clientX - touch1.clientX;
            const dy = touch2.clientY - touch1.clientY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);
            
            // Prevent division by zero
            if (this.toolPinchState.initialDistance < 1) return;
            
            // Calculate scale factor
            const scale = distance / this.toolPinchState.initialDistance;
            
            // Apply scale to tool dimensions
            this.selectedTool.width = this.toolPinchState.initialWidth * scale;
            this.selectedTool.height = this.toolPinchState.initialHeight * scale;
            
            // Apply rotation
            const angleDiff = (angle - this.toolPinchState.initialAngle) * (180 / Math.PI);
            this.selectedTool.rotation = this.toolPinchState.initialRotation + angleDiff;
            
            this.updateToolOverlay(this.selectedTool);
        }
    }
    
    handleTouchEnd(e) {
        if (this.toolPinchState.active) {
            this.toolPinchState.active = false;
            this.isInteracting = false;
        }
        if (this.isDragging) {
            this.isDragging = false;
            this.isInteracting = false;
            this._draggedTool = null;
        }
    }
    
    showModal() {
        // Reset counts to add
        this.rulerCount = 1;
        this.setSquareCount = 1;
        document.getElementById('ruler-count-input').value = 1;
        document.getElementById('set-square-count-input').value = 1;
        
        // Update current count display
        this.updateCurrentCountDisplay();
        
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
        const centerX = (canvasRect.right - canvasRect.left) / 2;
        const centerY = (canvasRect.bottom - canvasRect.top) / 2;
        
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
        tool.id = Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        this.tools.push(tool);
        this.createToolOverlay(tool);
    }
    
    createToolOverlay(tool) {
        const overlay = document.createElement('div');
        overlay.className = 'teaching-tool-overlay';
        overlay.dataset.toolId = tool.id;
        
        // Add type-specific class for styling (e.g., triangle clip for set square)
        if (tool.type === 'setSquare') {
            overlay.classList.add('set-square-tool');
        } else if (tool.type === 'ruler') {
            overlay.classList.add('ruler-tool');
        }
        
        // Create inner image container
        const imageContainer = document.createElement('div');
        imageContainer.className = 'teaching-tool-image-container';
        
        // Create the image element
        const img = document.createElement('img');
        img.src = tool.image.src;
        img.className = 'teaching-tool-img';
        img.draggable = false;
        imageContainer.appendChild(img);
        overlay.appendChild(imageContainer);
        
        // Create Word-style resize handles (8 handles)
        const handles = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];
        handles.forEach(pos => {
            const handle = document.createElement('div');
            handle.className = `teaching-tool-resize-handle handle-${pos}`;
            handle.dataset.handle = pos;
            overlay.appendChild(handle);
        });
        
        // Create rotate handle
        const rotateHandle = document.createElement('div');
        rotateHandle.className = 'teaching-tool-rotate-handle';
        rotateHandle.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
            </svg>
        `;
        overlay.appendChild(rotateHandle);
        
        // Create delete button
        const deleteBtn = document.createElement('div');
        deleteBtn.className = 'teaching-tool-delete-btn';
        deleteBtn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        `;
        overlay.appendChild(deleteBtn);
        
        this.updateToolOverlay(tool, overlay);
        this.setupToolOverlayEvents(tool, overlay);
        
        document.body.appendChild(overlay);
        tool.overlay = overlay;
    }
    
    setupToolOverlayEvents(tool, overlay) {
        // Prevent default touch behavior
        overlay.addEventListener('touchstart', (e) => {
            // Two-finger gesture for pinch zoom - only if tool is already selected
            if (e.touches.length === 2 && this.selectedTool === tool) {
                e.preventDefault();
                e.stopPropagation();
                
                this.isInteracting = true;
                
                const touch1 = e.touches[0];
                const touch2 = e.touches[1];
                const dx = touch2.clientX - touch1.clientX;
                const dy = touch2.clientY - touch1.clientY;
                const initialDistance = Math.sqrt(dx * dx + dy * dy);
                
                // Ensure minimum distance to prevent division by zero
                this.toolPinchState = {
                    active: true,
                    initialDistance: Math.max(initialDistance, 1),
                    initialWidth: tool.width,
                    initialHeight: tool.height,
                    initialRotation: tool.rotation,
                    initialAngle: Math.atan2(dy, dx)
                };
            } else if (e.touches.length === 1) {
                // Single finger - only drag, don't select for editing
                if (!e.target.closest('.teaching-tool-resize-handle') &&
                    !e.target.closest('.teaching-tool-rotate-handle') &&
                    !e.target.closest('.teaching-tool-delete-btn')) {
                    
                    this.isDragging = true;
                    this.isInteracting = true;
                    this._draggedTool = tool;
                    
                    const rect = this.canvas.getBoundingClientRect();
                    const touch = e.touches[0];
                    this.dragOffset.x = touch.clientX - rect.left - tool.x;
                    this.dragOffset.y = touch.clientY - rect.top - tool.y;
                }
            }
        }, { passive: false });
        
        overlay.addEventListener('touchmove', (e) => {
            if (this.isDragging && e.touches.length === 1 && this._draggedTool === tool) {
                e.preventDefault();
                const rect = this.canvas.getBoundingClientRect();
                const touch = e.touches[0];
                tool.x = touch.clientX - rect.left - this.dragOffset.x;
                tool.y = touch.clientY - rect.top - this.dragOffset.y;
                this.updateToolOverlay(tool);
            }
        }, { passive: false });
        
        // Mouse drag - single click only moves, doesn't select for editing
        overlay.addEventListener('mousedown', (e) => {
            // If clicking on control handles, only allow if tool is selected
            if (e.target.closest('.teaching-tool-resize-handle') ||
                e.target.closest('.teaching-tool-rotate-handle') ||
                e.target.closest('.teaching-tool-delete-btn')) {
                // Only allow if this tool is already selected
                if (this.selectedTool !== tool) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
                return;
            }
            
            e.preventDefault();
            e.stopPropagation();
            
            // Single click just drags, doesn't select
            this.isDragging = true;
            this.isInteracting = true;
            this._draggedTool = tool;
            
            const rect = this.canvas.getBoundingClientRect();
            this.dragOffset.x = e.clientX - rect.left - tool.x;
            this.dragOffset.y = e.clientY - rect.top - tool.y;
        });
        
        // Double-click to select and show controls
        overlay.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            this.selectTool(tool);
        });
        
        // Resize handles - only work if tool is already selected
        overlay.querySelectorAll('.teaching-tool-resize-handle').forEach(handle => {
            handle.addEventListener('mousedown', (e) => {
                if (this.selectedTool !== tool) return;
                
                e.preventDefault();
                e.stopPropagation();
                
                this.isResizing = true;
                this.isInteracting = true;
                this.activeResizeHandle = handle.dataset.handle;
                this.resizeStart = {
                    width: tool.width,
                    height: tool.height,
                    x: tool.x,
                    y: tool.y,
                    mouseX: e.clientX,
                    mouseY: e.clientY
                };
            });
        });
        
        // Rotate handle - only works if tool is already selected
        overlay.querySelector('.teaching-tool-rotate-handle').addEventListener('mousedown', (e) => {
            if (this.selectedTool !== tool) return;
            
            e.preventDefault();
            e.stopPropagation();
            
            this.isRotating = true;
            this.isInteracting = true;
            
            const rect = this.canvas.getBoundingClientRect();
            const centerX = tool.x + tool.width / 2;
            const centerY = tool.y + tool.height / 2;
            this.rotateStart = Math.atan2(e.clientY - rect.top - centerY, e.clientX - rect.left - centerX);
        });
        
        // Delete button - only works if tool is already selected
        overlay.querySelector('.teaching-tool-delete-btn').addEventListener('click', (e) => {
            if (this.selectedTool !== tool) return;
            
            e.preventDefault();
            e.stopPropagation();
            this.removeTool(tool);
        });
    }
    
    updateToolOverlay(tool, overlay = null) {
        overlay = overlay || tool.overlay;
        if (!overlay) return;
        
        const canvasRect = this.canvas.getBoundingClientRect();
        
        overlay.style.position = 'fixed';
        overlay.style.left = (canvasRect.left + tool.x) + 'px';
        overlay.style.top = (canvasRect.top + tool.y) + 'px';
        overlay.style.width = tool.width + 'px';
        overlay.style.height = tool.height + 'px';
        overlay.style.transform = `rotate(${tool.rotation}deg)`;
        overlay.style.transformOrigin = 'center center';
        overlay.style.zIndex = '100';
        
        // Show/hide controls based on selection
        const isSelected = this.selectedTool === tool;
        overlay.classList.toggle('selected', isSelected);
    }
    
    removeTool(tool) {
        const index = this.tools.indexOf(tool);
        if (index > -1) {
            this.tools.splice(index, 1);
            if (tool.overlay) {
                tool.overlay.remove();
            }
        }
        if (this.selectedTool === tool) {
            this.selectedTool = null;
        }
        this.redrawTools();
    }
    
    selectTool(tool) {
        // Deselect previous tool
        if (this.selectedTool && this.selectedTool !== tool) {
            this.selectedTool.overlay?.classList.remove('selected');
        }
        this.selectedTool = tool;
        if (tool.overlay) {
            tool.overlay.classList.add('selected');
        }
    }
    
    deselectTool() {
        if (this.selectedTool) {
            this.selectedTool.overlay?.classList.remove('selected');
            this.selectedTool = null;
        }
    }
    
    // Helper function to rotate a point around a center
    rotatePoint(px, py, cx, cy, angle) {
        const radians = (angle * Math.PI) / 180;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        const nx = (cos * (px - cx)) + (sin * (py - cy)) + cx;
        const ny = (cos * (py - cy)) - (sin * (px - cx)) + cy;
        return { x: nx, y: ny };
    }
    
    // Helper function to transform point to tool's local coordinate space (accounting for rotation)
    transformToToolSpace(x, y, tool) {
        const centerX = tool.x + tool.width / 2;
        const centerY = tool.y + tool.height / 2;
        // Rotate point in opposite direction to get local coordinates
        return this.rotatePoint(x, y, centerX, centerY, -tool.rotation);
    }
    
    getToolAtPosition(x, y) {
        // Check tools in reverse order (top-most first)
        for (let i = this.tools.length - 1; i >= 0; i--) {
            const tool = this.tools[i];
            // Transform point to tool's local coordinate space
            const localPoint = this.transformToToolSpace(x, y, tool);
            // Now check against unrotated bounding box
            if (localPoint.x >= tool.x && localPoint.x <= tool.x + tool.width &&
                localPoint.y >= tool.y && localPoint.y <= tool.y + tool.height) {
                return tool;
            }
        }
        return null;
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
            // Transform point to tool's local coordinate space
            const localPoint = this.transformToToolSpace(x, y, tool);
            // Check if near edges in local space
            if (this.isNearRectEdge(localPoint.x, localPoint.y, tool, tolerance)) {
                return { tool, edge: this.getNearestEdge(localPoint.x, localPoint.y, tool) };
            }
        }
        return null;
    }
    
    isNearRectEdge(x, y, tool, tolerance) {
        const { x: tx, y: ty, width, height } = tool;
        
        // Check each edge (in local coordinate space)
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
        // Remove event listeners
        if (this._boundHandlers) {
            document.removeEventListener('mousemove', this._boundHandlers.mouseMove);
            document.removeEventListener('mouseup', this._boundHandlers.mouseUp);
            document.removeEventListener('touchmove', this._boundHandlers.touchMove);
            document.removeEventListener('touchend', this._boundHandlers.touchEnd);
            document.removeEventListener('click', this._boundHandlers.click);
        }
        
        // Remove all tool overlays
        this.tools.forEach(tool => {
            if (tool.overlay) {
                tool.overlay.remove();
            }
        });
        this.tools = [];
        
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

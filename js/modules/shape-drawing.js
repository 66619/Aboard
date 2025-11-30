// Shape Drawing Module
// Handles drawing shapes (line, rectangle, circle, etc.) on the canvas
// Uses the same properties as the pen tool (color, size, pen type)

class ShapeDrawingManager {
    constructor(canvas, ctx, drawingEngine, historyManager) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.drawingEngine = drawingEngine;
        this.historyManager = historyManager;
        
        // Shape drawing state
        this.isDrawing = false;
        this.currentShape = 'line';
        this.startPoint = null;
        this.endPoint = null;
        
        // Preview layer (optional canvas overlay for live preview)
        this.previewCanvas = null;
        this.previewCtx = null;
        
        // Create preview canvas for live shape preview
        this.createPreviewCanvas();
    }
    
    createPreviewCanvas() {
        // Create an overlay canvas for shape preview
        this.previewCanvas = document.createElement('canvas');
        this.previewCanvas.id = 'shape-preview-canvas';
        this.previewCanvas.style.position = 'fixed';
        this.previewCanvas.style.top = '0';
        this.previewCanvas.style.left = '0';
        this.previewCanvas.style.pointerEvents = 'none';
        this.previewCanvas.style.zIndex = '50';
        this.previewCanvas.style.display = 'none';
        
        document.body.appendChild(this.previewCanvas);
        this.previewCtx = this.previewCanvas.getContext('2d');
    }
    
    syncPreviewCanvas() {
        // Sync preview canvas size with main canvas
        const rect = this.canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        this.previewCanvas.width = rect.width * dpr;
        this.previewCanvas.height = rect.height * dpr;
        this.previewCanvas.style.width = rect.width + 'px';
        this.previewCanvas.style.height = rect.height + 'px';
        this.previewCanvas.style.left = rect.left + 'px';
        this.previewCanvas.style.top = rect.top + 'px';
        
        this.previewCtx.scale(dpr, dpr);
    }
    
    setShape(shape) {
        this.currentShape = shape;
    }
    
    getPosition(e) {
        // Reuse drawingEngine's getPosition method for consistency
        return this.drawingEngine.getPosition(e);
    }
    
    startDrawing(e) {
        this.isDrawing = true;
        this.startPoint = this.getPosition(e);
        this.endPoint = this.startPoint;
        
        // Sync and show preview canvas
        this.syncPreviewCanvas();
        this.previewCanvas.style.display = 'block';
    }
    
    draw(e) {
        if (!this.isDrawing || !this.startPoint) return;
        
        this.endPoint = this.getPosition(e);
        
        // Clear preview and draw current shape preview
        this.clearPreview();
        this.drawShapePreview();
    }
    
    stopDrawing() {
        if (!this.isDrawing) return;
        
        // Draw final shape on main canvas
        if (this.startPoint && this.endPoint) {
            this.drawFinalShape();
            
            // Save to history
            if (this.historyManager) {
                this.historyManager.saveState();
            }
        }
        
        // Reset state
        this.isDrawing = false;
        this.startPoint = null;
        this.endPoint = null;
        
        // Hide preview canvas
        this.clearPreview();
        this.previewCanvas.style.display = 'none';
    }
    
    clearPreview() {
        const dpr = window.devicePixelRatio || 1;
        this.previewCtx.clearRect(0, 0, this.previewCanvas.width / dpr, this.previewCanvas.height / dpr);
    }
    
    setupDrawingContext(ctx) {
        // Use same properties as pen tool
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = this.drawingEngine.currentColor;
        ctx.lineWidth = this.drawingEngine.penSize;
        
        // Apply pen type effects
        switch(this.drawingEngine.penType) {
            case 'pencil':
                ctx.globalAlpha = 0.7;
                break;
            case 'ballpoint':
                ctx.globalAlpha = 0.9;
                break;
            case 'fountain':
                ctx.globalAlpha = 1.0;
                break;
            case 'brush':
                ctx.globalAlpha = 0.85;
                ctx.lineWidth = this.drawingEngine.penSize * 1.5;
                break;
            case 'normal':
            default:
                ctx.globalAlpha = 1.0;
                break;
        }
    }
    
    drawShapePreview() {
        this.setupDrawingContext(this.previewCtx);
        
        // Draw dashed preview line
        this.previewCtx.setLineDash([5, 5]);
        
        switch(this.currentShape) {
            case 'line':
                this.drawLine(this.previewCtx, this.startPoint, this.endPoint);
                break;
        }
        
        this.previewCtx.setLineDash([]);
    }
    
    drawFinalShape() {
        this.setupDrawingContext(this.ctx);
        this.ctx.setLineDash([]); // Solid line for final shape
        
        switch(this.currentShape) {
            case 'line':
                this.drawLine(this.ctx, this.startPoint, this.endPoint);
                break;
        }
        
        // Reset context
        this.ctx.globalAlpha = 1.0;
    }
    
    drawLine(ctx, start, end) {
        if (!start || !end) return;
        
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
    }
    
    // Cleanup
    destroy() {
        if (this.previewCanvas && this.previewCanvas.parentNode) {
            this.previewCanvas.parentNode.removeChild(this.previewCanvas);
        }
    }
}

// Export for use
if (typeof window !== 'undefined') {
    window.ShapeDrawingManager = ShapeDrawingManager;
}

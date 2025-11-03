// Selection Module
// Handles selection of drawn strokes and images

class SelectionManager {
    constructor(canvas, ctx, canvasImageManager) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.canvasImageManager = canvasImageManager;
        
        this.isSelecting = false;
        this.selectionStart = null;
        this.selectionEnd = null;
        this.selectedStrokes = [];
        this.selectedImage = null;
        
        // For lasso/rectangle selection (future enhancement)
        this.selectionMode = 'click'; // 'click' or 'rectangle'

        // Bind event listeners to ensure proper scope
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
    }

    handleMouseDown(e) {
        // Ensure the event is within the canvas bounds
        if (!this.isEventOnCanvas(e)) return;
        this.startSelection(e);
    }

    handleMouseMove(e) {
        if (!this.isSelecting) return;
        this.continueSelection(e);
    }

    handleMouseUp(e) {
        if (!this.isSelecting) return;
        this.endSelection();
    }

    isEventOnCanvas(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        return x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
    }

    startSelection(e) {
        this.isSelecting = true;
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Check if clicked on an image
        const imageId = this.canvasImageManager.getImageAtPoint(x, y);
        if (imageId) {
            this.canvasImageManager.selectImage(imageId);
            this.selectedImage = imageId;
            return true;
        }
        
        // If not on image, deselect
        this.canvasImageManager.deselectImage();
        this.selectedImage = null;
        
        // For future: stroke selection
        // this.selectionStart = { x, y };
        
        return false;
    }
    
    continueSelection(e) {
        if (!this.isSelecting) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.selectionEnd = { x, y };
        
        // Draw selection rectangle
        this.drawSelectionRect();
    }
    
    endSelection() {
        this.isSelecting = false;
        this.selectionStart = null;
        this.selectionEnd = null;
    }
    
    drawSelectionRect() {
        if (!this.selectionStart || !this.selectionEnd) return;
        
        this.ctx.save();
        this.ctx.strokeStyle = '#0066FF';
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([5, 5]);
        
        const width = this.selectionEnd.x - this.selectionStart.x;
        const height = this.selectionEnd.y - this.selectionStart.y;
        
        this.ctx.strokeRect(this.selectionStart.x, this.selectionStart.y, width, height);
        
        this.ctx.restore();
    }
    
    hasSelection() {
        return this.selectedImage !== null || this.selectedStrokes.length > 0;
    }
    
    copySelection() {
        if (this.selectedImage) {
            this.canvasImageManager.copySelectedImage();
            return true;
        }
        // Future: copy selected strokes
        return false;
    }
    
    deleteSelection() {
        if (this.selectedImage) {
            this.canvasImageManager.deleteSelectedImage();
            this.selectedImage = null;
            return true;
        }
        // Future: delete selected strokes
        return false;
    }
    
    clearSelection() {
        this.canvasImageManager.deselectImage();
        this.selectedImage = null;
        this.selectedStrokes = [];
    }
}

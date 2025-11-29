/**
 * Edge Drawing Module
 * Handles the logic for drawing along the edges of teaching tools (rulers and set squares)
 * When the pen touches the edge of a ruler or set square, it constrains drawing to that edge
 */

// Default edge tolerance in pixels for detecting edge proximity
const DEFAULT_EDGE_TOLERANCE = 15;

class EdgeDrawingManager {
    constructor(teachingToolsManager, drawingEngine) {
        this.teachingToolsManager = teachingToolsManager;
        this.drawingEngine = drawingEngine;
        
        // Edge snapping state
        this.isSnappedToEdge = false;
        this.snappedTool = null;
        this.snappedEdge = null;
        this.edgeTolerance = DEFAULT_EDGE_TOLERANCE;
    }
    
    /**
     * Check if a point is near any tool edge and return snapping info
     * @param {number} x - X coordinate in canvas space
     * @param {number} y - Y coordinate in canvas space
     * @returns {Object|null} - Snapping info or null if not near any edge
     */
    checkEdgeProximity(x, y) {
        const tools = this.teachingToolsManager.tools;
        
        for (const tool of tools) {
            const edgeInfo = this.getEdgeAtPoint(x, y, tool);
            if (edgeInfo) {
                return {
                    tool: tool,
                    edge: edgeInfo.edge,
                    snappedPoint: edgeInfo.snappedPoint
                };
            }
        }
        return null;
    }
    
    /**
     * Get the edge of a tool that a point is near
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @param {Object} tool - The teaching tool
     * @returns {Object|null} - Edge info with snapped point or null
     */
    getEdgeAtPoint(x, y, tool) {
        // Transform point to tool's local coordinate space
        const localPoint = this.transformToToolSpace(x, y, tool);
        
        if (tool.type === 'ruler') {
            return this.getRulerEdgeAtPoint(localPoint, tool, x, y);
        } else if (tool.type === 'setSquare') {
            return this.getSetSquareEdgeAtPoint(localPoint, tool, x, y);
        }
        return null;
    }
    
    /**
     * Check if a point is near a ruler edge
     * Rulers have 4 edges: top, bottom, left, right
     * All edges can be used for drawing straight lines
     */
    getRulerEdgeAtPoint(localPoint, tool, originalX, originalY) {
        const { x: tx, y: ty, width, height } = tool;
        const lx = localPoint.x;
        const ly = localPoint.y;
        
        // Check bottom edge (horizontal)
        const bottomY = ty + height;
        if (Math.abs(ly - bottomY) < this.edgeTolerance && lx >= tx - this.edgeTolerance && lx <= tx + width + this.edgeTolerance) {
            const snappedLocal = { x: Math.max(tx, Math.min(tx + width, lx)), y: bottomY };
            const snappedWorld = this.transformToWorldSpace(snappedLocal.x, snappedLocal.y, tool);
            return { edge: 'bottom', snappedPoint: snappedWorld };
        }
        
        // Check top edge (horizontal)
        if (Math.abs(ly - ty) < this.edgeTolerance && lx >= tx - this.edgeTolerance && lx <= tx + width + this.edgeTolerance) {
            const snappedLocal = { x: Math.max(tx, Math.min(tx + width, lx)), y: ty };
            const snappedWorld = this.transformToWorldSpace(snappedLocal.x, snappedLocal.y, tool);
            return { edge: 'top', snappedPoint: snappedWorld };
        }
        
        // Check left edge (vertical) - for drawing vertical lines along ruler edge
        if (Math.abs(lx - tx) < this.edgeTolerance && ly >= ty - this.edgeTolerance && ly <= ty + height + this.edgeTolerance) {
            const snappedLocal = { x: tx, y: Math.max(ty, Math.min(ty + height, ly)) };
            const snappedWorld = this.transformToWorldSpace(snappedLocal.x, snappedLocal.y, tool);
            return { edge: 'left', snappedPoint: snappedWorld };
        }
        
        // Check right edge (vertical) - for drawing vertical lines along ruler edge
        const rightX = tx + width;
        if (Math.abs(lx - rightX) < this.edgeTolerance && ly >= ty - this.edgeTolerance && ly <= ty + height + this.edgeTolerance) {
            const snappedLocal = { x: rightX, y: Math.max(ty, Math.min(ty + height, ly)) };
            const snappedWorld = this.transformToWorldSpace(snappedLocal.x, snappedLocal.y, tool);
            return { edge: 'right', snappedPoint: snappedWorld };
        }
        
        return null;
    }
    
    /**
     * Check if a point is near a set square edge
     * Set squares are right triangles - only the edges should allow drawing
     * The three edges: hypotenuse, bottom, and vertical right side
     */
    getSetSquareEdgeAtPoint(localPoint, tool, originalX, originalY) {
        const { x: tx, y: ty, width, height } = tool;
        const lx = localPoint.x;
        const ly = localPoint.y;
        
        // Triangle vertices in local space (assuming right triangle):
        // Bottom-left (origin of triangle): (tx, ty + height)
        // Bottom-right: (tx + width, ty + height)
        // Top-left (right angle): (tx, ty)
        const p1 = { x: tx, y: ty + height };           // Bottom-left
        const p2 = { x: tx + width, y: ty + height };   // Bottom-right
        const p3 = { x: tx, y: ty };                     // Top-left (right angle vertex)
        
        // Check bottom edge (horizontal)
        const distToBottom = this.distanceToSegment(lx, ly, p1.x, p1.y, p2.x, p2.y);
        if (distToBottom < this.edgeTolerance) {
            const snappedLocal = this.projectPointOnSegment(lx, ly, p1.x, p1.y, p2.x, p2.y);
            const snappedWorld = this.transformToWorldSpace(snappedLocal.x, snappedLocal.y, tool);
            return { edge: 'bottom', snappedPoint: snappedWorld };
        }
        
        // Check left edge (vertical)
        const distToLeft = this.distanceToSegment(lx, ly, p1.x, p1.y, p3.x, p3.y);
        if (distToLeft < this.edgeTolerance) {
            const snappedLocal = this.projectPointOnSegment(lx, ly, p1.x, p1.y, p3.x, p3.y);
            const snappedWorld = this.transformToWorldSpace(snappedLocal.x, snappedLocal.y, tool);
            return { edge: 'left', snappedPoint: snappedWorld };
        }
        
        // Check hypotenuse (diagonal from top-left to bottom-right)
        const distToHypotenuse = this.distanceToSegment(lx, ly, p3.x, p3.y, p2.x, p2.y);
        if (distToHypotenuse < this.edgeTolerance) {
            const snappedLocal = this.projectPointOnSegment(lx, ly, p3.x, p3.y, p2.x, p2.y);
            const snappedWorld = this.transformToWorldSpace(snappedLocal.x, snappedLocal.y, tool);
            return { edge: 'hypotenuse', snappedPoint: snappedWorld };
        }
        
        return null;
    }
    
    /**
     * Check if a point is inside the tool area (not on edge)
     * Used to block drawing inside the tool
     */
    isPointInsideTool(x, y, tool) {
        const localPoint = this.transformToToolSpace(x, y, tool);
        
        if (tool.type === 'ruler') {
            return this.isPointInsideRuler(localPoint, tool);
        } else if (tool.type === 'setSquare') {
            return this.isPointInsideSetSquare(localPoint, tool);
        }
        return false;
    }
    
    isPointInsideRuler(localPoint, tool) {
        const { x: tx, y: ty, width, height } = tool;
        const margin = this.edgeTolerance; // Add margin for edge detection area
        return localPoint.x > tx + margin && 
               localPoint.x < tx + width - margin && 
               localPoint.y > ty + margin && 
               localPoint.y < ty + height - margin;
    }
    
    isPointInsideSetSquare(localPoint, tool) {
        const { x: tx, y: ty, width, height } = tool;
        const lx = localPoint.x;
        const ly = localPoint.y;
        
        // Triangle vertices
        const p1 = { x: tx, y: ty + height };           // Bottom-left
        const p2 = { x: tx + width, y: ty + height };   // Bottom-right
        const p3 = { x: tx, y: ty };                     // Top-left
        
        // Check if point is inside the triangle using barycentric coordinates
        // First check bounds
        if (lx < tx || lx > tx + width || ly < ty || ly > ty + height) {
            return false;
        }
        
        // Use sign of cross products to determine if point is inside
        const sign = (px, py, ax, ay, bx, by) => {
            return (px - bx) * (ay - by) - (ax - bx) * (py - by);
        };
        
        const d1 = sign(lx, ly, p1.x, p1.y, p2.x, p2.y);
        const d2 = sign(lx, ly, p2.x, p2.y, p3.x, p3.y);
        const d3 = sign(lx, ly, p3.x, p3.y, p1.x, p1.y);
        
        const hasNeg = (d1 < 0) || (d2 < 0) || (d3 < 0);
        const hasPos = (d1 > 0) || (d2 > 0) || (d3 > 0);
        
        const isInside = !(hasNeg && hasPos);
        
        // Add margin check - must be sufficiently inside (not just on edge)
        if (isInside) {
            const distToBottom = this.distanceToSegment(lx, ly, p1.x, p1.y, p2.x, p2.y);
            const distToLeft = this.distanceToSegment(lx, ly, p1.x, p1.y, p3.x, p3.y);
            const distToHypotenuse = this.distanceToSegment(lx, ly, p3.x, p3.y, p2.x, p2.y);
            
            // Only consider inside if away from all edges
            if (distToBottom > this.edgeTolerance && 
                distToLeft > this.edgeTolerance && 
                distToHypotenuse > this.edgeTolerance) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * Process a drawing point - either snap to edge or return original
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @returns {Object} - { x, y, snapped: boolean, blocked: boolean }
     */
    processDrawingPoint(x, y) {
        // Check if point should be snapped to any edge
        const edgeInfo = this.checkEdgeProximity(x, y);
        
        if (edgeInfo) {
            this.isSnappedToEdge = true;
            this.snappedTool = edgeInfo.tool;
            this.snappedEdge = edgeInfo.edge;
            return {
                x: edgeInfo.snappedPoint.x,
                y: edgeInfo.snappedPoint.y,
                snapped: true,
                blocked: false
            };
        }
        
        // Check if point is inside any tool (should be blocked)
        for (const tool of this.teachingToolsManager.tools) {
            if (this.isPointInsideTool(x, y, tool)) {
                // Point is inside tool - don't allow drawing
                return {
                    x: x,
                    y: y,
                    snapped: false,
                    blocked: true
                };
            }
        }
        
        // Not near any edge or inside any tool - normal drawing
        this.isSnappedToEdge = false;
        this.snappedTool = null;
        this.snappedEdge = null;
        return {
            x: x,
            y: y,
            snapped: false,
            blocked: false
        };
    }
    
    /**
     * Reset snapping state
     */
    resetSnapping() {
        this.isSnappedToEdge = false;
        this.snappedTool = null;
        this.snappedEdge = null;
    }
    
    // Helper: Transform point to tool's local coordinate space (accounting for rotation)
    transformToToolSpace(x, y, tool) {
        const centerX = tool.x + tool.width / 2;
        const centerY = tool.y + tool.height / 2;
        return this.rotatePoint(x, y, centerX, centerY, -tool.rotation);
    }
    
    // Helper: Transform point from tool's local space to world space
    transformToWorldSpace(x, y, tool) {
        const centerX = tool.x + tool.width / 2;
        const centerY = tool.y + tool.height / 2;
        return this.rotatePoint(x, y, centerX, centerY, tool.rotation);
    }
    
    // Helper: Rotate a point around a center
    rotatePoint(px, py, cx, cy, angle) {
        const radians = (angle * Math.PI) / 180;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        const nx = (cos * (px - cx)) - (sin * (py - cy)) + cx;
        const ny = (sin * (px - cx)) + (cos * (py - cy)) + cy;
        return { x: nx, y: ny };
    }
    
    // Helper: Calculate perpendicular distance from point to line segment
    distanceToSegment(px, py, x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const lengthSquared = dx * dx + dy * dy;
        
        if (lengthSquared === 0) {
            return Math.sqrt((px - x1) * (px - x1) + (py - y1) * (py - y1));
        }
        
        let t = ((px - x1) * dx + (py - y1) * dy) / lengthSquared;
        t = Math.max(0, Math.min(1, t));
        
        const closestX = x1 + t * dx;
        const closestY = y1 + t * dy;
        
        return Math.sqrt((px - closestX) * (px - closestX) + (py - closestY) * (py - closestY));
    }
    
    // Helper: Project a point onto a line segment
    projectPointOnSegment(px, py, x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const lengthSquared = dx * dx + dy * dy;
        
        if (lengthSquared === 0) {
            return { x: x1, y: y1 };
        }
        
        let t = ((px - x1) * dx + (py - y1) * dy) / lengthSquared;
        t = Math.max(0, Math.min(1, t));
        
        return {
            x: x1 + t * dx,
            y: y1 + t * dy
        };
    }
}

// Export for use
if (typeof window !== 'undefined') {
    window.EdgeDrawingManager = EdgeDrawingManager;
}

class RenderStyle {
	fillStyle;
	strokeStyle;
	lineWidth;

	hoverStyle;

	padding;
	borderRadius;

	with(pred) {
		pred(this);
		return this;
	}
}

class RenderNode extends Node {
	_onMouseMove;
	set onMouseMove(newOnMouseMove) { this._onMouseMove = newOnMouseMove; }
	get onMouseMove() { return (e, rect) => {
		if (this._onMouseMove) this._onMouseMove(e, rect);
		for (let child of this.getChildRects(rect)) {
			if (e.inBounds(child.rect))
				child.child.onMouseMove(e, child.rect);
			if (e.entered(child.rect))
				child.child.onMouseEnter(e, child.rect);
			if (e.exited(child.rect))
				child.child.onMouseExit(e, child.rect);
		}
	}}
	_onMouseEnter;
	set onMouseEnter(newOnMouseEnter) { this._onMouseEnter = newOnMouseEnter; }
	get onMouseEnter() { return (e, rect) => { if (this._onMouseEnter) this._onMouseEnter(e, rect); } }
	_onMouseExit;
	set onMouseExit(newOnMouseExit) {this._onMouseExit = newOnMouseExit; }
	get onMouseExit() { return (e, rect) => { if (this._onMouseExit) this._onMouseExit(e, rect); } }

	_onMouseDown;
	set onMouseDown(newOnMouseDown) { this._onMouseDown = newOnMouseDown; }
	get onMouseDown() { return (e, rect) => {
		if (this._onMouseDown) this._onMouseDown(e, rect);
		for (let child of this.getChildRects(rect)) {
			if (e.inBounds(child.rect))
				child.child.onMouseDown(e, child.rect);
		}
	}}
	_onMousePress;
	set onMousePress(newOnMousePress) { this._onMousePress = newOnMousePress; }
	get onMousePress() { return (e, rect) => this.propagateEvent(e, rect, "MousePress"); }
	_onMouseUp;
	set onMouseUp(newOnMouseUp) { this._onMouseUp = newOnMouseUp; }
	get onMouseUp() { return (e, rect) => this.propagateEvent(e, rect, "MouseUp"); }
	_onMouseRelease;
	set onMouseRelease(newOnMouseRelease) { this._onMouseRelease = newOnMouseRelease; }
	get onMouseRelease() { return (e, rect) => this.propagateEvent(e, rect, "MouseRelease"); }

	propagateEvent(e, rect, eventName) {
		if (this[`_on${eventName}`]) this[`_on${eventName}`](e, rect);
		for (let child of this.getChildRects(rect)) {
			if (e.inBounds(child.rect))
				child.child[`on${eventName}`](e, child.rect);
		}
	}

	constructor(id, children = [], style = new RenderStyle()) {
		super(id, children);
		this.style = style;
	}

	get fillStyle() { return this.style.fillStyle; }
	get strokeStyle() { return this.style.strokeStyle; }
	
	render(ctx, canvasRect) {
		this.renderSelf(ctx, canvasRect);
		this.renderChildren(ctx, canvasRect);
	}
	renderSelf(ctx, canvasRect) {
		let shouldFill = false;
		if (this.fillStyle) {
			ctx.fillStyle = this.fillStyle;
			shouldFill = true;
		}
		let shouldStroke = false;
		if (this.strokeStyle) {
			let weight = this.style.lineWidth || 1;
			ctx.lineWidth = weight;
			ctx.strokeStyle = this.strokeStyle;
			shouldStroke = true;
		}

		if (shouldFill || shouldStroke) {
			let rounding = this.style.borderRadius || 0;
			ctx.beginPath();
			ctx.roundRect(canvasRect.pos.x, canvasRect.pos.y, canvasRect.size.x, canvasRect.size.y, [rounding]);
			if (shouldFill) ctx.fill();
			if (shouldStroke) ctx.stroke();
		}
	}
	renderChildren(ctx, canvasRect) {
		for (let child of this.getChildRects(canvasRect)) {
			child.child.render(ctx, child.rect);
		}
	}

	getChildRects(canvasRect) {
		return this.children.map(c => { return { child: c, rect: canvasRect }; });
	}
}
class SplitPanelRenderNode extends RenderNode {
	static SPLIT_HORIZONTAL = 0;
	static SPLIT_VERTICAL = 1;

	constructor(id, firstChild, secondChild, splitType, splitAmt, style) {
		super(id, [firstChild, secondChild], style);

		this.splitType = splitType;
		this.splitAmt = splitAmt;
	}

	getChildRects(canvasRect) {
		let padding = this.style.padding || 0;
		return canvasRect.split(this.splitType, this.splitAmt, padding)
			.map((r, i) => { return { child: this.children[i], rect: r }; })
	}
}
class ButtonRenderNode extends RenderNode {
	constructor(id, style) {
		super(id, [], style);
		this.isHovered = false;

		this._onMouseMove = this.mouseMove;
		this._onMouseEnter = this.mouseEnter;
		this._onMouseExit = this.mouseExit;
	}

	get fillStyle() {
		return this.isHovered
			? this.style.hoverStyle
			: this.style.fillStyle;
	}

	mouseEnter(e) {
		this.isHovered = true;
	}
	mouseExit(e) {
		this.isHovered = false;
	}
}

class NodeMouseEvent {
	inBounds(rect) {
		return rect.inBounds(this.absPos);
	}
	entered(rect) {
		return this.inBounds(rect) && (!this.prev || !this.prev.inBounds(rect));
	}
	exited(rect) {
		return !this.inBounds(rect) && (this.prev && this.prev.inBounds(rect));
	}

	get pos() {
		return this.absPos.sub(this.rect.pos);
	}
	get absPos() {
		return new Point(this.event.offsetX, this.event.offsetY);
	}

	get buttons() { return this.event.buttons; }

	get altKey() { return this.event.altKey; }
	get ctrlKey() { return this.event.ctrlKey; }
	get metaKey() { return this.event.metaKey; }
	get shiftKey() { return this.event.shiftKey; }

	get leftDown() { return this.buttons & 1; }
	get rightDown() { return this.buttons & 2; }
	get middleDown() { return this.buttons & 4; }
	get backDown() { return this.buttons & 8; }
	get forwardDown() { return this.buttons & 16; }

	constructor(e, prev) {
		this.event = e;
		this.prev = prev;
	}
}

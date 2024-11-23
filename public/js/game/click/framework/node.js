class Node {
	id = '';
	parent;
	children = [];

	constructor(id, children = []) {
		this.id = id;

		for (let child of children) {
			this.addChild(child);
		}
	}

	tryFindChild(id) {
		if (this.id === id) return this;
		for (let child of this.children) {
			let found = child.tryFindChild(id);
			if (found) return found;
		}
		return undefined;
	}

	addChild(child) {
		this.children.push(child);
		child.parent = this;
	}
	removeChild(child) {
		this.children.removeItem(child);
		child.parent = undefined;
	}
	getAllChildren() {
		return this.children.flatMap(child => [child, ...child.getAllChildren()]);
	}
}

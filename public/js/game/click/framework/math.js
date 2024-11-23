class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	add(other) {
		return new Point(this.x + other.x, this.y + other.y);
	}
	sub(other) {
		return new Point(this.x - other.x, this.y - other.y);
	}
}
class Rectangle {
	constructor(pos, size) {
		this.pos = pos;
		this.size = size;
	}

	split(splitType, splitAmt, padding = 0) {
		return splitType === SplitPanelRenderNode.SPLIT_HORIZONTAL
			? [
				new Rectangle(this.pos, new Point(this.size.x, this.size.y * splitAmt)).pad(padding),
				new Rectangle(this.pos.add(new Point(0, this.size.y * splitAmt)), new Point(this.size.x, this.size.y * (1 - splitAmt))).pad(padding)
			]
			: [
				new Rectangle(this.pos, new Point(this.size.x * splitAmt, this.size.y)).pad(padding),
				new Rectangle(this.pos.add(new Point(this.size.x * splitAmt, 0)), new Point(this.size.x * (1 - splitAmt), this.size.y)).pad(padding)
			];
	}

	pad(padding) {
		return new Rectangle(
			this.pos.add(new Point(padding, padding)),
			this.size.add(new Point(-2 * padding, -2 * padding))
		);
	}

	inBounds(point) {
		return point && point.x >= this.pos.x && point.y >= this.pos.y && point.x < this.pos.x + this.size.x && point.y < this.pos.y + this.size.y;
	}
}

const __math_num_suffixes = [
    'm','b','t','qa','qi','sx','sp','oc','no','dc'
];

function beautifyNumber(n, d) {
    let strN = n.toString();
    if (strN.length <= 7) return commatizeNumber(n, d);
    let suffix = __math_num_suffixes[Math.floor((strN.length - 7) / 3)];
    let charLen = strN.length % 3;
    charLen = charLen === 0 ? 3 : charLen;
    let num = strN.substring(0, charLen);
    let dec = strN.substr(charLen, 3);
    dec = dec.replace(/0+$/, '');
    return `${num}${dec.length > 0 ? "." + dec : ""}${suffix}`;
}

function commatizeNumber(n, d) {
    let strN = n.toString().split("").reverse().join("");
    let dec;
    if (d) {
        dec = strN.substring(0, d).split("").reverse().join("");
        strN = strN.substring(d);
    }
    let str = '';
    for (let i = 0; i < strN.length; i++) {
        if (i > 0 && i % 3 === 0) str += ',';
        str += strN[i];
    }
    return str.split("").reverse().join("") + (d ? "." + dec : "");
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

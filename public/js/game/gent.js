const gent = {
    // globals
    origin: {x: 0, y: 0},
    rotation: 0,
    // enums
    SHAPE: gent._priv.createEnum({
        Circle: 0,
        Square: 1,
        Triangle: 2,
        Elipsis: 3,
        Rectangle: 4
    }),
    FILL_TYPE: gent._priv.createEnum({
        None: 0,
        Solid: 1,
        Gradient: 2,
        RadialLines: 3,
        ParallelLines: 4
    }),

    // utils
    degToRad: deg => (deg / 360) * (2 * Math.PI),
    radToDeg: rad => (rad / (2 * Math.PI)) * 360,
    rotatePos: pos => pos,

    // main
    drawObject: o => {
        let shape = o.shape;
        if (shape === undefined
            || !Number.isInteger(shape)
            || gent.SHAPE.properties[shape] === undefined)
            throw new Error("Invalid shape type: " + shape);
        
        switch (shape) {
            case 0: return drawCircleObject(o);
            case 1: return drawSquareObject(o);
            case 2: return drawTriangleObject(o);
            case 3: return drawElipsisObject(o);
            case 4: return drawRectangleObject(o); 
            default: throw new Error("Invalid shape type: " + shape);               
        }
    },
    drawCircleObject: o => {
        if (o.radius === undefined
            || o.colors === undefined
            || o.colors.stroke === undefined
            || o.origin === undefined)
            throw new Error("Invalid object, cannot draw");

        let origin = gent.rotatePos(o.origin);
    },

    // private
    _priv: {
        createEnum: vals => {
            let props = {};
            for (let key in vals) {
                if (!vals.hasOwnProperty(key)) continue;
                props[vals[key]] = {name: key, value: vals[key]}
            }
            vals.properties = props;
            return vals;
        }
    }
};
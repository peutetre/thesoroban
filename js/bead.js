/*
 * bead.js
 */

(function (win) {

    win.Bead = function (opts) {

        var max = opts.smallType ?  SMALL_HEIGHT : BIG_HEIGHT,
            top = opts.smallType ?  SMALL_TOP : BIG_TOP;

        this.max = max + top;
        this.id = opts.id;
        this.beadList = opts.beadList;
        this.position = opts.position;
        this.container = opts.container;
        this.touched = false;
        this.type = opts.smallType ? 1 : 4;
        this.maxMove = max - (this.type-this.position) * BEAD_HEIGHT;
        this.minMove = this.position * BEAD_HEIGHT;
        this.init = opts.smallType ? this.maxMove : this.minMove;
        this.startY = 0;
        this.currentY = 0;

        this.el = document.createElement("div");
        this.el.className = "bead";
        this.translate(this.init);

        on("touchstart", this.el, bind(this.onTouchStart, this), false);
        on("touchmove", this.el, bind(this.onTouchMove, this), false);
        on("touchend", this.el, bind(this.onTouchEnd, this), false);

        this.container.appendChild(this.el);
    };

    Bead.prototype.onTouchStart = function (evt) {
        prevent(evt);
        if (evt.targetTouches.length > 1) { return false; }
        if(this.isTheOnlyTouchedBead()) {
            this.touched = true;
            this.currentY = this.startY = evt.targetTouches[0].pageY;
        }
    };

    Bead.prototype.moveDirection = function (y) {
        var dir = (this.currentY - y) > 0;
        this.currentY = y;
        return dir;
    };

    Bead.prototype.isTheOnlyTouchedBead = function () {
        for (var i = 0; i< this.type; i++) {
            if (this.beadList[i].touched) {
                if (this.beadList[i].id != this.id) {
                    return false;
                }
            }
        }
        return true;
    };

    Bead.prototype.getNext = function () {
        return this.position+1 >= this.type
               ? null : this.beadList[this.position+1];
    };

    Bead.prototype.getPrevious = function () {
        return this.position-1 < 0 ? null : this.beadList[this.position-1];
    };

    Bead.prototype.translate = function (l) {
        this.el.style.webkitTransform = translate(-l);
        return l;
    };

    Bead.prototype.move = function (y) {
        return this.translate(
            y >= this.maxMove ? this.maxMove : (y <= this.minMove ? this.minMove : y)
        );
    };

    Bead.prototype.getUpGroup = function (y) {
        var group = [],
            next, l;
        group.push(this);
        for (var i = this.position; i < this.type; i++) {
            next = this.beadList[i].getNext();
            l = y + ( BEAD_HEIGHT * (i + 1 - this.position));
            if (next && next.init <= l) {
                group.push(next);
            }
            else {
                return group;
            }
        }
        return group;
    };

    Bead.prototype.getDownGroup = function (y) {
        var group = [],
            previous, l;
        group.push(this);
        for (var i = this.position; i >= 0; i--) {
            previous = this.beadList[i].getPrevious();
            l = y - (BEAD_HEIGHT * (this.position - i));
            if (previous && (previous.init + BEAD_HEIGHT) >= l) {
                group.push(previous);
            }
            else {
                return group;
            }
        }
        return group;
    };

    Bead.prototype.moveGroup = function (y, group, direction) {
        this.move(y);
        for(var i=1; i<group.length; i++) {
            group[i].init = group[i].move(y + direction * BEAD_HEIGHT * i);
        }
    };

    Bead.prototype.change = function (y, direction) {
        var upGroup = this.getUpGroup(y),
            downGroup = this.getDownGroup(y);

        if (upGroup.length > 1) {
            if (direction) {
                this.moveGroup(y, upGroup, 1);
            }
        }
        else if (downGroup.length > 1) {
            if (!direction) {
                this.moveGroup(y, downGroup, -1);
            }
        }
        else {
            this.move(y);
        }
    };

    Bead.prototype.onTouchMove = function (evt) {
        var y;
        prevent(evt);
        if (evt.targetTouches.length > 1) { return false; }
        if (this.touched) {
            y = evt.targetTouches[0].pageY;
            this.change(this.init + this.startY - y, this.moveDirection(y));
        }
    };

    Bead.prototype.onTouchEnd = function (evt) {
        prevent(evt);
        if(this.touched) {
            this.touched = false;
            this.init = this.max - this.el.getBoundingClientRect().bottom;
        }
    };

}(window));

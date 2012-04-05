/*
 * rod.js
 */

(function (win) {

    win.Rod = function (options) {
        this.id = options.id;
        this.length = options.nbr;
        this.pos = options.pos;
        this.container = options.container;
        this.el = null;
        this.beads = [];
        this.init();
    };

    win.Rod.prototype.init = function () {
        this.el = win.document.createElement("div");
        this.el.className = "rod";
        this.el.style.width = px(WIDTH);
        this.el.style.top = px(this.pos.line ? SMALL_TOP : BIG_TOP);
        this.el.style.height = px(this.pos.line ? SMALL_HEIGHT : BIG_HEIGHT);
        this.el.style.left = px(START + this.pos.row * DELTA);

        on("touchstart", this.el, prevent, false);
        on("touchmove", this.el, prevent, false);
        on("touchend", this.el, prevent, false);

        this.container.appendChild(this.el);

        for(var i=0; i<this.length; i++) {
            this.beads.push(new win.Bead({
                id : this.id + i,
                container : this.el,
                beadList : this.beads,
                position: i,
                smallType: this.length == 1
            }));
        }
    };
}(window));

/**
     * 构造函数的方式写轮播
     */
    function Slider() {
        this.ele = '';
        this.index = 0;
        this.timer = 0;
        this.duration = 5000;
        this.moveOfOnce = 0;
        this.length = 0;
        this.start = function () { // 首次开始
            let children = $(this.ele).children();
            if (!children || !children.length) {
                return
            } else {
                this.length = children.length;
            }

            this.moveOfOnce = 1 / this.length;
            this.play();
        };
        this.play = function () { // 轮播进行
            this.timer = setTimeout(() => {
                this.index = this.index >= this.length - 1 ? 0 : this.index + 1;
                // console.log('play after@ ', this.index);
                this.changeDom();
                this.play();

            }, this.duration);
        };
        this.pause = function () { // 暂停
            if (this.timer) {
                // console.log('pause@ ', this.index);
                clearTimeout(this.timer);
                this.timer = 0;
            }
        };
        this.prev = function () { // 上一张
            if (this.index > 0) {
                this.pause();
                this.index--;
                this.changeDom();
                this.play();
            }

        };
        this.next = function () { // 下一张
            if (this.index < this.length - 1) {
                this.pause();
                this.index++;
                this.changeDom();
                this.play();
            }

        };
        this.change = function (index) {
            if (index < 0 || index > this.length - 1) {
                console.warn('您指定的图片索引超出范围');
                return;
            }
            this.pause();
            this.index = index;
            this.changeDom();
            this.play();
        };
        this.stop = function () {
            clearTimeout(this.timer);
            this.timer = 0;
        };
        this.changeDom = function () {
            $(this.ele).css('transform', `translateX(-${this.moveOfOnce * this.index * 100}%)`);

            // 暴露给外面用的，可自定义每次轮播后需要执行的操作
            this.afterChange(this.index, this.length);
        };
    };
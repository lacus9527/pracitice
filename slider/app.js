;
(function () {
    const IMG_PATH = './images/';
    const list = [{
        id: 1,
        name: '1111',
        img: 'slider_1.jpg'
    }, {
        id: 2,
        name: '2222',
        img: 'slider_2.jpg'
    }, {
        id: 3,
        name: '3333',
        img: 'slider_3.jpg'
    }, {
        id: 4,
        name: '4444',
        img: 'slider_4.jpg'
    }, {
        id: 5,
        name: '5555',
        img: 'slider_5.jpg'
    }]

    renderList('.slider-list', list, function ($li, index) {
        let item = list[index];
        $li.find('.item-text').text(item.name);
        $li.find('.com-img').css('background-image', `url(${IMG_PATH +item.img})`)
    });

    const slider = new Slider();
    slider.ele = '#slider';
    slider.start();
    slider.afterChange = function (index, len) {
        $('.slider_index').text(index + 1);
    }

    $('.slider_left').click(function(){
        slider.prev();
    });
    $('.slider_right').click( function(){
        slider.next();
    });
    $('.slider-item').mouseover(function(){
        slider.pause();
    }).mouseout(function(){
        slider.play();
    });

    /**
     * 基于 jQuery 的渲染列表的方式
     */
    function renderList(ele, list, callback) {
        if (!ele || !list || !list.length) return;

        let $li = $($(ele).children()[0]);
        $(ele).children().remove();

        for (let i = 0; i < list.length; i++) {
            let _$li = $li.clone();
            callback && callback(_$li, i);

            $(ele).append(_$li);
        }

    }

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
})();
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

    /**
     * 调用轮播
     */
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

    
})();
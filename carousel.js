
var CraeteCarousel = (function(){
function Carousel($ctNode){
    this.init($ctNode);
    this.bind();
}
Carousel.prototype.init = function($node){
    this.ct = $node;
    this.imgCt = $node.children('.imgCt');
    this.imgList = this.imgCt.children('li');
    this.imgWidth = this.imgList.width();
    this.prevBtn = $node.children('.previous');
    this.nextBtn = $node.children('.next');
    this.point = $node.children('.directive').children('li');
    this.imgIndex = 0;
    this.isAnimate = false;
    this.imgCt.append(this.imgList.first().clone());
    this.imgCt.prepend(this.imgList.last().clone());
    this.imgCt.css('left',-this.imgWidth); 
};
Carousel.prototype.bind = function(){
    var _this = this;
    this.prevBtn.click(function(){
        _this.cutoverPrev();
    });
    this.nextBtn.click(function(){
        _this.cutoverNext();
    });
    this.point.click(function(){
        if($(this).index() > _this.imgIndex){
            _this.cutoverNext($(this).index() - _this.imgIndex);
        }else if($(this).index() < _this.imgIndex){
            _this.cutoverPrev(_this.imgIndex-$(this).index());
        }
    });
};
Carousel.prototype.cutoverPrev = function(n=1){
    var _this = this;
    if(this.isAnimate)
     return;
    this.isAnimate = true;
    this.imgIndex -= n;
    this.imgCt.animate({left: '+='+this.imgWidth*n},function(){
        if(_this.imgIndex < 0 ){
            _this.imgCt.css('left',(_this.imgList.length)* -_this.imgWidth);
            _this.imgIndex = _this.imgList.length -1;
            _this.setDirective();
            _this.isAnimate = false;
        }else{
            _this.imgCt.css('left',-_this.imgWidth*(_this.imgIndex+1));
            _this.setDirective();
            _this.isAnimate = false;
        }
    });
};
Carousel.prototype.cutoverNext = function(n=1){
    var _this = this;
    if(this.isAnimate)
    return;
    this.isAnimate = true;
    this.imgIndex += n;
    this.imgCt.animate({left: '+='+ -this.imgWidth*n},function(){
        if(_this.imgIndex === _this.imgList.length){
            _this.imgCt.css('left',-_this.imgWidth);
            _this.imgIndex = 0;
            _this.setDirective();
            _this.isAnimate = false;
        }else{
            _this.imgCt.css('left',-_this.imgWidth*(_this.imgIndex+1));
            _this.setDirective();
            _this.isAnimate = false;
        }
    });
};
Carousel.prototype.setDirective = function(){
    this.point.removeClass('active').eq(this.imgIndex).addClass('active');
};
    return {
        init:function($ct){
            $ct.each(function(){
                new Carousel($(this));
            });
        }
    };
})();
CraeteCarousel.init($('.carousel'));
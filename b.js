var $pre = $('.show .previous');
var $next = $('.show .next');
var $imgList = $('.carousel li');
var $len = $('.carousel li').length;
var $directive = $('.directive li');
var isAnimate = false;
var imgIndex = 0;

$imgList
    .css('display', 'none')
    .eq(0)
    .css('display', 'block');

$next.on('click', function () {
    cutover((imgIndex + 1) % $len);
});

$pre.on('click', function () {
    cutover((imgIndex - 1 + $len) % $len);
});

$directive.click(function () {
    var index = $(this).index();
    if (index === imgIndex) {
        return;
    }
    cutover(index);
});

function cutover(n) {
    if (isAnimate) 
        return;
    isAnimate = true;

    $imgList
        .eq(imgIndex)
        .fadeOut(500);
    $imgList
        .eq(n)
        .fadeIn(500, function () {
            isAnimate = false;
        });

    imgIndex = n;
    $directive
        .removeClass('active')
        .eq(imgIndex)
        .addClass('active');

}
setInterval(function () {
    cutover((imgIndex + 1) % $len);
}, 2000);
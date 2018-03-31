
var getElem=function (selector) {
    return document.querySelector(selector);
}
var getAllElem=function (selector) {
    return document.querySelectorAll(selector);
}
var getCls=function (element) {
    return element.getAttribute('class');
}
var setCls=function (element,cls) {
    return element.setAttribute('class',cls);
}
var addCls = function (element,cls) {
    var baseCls=getCls(element);
    if(baseCls.indexOf(cls)===-1){
        setCls(element,baseCls+' '+cls);
    }
}
var delCls = function (element,cls) {
    var baseCls=getCls(element);
    if(baseCls.indexOf(cls)!=-1){
        //                                          把一个以上的空格换成一个 正则
        setCls(element,baseCls.split(cls).join(' ').replace(/\s+/g,' '));
    }
}
var ScreenAnimateElements;
ScreenAnimateElements = {
    '.screen-1': [
        '.screen-1__heading',
        '.screen-1__phone',
        '.screen-1__shadow'
    ],
    '.screen-2': [
        '.screen-2__heading',
        '.screen-2__subheading',
        '.screen-2__phone',
        '.screen-2__point_i_1',
        '.screen-2__point_i_2',
        '.screen-2__point_i_3'
    ],
    '.screen-3': [
        '.screen-3__heading',
        '.screen-3__subheading',
        '.screen-3__phone',
        '.screen-3__features'
    ],
    '.screen-4': [
        '.screen-4__heading',
        '.screen-4__subheading',
        '.screen-4__type__item_i_1',
        '.screen-4__type__item_i_2',
        '.screen-4__type__item_i_3',
        '.screen-4__type__item_i_4'
    ],
    '.screen-5': [
        '.screen-5__heading',
        '.screen-5__subheading',
        '.screen-5__bg'
    ]
};

//设置屏内元素为初始状态
var setScreenAnimateInit=function (screenCls) {
    var screen=document.querySelector(screenCls); //获取当前屏的元素
    var animateElements=ScreenAnimateElements[screenCls]; //需要设置动画的元素
    for (var i=0;i<animateElements.length;i++){
        var element=document.querySelector(animateElements[i]);
        var baseCls =element.getAttribute('class');
        //如.screen-1__heading_animate_init  前面的 . 要去掉
        element.setAttribute('class',baseCls+' '+animateElements[i].substring(1)+'_animate_init');
    }
}

//设置播发屏内的元素动画
var playScreenAnimateDone=function (screenCls) {
    var screen=document.querySelector(screenCls); //获取当前屏的元素
    var animateElements=ScreenAnimateElements[screenCls]; //需要设置动画的元素
    for (var i=0;i<animateElements.length;i++){
        var element=document.querySelector(animateElements[i]);
        var baseCls =element.getAttribute('class');
        //如.screen-1__heading_animate_init  前面的 . 要去掉
        element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));
    }
}
//第一步 初始化所有样式init
window.onload =function () {
    // console.log('onload');
    for(var k in ScreenAnimateElements){
        //最后的优化 默认载入第一屏
        if(k==='.screen-1'){
            continue;
        }
        setScreenAnimateInit(k);
    }
}
//第二步 滚动到哪就播发哪
//顶部导航栏
var navItems=getAllElem('.header__nav-item');
//右边侧栏
var outLineItems=getAllElem('.outline-item');
var switchNavItrmActive=function (idx) {
    for(var i=0;i<navItems.length;i++){
        delCls(navItems[i],'header__nav-item_status_active');
    }
    addCls(navItems[idx],'header__nav-item_status_active');
    for(var i=0;i<outLineItems.length;i++){
        delCls(outLineItems[i],'outline-item_status_active');
    }
    addCls(outLineItems[idx],'outline-item_status_active');
}
switchNavItrmActive(0);
window.onscroll =function () {

    // window.alert("ok");
    //html有<!DOCTYPE html>声明时 document.body.scrollTop得不到高度
    var top=document.body.scrollTop+document.documentElement.scrollTop;//？
    // console.log("scrollTop="+top);
    // console.log("scrollTop2="+document.body.scrollTop);
    if(top>80){
        addCls(getElem('.header'),'header_status_black');
        addCls(getElem('.outline'),'outline_status_in');
    }else{
        delCls(getElem('.header'),'header_status_black');
        delCls(getElem('.outline'),'outline_status_in');
    }
    if(top>1){
        // console.log(".screen-1");
        playScreenAnimateDone('.screen-1');
        switchNavItrmActive(0);
    }
    if(top>800-100){
        playScreenAnimateDone('.screen-2');
        // console.log('.screen-2');
        switchNavItrmActive(1);
    }
    if(top>800*2-100){
        playScreenAnimateDone('.screen-3');
        // console.log('.screen-3');
        switchNavItrmActive(2);
    }
    if(top>800*3-100){
        playScreenAnimateDone('.screen-4');
        // console.log('.screen-4');
        switchNavItrmActive(3);
    }
    if(top>800*4-100){
        playScreenAnimateDone('.screen-5');
        // console.log('.screen-5');
        switchNavItrmActive(4);
    }
}
// 双向定位
var setNavJump=function (i,lib) {
    var item=lib[i];
    item.onclick=function () {
        console.log(i);
        $("body,html").animate({"scrollTop":800*i},1000)
    }
}
for(var i=0;i<navItems.length;i++){
    setNavJump(i,navItems);
}
for(var j=0;j<outLineItems.length;j++){
    setNavJump(j,outLineItems);
}
//滑动门特效
var navTip=getElem(".header__nav-item-tip");
var setTip=function (idx,lib) {
    lib[idx].onmouseover=function () {
        console.log(this,idx)
        navTip.style.left=(idx*70)+'px';
        }

    var activeIdx=0;
    lib[idx].onmouseout=function () {
        console.log(this, idx)
        for (var i = 0; i < lib.length; i++) {
            //鼠标移开是 滑动条 要返回activeItem处
            if (getCls(lib[i]).indexOf('header__nav-item_status_active') > -1) {
                activeIdx = i;
                break;
            }
        }
        //重置
        navTip.style.left=(activeIdx*70)+'px';
    }
}
for(var i=0;i<navItems.length;i++){
    setTip(i,navItems)
}

//默认载入第一屏 init在html已加入 延迟200ms播发动画
setTimeout(function () {
    playScreenAnimateDone('.screen-1');
},200)

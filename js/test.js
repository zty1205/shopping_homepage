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
function setScreenAnimated(screenCls) {
    var screen=document.querySelector(screenCls); //获取当前屏的元素
    // alert(screenCls);
    var animateElements=ScreenAnimateElements[screenCls]; //需要设置动画的元素

    var isSetAnimatedClass=false; //是否初始化子元素的样式
    var isSetAnimateDone=false; //当前屏幕下所有子元素的状态是D否是one
    screen.onclick = function () {

        //初始化样式，增加init
        if (isSetAnimatedClass===false){
            for (var i=0;i<animateElements.length;i++){
                var element=document.querySelector(animateElements[i]);
                var baseCls =element.getAttribute('class');
                //如.screen-1__heading_animate_init  前面的 . 要去掉
                element.setAttribute('class',baseCls+' '+animateElements[i].substring(1)+'_animate_init');
            }
            isSetAnimatedClass=true; //css样式初始化完成
            return ;
        }
        //切换所有 animateElements 的 init 到 done
        if(isSetAnimateDone===false){
            for (var i=0;i<animateElements.length;i++){
                var element=document.querySelector(animateElements[i]);
                var baseCls =element.getAttribute('class');
                //如.screen-1__heading_animate_init  前面的 . 要去掉
                element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));
            }
            isSetAnimateDone=true;
            return ;
        }
        //切换所有 animateElements 的 done 到 init
        if(isSetAnimateDone===true){
            for (var i=0;i<animateElements.length;i++){
                var element=document.querySelector(animateElements[i]);
                var baseCls =element.getAttribute('class');
                //如.screen-1__heading_animate_init  前面的 . 要去掉
                element.setAttribute('class',baseCls.replace('_animate_done','_animate_init'));
            }
            isSetAnimateDone=false;
            return ;
        }
    }
}

//加入动画
for(var k in ScreenAnimateElements){
    setScreenAnimated(k);
}


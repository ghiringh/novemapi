
$(function(){    
    $(".button").on("click", function(){
        $(".button").rotate({
            angle: 0,
            animateTo:360,
            duration:3000
        });
        setTimeout(function(){ 
            $(".button").animate({
                right: '-51%'
            },3000)
            $(".left").animate({
            left: '-51%'
            },3000)
            $(".right").animate({
                right: '-51%'
            },3000)
            setTimeout(function(){ 
                $(".button").fadeOut("fast")
            },2000);
        },2800);
        setTimeout(function(){
            $(".intro").fadeIn("slow");
        },4000);
    });

});

/*
const COLORS = {
    RED:      '#FD5061',
    YELLOW:   '#FFCEA5',
    BLACK:    '#29363B',
    WHITE:    'black',
    VINOUS:   '#A50710'
}

const DURATION = 800;

const showBase = new  mojs.Shape({
    fill:         'none',
    radius:       20,
    x:            { [-150]: 0,  easing: 'cubic.out' },
    y:            { [90]: 0, easing: 'cubic.out' },
    isForce3d:    true,
    // isShowEnd:    true,
    // isShowStart:  true,
    // isRefreshState: false,
    duration:     DURATION + 400
});

const circle = new mojs.Shape({
    fill: COLORS.WHITE,
    parent: showBase.el,
    radius: 50,
    scale: { .4: 1 },
    duration: 650,
    opacity: {.5: 0},
    delay: DURATION + 100,
    isForce3d: true,
    easing: 'cubic.out'
});

const showUp = new mojs.Shape({
    fill:             'none',
    stroke:           COLORS.WHITE,
    parent:           showBase.el,
    radius:           { 0: 10 },
    angle:            { 560: 270 },
    strokeWidth:      { 0: 22, easing: 'cubic.inout' },
    strokeDasharray:  '100%',
    strokeDashoffset: { '-100%' : '0%', easing: 'cubic.in' },
    strokeLinecap:    'round',
    duration:         DURATION,
})
    .then({
        scale: .75,
        duration: 250
    })
    .then({
        scale: 1,
        duration: 300
    });

const addButtonCross = new mojs.Shape({
    shape:          'cross',
    parent:         showUp.el,
    fill:           'none',
    stroke:         COLORS.VINOUS,
    radius:         6,
    strokeLinecap:  'round',
    isShowStart:    true,
    duration:       DURATION,
    angle:          { 0: -360 },
    scale:          { 0: 1 },
    y:              { 35: 0 },
    x:              { 35: 0 },
    isForce3d:      true,
}).then({
    angle: -540,
    duration: DURATION/2,
    // easing: 'cubic.out'
});

const timeline = new mojs.Timeline;

timeline.add( showBase, circle, showUp, addButtonCross );

timeline.play();

*/

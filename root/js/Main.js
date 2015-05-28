/**
 * Created by sav on 2015/5/28.
 */
(function(){

    var _p = window.Main = {};

    _p.init = function()
    {
        Index.init();


        $(window).bind("resize", onResize);
        onResize();
    };

    function onResize(event)
    {
        var width = $(window).width(),
            height = $(window).height();

        Index.onResize(width, height);
    }



}());
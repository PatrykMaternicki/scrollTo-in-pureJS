document.addEventListener('DOMContentLoaded', () => {scroller.init()});
  var notRun = false;
  var scroller = {
    findRelate: {},
    requestID: 0,
    frames: 20,
    animationFrame: 0,
    frameCounter: 0,
    watchedElements: [],
    notRun: false,
    isNotVisible: {
      button: ''
    },
    init: function () {
      this.startClickListener();
      this.watchButton();
    },

    startClickListener: function ( ){
      let element = document.querySelectorAll('.link');
      element.forEach(element => {
        this.setListener(element);
        }
      )
    },

    setListener: function (element) {
      element.addEventListener('click',el => this.startScroll(el) );
    },

    startScroll: function (element) {
      this.clickedElement = element;
      element.preventDefault();
      this.findRelate = document.getElementById(element.target.dataset.href);
      this.calculateScrollFrame();
      if (this.findRelate.getBoundingClientRect().top == 0 ){
        return;
      }
      this.scroll();
    },

    scroll: function() {
          if (this.frameCounter == 20){
            this.frameCounter = 0;
            return;
          }
        window.scroll(0,window.scrollY + this.animationFrame);
      this.frameCounter ++;
      window.requestAnimationFrame(() => this.scroll());
    },

    calculateScrollFrame: function() {
      this.animationFrame = this.findRelate.getBoundingClientRect().top/this.frames;
    },

    watchButton: function(){
      window.addEventListener('scroll', ()=> this.watchDownButton());
      window.addEventListener('scroll', ()=> this.watchUpButton());
    },

    watchDownButton: function (){
    let rectTop = document.getElementById('m_fotos').getBoundingClientRect()
                    .top;
      if (rectTop < 30) {
        this.hideButton('hide-down')
      }
      else
      this.showButton('hide-down');
    },

    watchUpButton: function (){
    let rectTop = document.getElementById('m_naglowek').getBoundingClientRect()
                    .top;
    if (rectTop > -5) {
      this.hideButton('hide-up');
      return;
    }
    else
    this.showButton('hide-up');
  },

    hideButton: function (id) {
      document.getElementById(id).style.visibility = 'hidden';
    },

    showButton: function(id) {
      document.getElementById(id).style.visibility = '';
    },
  }
    $(document).ready(function () {

        select_car_pic('<?php echo $raport[0]['nr_karty'];?>');

        /**
         * This part does the "fixed navigation after scroll" functionality
         * We use the jQuery function scroll() to recalculate our variables as the
         * page is scrolled/
         */
        $(window).scroll(function () {
            var window_top = $(window).scrollTop() + 12; // the "12" should equal the margin-top value for nav.stick
            var div_top = $('#nav-anchor').offset().top;
            if (window_top > div_top) {
                $('nav').addClass('stick');
            } else {
                $('nav').removeClass('stick');
            }
        });
        var $sec = $("section");
        $(".next").click( function (e) {
          e.preventDefault();
          var y = $sec.filter(function (i, el) {
              return el.getBoundingClientRect().bottom > 0;
          })[$(this).hasClass("next") ? "next" : "prev"]("section").offset().top;
          $("html, body").stop().animate({scrollTop:y+5});
          });

        $(".prev").click(function (e) {
          e.preventDefault();
          var y = $sec.filter(function (i, el) {
                return el.getBoundingClientRect().bottom > 0;
          })[$(this).hasClass("next") ? "next" : "prev"]("section").offset().top;
          $("html, body").stop().animate(
            {
              scrollTop:y+5,
            });
        });
        var aChildren = $("nav li").children(); // find the a children of the list items
        var aArray = []; // create the empty aArray
        for (var i = 0; i < aChildren.length; i++) {
            var aChild = aChildren[i];
            var ahref = $(aChild).attr('href');
            aArray.push(ahref);
        } // this for loop fills the aArray with attribute href values

        $(window).scroll(function () {
            var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
            var windowHeight = $(window).height(); // get the height of the window
            var docHeight = $(document).height();

            for (var i = 0; i < aArray.length; i++) {
                var theID = aArray[i];
                var divPos = $(theID).offset().top; // get the offset of the div from the top of page
                var divHeight = $(theID).height(); // get the height of the div in question
                if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
                    $("a[href='" + theID + "']").addClass("nav-active");
                } else {
                    $("a[href='" + theID + "']").removeClass("nav-active");
                }
            }

            if (windowPos + windowHeight == docHeight) {
                if (!$("nav li:last-child a").hasClass("nav-active")) {
                    var navActiveCurrent = $(".nav-active").attr("href");
                    $("a[href='" + navActiveCurrent + "']").removeClass("nav-active");
                    $("nav li:last-child a").addClass("nav-active");
                }
            }
        });

    })

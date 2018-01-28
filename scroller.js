var scroller = {
    findRelate: {},
    requestID: 0,
    frames: 20,
    animationFrame: 0,
    frameCounter: 0,
    init: function () {
      this.startClickListener()
    },

    startClickListener: function ( ){
      let element = document.querySelectorAll('.link');
      element.forEach((element) => this.setListener(element))
    },

    setListener: function (element) {
      element.addEventListener('click',(el) => this.startScroll(el))
    },

    startScroll: function (element) {
      this.clickedElement = element;
      element.preventDefault();
      this.findRelate = document.getElementById(element.target.dataset.href);
      this.calculateScrollFrame();
      if (this.findRelate.getBoundingClientRect().top == 0 ){
      return;
      }
       if (this.findRelate.getBoundingClientRect().top < 0) {
      this.scroll('up');
      }
      else {
      this.scroll('down');
       }
    },

    scroll: function(req) {
          if (this.frameCounter == 20){
            this.frameCounter = 0;
            return;
          }
        window.scroll(0,window.scrollY + this.animationFrame);
      this.frameCounter ++;
      window.requestAnimationFrame(() => this.scroll(req));
    },

    calculateScrollFrame: function() {
      this.animationFrame  = this.findRelate.getBoundingClientRect().top/this.frames;
    }
  }



var SplitTextsHelper = {
  splitsHoverIn : {},
  splitsHoverOut : {},
  splitsBarMasked : {},
  splitsLetttersBarMasked : {},
  splitsMasked : {},



  /*initBarMaskedText : function(scope, animated){
    var mySplit = new SplitText(scope, {type : "lines", position : "absolute"});

    var pseudoguid = new Date().getTime();
    scope.attr("pseudo-id", pseudoguid);
    this.splitsBarMasked[pseudoguid] = mySplit;

    var color = $(scope).css("color");
    for(var i = 0; i < mySplit.lines.length; i++){
      var w = $(mySplit.lines[i]).width()+6;
      var h = $(mySplit.lines[i]).height()+4;
      var t = $(mySplit.lines[i]).css("top");
      var l = $(mySplit.lines[i]).css("left");
      var mc = $("<div style='transform-origin : 0% 0%; -webkit-transform-origin : 0% 0%; transform : translateY("+(h/2)+"px); width : "+w+"px; height : 5px; top : "+t+"; left : "+l+"; position:absolute; background : "+color+"'></div>");
      $(mySplit.lines[i]).hide();
      scope.append(mc);

      //TweenMax.set($(mySplit.lines[i]), {clip : "rect(0px 0px "+h+"px 0px)"});
    }


    if(animated){
      this.animateMaskedText(scope);
    }
  },*/


  resetAll : function(){
    this.resetArray(this.splitsHoverIn);
    this.resetArray(this.splitsHoverOut);
    this.resetArray(this.splitsBarMasked);
    this.resetArray(this.splitsLetttersBarMasked);
    this.resetArray(this.splitsMasked);
  },

  resetArray : function(arr){
    if(!arr) return;

    for(var s in arr){
      if(arr[s]){

        if(arr[s].lines){
          TweenMax.killTweensOf(arr[s].lines);
        }else if(arr[s].chars){
          TweenMax.killTweensOf(arr[s].chars);
        }

        arr[s].revert();
      }
    }
  },



  initBarMaskedText : function(scope, animated){
    var mySplit = new SplitText(scope, {type : "lines", position : "absolute"});

    var pseudoguid = new Date().getTime();
    scope.attr("pseudo-id", pseudoguid);
    this.splitsBarMasked[pseudoguid] = mySplit;

    var color = $(scope).css("color");
    for(var i = 0; i < mySplit.lines.length; i++){
      var w = $(mySplit.lines[i]).width()+6;
      var h = $(mySplit.lines[i]).height()+4;
      var t = $(mySplit.lines[i]).css("top");
      var l = $(mySplit.lines[i]).css("left");
      var mc = $("<div style='transform-origin : 0% 0%; -webkit-transform-origin : 0% 0%; width : "+w+"px; height : "+h+"px; top : "+t+"; left : "+l+"; position:absolute; background : "+color+"'></div>");
      $(mySplit.lines[i]).hide();
      scope.append(mc);
      mc.hide();
    }


    if(animated){
      this.animateMaskedText(scope);
    }
  },


  destroyBarMaskedText : function(scope){
    var guid = scope.attr("pseudo-id");
    var splitLines = this.splitsBarMasked[guid];
    var charSplit;

    if(!splitLines) return;

    for(var i = splitLines.lines.length-1; i >= 0; i--){
      TweenMax.killTweensOf(splitLines.lines[i]);
      TweenMax.killTweensOf($(scope.children()[splitLines.lines.length+i]));
      charSplit = this.splitsLetttersBarMasked[guid + "_" + i];
      if(charSplit == null) continue;

      charSplit.revert();
      $(scope.children()[splitLines.lines.length+i]).remove();
      delete this.splitsLetttersBarMasked[guid + "_" + i];
    }

    scope.removeAttr('pseudo-id');
    splitLines.revert();
    delete this.splitsBarMasked[guid];
  },

/*
  showElement : function(el){
    el.show();
  },



  */

  animateBarMaskedText : function(scope, generalDelay, offset, fast){
    var guid = $(scope)[0].getAttribute("pseudo-id");
    generalDelay = generalDelay || 0;
    offset = offset || -90;
    var split = SplitTextsHelper.splitsBarMasked[guid];
    var bar;
    var txtLine;
    var w;
    for(var i = 0; i < split.lines.length; i++){
      txtLine = $(split.lines[i]);
      txtLine.hide();
      bar = $(scope.children()[i+split.lines.length]);

      bar.show();
      w = bar.width();
      TweenMax.set(bar, {scaleX : 0, x: offset});
      TweenMax.to(bar, 0.5, {scaleX : 1, x : 0, ease : Expo.easeIn, delay:generalDelay+(i*0.2)});
      TweenMax.to(bar, 0.5, {scaleX : 0, x : w, ease : Expo.easeOut, delay:generalDelay+(i*0.2)+0.5, onStart:this.showElement, onStartParams:[txtLine, fast]});
    }
  },

  showElement : function(scope,fast){
    if(!scope) return;

    scope.show();
    var w = scope.width()+12;
    var h = scope.height();
    var guid = $(scope).parent().attr("pseudo-id");

    if(!SplitTextsHelper.splitsBarMasked[guid]) return;
    if(!SplitTextsHelper.splitsBarMasked[guid].lines) return;
    var linesSplit = SplitTextsHelper.splitsBarMasked[guid].lines;
    var charSplit;

    scope.width(w);
    charSplit = new SplitText(scope, {type : "chars", position : "relative"});
    TweenMax.staggerFrom(charSplit.chars.reverse(), 0.3, {x : -60, alpha : 0, ease : Expo.easeInOut}, (fast)? 0.005 : 0.04);

    SplitTextsHelper.splitsLetttersBarMasked[guid + "_" + scope.index()] = charSplit;
  },




  initMaskedLinesText : function(scope, animated){
    var mySplit = new SplitText(scope, {type : "lines", position : "absolute"});

    var pseudoguid = new Date().getTime();
    scope.attr("pseudo-id", pseudoguid);
    this.splitsMasked[pseudoguid] = mySplit;

    var color = $(scope).css("color");
    for(var i = 0; i < mySplit.lines.length; i++){
      var mc = $(mySplit.lines[i]);

      var w = parseInt(scope.width()+4);
      var h = parseInt(mc.height()+4);
      var t = parseInt(mc.css("top"));
      var l = parseInt(mc.css("left"));

    //  $(mySplit.lines[i]).hide();

      TweenMax.set(mc, {clip : "rect(0px 0px "+h+"px 0px)"})
    }


    if(animated){
      this.animateMaskedText(scope);
    }
  },

  destroyMaskedLinesText : function(scope){
    var guid = $(scope)[0].getAttribute("pseudo-id");
    scope.removeAttr("pseudo-id");
    TweenMax.killChildTweensOf(scope);

    var split = SplitTextsHelper.splitsMasked[guid];
    if(!split) return;

    split.revert();
    delete SplitTextsHelper.splitsMasked[guid];
  },


  animateMaskLineText : function(scope, generalDelay, offset, time){
    var guid = $(scope)[0].getAttribute("pseudo-id");
    generalDelay = generalDelay || 0;
    offset = offset || -90;
    time = time || 1;
    var split = SplitTextsHelper.splitsMasked[guid];
    var txtLine;
    var w;
    var h;

    for(var i = 0; i < split.lines.length; i++){
      txtLine = $(split.lines[i]);
      txtLine.width(scope.width());
      txtLine.show();
      w = scope.width();
      h = txtLine.height();
      TweenMax.killTweensOf(txtLine);
      TweenMax.set(txtLine, {clip : "rect(0px 0px "+h+"px 0px)"});
      TweenMax.to(txtLine, time, {clip : "rect(0px "+w+"px "+h+"px 0px)", ease : Expo.easeInOut, delay:generalDelay+(i*(time/10))});
    }
  },


  initMainMenuHover : function(scope){
    if(!scope.length) return;
    var txt = scope.text();

    scope.html("");
    var span1 = scope.append("<span>"+txt+"</span>");
    var span2 = scope.append("<span>"+txt+"</span>");

    // var mySplit = new SplitText(scope.find("span")[0], {type : "chars", position : "relative"});
    var mySplit2 = new SplitText(scope.find("span")[1], {type : "chars", position : "relative"});
    var pseudoguid = new Date().getTime();
    scope.attr("pseudo-id", pseudoguid);

    var el2 = $(scope.find("span")[1]);
    el2.css("overflow", "hidden");
    TweenMax.set(el2, {width : 0, opacity : 0, x : -10});
    TweenMax.set(mySplit2.chars, {x : 40, opacity : 0});

    if(window.mobileDetect.touch()){
      scope.on('touchstart', this.onOverButton);
      scope.on('touchend touchcancel touchleave', this.onOutButton);
    }else{
      scope.hover(this.onOverButton, this.onOutButton);
      scope.on('mouseup', this.onOutButton);
    }


    // this.splitsHoverIn[pseudoguid] = mySplit;
    this.splitsHoverOut[pseudoguid] = mySplit2;
  },


  destroyGradientButton : function(scope){
    scope.unbind('mouseenter').unbind('mouseleave');
    scope.unbind('mouseenter mouseleave mouseup');
    scope.unbind('touchstart');
    scope.unbind('touchend touchcancel touchleave');
    var guid = scope.attr("pseudo-id");
    scope.removeAttr("pseudo-id");

    if(!SplitTextsHelper.splitsHoverIn[guid]) return;

    scope.find("span").last().remove();

    SplitTextsHelper.splitsHoverIn[guid].revert();
    SplitTextsHelper.splitsHoverOut[guid].revert();

    delete SplitTextsHelper.splitsHoverIn[guid];
    delete SplitTextsHelper.splitsHoverOut[guid];
  },


  onOverButton : function(evt){
    var guid = evt.currentTarget.getAttribute("pseudo-id");
    // var split = SplitTextsHelper.splitsHoverIn[guid];
    var el2 = $($(evt.currentTarget).find("span")[1]);
    var el1 = $($(evt.currentTarget).find("span")[0]);
    var splitOut = SplitTextsHelper.splitsHoverOut[guid];

    TweenMax.to(el2, 0.5, {width : el1.width()+Math.ceil($(window).height()*0.01), opacity:1, x : 0, ease : Expo.easeOut});
    TweenMax.set(el2, {height : el1.height()});

    //if(evt.clientX != undefined)
    TweenMax.killTweensOf(splitOut.chars);
    TweenMax.staggerFromTo(splitOut.chars, 0.5, {x : 30, opacity : 0}, {x : 0, opacity:1, ease : Quad.easeInOut}, 0.015);

    //TweenMax.staggerTo(splitOut.chars, 0.5, {y:0, autoAlpha:1, ease : Expo.easeInOut}, 0.01);
    //TweenMax.to($(splitOut.chars[0]).parent(), 0.5, {opacity : 1});
  },

  onOutButton : function(evt){
    if($(evt.currentTarget).hasClass("selected") && evt.clientX != undefined){
      return;
    }
    if(evt.type != 'mouseleave'){
      $(evt.currentTarget).blur();
      $("body").trigger("click");
      $(evt.currentTarget).trigger('mouseleave');
    }
    var el1 = $($(evt.currentTarget).find("span")[0]);
    var el2 = $($(evt.currentTarget).find("span")[1]);
    TweenMax.to(el2, 0.5, {width : 0, opacity:0, x : -10, ease : Expo.easeOut});
    var guid = evt.currentTarget.getAttribute("pseudo-id");
    // var split = SplitTextsHelper.splitsHoverIn[guid];
    var splitOut = SplitTextsHelper.splitsHoverOut[guid];
    TweenMax.staggerTo(splitOut.chars, 0.5, {x : -30, opacity:0, ease : Quad.easeInOut}, 0.015);
  }

};

module.exports = SplitTextsHelper;

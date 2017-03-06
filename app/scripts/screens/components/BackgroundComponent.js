var React = require('react');
var ContentProvider = require('../../providers/ContentProvider');
var ReactDOM = require('react-dom');
var NumberHelper = require('../../helpers/NumberHelper');


var BackgroundComponent = React.createClass({

  $interval : null,
  $currentElement : null,
  $lastZIndex : -1,
  canInvertColors : true,


  getInitialState : function(){
    return {
      isContactOrAbout : (this.props.location != "/" && this.props.location.indexOf("portfolio") === -1)
    }
  },

  componentDidMount : function(){
    this.$currentElement = NumberHelper.getRandomArbitrary(0,ContentProvider.homeCovers.length-1);
    this.$lastZIndex = ContentProvider.homeCovers.length;
    var container = ReactDOM.findDOMNode(this.refs.backgroundcontainer);
    TweenMax.fromTo(container, 0.5, {opacity : 0}, {opacity : 1, ease : Linear.easeNone});

    $(container).find("div.image-item").hide();
    $($(container).find("div.image-item")[this.$currentElement]).show();
    $(ReactDOM.findDOMNode(this.refs.whitelayer)).css("z-index", this.$lastZIndex+1);
    this.$interval = setInterval(this.showNextBackground,5000);

    this.showNextBackground(true);

    var whitelayer = $(ReactDOM.findDOMNode(this.refs.whitelayer));
    if(this.state.isContactOrAbout){
      TweenMax.to(whitelayer, 1, {opacity : 1, ease : Linear.easeNone});
      this.canInvertColors = false;
      this.checkInvertColors();
    }else{
      TweenMax.to(whitelayer, 1, {opacity : 0, ease : Linear.easeNone});
      this.canInvertColors = true;
      this.checkInvertColors();
    }
  },

  componentWillReceiveProps : function(nextProps){
    if(nextProps.location != "/" && nextProps.location.indexOf("portfolio") === -1){
      this.setState({isContactOrAbout : true});
    }else{
      this.setState({isContactOrAbout:false});
    }
  },

  componentDidUpdate : function(prevProps, prevState){
    var whitelayer = $(ReactDOM.findDOMNode(this.refs.whitelayer));

    if(this.props.location != "/" && this.props.location.indexOf("portfolio") === -1){
      TweenMax.to(whitelayer, 1, {opacity : 1, ease : Linear.easeNone});
      this.canInvertColors = false;
      this.checkInvertColors();
    }else{
      TweenMax.to(whitelayer, 1, {opacity : 0, ease : Linear.easeNone});
      this.canInvertColors = true;
      this.checkInvertColors();
    }

    if(this.props.location.indexOf("portfolio") > -1){
      clearInterval(this.$interval);
      this.$interval = null;
    }else{
      if(this.$interval == null){
        this.$interval = setInterval(this.showNextBackground,5000);
        TweenMax.fromTo(ReactDOM.findDOMNode(this.refs.backgroundcontainer), 1, {opacity : 0}, {opacity : 1});
      }
    }
  },

  // componentWillReceiveProps : function(nextProps){
  //   this.setState({
  //     isContactOrAbout : nextProps.isContactOrAbout
  //   });
  // },
  checkInvertColors : function(){
    var inverted = ContentProvider.homeCovers[this.$currentElement].isCoverInvertedColor;
    if(this.props.location.indexOf("portfolio") > -1) return;
    
    if(this.canInvertColors){
      if(inverted){
        $("#app").addClass("white");
      }else{
        $("#app").removeClass("white");
      }
    }else{
      $("#app").removeClass("white");
    }

    // console.log("CHECK INVERT" + " " + this.props.location.indexOf("portfolio"));
    // if(this.props.location.indexOf("portfolio") > -1){
    //   $("#app").addClass("white");
    // }
  },
  showNextBackground : function(force){

    if(!force){
      this.$currentElement++;
      if(this.$currentElement > ContentProvider.homeCovers.length -1){
        this.$currentElement = 0;
      }
    }

    var container = $(ReactDOM.findDOMNode(this.refs.backgroundcontainer));
    var el = $(container.find("div.image-item")[this.$currentElement]);



    this.checkInvertColors();

    if(this.$currentElement === 0){
      el.css("z-index", this.$lastZIndex);

      var self = this;
      container.find("div.image-item").each(function(id,el){
        if(id > self.$currentElement){
          TweenMax.killTweensOf($(this));
          TweenMax.set($(this), {opacity : 0});
        }
      });
    }
    else{
      $(container.find("div.image-item")).each(function(id,el){
        $(this).css("z-index",id);
      });
    }

    el.show();
    TweenMax.fromTo(el, 1, {opacity : 0}, {opacity : 1, ease : Linear.easeNone});

    if(this.props.onUpdateBackground){
      this.props.onUpdateBackground(ContentProvider.homeCovers[this.$currentElement].color);
    }
  },

  render : function(){

    var backgrounds = ContentProvider.homeCovers.map(function(item,i){
      return <div className="image-item" key={"bg" + i.toString()} style={{'backgroundImage' : 'url('+item.file+')'}}></div>
    });

    return (
      <div className='background-container' ref="backgroundcontainer">
        <div className="backgrounds">
        {backgrounds}
        </div>
        <div className="white-layer" ref="whitelayer" style={{opacity:0}}></div>
      </div>
    )
  }
});


module.exports = BackgroundComponent;

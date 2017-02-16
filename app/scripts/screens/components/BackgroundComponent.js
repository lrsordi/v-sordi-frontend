var React = require('react');
var ContentProvider = require('../../providers/ContentProvider');
var ReactDOM = require('react-dom');
var NumberHelper = require('../../helpers/NumberHelper');


var BackgroundComponent = React.createClass({

  $interval : null,
  $currentElement : null,
  $lastZIndex : -1,


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
    }else{
      TweenMax.to(whitelayer, 1, {opacity : 0, ease : Linear.easeNone});
    }
  },

  componentWillReceiveProps : function(nextProps){
    console.log(nextProps);
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
    }else{
      TweenMax.to(whitelayer, 1, {opacity : 0, ease : Linear.easeNone});
    }

    if(this.props.location != "/" && this.props.location.indexOf("portfolio") === -1){
      clearInterval(this.$interval);
      this.$interval = null;
    }else{
      if(this.$interval == null){
        this.$interval = setInterval(this.showNextBackground,5000);
      }
    }
  },

  componentWillReceiveProps : function(nextProps){
    this.setState({
      isContactOrAbout : nextProps.isContactOrAbout
    });
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

    if(this.$currentElement === 0)
      el.css("z-index", this.$lastZIndex);
    else
      $(container.find("div.image-item")[0]).css("z-index","");

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

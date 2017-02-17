var React = require('react');
var ContentProvider = require('../../providers/ContentProvider');
var ReactDOM = require('react-dom');

var PhotoItemComponent = React.createClass({

  getInitialState : function(){

    return {
      fileurl : this.props.fileurl
    }
  },

  setPercentage : function(percent){
    TweenMax.to(ReactDOM.findDOMNode(this.refs.percentage), 0.3, {scaleX : percent, ease : Quint.easeOut});
  },

  setComplete : function(img){
    $(ReactDOM.findDOMNode(this.refs.photoreal)).css("background-image", "url('"+img+"')");
    TweenMax.to($(ReactDOM.findDOMNode(this.refs.photoreal)), 1, {opacity : 1});
  },

  render : function(){
    return (
      <div className="photo-item" style={{backgroundImage : "url('"+this.state.fileurl+"')"}}>
        <div className="bar"><div className="percentage" ref="percentage"></div></div>
        <div className="photo-real" ref="photoreal"></div>
      </div>
    )
  }
});

module.exports = PhotoItemComponent;

var React = require('react');
var ContentProvider = require('../../providers/ContentProvider');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;
var SplitTextsHelper = require('../../helpers/SplitTextsHelper');

var MenuComponent = React.createClass({


  getInitialState: function() {
    return {
      isInternalMenu : (this.props.location.indexOf("portfolio") > -1) || false,
      location : this.props.location || "/"
    }
  },


  setColor : function(color){
    var column = $(ReactDOM.findDOMNode(this.refs.leftcolumn));
    column.find("svg path").css("fill", color);
    column.find("li a").css("color", color);
    column.find("li.spacer").css("background", color);
  },


  componentWillReceiveProps : function(nextProps){
    var last = this.state.isInternalMenu;
    var next = (nextProps.location.indexOf("portfolio") > -1);
    this.setState(
      {
        isInternalMenu : next,
        location : nextProps.location
      });


    if(next && !last)
      this.showInternalMenu();
    else if(!next && last)
      this.hideInternalMenu();


      var column = $(ReactDOM.findDOMNode(this.refs.leftcolumn));

      $(column).find("li a").each(function(el){
        if(nextProps.location == $(this).attr("href")){
          $(this).trigger("mouseover");
        }else{
          $(this).trigger("mouseout");
        }
      });

      var navInternal = $(ReactDOM.findDOMNode(this.refs.internalmenu));
      var self = this;
      $(navInternal).find("li a").each(function(index,el){
        if(nextProps.location.indexOf(ContentProvider.categories[index].slug) > -1){
          $(this).trigger("mouseover");
        }else{
          $(this).trigger("mouseout");
        }
      });

  },


  selectFirstLink : function(){
    var column = $(ReactDOM.findDOMNode(this.refs.leftcolumn));
    var self = this;
    $(column).find("li a").each(function(el){
      if(self.state.location == $(this).attr("href")){
        $(this).trigger("mouseover");
      }else{
        $(this).trigger("mouseout");
      }
    });

    var navInternal = $(ReactDOM.findDOMNode(this.refs.internalmenu));
    $(navInternal).find("li a").each(function(index,el){
      if(self.state.location.indexOf(ContentProvider.categories[index].slug) > -1){
        $(this).trigger("mouseover");
      }else{
        $(this).trigger("mouseout");
      }
    });
  },

  showInternalMenu : function(){
    var column = $(ReactDOM.findDOMNode(this.refs.leftcolumn));
    TweenMax.to(column, 1, {y : "0%", top : "6vh", ease : Quint.easeInOut});

    var navInternal = $(ReactDOM.findDOMNode(this.refs.internalmenu));
    TweenMax.staggerFromTo(navInternal.find("li"), 1, {x : 30, opacity : 0, delay:1}, {x : 0, opacity : 1, ease : Expo.easeInOut, onComplete:this.selectFirstLink},0.1);

    TweenMax.fromTo($(ReactDOM.findDOMNode(this.refs.back)), 1, {y : 50, opacity :0}, {y : 0, opacity : 1, ease : Expo.easeInOut});
  },

  hideInternalMenu : function(){
    var column = $(ReactDOM.findDOMNode(this.refs.leftcolumn));
    TweenMax.to(column, 1.5, {y : "-50%", top : "46vh", ease : Quint.easeInOut});
    TweenMax.staggerFromTo($(column).find("li"), 1, {y : 50, opacity : 0, delay:0.5}, {y : 0, opacity : 1, ease : Expo.easeInOut, onComplete:this.selectFirstLink},0.1);
  },


  componentDidMount : function(){
    var column = ReactDOM.findDOMNode(this.refs.leftcolumn);

    if(!this.state.isInternalMenu){
      this.hideInternalMenu();
    }else{
      this.showInternalMenu();
    }

    var self = this;
    $(column).find("li a").each(function(el){
        SplitTextsHelper.initMainMenuHover($(this));
    });

    var navInternal = $(ReactDOM.findDOMNode(this.refs.internalmenu));
    $(navInternal).find("li a").each(function(el){
        SplitTextsHelper.initMainMenuHover($(this));
    });

    SplitTextsHelper.initMainMenuHover($(ReactDOM.findDOMNode(this.refs.back)));
  },

  render : function(){
    var self = this;
    var categories = ContentProvider.categories.map(function(evt,item){
      return <li key={'subcategory' + item.toString()}><Link to={"/portfolio/"+evt.slug} className={self.state.location.indexOf(evt.slug) > -1 ? "selected" : null}>{ContentProvider.getCategoryTranslatedName(evt)}</Link></li>;
    });



    return (
      <div className="main-menu">
        <div className="left-column" ref="leftcolumn">
          <Link to="/">
            <h1>
            Valéria Sordi Photography
              <svg id="logo-preloader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1099.48 278.1">
                <path d="M175.47,500.9h3.92v6a26,26,0,0,1,2.49-2.88,24,24,0,1,1,0,34,26.21,26.21,0,0,1-2.49-2.88v25.1h-3.92V500.9h0Zm3.92,16v8.22a19.76,19.76,0,1,0,0-8.22h0Zm97.25-43.06h3.92v29.24a17.05,17.05,0,0,1,29.24,12v28.72h-3.94V515.47a12.56,12.56,0,0,0-4-9.34,13.33,13.33,0,0,0-21.35,3.57v34.14h-3.92V473.88h0ZM387.16,497a24,24,0,1,1-17,7,23.11,23.11,0,0,1,17-7h0Zm0,4.21a19.82,19.82,0,1,0,14,5.8,19.07,19.07,0,0,0-14-5.8h0Zm83.48-.31V482.63h3.92V500.9h8.74v3.94h-8.74v39h-3.92v-39H461.9V500.9h8.74ZM558,497a24,24,0,1,1-17,7,23.11,23.11,0,0,1,17-7h0Zm0,4.21a19.82,19.82,0,1,0,14,5.8,19.07,19.07,0,0,0-14-5.8h0Zm119.7,15.73a19.62,19.62,0,1,0,0,8.31v-8.31h0Zm-0.09,18.37a30.45,30.45,0,0,1-2.36,2.7,24,24,0,1,1,0-34,26.91,26.91,0,0,1,2.49,2.92V500.9h3.94v33.35a22.52,22.52,0,0,1-6.86,16.53,24,24,0,0,1-34,0,25.32,25.32,0,0,1-2.58-3l4.15-1.49c0.43,0.52.91,1,1.4,1.54a19.83,19.83,0,0,0,33.78-12.5h0Zm60.23-34.4h3.92v7.82a24.67,24.67,0,0,1,2.85-3.36q5.19-5.22,10.65-5.46v4.28c-2.48.12-5,1.49-7.68,4.15a18.93,18.93,0,0,0-5.82,13.34v22.16h-3.92V500.9h0Zm115.37,42.92h-3.94v-8.74a27,27,0,0,1-2.49,2.92,24,24,0,1,1,0-34,26.94,26.94,0,0,1,2.49,2.92V500.9h3.94v42.92h0Zm-3.94-18.89v-7.77a19.65,19.65,0,1,0,0,7.77h0Zm60.8-24H914v6a26,26,0,0,1,2.49-2.88,24,24,0,1,1,0,34,26.21,26.21,0,0,1-2.49-2.88v25.1h-3.92V500.9h0Zm3.92,16v8.22a19.76,19.76,0,1,0,0-8.22h0Zm97.25-43.06h3.92v29.24a17.05,17.05,0,0,1,29.24,12v28.72h-3.94V515.47a12.56,12.56,0,0,0-4-9.34,13.33,13.33,0,0,0-21.35,3.57v34.14h-3.92V473.88h0ZM1114.56,540l-9.71,20.25H1101l11.59-24.3-16.74-35h4.46l14.25,30.76,14.25-30.76h4.42L1114.56,540v0Z" transform="translate(-45.24 -282.13)" style={{'fill':'#000000','fillRule':'evenodd'}}/>
                <path d="M220.23,311.06c12.25-7.84,29.9-21.57,33.33-21.57,2,0,3.43,1,3.43,6.86,0,0-7.35,26.47-49.51,94.12l-30.88,45.59a16.68,16.68,0,0,0-2,7.35c0,6.37,5.88,9.8,11.76,9.8,4.41,0,8.33-2,11.76-2.94,51.47-29.41,89.7-74.51,123.53-121.08,5.88-8.33,13.24-18.63,13.24-30.39,0-5.39-2-9.31-4.9-9.31s-7.84,5.88-7.84,13.23c0,4.41,1.47,8.82,1.47,14.22a107.54,107.54,0,0,0-6.86,8.82c-33.33,46.08-72.06,91.17-121.57,118.62-2.94,1.47-7.84,3.92-11.27,3.92,1,0,81.86-108.82,81.86-151,0-1.47-.49-3.43-0.49-4.9,0,0-1.47-9.31-10.78-9.31C241.8,283.12,156,366,101.12,366c-13.73,0-21.57-4.41-34.31-12.74-9.8-10.29-4.9-28.92-18.14-28.92-2.45,0-3.43,2.45-3.43,5.39,0,10.78,22.06,42.65,55.88,42.65,41.66,0,85.29-35.78,119.11-61.27h0ZM360,424.67c-26.75,23.33-30.95,16.78-30.95,17.27-10.29,0-10.78-10.78-10.78-10.78A48.34,48.34,0,0,1,321.21,414v0.49c-10.78,10.29-31.86,23-31.86,23-4.9,2.94-8.33,3.43-11.27,3.43-9.31,0-9.8-8.82-9.8-13.24,0-17.16,17.65-39.21,17.65-39.21,27.45-33.82,42.16-36.27,42.16-36.27,9.8-4.41,19.61,2.94,17.16,16.67,4.9-7.35,11.27-18.14,22.55-18.14,2.94,0,3.43,1.47,3.43,2.94a9.64,9.64,0,0,1-1.47,4.9h0c-42.16,56.86-43.63,68.63-43.63,72.55s2.45,4.41,3.92,4.41c8.33,0,28.88-17.82,32.3-19.48m-68.08,10.66c-9.31,5.88-13.73,7.35-15.2,6.86s-1.47-2.45-1.47-3.43c0-14.22,20.59-35.78,20.59-35.78,5.88-6.37,27.94-31.86,36.27-31.86,4.9,0,5.39,6.86,5.39,11.27,0,23.53-43.63,51.47-45.59,52.94h0Zm108.06-9.49c0,1-22.28,18.32-31.1,18.32-2,0-3.92-.49-3.92-3.92,0-3.92,1-16.67,52-84.8h0l34.8-42.65a17.81,17.81,0,0,0,2.45-8.33c0-2-1-6.86-4.41-6.86-1,0-2.45.49-4.41,2.45-2.94,0-88.23,102-88.23,139.7,0,0-1,11.27,10.78,10.78,1,0,8.64,1.37,31.27-18m64-5.35c-8.25,7.17-6.55,6.2-18.31,13.06-10.78,5.88-39.21,20.59-45.1,0-5.88-22.06,26-69.12,47.06-78.92,7.35-3.92,17.16-3.92,20.59,5.39,11.76,32.84-30.39,49.51-52,59.8-2,.49-3.43,1-5.39,1.47-2,5.39-2.45,10.29-1.47,14.22,2.94,6.37,24-2,33.33-7.84,13.23-8.33,21.76-18.19,30.58-27L470.5,408m-18.41-41.55c4.9-3.92,10.29-6.86,11.76-3.92,5.88,23.53-25.49,39.7-48,49,8.33-17.16,22.06-35.29,36.27-45.1h0Zm23-45.59c0,11.76-24,17.65-29.9,17.65a13.55,13.55,0,0,1-3.92-.49c0-.49,0-0.49.49-0.49,14.22-3.92,14.22-20.59,28.92-20.59,2.94,0,4.41,1.47,4.41,3.92h0Zm69.11,39.22c-1.47,10.29-8.33,20.59-9.8,24-1,2.45-2,8.82,2.45,8.82,2.45,0,15.2-5.39,15.2-27.94,0-9.8-4.41-14.22-10.29-14.22-12.74,0-32.84,19.61-42.16,29.41,5.39-8.33,17.16-21.08,17.16-27,0-1.47-1-2-2.45-2.45-16.18-2.94-33.33,34.8-50.49,71.57a25.65,25.65,0,0,0-2.45,12.25c0,3.92,1,6.37,2.45,6.37,3.43,0,4.41-5.88,11.76-18.14,14.7-25,35.78-50,60.78-63.72,2.45-1.47,7.84-2.94,7.84,1h0ZM587.45,413m-10,13.39c-11,11.87-27.78,15.52-28.76,15.52-11.27-.49-10.78-10.78-10.78-10.78,0-17.65,13.73-43.63,33.82-72.55,2.94-3.43,10.29-7.84,15.69-7.84,2.45,0,3.43,1,3.43,2.94a9.22,9.22,0,0,1-2,4.9c-39.22,53.92-42.65,69.61-42.65,69.61a9.56,9.56,0,0,0-.49,3.43c0,3.43,2.45,3.92,3.92,3.92,7.35,1,29.11-16.09,29.11-17.07m11.08-80a2.37,2.37,0,0,0,2,.49c4.9,0,12.74-9.8,12.74-17.65,0-2.94-1.47-4.41-3.43-4.41-5.39,0-13.24,10.78-13.24,17.65,0,2,.49,3.43,2,3.92h0ZM679,358.61a9.64,9.64,0,0,0,1.47-4.9c0-1.47-.49-2.94-3.43-2.94-11.27,0-17.65,10.78-22.55,18.14,2.45-13.72-7.35-21.08-17.16-16.67,0,0-14.7,2.45-42.16,36.27,0,0-17.65,22.06-17.65,39.21,0,4.41.49,13.24,9.8,13.24,2.94,0,6.37-.49,11.27-3.43,0,0,21.08-12.74,31.86-23V414a48.34,48.34,0,0,0-2.94,17.16s0.49,10.78,10.78,10.78c0-.49,8.33,2.45,36.76-22.06,0,0,3.43-3.92,3.43-5.88a1.05,1.05,0,0,0-1-1c-3.92,0-29.9,22.55-38.23,22.55-1.47,0-3.92-.49-3.92-4.41s1.47-15.69,43.63-72.55h0Zm-75.49,68.13c2-1.47,45.59-29.41,45.59-52.94,0-4.41-.49-11.27-5.39-11.27-8.33,0-30.39,25.49-36.27,31.86,0,0-20.59,21.57-20.59,35.78,0,1,0,2.94,1.47,3.43s5.88-1,15.2-6.86h0Zm137.25-46.57c-12.25-.49-18.63,9.31-16.67,31.37,2.45,27.45,26.47,40.68,46.57,40.68,17.16,0,37.74-4.9,49-12.74,32.84,20.59,68.63,36.27,106.86,36.27,46.57,0,76-21.08,76-30.88,0-2-1.47-3.43-4.41-3.43-12.25,0-7.35,12.25-23,19.61-20.1,7.35-31.86,8.82-48.53,8.82-36.27,0-70.59-14.71-102-34.31a51.18,51.18,0,0,0,15.68-36.27c0-33.82-35.78-60.29-35.78-81.37,0-26,14.71-29.41,30.39-29.41,8.33,0,21.57,4.9,21.57,13.73,0,1.47-.49,3.43-0.49,4.9,0,8.82,6.37,16.18,10.29,16.18,2.45,0,3.92-2.94,3.92-7.35,0-17.65-16.67-33.33-35.78-33.82-22.55-.49-41.67,14.71-41.67,37.74,0,29.9,32.35,52,32.35,81.37,0,10.78-4.9,20.1-11.76,27-20.59-12.26-55.88-47.06-72.55-48h0ZM730,407.63c-0.49-18.63,2.45-23,9.31-23,13.72,0,45.59,31.86,69.61,47.55a62.25,62.25,0,0,1-38.72,13.72c-22.55,0-40.19-16.67-40.19-38.23h0Zm196.6-9c-0.12.81-7.06,2.75-17.19,3.61-2.93.25-3.92,2.45-5.88,5.39-1,1.47-24.51,34.8-50,34.8-3.92,0-10.78-1-11.27-12.25-1.47-36.27,41.18-82.35,66.66-82.35,12.74,0,13.24,12.26,13.24,16.67,0,5.88-1.47,16.67-10.29,30.88,14.7-1,16.62-1.87,20.37-7.25M858,434.1c-0.49,0-3.92.49-3.92-7.35,0-20.59,13.23-43.14,25-55.88a16.7,16.7,0,0,0-.49,4.9c0,12.74,9.31,22.06,21.57,25-6.37,8.33-26.47,32.84-42.16,33.33h0Zm45.59-39.21c-11.76-3.43-18.63-10.78-18.63-19.12,0-3.92,3.92-17.65,17.16-17.65,3.43,0,9.31,2,9.31,11.76,0,4.41-1.47,12.26-7.84,25h0Zm92.64-34.8c0-3.92-5.39-2.45-7.84-1-25,13.72-46.08,38.72-60.78,63.72C920.22,435.08,919.23,441,915.8,441c-1.47,0-2.45-2.45-2.45-6.37a25.65,25.65,0,0,1,2.45-12.25c17.16-36.76,34.31-74.51,50.49-71.57,1.47,0.49,2.45,1,2.45,2.45,0,5.88-11.76,18.63-17.16,27,9.31-9.8,29.41-29.41,42.16-29.41,5.88,0,10.29,4.41,10.29,14.22,0,22.55-12.74,27.94-15.2,27.94-4.41,0-3.43-6.37-2.45-8.82,1.47-3.43,8.33-13.72,9.8-24h0Zm82.56,63.54c-15.68,13.24-26.19,18.81-32.07,18.31-10.29-1-10.78-10.78-10.78-10.78a50.51,50.51,0,0,1,2.45-15.2c-8.33,7.35-28.43,25-41.18,25-9.8,0-10.29-8.33-10.29-13.24,0-23.53,36.76-69.61,59.8-75.49,10.78-3.43,16.67,4.41,17.65,15.2,25.49-38.23,59.8-76,59.8-76,2-2,3.43-2.45,4.9-2.45a5.06,5.06,0,0,1,2,.49h0a7.66,7.66,0,0,1,2.94,5.88c0,4.41-2.94,8.82-2.94,8.82l-34.8,42.65c-51,67.65-52.45,80.88-52.45,84.31,0,3.92,2.45,4.41,3.92,4.41,7.84,1,29-21.54,33.43-21.54m-22.65-38.26c-7.84,11.76-34.8,44.61-45.59,51-9.31,6.37-13.72,7.35-15.69,7.35s-1.47-2-1.47-3.43c0-19.61,34.8-53.92,50-62.74,11.76-6.86,12.74-1.47,12.74,7.84h0Zm53.43-17.16c-20.1,28.92-33.82,54.9-33.82,72.55,0,0-.49,10.29,10.78,10.78,1,0,10.78.49,36.27-22.06,0,0,3.43-3.92,3.43-5.88a1.05,1.05,0,0,0-1-1,5.33,5.33,0,0,0-2.45.49c0,1-27.94,23-35.29,22.06-1.47,0-3.92-.49-3.92-3.92a9.56,9.56,0,0,1,.49-3.43s3.43-15.69,42.65-69.61a9.22,9.22,0,0,0,2-4.9c0-2-1-2.94-3.43-2.94-5.39,0-12.74,4.41-15.69,7.84h0Zm18.14-20.1a2.37,2.37,0,0,0,2,.49c4.9,0,12.74-9.8,12.74-17.65,0-2.94-1.47-4.41-3.43-4.41-5.39,0-13.23,10.78-13.23,17.65C1128.05,336.55,1128.54,338,1130,338.51Z" transform="translate(-45.24 -282.13)"  style={{'fill':'#000000','fillRule':'evenodd'}}/>
              </svg>
            </h1>
          </Link>
          <nav className="main-nav" style={{visibility : (!this.state.isInternalMenu ? "visible" : "hidden")}}>
            <ul>
              <li><Link to="/sobre" className={this.state.location.indexOf("sobre") > -1 ? "selected" : null} title={ContentProvider.getTranslatedText("menu_about")}>{ContentProvider.getTranslatedText("menu_about")}</Link></li>
              <li className="spacer"></li>
              <li><Link to={"/portfolio/"+ContentProvider.categories[0].slug} className={this.state.location.indexOf("portfolio") > -1 ? "selected" : null} title={ContentProvider.getTranslatedText("menu_portfolio")}>{ContentProvider.getTranslatedText("menu_portfolio")}</Link></li>
              <li className="spacer"></li>
              <li><Link to="/contato" className={this.state.location.indexOf("contato") > -1 ? "selected" : null} title={ContentProvider.getTranslatedText("menu_contact")}>{ContentProvider.getTranslatedText("menu_contact")}</Link></li>
            </ul>
          </nav>
          <Link to="/" ref="back" className="back" style={{visibility : (this.state.isInternalMenu ? "visible" : "hidden")}}>{ContentProvider.getTranslatedText("back")}</Link>
        </div>

        <nav ref="internalmenu" className="categories-nav" style={{visibility : (this.state.isInternalMenu ? "visible" : "hidden")}}>
          <ul>
            {categories}
          </ul>
        </nav>
      </div>
    )
  }
});

module.exports = MenuComponent;

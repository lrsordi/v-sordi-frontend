var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;
var Globals = require('../core/Globals');
var classNames = require('classnames');
var SplitTextsHelper = require('../helpers/SplitTextsHelper');
var StringsHelper = require('../helpers/StringsHelper');
var DocumentMeta = require('react-document-meta');


var ContactScreen = React.createClass({

		titleSplit : null,

		getInitialState : function(){
			return{
				sending : false
			}
		},

		componentDidMount : function(){
			var title = $(ReactDOM.findDOMNode(this.refs.title));
			var spacer = $(ReactDOM.findDOMNode(this.refs.spacer));
			var content = $(ReactDOM.findDOMNode(this.refs.content));
			var contentForm = $(ReactDOM.findDOMNode(this.refs["content-form"]));
			this.titleSplit = new SplitText(title, {type : "chars", position : "relative"});
			TweenMax.staggerFromTo(this.titleSplit.chars.reverse(), 1, {x : -10, opacity:0}, {x : 0, opacity : 1, ease : Expo.easeInOut}, 0.03);
			TweenMax.fromTo(spacer, 1, {x : -10, scaleX : 0}, {x : 0, scaleX : 1, ease : Expo.easeInOut, delay:0.3});

			SplitTextsHelper.initMainMenuHover($(content.find("span.value:eq(0)").find("a")));
			SplitTextsHelper.initMainMenuHover($(content.find("span.value:eq(1)").find("a")));
			SplitTextsHelper.initMainMenuHover($(content.find("span.value:eq(2)").find("a")));
			SplitTextsHelper.initMainMenuHover($(contentForm.find("button")));

			content.find("span.italic").each(function(el,index){
				TweenMax.fromTo($(this), 1, {x : -20, opacity : 0}, {x : 0, opacity : 1, ease : Expo.easeInOut, delay:0.5+(el*0.1)});
			});

			content.find("span.value").each(function(el,index){
				TweenMax.fromTo($(this), 1, {x : -20, opacity : 0}, {x : 0, opacity : 1, ease : Expo.easeInOut, delay:0.5+(el*0.1)});
			});

			TweenMax.fromTo(contentForm.find("span.fill-in"), 1, {x : -20, opacity : 0}, {x : 0, opacity : 1, ease : Expo.easeInOut, delay:0.8});

			contentForm.find("input,textarea,button").each(function(el,index){
				TweenMax.fromTo($(this), 1, {x : -20, opacity : 0}, {x : 0, opacity : 1, ease : Expo.easeInOut, delay:0.9+(el*0.05)});
			});

			$(window).scrollTop(10);
			$(window).scrollTop(0);
			window.prerenderReady = true;
		},


		checkForm : function(){
			var name = $(ReactDOM.findDOMNode(this.refs.name));
			var email = $(ReactDOM.findDOMNode(this.refs.email));
			var phone = $(ReactDOM.findDOMNode(this.refs.phone));
			var message = $(ReactDOM.findDOMNode(this.refs.message));
			var button = $(ReactDOM.findDOMNode(this.refs.button));

			var error = false;
			if(name.val() == ""){
				error = true;
			}

			if(!StringsHelper.validateEmail(email.val())){
				error = true;
			}

			if(phone.val() == ""){
				error = true;
			}

			if(message.val() == ""){
				error = true;
			}


			if(error){
				alert(ContentProvider.getTranslatedText("contact_fillall"));
				return;
			}

			this.sendEmail();
		},


		sendEmail : function(){
			var contentForm = $(ReactDOM.findDOMNode(this.refs["content-form"]));
			var name = $(ReactDOM.findDOMNode(this.refs.name));
			var email = $(ReactDOM.findDOMNode(this.refs.email));
			var phone = $(ReactDOM.findDOMNode(this.refs.phone));
			var message = $(ReactDOM.findDOMNode(this.refs.message));
			var button = $(ReactDOM.findDOMNode(this.refs.button));

			var url = window.api_url + "api/email";
			this.setState({sending : true});

			var self = this;

			$.ajax({
				url : url,
				type : "POST",
				data : {
					name : name.val(),
					email : email.val(),
					phone : phone.val(),
					message : message.val()
				},

				success : function(data){
					if(data.success){
						alert(ContentProvider.getTranslatedText("contact_success"));
						name.val("");
						email.val("");
						phone.val("");
						message.val("");

						self.setState({
							sending : false
						});
					}else{
						alert(ContentProvider.getTranslatedText("contact_error"));
						self.setState({
							sending : false
						});
					}
				},

				error : function(data){
					alert(ContentProvider.getTranslatedText("contact_error"));
					self.setState({
						sending : false
					});
				}
			});
		},

		componentWillUnmount : function(){


			var title = $(ReactDOM.findDOMNode(this.refs.title));

			TweenMax.killChildTweensOf(title);


			this.titleSplit.revert();
			this.titleSplit = null;


		},

		render : function(){
			return (
				<section id="contact">
					<DocumentMeta title={"valéria sordi photography // " + ContentProvider.getTranslatedText("contact_title")}/>
					<div className="column-content">
						<h2 ref="title">{ContentProvider.getTranslatedText("contact_title")}</h2>
						<div className="spacer" ref="spacer"></div>
						<div className="content" ref="content">
							<span className="italic">{"-" + ContentProvider.getTranslatedText("contact_email") + " // "}</span><span className="value"><a href={"mailto:"+ContentProvider.generalContacts.contactemail}><span>{ContentProvider.generalContacts.contactemail}</span></a></span>
							<span className="italic newline">{"-" + ContentProvider.getTranslatedText("contact_phone") + " // "}</span><span className="value"><a href={"tel:"+ContentProvider.generalContacts.phone}><span>{ContentProvider.generalContacts.phone}</span></a></span>
							<span className="italic newline">{"-" + ContentProvider.getTranslatedText("contact_location") + " // "}</span><span className="value"><a href="https://www.google.com.br/maps/search/Porto+Alegre+-+RS/@-30.0062886,-51.1428583,15z?hl=pt-BR" target="_blank"><span>{ContentProvider.generalContacts.location}</span></a></span>
						</div>
						<div className={"content-form " + (this.state.sending ? "sending" : "")} ref="content-form">
							<span className="fill-in">{ContentProvider.getTranslatedText("contact_pleasefill")}</span>
							<input ref="name" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" type="text" placeholder={ContentProvider.getTranslatedText("contact_name")} maxLength="64" />
							<input ref="email" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" type="email" placeholder={ContentProvider.getTranslatedText("contact_email")} maxLength="128" />
							<input ref="phone" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" type="tel" placeholder={ContentProvider.getTranslatedText("contact_phone")} maxLength="128" />
							<textarea ref="message" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" placeholder={ContentProvider.getTranslatedText("contact_message")} maxLength="2056"></textarea>
							{!this.state.sending ?(
								<button onClick={this.checkForm} ref="form-button"><span>{ContentProvider.getTranslatedText("contact_send")}</span></button>
							)	: (
 								<span className="sending">{ContentProvider.getTranslatedText("contact_sending")}</span>
							)}
						</div>
					</div>
					<div className="over-deg"></div>
				</section>
			)
		}
});


module.exports = ContactScreen;

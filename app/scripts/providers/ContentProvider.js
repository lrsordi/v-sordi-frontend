var StringsHelper = require('../helpers/StringsHelper');


var ContentProvider = {
  texts : null,
  categories : null,
  about : null,
  generalContacts : null,
  albums : null,
  homeCovers : null,
  language : "pt",

  generateHomeCovers : function(){
    var album = [];
    var category;
    this.homeCovers = [];
    for(var i = 0; i < this.albums.length; i++){
      album = this.albums[i];
      category = this.getCategoryById(album.category);
      album.category = category;

      if(!album.shownInHome) continue;
      this.homeCovers.push({file : window.api_url + album.cover.path.replace("public/","") + album.cover.filename, color : album.color});
    }
  },

  getCategoryById : function(id){
    var category;
    for(var i = 0; i < this.categories.length; i++){
      category = this.categories[i];
      if(id === category._id)
        return category;
    }

    return null;
  },

  getTranslatedText : function(identifier){
    var lang = this.language;
    if(lang === "en"){
      lang = "enus";
    }else{
      lang = "ptbr";
    }


    return this.texts[identifier][lang].toString();
  },

  getAboutContent : function(){
    var lang = this.language;
    if(lang === "en"){
      lang = "enus";
    }else{
      lang = "ptbr";
    }

    return this.about["about_"+lang];
  },

  getCategoryTranslatedName : function(obj){
    var lang = this.language;
    if(lang === "en"){
      lang = "title_enus";
    }else{
      lang = "title_ptbr";
    }


    return obj[lang].toString();
  }
}


module.exports = ContentProvider;

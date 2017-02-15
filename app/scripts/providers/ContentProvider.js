var ContentProvider = {
  texts : null,
  categories : null,
  about : null,
  generalContacts : null,
  albums : null,
  homeCovers : null,

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
  }
}


module.exports = ContentProvider;

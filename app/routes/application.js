import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    transitionTo: function(route) {
      if(route === 'files') {
        this.transitionTo('file', '');
      } else if(route === 'clients') {
        this.transitionTo('clients');
      } else if(route === 'publishing') {
        this.transitionTo('publishing');
      }
    },

    uploadFile: function (file) {
      var source = file.file.getSource();
      var location = document.location.pathname;

      if(location.indexOf('/files') === 0) {
        // if user is in a directory, upload the files there
        location = location.replace(/^\/files\//, '');
        // dirname of current path, so if path is /foo/README, use /foo/
        location = location.replace(/\/[^\/]*$/, '');
      } else {
        // otherwise, upload files in the root directory
        location = '';
      }
      console.log("upload location is " + location);

      file.upload('/api/upload', {
        data: {
          relativePath: source.relativePath,
          location: location
        }
      }).then(() => {
        this.transitionTo('file', location);
      });
    }
  }
});

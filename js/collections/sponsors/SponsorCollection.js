define([
  'underscore',
  'backbone',
  'models/sponsor/sponsorModel'
], function(_, Backbone, SponsorModel){

  var SponsorCollection = Backbone.Collection.extend({
  
	sort_key: 'startTime', // default sort key
    
	comparator: function(item) {
        return item.get(this.sort_key);
    },
    
	sortByField: function(fieldName) {
        this.sort_key = fieldName;		
	},
 
    model: SponsorModel,
    initialize : function(models, options) { 
	},
	
	dateISToday: function () {
	var toDay = new Date()
    var models = this.select(function (model) {
	
	
	var workshopDay = new Date(model.get('startDate'))	
        return workshopDay.getDate() == toDay.getDate();
    });
    return models;
	},
	
	greaterThan: function ( attribute, value) {
    var models = this.select(function (model) {
        return model.get(attribute) > value;
    });
    return models;
	},
	
	notNull: function() {

	filteredx = this.filter(function(box) {
	
	return box.get("logoIRN")>0
	});
	
	return new SponsorCollection(filteredx);
	
	
	},
	
	url : function() {

		//var EventsAPI = 'https://script.google.com/macros/s/AKfycbwyroVu6Q37FgG_-ddTWnFXABfLyRilLMrL8b5SfRo7QLcpNmA/exec?id=1VHc5AplL12Q7qYmmHcByg1ogneDJZCfpgY3CyulOMxI' ;
		var EventsAPI = 'http://museums.bristol.gov.uk/sync/data/sponsors.JSON';
		
        return EventsAPI
      },
	  
	
      parse : function(data) {	  
		return data	       
      }

 
  });

  return SponsorCollection;

});

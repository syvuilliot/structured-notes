define([
	"dojo/_base/declare",
	"SkFramework/model/Model",
	"./models/Type",
], function(declare, Model, Type){

	//for test only
	new Type({
		id:"Note",
		construct: function Note(){Model.apply(this, arguments);},
		prototypeProps: {
			validate: function(){
				return this.title ? true : false;
			}
		}

	}).save();

	var loadTypes = function(typeList){
		Type.query({}).forEach(function(type){
			typeList[type.id] = Model.extend(
				type.construct,
				type.prototypeProps
				//type.classProps
			);
		});
	};

	return declare([], {
		constructor: function(params){
			this.types = {};
			loadTypes(this.types);

		},
	});
});
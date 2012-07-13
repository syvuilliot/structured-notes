define([
	"dojo/_base/declare",
	"SkFramework/model/Model",
	"./models/Schema",
], function(declare, Model, Schema){

	var loadType = function(typeId, typeList){
		if (typeList[typeId]){return typeList[typeId];}
		var schema = Schema.get(typeId);
		if (!schema){return undefined;}
		var extendedModel = typeList[schema["extends"]] || loadType(schema["extends"], typeList) || Model;
		var model = typeList[typeId] = extendedModel.extendWithSchema(schema);
		return model;
	};

	return declare([], {
		constructor: function(params){
			//load schemas
			Schema.store.load();
			//load types
			this.types = {};
			Schema.query().forEach(function(schema){
				loadType(schema.id, this.types);
			}.bind(this));
			//load instances
			Model.store.load();
		},
		addType: function(schema){
			var type;
			type = this.types[schema.id];
			if (! type) {
				new Schema(schema).save();
				type = loadType(schema.id, this.types);
			}
			return type;
		},

	});
});
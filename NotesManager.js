define([
	"dojo/_base/declare",
	"SkFramework/model/Model",
	"./models/Schema",
], function(declare, Model, Schema){

/*	new Schema({
		id: "NoteWithNumber",
		description: "Note avec un titre et un nombre",
		properties: {
			number: {type: "number"},
		},
		"extends": "Note"
	}).save();

	new Schema({
		id: "Note",
		description: "Note avec un titre",
		type: "object",
		properties: {
			title: {type: "string"},
		},
		"extends": "Model",
	}).save();
*/
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

	});
});
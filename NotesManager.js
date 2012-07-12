define([
	"dojo/_base/declare",
	"SkFramework/model/Model",
	"./models/Schema",
], function(declare, Model, Schema){

	new Schema({
		id: "Note",
		description: "Note avec un titre",
		type: "object",
		properties: {
			title: {type: "string"},
		}
	}).save();

	var loadTypes = function(typeList){
		Schema.query({}).forEach(function(schema){
			typeList[schema.id] = Model.extendWithSchema(schema);
		});
	};

	return declare([], {
		constructor: function(params){
			this.types = {};
			loadTypes(this.types);
			var Note = this.types.Note;
			this.types.NoteWithNumber = Note.extendWithSchema({
				id: "NoteWithNumber",
				description: "Note avec un titre et un nombre",
				properties: {
					number: {type: "number"},
				}
			});
		},

	});
});
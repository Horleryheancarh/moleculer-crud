"use strict";

const Moleculer = require("moleculer");
const DbService = require("moleculer-db");
const SequelizeAdapter = require("moleculer-db-adapter-sequelize");

module.exports = function (table) {
	let model;
	switch (table) {
		case "posts":
			model = require("../models/postSchema");
			break;
		
		case "users":
			model = require("../models/userSchema");
			break;
		
		case "todoItems":
			model = require("../models/todoSchema");
			break;
		
		case "notes":
			model = require("../models/noteSchema");
			break;

		default:
			throw new Moleculer.Errors.MoleculerError("Error No Table specified");
	}

	const schema = {
		adapter: new SequelizeAdapter("postgres://postgres:postgres@localhost:5432/sql_demo"),
		mixins: [DbService],

		// Place the required model
		name: model.name,

		model: model.model,

		settings: model.settings,

		afterConnected() {
			this.logger.info(`Connected to Database (Table ${model.name}) Successfully`);
			// return this.adapter.clear();
		}
	};

	return schema;
};
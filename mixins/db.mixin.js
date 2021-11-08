"use strict";

const DbService = require("moleculer-db");
const SequelizeAdapter = require("moleculer-db-adapter-sequelize");
const Sequelize = require("sequelize");


module.exports = function () {
	const schema = {
		name: "posts",
		adapter: new SequelizeAdapter( "sql_demo", "postgres", "postgres", {
			host: "localhost",
			dialect: "postgres",
			port: 5432
		}),
		// adapter: new SequelizeAdapter(process.env.POSTGRES_URI, { dialect: "postgres" }),
		mixins: [DbService],
		model: {
			name: "post",
			define: {
				id: { type: Sequelize.UUID, primaryKey: true},
				title: Sequelize.STRING,
				content: Sequelize.TEXT,
				author: Sequelize.STRING,
			},

		},
		settings: {
			fields: ["id", "title", "content", "author"]
		},

		afterConnected() {
			this.logger.info("Connected to Database Successfully");
			// return this.adapter.clear();
		}
	};

	return schema;
};

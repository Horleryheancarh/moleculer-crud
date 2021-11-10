"use strict";

const DbService = require("moleculer-db");
const SequelizeAdapter = require("moleculer-db-adapter-sequelize");
const Sequelize = require("sequelize");


module.exports = function () {
	const postSchema = {
		name: "posts",
		/*
		adapter: new SequelizeAdapter( "sql_demo", "postgres", "postgres", {
			host: "localhost",
			dialect: "postgres",
			port: 5432
		}),
		*/
		adapter: new SequelizeAdapter("postgres://postgres:postgres@localhost:5432/sql_demo"),
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

	const userSchema = {
		name: "users",
		/*
		adapter: new SequelizeAdapter( "sql_demo", "postgres", "postgres", {
			host: "localhost",
			dialect: "postgres",
			port: 5432
		}),
		*/
		adapter: new SequelizeAdapter("postgres://postgres:postgres@localhost:5432/sql_demo"),
		mixins: [DbService],
		model: {
			name: "user",
			define: {
				// id: Sequelize.UUID,
				firstname: Sequelize.STRING,
				lastname: Sequelize.STRING,
				email: Sequelize.STRING,
				username: { type: Sequelize.STRING, primaryKey: true},
				password: Sequelize.STRING,
				role: Sequelize.ENUM("admin", "user", "guest")
			},
		},
		settings: {
			fields: ["username", "password", "role"]
		},

		afterConnected() {
			this.logger.info("Connected to Database Successfully");
			// return this.adapter.clear();
		}
	};

	return postSchema, userSchema;
};

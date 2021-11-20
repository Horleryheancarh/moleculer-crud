"use strict";

const Sequelize = require("sequelize");

module.exports = {
	name: "posts",
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
};
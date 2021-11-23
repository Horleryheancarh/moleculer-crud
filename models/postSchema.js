"use strict";

const Sequelize = require("sequelize");

module.exports = {
	name: "posts",
	model: {
		name: "post",
		define: {
			id: { 
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false
			},
			title: Sequelize.STRING,
			content: Sequelize.TEXT,
			author: Sequelize.STRING,
		},

	},
	settings: {
		fields: ["id", "title", "content", "author"]
	},
};
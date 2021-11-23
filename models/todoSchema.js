"use strict";

const Sequelize = require("sequelize");

module.exports = {
	name: "todo-items",
	model: {
		name: "todo-item",
		define: {
			id: { 
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false
			},
			title: Sequelize.STRING,
			author: Sequelize.STRING,
			todoItems: Sequelize.ARRAY(Sequelize.STRING)
		},

	},
	settings: {
		fields: ["id", "title", "content", "author"]
	},
};
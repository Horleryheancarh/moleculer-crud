"use strict";

const Sequelize = require("sequelize");

module.exports = {
	name: "todoitems",
	model: {
		name: "todoitem",
		define: {
			id: { 
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false
			},
			title: Sequelize.STRING,
			description: Sequelize.STRING,
			username: Sequelize.STRING,
			todoItems: Sequelize.ARRAY(Sequelize.STRING)
		},

	},
	settings: {
		fields: ["id", "title", "description", "todoItems"]
	},
};
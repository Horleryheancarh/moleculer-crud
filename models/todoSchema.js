"use strict";

const Sequelize = require("sequelize");

module.exports = {
	name: "todoItems",
	model: {
		name: "todoItem",
		define: {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false
			},
			done: Sequelize.BOOLEAN,
			details: Sequelize.STRING,
			username: Sequelize.STRING,
			dueDate: Sequelize.DATE
		},
	},
	settings: {
		fields: ["id", "done", "details", "dueDate"]
	}
};
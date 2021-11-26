"use strict";

const Sequelize = require("sequelize");

module.exports = {
	name: "notes",
	model: {
		name: "note",
		define: {
			id: { 
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false
			},
			title: Sequelize.STRING,
			notes: Sequelize.STRING,
			username: Sequelize.STRING,
		},

	},
	settings: {
		fields: ["id", "title", "notes"]
	},
};
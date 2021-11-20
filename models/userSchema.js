"use strict";

const Sequelize = require("sequelize");

module.exports = {
	name: "users",
	// Set to a new file
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

	// Returns (with moleculer)
	settings: {
		fields: ["username", "role"]
	},
};
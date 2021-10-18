'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Personas', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            tipo_persona: {
                type: Sequelize.STRING
            },
            nombre: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            tipo_documento: {
                type: Sequelize.STRING
            },
            num_documento: {
                type: Sequelize.STRING
            },
            direccion: {
                type: Sequelize.STRING
            },
            telefono: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                isEmail: true,
            },
            estado: {
                type: Sequelize.INTEGER,
                defaultValue: 1,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Personas');
    }
};
'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('VentaArticulos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            ventaId: {
                type: Sequelize.INTEGER
            },
            articuloId: {
                type: Sequelize.INTEGER
            },
            articulo: {
                type: Sequelize.STRING

            },
            cantidad: {
                type: Sequelize.INTEGER
            },
            precio: {
                type: Sequelize.INTEGER
            },
            descuento: {
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('VentaArticulos');
    }
};
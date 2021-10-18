'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Articulos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            codigo: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            nombre: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            descripcion: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            precio_venta: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            stock: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            estado: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1,
            },
            categoriaId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { // User belongsTo Company 1:1
                    model: 'Categoria',
                    key: 'id'
                }
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
        await queryInterface.dropTable('Articulos');
    }
};
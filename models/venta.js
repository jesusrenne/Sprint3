'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Venta extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsToMany(models.Articulo, {
                through: 'VentaArticulos',
                as: 'detalles',
                foreignKey: 'ventaId',
                otherKey: 'articuloId'
            });
            this.belongsTo(models.Persona, { foreignKey: 'personaId', as: 'persona' });
            this.belongsTo(models.Usuario, { foreignKey: 'usuarioId', as: 'usuario' });
        }
    };
    Venta.init({
        usuarioId: DataTypes.INTEGER,
        personaId: DataTypes.INTEGER,
        tipo_comprobante: DataTypes.STRING,
        serie_comprobante: DataTypes.STRING,
        num_comprobante: DataTypes.STRING,
        impuesto: DataTypes.INTEGER,
        total: DataTypes.INTEGER,
        estado: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Venta',
    });
    return Venta;
};
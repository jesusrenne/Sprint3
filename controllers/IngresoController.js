//import models from '../models';
const models = require('../models');
const Articulo = require('../models').Articulo;
const IngresoArticulos = require('../models').IngresoArticulos;
const Persona = require('../models').Persona;
const Usuario = require('../models').Usuario;

const aumentarStock = async(idArticulo, cantidad) => {

    let { stock } = await models.Articulo.findOne({ where: { id: idArticulo } });
    let newStock = parseInt(stock) + parseInt(cantidad);

    const reg = await models.Articulo.update({ stock: newStock }, { where: { id: idArticulo } })

};
const disminuirStock = async(idArticulo, cantidad) => {

    let { stock } = await models.Articulo.findOne({ where: { id: idArticulo } });
    let newStock = parseInt(stock) - parseInt(cantidad);

    const reg = await models.Articulo.update({ stock: newStock }, { where: { id: idArticulo } })

};

module.exports = {
    add: async(req, res, next) => {
        try {
            const reg = await models.Ingreso.create(req.body);
            //Actualizar stock
            let detalles = req.body.detalles;
            for (const detalle of detalles) {
                aumentarStock(detalle.id, detalle.cantidad);
                const articulos = await Articulo.findOne({ where: { id: detalle.id } });
                console.log(articulos, detalle.id)
                if (!articulos) {
                    return res.status(400);
                }
                const po = {
                    ingresoId: reg.id,
                    articuloId: detalle.id,
                    articulo: detalle.articulo,
                    cantidad: detalle.cantidad,
                    precio: detalle.precio,
                    descuento: detalle.descuento
                }

                // Create and save a IngresoArticulo
                const IngresoArticulo = await IngresoArticulos.create(po);
            }
            /* detalles.map(function(x) {
                aumentarStock(x.id, x.cantidad);
                const articulos = Articulo.findOne({ where: { id: x.id } });;
                console.log(articulos, x.id)
                if (!articulos) {
                    return res.status(400);
                }
                const po = {
                    ingresoId: reg.id,
                    articuloId: x.id,
                }

                // Create and save a IngresoArticulo
                const IngresoArticulo = IngresoArticulos.create(po);
            }); */
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
    query: async(req, res, next) => {
        try {
            console.log(req.query)
            const reg = await models.Ingreso.findOne({
                where: { id: req.query.id },
                include: [{
                        model: Articulo,
                        as: 'detalles',
                        required: false,
                        through: {
                            // This block of code allows you to retrieve the properties of the join table
                            model: IngresoArticulos,
                            as: 'detalles',
                        },
                    }, {
                        model: Persona,
                        as: 'persona'
                    },
                    {
                        model: Usuario,
                        as: 'usuario'
                    }
                ]

            });
            if (!reg) {
                res.status(404).send({
                    message: 'El registro no existe'
                });
            } else {
                res.status(200).json(reg);
            }
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
    list: async(req, res, next) => {
        try {
            let valor = req.query.valor;
            const reg = await models.Ingreso.findAll({

                // Make sure to include the products
                include: [{
                        model: Articulo,
                        as: 'detalles',
                        required: false,
                        through: {
                            // This block of code allows you to retrieve the properties of the join table
                            model: IngresoArticulos,
                            as: 'detalles',
                        },
                    }, {
                        model: Persona,
                        as: 'persona'
                    },
                    {
                        model: Usuario,
                        as: 'usuario'
                    }
                ],


            });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
    /*
    update: async (req,res,next) => {
        try {
            const reg = await models.Categoria.findByIdAndUpdate({id:req.body.id},{nombre:req.body.nombre,descripcion:req.body.descripcion});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    remove: async (req,res,next) => {
        try {
            const reg = await models.Categoria.findByIdAndDelete({id:req.body.id});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    */
    activate: async(req, res, next) => {
        try {
            const reg = await models.Ingreso.update({ estado: 1 }, { where: { id: req.body.id } });
            const reg2 = await models.Ingreso.findOne({
                where: { id: req.body.id },
                include: [{
                    model: Articulo,
                    as: 'detalles',
                    required: false,
                    through: {
                        // This block of code allows you to retrieve the properties of the join table
                        model: IngresoArticulos,
                        as: 'detalles',
                    },
                }]

            });
            console.log(reg2);
            //Actualizar stock
            let detalles = reg2.detalles;
            detalles.map(function(x) {
                aumentarStock(x.id, x.cantidad);
            });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
    deactivate: async(req, res, next) => {
        try {
            const reg = await models.Ingreso.update({ estado: 0 }, { where: { id: req.body.id } });
            const reg2 = await models.Ingreso.findOne({
                where: { id: req.body.id },
                include: [{
                    model: Articulo,
                    as: 'detalles',
                    required: false,
                    through: {
                        // This block of code allows you to retrieve the properties of the join table
                        model: IngresoArticulos,
                        as: 'detalles',
                    },
                }]

            });
            console.log(reg2);
            //Actualizar stock
            let detalles = reg2.detalles;
            detalles.map(function(x) {
                aumentarStock(x.id, x.cantidad);
            });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
    grafico12Meses: async(req, res, next) => {
        try {
            const reg = await models.Ingreso.aggregate(
                [{
                        $group: {
                            id: {
                                mes: { $month: "$createdAt" },
                                year: { $year: "$createdAt" }
                            },
                            total: { $sum: "$total" },
                            numero: { $sum: 1 }
                        }
                    },
                    {
                        $sort: {
                            "id.year": -1,
                            "id.mes": -1
                        }
                    }
                ]
            ).limit(12);

            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
    consultaFechas: async(req, res, next) => {
        try {
            let start = req.query.start;
            let end = req.query.end;
            const reg = await models.Ingreso.find({ "createdAt": { "$gte": start, "$lt": end } })
                .populate('usuario', { nombre: 1 })
                .populate('persona', { nombre: 1 })
                .sort({ 'createdAt': -1 });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    }
}
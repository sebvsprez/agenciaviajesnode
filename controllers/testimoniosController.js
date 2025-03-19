import { Testimonio } from "../models/Testimonios.js";

const guardarTestimonios = async (req, res) => {
    //Validar..
    const { nombre, correo, mensaje } = req.body;

    const errores = [];

    if(nombre.trim() === ''){
        errores.push({mensaje: 'El Nombre esta vacio'});
    }

    if(correo.trim() === ''){
        errores.push({mensaje: 'El Correo esta vacio'});
    }

    if(mensaje.trim() === ''){
        errores.push({mensaje: 'El Mensaje esta vacio'});
    }

    if(errores.length > 0) {
        //consultar testimoniales existentes
        const testimonios = await Testimonio.findAll();

        //mostrar la vista con errores
        res.render('testimonios', {
            pagina: 'Testimonios',
            errores,
            nombre,
            correo,
            mensaje,
            testimonios
        });

        
    } else {
        //Almacenar en la base de datos
        try {
            await Testimonio.create({
                nombre,
                correo,
                mensaje
            });

            res.redirect('testimonios');

        } catch (error) {
            console.log(error)
        }
    }
}

export {
    guardarTestimonios
}
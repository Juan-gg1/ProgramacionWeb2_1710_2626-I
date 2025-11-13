const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const { error } = require('console');

const app = express();

// solicitudes de http
app.use(bodyParser.urlencoded({extended: false}));

// configuracion de el motor de plantillas
app.set('view engine','ejs');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user:'root',
    password:'',
    database: 'node_crud',
    port:3306
});

// verificar la conexion
db.connect(err=>{
    if(err){
        console.error('Error en servidor ',err);
    }else{
        console.log('Conexion con exito :)');
    }
});

const port = 3006;
app.listen(port,()=>{
    console.log(`Server http://localhost:${port}`);

});

// mostrar informacion en una lista ->index.ejs
app.get('/',(req,res)=>{
    // consulta
    const consulta = 'SELECT * FROM users';

    db.query(consulta,(err,results)=>{
        if(err){
            console.error('Error en recuperar datos',err);
            res.send('Error, no se recuperan datos');
        }else{
            res.render('index',{users: results});
        }
    });
});

// agregar usuario
app.post('/add', (req,res)=>{
    const{name, email}= req.body;

    const consulta = 'INSERT INTO users (name, email) VALUES (?, ?)';
    
    db.query(consulta,[name,email], (err)=>{
        if(err){
            console.error('Error al agregar usuario', err);
            res.send('Error al agregar usuario');
        }else{
            res.redirect('/');
        }
    })

})

//Solicitar datos del usuario por medio del listado

app.get('/edit/:id',(req,res)=>{
    const {id} = req.params;
    const consultaId = 'SELECT * FROM users WHERE id = ?';
    db.query(consultaId,[id], (err, results)=>{
        if(err){
            console.error('Error al obtener usuario', err);
            res.send('Error');
        }else{
            res.render('edit',{user: results[0]});
        }
        });
});


// actualizar usuario
app.post('/update/:id',(req,res)=>{
    const {id} = req.params;
    const {name, email} = req.body; 
    const consultaUpdate = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    db.query(consultaUpdate,[name,email,id], (err)=>{
        if(err){
            console.error('Error al actualizar', err);
            res.send('Error al actualizar usuario');
        }else{
            res.redirect('/');
        }
    });
});

// eliminar usuario
app.get('/delete/:id',(req,res)=>{
    const {id} = req.params;
    const consultaDelete = 'DELETE FROM users WHERE id = ?';   
    db.query(consultaDelete,[id], (err)=>{
        if(err){
            console.error('Error al eliminar usuario', err);
            res.send('Error al eliminar usuario');
        }else{
            res.redirect('/');
        } 
    });
});

app.use(express.static('public'));

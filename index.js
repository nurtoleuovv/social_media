const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const db = require('./models');
const app = express();
const APIKEY = "1166f64dd420024e4f6a3917115e8aaa";

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.get('/hello/:name/:surname', (req, res) => {
//     // body
//     // query
//     // params
//     const name = req.params.name;
//     const message = 'hello '+ name + " " + req.params.surname;
//     return res.status(200).json({message});
// })

// app.get('/hello', (req, res) => {
//     const name = req.query.name || "Stranger";
//     const surname = req.query.surname;

//     return res.status(200).json({
//         message: `Hello, ${name} ${surname}`
//     });
// })

// app.get('/add', (req, res) => {
//     const first = parseFloat(req.query.first);
//     const second = parseFloat(req.query.second);
//     const answer = first / second;
//     if (!first){
//         return res.status(400).json({
//             error: `first is undefined`
//         });
//     }if (!second){
//         return res.status(400).json({
//             error: `second is undefined`
//         });
//     }else{
//         return res.status(200).json({
//             answer: answer
//         });
//     } 
// })

// app.get('/substract', (req, res) => {
//     let { first, second } = req.query;
    
//     first = parseFloat(first);
//     if (!first)  return res.status(400).json({ message: `"first" is undefined` });

//     second = parseFloat(second);
//     if (!second)  return res.status(400).json({ error: `"second" is undefined` });
    
//     const answer = first - second;
//     return res.status(200).json({ answer });
    
// })

app.get('/hello', (req, res)=>{
    return res.json({message: req.query});
})

app.get('/getPeople', async (req, res) => {
    let { nationality, amount } = req.query;

    if ( !nationality ) return res.status(400).json({message: '"nationality" is required.'});
    if ( typeof nationality !== 'string' ) return res.status(400).json({message: '"nationality" is invalid.'});
    nationality.toUpperCase(nationality);

    amount = parseFloat(amount);
    if ( !amount ) return res.status(400).json({message: '"amount" is required or ivalid.'});

    try {
        let {results} = (await axios.get(`https://api.randomuser.me/?nat=${nationality}&results=${amount}`)).data;
    
        results = results.map(i => ({
            gender: i.gender,
            fullName: `${i.name.title} ${i.name.first} ${i.name.last}`,
            location: {
                city: i.location.city,
                country: i.location.country,
            },
            login: {
                username: i.login.username,
                pass: i.login.password
            },
            picture: i.picture.large,
            email: i.email,
            registered: i.registered.date,
            phone: i.phone,
            nationality: i.nationality
        }))

       console.log(JSON.stringify(results, null, 4));
        
        return res.status(200).json(results);
    } catch (error) {
        return res.status(400).json(error);
    }


})

app.get('/getWeather', async (req,res)=>{
    const {name} = req.query;
    if ( !name ) return res.status(400).json({message: '"name" is required.'});
    try {
        const {data} = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${APIKEY}`)
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json(error);
    }

})

app.post('/products', async (req, res)=>{
    try {
        let {
            title, 
            description, 
            price
        } = { ... req.body, ...req.query};

        if (!title){return res.status(400).json({message: '"title" is required!'});}
        if(typeof title !== "string"){return res.status(400).json({message: 'Invalid type for "title"'})}
        
        if (!description){return res.status(400).json({message: '"description" is required!'});}
        if(typeof title !== "string"){return res.status(400).json({message: 'Invalid type for "title"'})}
        
        if (!price){return res.status(400).json({message: '"price" is required!'});}
        
        price = parseFloat(price);
        if(!price){return res.status(400).json({message: 'Invalid "price"'})}

        await db.Products.create({
            title,
            description,
            price,
            date: new Date()
        });
        return res.status(200).json({message: "Product is created"});


    } catch (error) {
        console.dir(error);
        return res.status(500).json(error);
    }
})

app.get("/products", async (req, res)=>{
    try {
        const products = await db.Products.findAll();
        if (!products){
            return res.status(500).json({message: "table Products is not exist"});
        }

        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json(error);
    }
})

app.listen(port, () => {
    console.log('App is listening to the port '+ port);
})


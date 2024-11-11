import express, { Request, Response } from "express";
import axios from "axios";
import bcrypt from "bcryptjs";
import path from "path";
import cookieParser from "cookie-parser";

const app = express();

// Configura EJS como a engine de renderização de templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async function (req: Request, res: Response) {
    res.redirect('usuario/login');
})

// Rota para listar senhas
app.get('/senha', async function (req: Request, res: Response) {
    
    const access_token = req.cookies.access_token;
    const response = await axios.get('http://localhost:3001/senhas', {

        headers: {
            Authorization: `Bearer ${access_token}`
        }

    });

    res.render('senhas/index', {
        senhas: response.data
    });

});

app.get('/form-senha', async function (req: Request, res: Response) {
    
    return res.render("senhas/form-senha");

})

// Rota para renderizar o formulário de senhas
app.get("/senha/form", async function (req: Request, res: Response) {    

    return res.render("senhas/form");
    
});

app.get("/usuario/cadastro", async function (req: Request, res: Response) {
    return res.render("usuario/form");
});

app.get("/usuario/login", async function (req: Request, res: Response) {
    
    return res.render("usuario/form-login");

});

app.post("/usuario/save", async function (req: Request, res: Response) {
    
    const { email, senha } = req.body;
    const response = await axios.post('http://localhost:3001/auth/login', {
        email,
        senha
    });

    const { access_token } = response.data;
    res.cookie('access_token', access_token, {
        httpOnly: true,
        secure: false, 
        maxAge: 24 * 60 * 60 * 1000
    });
    
    return res.redirect('/senha');

});

// Rota para criptografar a senha
app.post("/senha/cripto", async function (req: Request, res: Response) {
    const { senha } = req.body;  // Recebe a senha do corpo da requisição

    if (!senha) {
        return res.status(400).send("Senha é obrigatória!");
    }

    try {
        // Gera um salt (sal) e criptografa a senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(senha, salt);

        // Retorna o hash gerado
        return res.json({ hashedPassword });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erro ao criptografar a senha!");
    }
});

// Rota para salvar a senha no banco de dados
app.post("/senhas/save", async function (req: Request, res: Response) {
    
    const { nome, valor } = req.body
    const access_token = req.cookies.access_token;
    const response = await axios({
        method: 'POST',

        url: 'http://localhost:3001/senhas',

        headers: {
            Authorization: `Bearer ${access_token}`
        }, 

        data: {
            nome: nome,
            valor: valor
        }              

    });

    console.log(response.data);

    return res.redirect('/senha');

});



// Rota para excluir a senha
app.post("/senha/delete/:id", async function (req: Request, res: Response) {
    const id = req.params.id;
    const access_token = req.cookies.access_token;
    const response = await axios({
        method: 'DELETE',

        url: `http://localhost:3001/senhas/${id}`,

        headers: {
            Authorization: `Bearer ${access_token}`
        }            

    });

    console.log(response.data);

    res.redirect("/senha");
});

// Rota para atualizar a senha
app.post("/senha/update/:id", async function (req: Request, res: Response) {
    const id = req.params.id;
    const body = req.body;

    try {

        const access_token = req.cookies.access_token;
        const response = await axios({
            method: 'PUT',

            url: `http://localhost:3001/senhas/${id}`,

            headers: {
                Authorization: `Bearer ${access_token}`
            },
            
            data: {
                nome: body.nome,
                valor: body.valor
            }

        });

        console.log(response.data);

        res.redirect("/senha");

    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao editar senha!");
    }
});

// Rota para excluir o usuário
app.post("/usuario/delete/:id", async function (req: Request, res: Response) {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM usuario WHERE id = ?";
    await connection.query(sqlDelete, [id]);

    res.redirect("/usuario");
});

app.listen('3000', () => console.log("Server is listening on port 3000"));

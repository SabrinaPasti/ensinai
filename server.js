// Carregar variáveis de ambiente
require('dotenv').config();

// Importar dependências
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const app = express();

// Configuração do servidor Express
app.use(express.json()); // Para parsear requisições com JSON
app.use(express.static('assets')); // Serve os arquivos estáticos da pasta 'assets'

// Configurar o cliente do Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/index.html'); 

});
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html'); 

});

app.get('/dashbord', (req, res) => {
    res.sendFile(__dirname + '/dashbord.html'); 

});

app.get('/esqueci-senha', (req, res) => {
    res.sendFile(__dirname + '/senhaE.html'); 

});

app.get('/listagem-aulas', (req, res) => {
    res.sendFile(__dirname + '/telaListagemAulas.html'); 

});

app.get('/listagem-cursos', (req, res) => {
    res.sendFile(__dirname + '/telaListagemCursos.html'); 

});

app.get('/historico', (req, res) => {
    res.sendFile(__dirname + '/historico.html'); 

});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        console.log('Resposta do Supabase:', { data, error });

        if (error) {
            return res.status(400).json({ message: error.message });
        }

        // Retorna um JSON indicando sucesso e a URL para redirecionar
        res.json({ success: true, message: 'Login realizado com sucesso!', redirectUrl: '/index' });
    } catch (err) {
        console.error('Erro ao processar o login:', err);
        res.status(500).json({ message: 'Erro interno do servidor', error: err });
    }
});



// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

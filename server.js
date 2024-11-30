// Carregar variáveis de ambiente
require('dotenv').config();

// Importar dependências
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const app = express();

// Configuração do servidor Express
app.use(express.json()); // Para parsear requisições com JSON
app.use(express.static('assets')); // Serve os arquivos estáticos da pasta 'assets'

// Configurando o EJS como a engine de visualização
// Configura o EJS como engine de templates
app.set('view engine', 'ejs');
const path = require('path'); // Módulo para trabalhar com caminhos

// Define o caminho das views como o diretório raiz
app.set('views', path.join(__dirname));

// Configurar o cliente do Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.set('view engine', 'ejs');



app.get('/index', (req, res) => {
    res.render('index');

});

app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    try {
        // Consulta na tabela 'alunos' para verificar se o email existe
        const { data: aluno, error: alunoError } = await supabase
            .from('alunos')
            .select('*')
            .eq('email', email)  // Aqui usamos o email fornecido
            .single(); // Garantimos que é um único resultado

        if (alunoError) {
            return res.status(400).json({ message: 'Erro ao buscar aluno' });
        }

        // Verifica se a senha fornecida é igual à senha armazenada no banco
        if (aluno.senha !== senha) {
            return res.status(400).json({ message: 'Senha incorreta' });
        }

        // Se as credenciais estiverem corretas, podemos redirecionar para o dashboard
        res.json({
            success: true,
            message: 'Login realizado com sucesso!',
            redirectUrl: `${aluno.id_aluno}/dashboard/`, // Redireciona para o dashboard do aluno
        });

    } catch (err) {
        console.error('Erro ao processar o login:', err);
        res.status(500).json({ message: 'Erro interno do servidor', error: err });
    }
});

app.get('/login', (req, res) => {
    res.render('login');

});

app.get('/esqueci-senha', (req, res) => {
    res.render('senhaE');

});

app.get('/:id/perfil', async (req, res) => {
    const id_aluno = parseInt(req.params.id);

    // Consulta no Supabase
    const { data: aluno, error: alunoError } = await supabase
        .from('alunos')
        .select('*')
        .eq('id_aluno', id_aluno)
        .single(); // Garante que retorna um único registro

    // Log da consulta
    console.log('Resposta da consulta aluno:', { aluno, alunoError });

    // Tratamento de erro
    if (alunoError) {
        console.error('Erro ao buscar aluno:', alunoError);
        return res.status(500).send('Erro ao buscar dados do aluno.');
    }

    // Renderiza a página de perfil com os dados do aluno
    res.render('certificadosPerfil', { aluno });
});

app.get('/:id/dashboard', async (req, res) => {
    const id_aluno = parseInt(req.params.id);

    // Consulta no Supabase
    const { data: aluno, error: alunoError } = await supabase
        .from('alunos')
        .select('*')
        .eq('id_aluno', id_aluno)
        .single(); // Garante que retorna um único registro

    // Log da consulta
    console.log('Resposta da consulta aluno:', { aluno, alunoError });

    // Tratamento de erro
    if (alunoError) {
        console.error('Erro ao buscar aluno:', alunoError);
        return res.status(500).send('Erro ao buscar dados do aluno.');
    }

    // Renderização do template
    res.render('dashboard', { aluno });
});

//LISTAGEM CURSOS
app.get('/:id/cursos', async (req, res) => {
    const id_aluno = parseInt(req.params.id);

    try {
        // Consulta os cursos do aluno
        const { data: alunoCurso, error: alunoCursoError } = await supabase
            .from('aluno_curso')
            .select('*')
            .eq('id_aluno', id_aluno);

        if (alunoCursoError) {
            console.error('Erro ao buscar aluno_curso:', alunoCursoError);
            return res.status(400).send('Erro ao buscar cursos.');
        }

        if (!alunoCurso || alunoCurso.length === 0) {
            return res.status(404).send('Nenhum curso encontrado.');
        }

        // Obter os cursos e as aulas do aluno
        const cursoIds = alunoCurso.map(ac => ac.id_curso);
        const { data: cursos, error: cursosError } = await supabase
            .from('cursos')
            .select('*')
            .in('id_curso', cursoIds);

        if (cursosError) {
            console.error('Erro ao buscar cursos:', cursosError);
            return res.status(400).send('Erro ao buscar cursos.');
        }

        const aulas = await Promise.all(cursos.map(async (curso) => {
            const { data: aulas, error: aulasError } = await supabase
                .from('aulas')
                .select('*')
                .eq('id_curso', curso.id_curso);

            if (aulasError) {
                console.error('Erro ao buscar aulas:', aulasError);
                return [];
            }
            return aulas;
        }));

        
        res.render('telaListagemCursos', { cursos, aulas, id_aluno });
    } catch (error) {
        console.error('Erro inesperado:', error);
        res.status(500).send('Erro interno do servidor.');
    }
});


//LISTAGEM AULAS
app.get('/:id/:idcurso/aulas', async (req, res) => {
    const id_aluno = parseInt(req.params.id); // ID do aluno
    const id_curso = parseInt(req.params.idcurso); // ID do curso

    try {
        console.log('ID do aluno:', id_aluno);
        console.log('ID do curso:', id_curso);

        // Verificar se o aluno está matriculado em algum curso
        const { data: alunoCurso, error: alunoCursoError } = await supabase
            .from('aluno_curso')
            .select('*')
            .eq('id_aluno', id_aluno);

        if (alunoCursoError) {
            console.error('Erro ao buscar aluno_curso:', alunoCursoError);
            return res.status(400).send('Erro ao buscar cursos do aluno.');
        }

        if (!alunoCurso || alunoCurso.length === 0) {
            return res.status(404).send('Nenhum curso encontrado para o aluno.');
        }

        // Verificar se o curso pertence à lista de cursos do aluno
        const alunoInscritoNoCurso = alunoCurso.some(ac => ac.id_curso === id_curso);
        if (!alunoInscritoNoCurso) {
            return res.status(403).send('O aluno não está inscrito neste curso.');
        }

        // Buscar detalhes do curso específico
        const { data: curso, error: cursoError } = await supabase
            .from('cursos')
            .select('*')
            .eq('id_curso', id_curso)
            .single(); // single() para retornar apenas um curso

        if (cursoError) {
            console.error('Erro ao buscar curso:', cursoError);
            return res.status(500).send('Erro ao buscar curso.');
        }

        if (!curso) {
            return res.status(404).send('Curso não encontrado.');
        }

        // Buscar todas as aulas desse curso
        const { data: aulas, error: aulasError } = await supabase
            .from('aulas')
            .select('*')
            .eq('id_curso', id_curso);

        if (aulasError) {
            console.error('Erro ao buscar aulas:', aulasError);
            return res.status(500).send('Erro ao buscar aulas.');
        }

        if (!aulas || aulas.length === 0) {
            return res.status(404).send('Nenhuma aula encontrada para este curso.');
        }

        // Renderizar a página com todas as aulas desse curso
        res.render('telaListagemAulas', { aulas, curso, id_aluno });
    } catch (error) {
        console.error('Erro ao processar a requisição:', error);
        res.status(500).send('Erro interno do servidor.');
    }
});

// INTERNA DA AULA
app.get('/:id/:idcurso/:idaula/interna-aula', async (req, res) => {
    const id_aluno = parseInt(req.params.id);
    const id_curso = parseInt(req.params.idcurso);
    const id_aula = parseInt(req.params.idaula);

    try {
        // Verifique os dados de aula
        const { data: aula, error: aulaError } = await supabase
            .from('aulas')
            .select('*')
            .eq('id_aula', id_aula)
            .eq('id_curso', id_curso)
            .single(); // Usa single para pegar uma única linha

        if (aulaError) {
            console.error('Erro ao buscar aula:', aulaError);
            return res.status(500).send('Erro ao buscar aula.');
        }

        if (!aula) {
            return res.status(404).send('Aula não encontrada.');
        }

        const arquivoUrl = aula.arquivo ? `${supabaseUrl}/storage/v1/object/public/ARQUIVOS/${aula.arquivo}` : null;

        // Passar os dados para a view
        res.render('internaAula', { 
            aula: aula, 
            arquivoUrl: arquivoUrl 
        });

    } catch (error) {
        console.error('Erro inesperado:', error);
        res.status(500).send('Erro interno do servidor.');
    }
});

// Rota para registrar o tempo gasto na aula
app.post('/concluir-aula/:idAula', async (req, res) => {
    const idAula = parseInt(req.params.idAula); // ID da aula que o aluno está concluindo
    const { tempoGasto } = req.body; // Tempo gasto que vem no corpo da requisição

    try {
        console.log(`Recebido tempo de ${tempoGasto} minutos para a aula ${idAula}`);

        // Atualiza o tempo gasto na aula no banco de dados (substitua com sua consulta ao banco)
        const { data, error } = await supabase
            .from('aulas')
            .update({ tempo_gasto: tempoGasto })
            .eq('id_aula', idAula); // Filtra pela aula específica usando o idAula

        if (error) {
            console.error('Erro ao atualizar o tempo da aula:', error);
            return res.status(400).send('Erro ao atualizar o tempo da aula.');
        }

        console.log('Tempo atualizado com sucesso:', data);
        return res.status(200).send('Tempo registrado com sucesso.');
    } catch (error) {
        console.error('Erro inesperado:', error);
        res.status(500).send('Erro interno do servidor.');
    }
});

app.get('/:id/historico', (req, res) => {
    const id_aluno = parseInt(req.params.id);        // ID do aluno

    res.render('historico', { id_aluno });

});


// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

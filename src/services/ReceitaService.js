
import  HTTPClient  from "./ClientApiService"



const ReceitaService = {
    async criarAsync(produtoId, quantidade, precoUnitario, dataReceita, usuarioId ) {
        try {
            const receitaCriar = {
                ProdutoId: parseInt(produtoId),
                Quantidade: Number(quantidade),
                PrecoUnitario: Number(precoUnitario),
                DataReceita: dataReceita,
                UsuarioId: parseInt(usuarioId)
            };
            const resposta = await HTTPClient.post("/Receita/Criar", receitaCriar);
            return resposta.data;
        }
        catch (error) {
            console.error("Erro ao criar a receita.", error);
            throw error;
        }
    },

    async obterAsync(receitaId) {
        try {
            const resposta = await HTTPClient.get(`/Receita/Obter/${receitaId}`);
            return resposta.data;
        }
        catch (error) {
            console.error("Erro ao obter a receita.", error)
            throw error;
        }
    },

    async atualizarAsync(id, produtoId, quantidade, precoUnitario, dataReceita, usuarioId, ativo) {
        try {
            const receita = {
                Id: id,
                ProdutoId: parseInt(produtoId),
                Quantidade: Number(quantidade),
                PrecoUnitario: Number(precoUnitario),
                DataReceita: dataReceita,
                UsuarioId: parseInt(usuarioId),
                Ativo: ativo
            };
            const resposta = await HTTPClient.put("/Receita/Atualizar", receita);
            return resposta.data;
        }
        catch (error) {
            console.error("Erro ao atualizar a receita.", error);
            throw error;
        }
    },

    async deletarAsync(receitaId) {
        try {
            const resposta = await HTTPClient.delete(`/Receita/Deletar/${receitaId}`);
            return resposta.data;
        }
        catch (error) {
            console.error("Erro ao deletar a receita.", error);
            throw error;
        }
    },

    async listarAsync() {
        try {
            const resposta = await HTTPClient.get("/Receita/Listar");
            return resposta.data;
        }
        catch (error) {
            console.error("Erro ao listar as receitas.", error);
            throw error;
        }
    }
}
export default ReceitaService;

import  HTTPClient  from "./ClientApiService"


const ProdutoService = {
    async criarAsync(nome, descricao, precoCusto, precoVenda, usuarioId) {
        try {
            const produtoCriar = {
                Nome: nome,
                Descricao: descricao,
                PrecoCusto: Number(precoCusto),
                PrecoVenda: Number(precoVenda),
                UsuarioId: parseInt(usuarioId)
            };
            const resposta = await HTTPClient.post("/Produto/Criar", produtoCriar);
            return resposta.data;
        }
        catch (error) {
            console.error("Erro ao criar produto.", error);
            throw error;
        }
    },

    async obterAsync(produtoId) {
        try {
            const resposta = await HTTPClient.get(`/Produto/Obter/${produtoId}`);
            return resposta.data;
        }
        catch (error) {
            console.error("Erro ao obter produto.", error)
            throw error;
        }
    },

    async atualizarAsync(id, nome, precoCusto, precoVenda, ativo) {
        try {
            const produto = {
                Id: id,
                Nome: nome,
                PrecoCusto: Number(precoCusto),
                PrecoVenda: Number(precoVenda),
                Ativo: ativo
            };
            const resposta = await HTTPClient.put("/Produto/Atualizar", produto);
            return resposta.data;
        }
        catch (error) {
            console.error("Erro ao atualizar produto.", error);
            throw error;
        }
    },

    async deletarAsync(produtoId) {
        try {
            const resposta = await HTTPClient.delete(`/Produto/Deletar/${produtoId}`);
            return resposta.data;
        }
        catch (error) {
            console.error("Erro ao deletar produto.", error);
            throw error;
        }
    },

    async listarAsync() {
        try {
            const resposta = await HTTPClient.get("/Produto/Listar");
            return resposta.data;
        }
        catch (error) {
            console.error("Erro ao listar produtos.", error);
            throw error;
        }
    }
}
export default ProdutoService;
    
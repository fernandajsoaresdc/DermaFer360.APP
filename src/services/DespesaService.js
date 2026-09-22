
import  HTTPClient  from "./ClientApiService"



const DespesaService = {
    async criarAsync(descricao, valor, dataDespesa, usuarioId ) {
        try {
            const despesaCriar = {
                Descricao: descricao,
                Valor: Number(valor),
                DataDespesa: dataDespesa,
                UsuarioId: parseInt(usuarioId)
            };
            const resposta = await HTTPClient.post("/Despesa/Criar", despesaCriar);
            return resposta.data;
        }
        catch (error) {
            console.error("Erro ao criar a despesa.", error);
            throw error;
        }
    },

    async obterAsync(despesaId) {
        try {
            const resposta = await HTTPClient.get(`/Despesa/Obter/${despesaId}`);
            return resposta.data;
        }
        catch (error) {
            console.error("Erro ao obter a despesa.", error)
            throw error;
        }
    },

    async atualizarAsync(id, descricao, valor, dataDespesa, usuarioId, ativo) {
        try {
            const despesa = {
                Id: id,
                Descricao: descricao,
                Valor: Number(valor),
                DataDespesa: dataDespesa,
                UsuarioId: parseInt(usuarioId),
                Ativo: ativo
            };
            const resposta = await HTTPClient.put("/Despesa/Atualizar", despesa);
            return resposta.data;
        }
        catch (error) {
            console.error("Erro ao atualizar a despesa.", error);
            throw error;
        }
    },

    async deletarAsync(despesaId) {
        try {
            const resposta = await HTTPClient.delete(`/Despesa/Deletar/${despesaId}`);
            return resposta.data;
        }
        catch (error) {
            console.error("Erro ao deletar a despesa.", error);
            throw error;
        }
    },

    async listarAsync() {
        try {
            const resposta = await HTTPClient.get("/Despesa/Listar");
            return resposta.data;
        }
        catch (error) {
            console.error("Erro ao listar as despesas.", error);
            throw error;
        }
    }
}
export default DespesaService;
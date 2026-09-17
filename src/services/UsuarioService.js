
import { HTTPClient } from "./ClientApiService"

const UsuarioService = {
    async criarAsync(nome, email, senha, cargo) {
        try {
            const usuariocriar = {
                Nome: nome,
                Email: email,
                Senha: senha,
                Cargo: parseInt(cargo)
            };
            const resposta = await HTTPClient.post(`/Usuario/Criar`, usuariocriar);
            return resposta.data;
        }
        catch (error) {
            console.error("Erro ao criar usuário.", error);
            throw error;
        }
    },

    async ObterAsync(usuarioId) {
        try {
            const resposta = await HTTPClient.get(`/Usuario/Obter/${usuarioId}`);
            return resposta.data;
        }
        catch (error) {
            console.error("Erro ao obter usuário.", error)
            throw error;
        }
    },

    async atualizarAsync(id, nome, email, cargo, ativo) {
        try {
            const usuario = {
                Id: id,
                Nome: nome,
                Email: email,
                Cargo: parseInt(cargo),
                Ativo: ativo
            };
            const resposta = await HTTPClient.put(`/Usuario/Atualizar`, usuario);
            return resposta.data;
        }
        catch (error) {
            console.error("Erro ao atualizar usuário.", error);
            throw error;
        }
    },

    async alterarSenhaAsync(id, senha, senhaAntiga) {
        try {
            const usuarioAlterarSenha = {
                Id: id,
                Senha: senha,
                senhaAntiga: senhaAntiga
            };
            const resposta = await HTTPClient.put(`/Usuario/AlterarSenha`, usuarioAlterarSenha);
            return resposta.data;
        }
        catch (error) {
            console.error("Erro ao alterar a senha do usuário", error);
            throw error;
        }

    },

    async deletarAsync(usuarioId) {
        try {
            const resposta = await HTTPClient.delete(`/Usuario/Deletar/${usuarioId}`);
            return resposta.data;
        }
        catch (error) {
            console.error("Erro ao deletar usuário.", error);
            throw error;
        }
    },

    async listarAsync() {
        try {
            const resposta = await HTTPClient.get(`/Usuario/Listar`);
            return resposta.data;
        }
        catch (error) {
            console.error("Erro ao listar usuários.", error);
        }
    },

    async listarCargosAsync() {
        try {

            const response = await HTTPClient.get("/Usuario/ListarCargos");
            return response.data;
        } 
        catch (error) {
            console.error("Erro ao listar cargos:", error);
            throw error;
        }
    },

    async restaurarAsync(usuarioId) {
        try {
            const resposta = await HTTPClient.put(`/Usuario/Restaurar/${usuarioId}`);
            return resposta.data;
        }
        catch (error) {
            console.error("Erro ao restaurar usuário.", error);
            throw error;
        }
    }
}
export default UsuarioService;
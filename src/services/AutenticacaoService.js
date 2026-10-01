import { HTTPClient } from "./ClientApiService";

const AutenticacaoService = {

    async LoginAsync(email, senha) {

        try {

            const loginCriar = {
                Email: email,
                Senha: senha
            };


            const resposta = await HTTPClient.post("/Autenticacao/Login",loginCriar);


            return resposta.data;

        } catch (error) {

            console.error("Erro ao logar.", error);

            throw error;
        }
    }

};

export default AutenticacaoService;
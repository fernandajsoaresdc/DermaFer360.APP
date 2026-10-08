import { HTTPClient } from "./ClientApiService";

const IAService = {
    perguntarAsync: async (pergunta) => {
        const resposta = await HTTPClient.post("/IA/Perguntar", {
            pergunta: pergunta
        });

        return resposta.data.resposta;
    }
};

export default IAService;
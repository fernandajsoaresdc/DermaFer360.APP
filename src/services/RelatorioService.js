import HTTPClient from "./ClientApiService";

const RelatorioService = {

    async dashboard() {
        try {
            const resposta = await HTTPClient.get("/Relatorio/Dashboard");
            return resposta.data;
        } catch (error) {
            console.error("Erro ao carregar dashboard.", error);
            throw error;
        }
    },

    async gerarRelatorioAsync(dataInicial, dataFinal) {
        try {
            const relatorio = {
                DataInicial: dataInicial,
                DataFinal: dataFinal
            };

            const resposta = await HTTPClient.post(
                "/Relatorio/RelatorioFinanceiro",
                relatorio
            );

            return resposta.data;
        } catch (error) {
            console.error("Erro ao carregar o relatório.", error);
            throw error;
        }
    }

};

export default RelatorioService;
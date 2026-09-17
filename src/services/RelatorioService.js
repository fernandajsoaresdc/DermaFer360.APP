
import { HTTPClient } from "./ClientApiService"

const RelatorioService = {
    async gerarRelatorioAsync(dataInicial, dataFinal)
    {
        try{
            const relatorio = {
                DataInicial: dataFinal,
                DataFinal: dataFinal
            };
            const resposta = await HTTPClient.post("/Relatorio/RelatorioFinanceiro", relatorio);
            return resposta.data;
        }
        catch(error)
        {
            console.error("Erro ao carregar o relatório.", error);
            throw error;
        }
    }
}
export default RelatorioService;
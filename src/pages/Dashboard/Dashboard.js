import { useEffect, useState } from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Topbar } from "../../components/Topbar/Topbar";
import RelatorioService from "../../services/RelatorioService";
import { CardFinanceiro } from "../../components/CardFinanceiro/CardFinanceiro";
import { GraficoFinanceiro } from "../../components/GraficoFinanceiro/GraficoFinanceiro";
import { UltimasReceitas } from "../../components/UltimasReceitas/UltimasReceitas";
import { BsCashCoin, BsCash, BsFillClipboardCheckFill, BsGraphUp } from "react-icons/bs";
import style from "./Dashboard.module.css";

export function Dashboard() {

    const hoje = new Date();
    const primeiroDiaMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1)
        .toISOString()
        .split("T")[0];

    const ultimoDiaMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0)
        .toISOString()
        .split("T")[0];

    const [dataInicial, setDataInicial] = useState(primeiroDiaMes);
    const [dataFinal, setDataFinal] = useState(ultimoDiaMes);
    const [dataInicialFiltro, setDataInicialFiltro] = useState(primeiroDiaMes);
    const [dataFinalFiltro, setDataFinalFiltro] = useState(ultimoDiaMes);
    const [receitaTotal, setReceitaTotal] = useState(0);
    const [despesaTotal, setDespesaTotal] = useState(0);
    const [lucro, setLucro] = useState(0);
    const [estoque, setEstoque] = useState(0);

    const [grafico, setGrafico] = useState([]);
    const [ultimasReceitas, setUltimasReceitas] = useState([]);

    const alterarDataInicial = (e) => {
        const novaData = e.target.value;
        setDataInicial(novaData);

        if (dataFinal && novaData > dataFinal) {
            setDataFinal(novaData);
        }
    };

    const alteraDataFinal = (e) => {
        const novaData = e.target.value;

        if (dataInicial && novaData < dataInicial) {
            return;
        }

        setDataFinal(novaData);
    };


    async function carregarDashboard() {

        try {
            const dashboard = await RelatorioService.dashboard(dataInicialFiltro, dataFinalFiltro);

            setReceitaTotal(dashboard.receitaTotal ?? 0);
            setDespesaTotal(dashboard.despesaTotal ?? 0);
            setLucro(dashboard.lucroTotal ?? 0);
            setEstoque(dashboard.produtosEstoque ?? 0);

            setGrafico(
                Array.isArray(dashboard.graficoFinanceiro)
                    ? dashboard.graficoFinanceiro
                    : []
            );

            setUltimasReceitas(dashboard.ultimasReceitas ?? [])
        }
        catch (error) {
            console.error("Erro ao carregar a Dashboard.", error);
        }
    }

    useEffect(() => {
        carregarDashboard();

    }, []);

    useEffect(() => {
        carregarDashboard();
    }, [dataInicialFiltro, dataFinalFiltro]);



    return (
        <Sidebar>
            <Topbar >
                <div className={style.dashboard}>

                    <div className={style.titulo}>
                        <h1>Dashboard Financeira</h1>
                        
                        <span>Departamento Financeiro - DermaFer360</span>
                    </div>

                    <div className={style.filtroDatas}>
                        <div>
                            <label>Data Inicial</label>

                            <input
                                type="date"
                                value={dataInicial}
                                onChange={alterarDataInicial}
                            />
                        </div>

                        <div>
                            <label>Data Final</label>

                            <input
                                type="date"
                                value={dataFinal}
                                min={dataInicial}
                                onChange={alteraDataFinal}
                            />
                        </div>

                        <button className={style.botaoFiltrarData} onClick={() => {

                            if (dataFinal < dataInicial) {
                                alert("A data final não pode ser menor que a data inicial.");
                                return;
                            }

                            setDataInicialFiltro(dataInicial);
                            setDataFinalFiltro(dataFinal);
                        }}
                        >
                            Filtrar Data

                        </button>
                    </div>

                    <div className={style.cards}>

                        <CardFinanceiro

                            titulo="Receita Total"
                            valor={`R$ ${receitaTotal.toFixed(2)}`}
                            icone={<BsCashCoin />}
                            cor="receita"

                        />

                        <CardFinanceiro

                            titulo="Despesas"
                            valor={`R$ ${despesaTotal.toFixed(2)}`}
                            icone={<BsCash />}
                            cor="despesa"

                        />

                        <CardFinanceiro

                            titulo="Lucro Liquído"
                            valor={`R$ ${lucro.toFixed(2)}`}
                            icone={<BsGraphUp />}
                            cor="lucro"

                        />

                        <CardFinanceiro

                            titulo="Produtos em estoque"
                            valor={estoque}
                            icone={<BsFillClipboardCheckFill />}
                            cor="estoque"

                        />

                        <div className={style.graficos}>

                            <GraficoFinanceiro dados={grafico} />

                        </div>

                        <div className={style.informacoes}>

                            <UltimasReceitas receitas={ultimasReceitas} />

                        </div>

                    </div>
                </div>
            </Topbar>
        </Sidebar>
    )
}


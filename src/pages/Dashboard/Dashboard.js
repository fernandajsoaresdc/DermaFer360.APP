import { useEffect, useState } from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Topbar } from "../../components/Topbar/Topbar";
import ReceitaService from "../../services/ReceitaService";
import DespesaService from "../../services/DespesaService";
import ProdutoService from "../../services/ProdutoService";
import RelatorioService from "../../services/RelatorioService";
import { CardFinanceiro } from "../../components/CardFinanceiro/CardFinanceiro";
import { GraficoFinanceiro } from "../../components/GraficoFinanceiro/GraficoFinanceiro";
import { UltimasReceitas } from "../../components/UltimasReceitas/UltimasReceitas";
import { BsCashCoin, BsCash, BsFillClipboardCheckFill, BsGraphUp } from "react-icons/bs";
import style from "./Dashboard.module.css";

export function Dashboard() {
    const [receitaTotal, setReceitaTotal] = useState(0);
    const [despesaTotal, setDespesaTotal] = useState(0);
    const [lucro, setlucro] = useState(0);
    const [estoque, setEstoque] = useState(0);

    const [grafico, setGrafico] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [ultimasReceitas, setUltimasReceitas] = useState([]);

    useEffect(() => {

        async function carregarDashboard() {

            const receita = await ReceitaService.listarAsync();
            const despesa = await DespesaService.listarAsync();
            const produtosEstoque = await ProdutoService.listarAsync();
            const relatorio = await RelatorioService.dashboard();

            const totalReceitas = receitas.reduce(
                (total, item) => total + item.valorTotal, 0);

            const totalDespesas = despesas.reduce(
                (total, item) => total + item.valor, 0);
            

            setReceitaTotal(totalReceitas);
            setDespesaTotal(totalDespesas);
            setlucro(totalReceitas - totalDespesas);
            setEstoque(produtosEstoque.lenght);

            setGrafico(relatorio.GraficoFinanceiro || []);
            setUltimasReceitas(relatorio.ultimasReceitas || []);
        }

        carregarDashboard();

    }, []);

    return (
        <Sidebar>
            <Topbar />
            <div className={style.dashboard}>

                <div className={style.titulo}>
                    <h1>Dashboard Financeira</h1>
                    <span>Departamento Financeiro - DermaFer360</span>
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
        </Sidebar>
    );
}

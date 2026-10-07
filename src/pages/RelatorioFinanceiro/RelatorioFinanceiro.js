import { useEffect, useState } from "react";
import style from "./RelatorioFinanceiro.module.css";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Topbar } from "../../components/Topbar/Topbar";
import ReceitaService from "../../services/ReceitaService";
import DespesaService from "../../services/DespesaService";
import ProdutoService from "../../services/ProdutoService";

const valor = (d) => Number(d.valor ?? 0);

const dataDespesa = (d) => d.dataDespesa ?? d.data;

const descricao = (d) => d.descricao ?? "Despesa";

const formatarMoeda = (valor) =>
    Number(valor ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL", });

const formatarData = (valor) => {
    if (!valor) {
        return "";
    }

    const [ano, mes, dia] = valor.slice(0, 10).split("-");

    return `${dia}/${mes}/${ano}`;
};

export function RelatorioFinanceiro() {
    const [receitas, setReceitas] = useState([]);
    const [despesas, setDespesas] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [dataInicial, setDataInicial] = useState("");
    const [dataFinal, setDataFinal] = useState("");
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const [listaReceitas, listaDespesas, listaProdutos] =
                    await Promise.all([
                        ReceitaService.listarAsync(),
                        DespesaService.listarAsync(),
                        ProdutoService.listarAsync(),
                    ]);

                setReceitas(Array.isArray(listaReceitas) ? listaReceitas : []);
                setDespesas(Array.isArray(listaDespesas) ? listaDespesas : []);
                setProdutos(Array.isArray(listaProdutos) ? listaProdutos : []);

            }
            catch (error) {
                console.error("Erro ao carregar o relatório.", error);
            }
            finally {
                setCarregando(false);
            }
        };

        carregarDados();
    }, []);

    const nomeProduto = (produtoId) => produtos.find((p) => p.id === produtoId)?.nome ?? `Produto ${produtoId}`;

    const periodo = (data) => {

        const dia = (data ?? "").slice(0, 10);

        if (dataInicial && dia < dataInicial) {
            return false;
        }

        if (dataFinal && dia > dataFinal) {
            return false;
        }

        return true;
    };

    const receitasPeriodo = receitas.filter((r) => r.ativo && periodo(r.dataReceita));

    const despesasPeriodo = despesas.filter((d) => d.ativo !== false && periodo(dataDespesa(d)));

    const totalReceitas = receitasPeriodo.reduce((soma, r) => soma + r.quantidade * r.precoUnitario, 0);

    const totalDespesas = despesasPeriodo.reduce((soma, d) => soma + valor(d), 0);

    const saldo = totalReceitas - totalDespesas;

    const movimentacoes = [
        ...receitasPeriodo.map((r) => ({
            chave: `r-${r.id}`,
            data: r.dataReceita,
            tipo: "Receita",
            descricao: `${nomeProduto(r.produtoId)} (${r.quantidade} un.)`,
            valor: r.quantidade * r.precoUnitario,
        })),

        ...despesasPeriodo.map((d) => ({
            chave: `d-${d.id}`,
            data: dataDespesa(d),
            tipo: "Despesa",
            descricao: descricao(d),
            valor: valor(d),
        })),
    ].sort((a, b) => (b.data ?? "").localeCompare(a.data ?? ""));

    const limparFiltro = () => {
        setDataInicial("");
        setDataFinal("");
    };

    return (
        <Sidebar>
            <Topbar>

                <div className={style.pagina_conteudo}>
                    <div className={style.pagina_cabecalho}>
                        <h3>Relatório Financeiro</h3>

                        <span>
                            Relatório de receitas e despesas
                        </span>
                    </div>
                </div>

                <div className={style.filtros}>

                    <div className={style.campo}>
                        <label htmlFor="dataInicial">
                            Data inicial
                        </label>

                        <input
                            id="dataInicial"
                            type="date"
                            value={dataInicial}
                            onChange={(e) => setDataInicial(e.target.value)}
                        />
                    </div>

                    <div className={style.campo}>
                        <label htmlFor="dataFinal">
                            Data final
                        </label>

                        <input
                            id="dataFinal"
                            type="date"
                            value={dataFinal}
                            onChange={(e) => setDataFinal(e.target.value)}
                        />
                    </div>

                    <button className={style.botao_limpar} onClick={limparFiltro}
                    >
                        Limpar filtro
                    </button>

                </div>

                {erro && ( <p className={style.erro}>{erro}</p>)}

                {carregando && (<p className={style.aviso}>Carregando relatório...</p>)}

                <div className={style.cards}>

                    <div
                        className={`${style.card} ${style.receita}`}
                    >
                        <span>Total de receitas</span>

                        <strong>
                            {formatarMoeda(totalReceitas)}
                        </strong>
                    </div>

                    <div className={`${style.card} ${style.despesa}`}
                    >
                        <span>Total de despesas</span>

                        <strong>
                            {formatarMoeda(totalDespesas)}
                        </strong>
                    </div>

                    <div className={`${style.card} ${saldo >= 0 ? style.saldo_positivo : style.saldo_negativo}`}
                    >
                        <span>Saldo</span>

                        <strong>
                            {formatarMoeda(saldo)}
                        </strong>
                    </div>

                </div>

                <div className={style.tabela}>

                    <table>

                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Tipo</th>
                                <th>Descrição</th>
                                <th className={style.numero}>Valor
                                </th>
                            </tr>
                        </thead>

                        <tbody>

                            {movimentacoes.map((item) => (
                                <tr key={item.chave}>

                                    <td>
                                        {formatarData(item.data)}
                                    </td>

                                    <td>
                                        <span className={ item.tipo === "Receita" ? style.etiqueta_receita: style.etiqueta_despesa }
                                        >
                                            {item.tipo}
                                        </span>
                                    </td>

                                    <td>
                                        {item.descricao}
                                    </td>

                                    <td className={style.numero}> {formatarMoeda(item.valor)}</td>

                                </tr>
                            ))}

                            {!carregando && movimentacoes.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className={style.vazio}
                                        >
                                            Nenhuma movimentação no período.
                                        </td>
                                    </tr>
                                )}

                        </tbody>

                    </table>

                </div>

            </Topbar>
        </Sidebar>
    );
}





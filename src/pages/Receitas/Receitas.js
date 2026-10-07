import { useEffect, useState } from "react";
import { MdSearch, MdEdit, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import style from "./Receitas.module.css";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Topbar } from "../../components/Topbar/Topbar";
import ReceitaService from "../../services/ReceitaService";
import ProdutoService from "../../services/ProdutoService";
import { Modal, Button } from "react-bootstrap";

const formatarMoeda = (valor) =>
    Number(valor ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const formatarData = (valor) => {
    if (!valor) {
        return "";
    }

    const [ano, mes, dia] = valor.slice(0, 10).split("-");
    return `${dia}/${mes}/${ano}`;
};

export function Receitas() {
    const [receitas, setReceitas] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarModalSucesso, setMostrarModalSucesso] = useState(false);
    const [receitaSelecionada, setReceitaSelecionada] = useState(null);
    const [busca, setBusca] = useState("");
    const [carregando, setCarregando] = useState(false);

    const nomeProduto = (produtoId) =>
        produtos.find((p) => p.id === produtoId)?.nome ?? `Produto ${produtoId}`;

    async function carregarDados() {
        try {
            setCarregando(true);

            const listaReceitas = await ReceitaService.listarAsync();
            const listaProdutos = await ProdutoService.listarAsync();

            setReceitas(Array.isArray(listaReceitas) ? listaReceitas : []);
            setProdutos(Array.isArray(listaProdutos) ? listaProdutos : []);
        }
        catch (error) {
            console.error("Erro ao carregar receitas.", error);
        }
        finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarDados();
    }, []);

    const handleClickExcluir = (receita) => {
        setReceitaSelecionada(receita);
        setMostrarModal(true);
    };

    const handleFecharModal = () => {
        setMostrarModal(false);
        setReceitaSelecionada(null);
    };

    const handleExcluir = async () => {
        if (!receitaSelecionada) {
            return;
        }

        try {
            await ReceitaService.deletarAsync(receitaSelecionada.id);
            await carregarDados();

            handleFecharModal();
            setMostrarModalSucesso(true);

            setTimeout(() => {
                setMostrarModalSucesso(false);
            }, 1300);
        }
        catch (error) {
            console.error("Erro ao excluir receita.", error);
        }
    };

    const receitasFiltradas = receitas.filter((receita) => {
        const textoBusca = busca.toLowerCase();

        return receita.ativo && nomeProduto(receita.produtoId).toLowerCase().includes(textoBusca);
    });

    return (
        <Sidebar>
            <Topbar>
                <div className={style.pagina_conteudo}>
                    <div className={style.pagina_cabecalho}>
                        <h3>Receitas</h3>

                        <span>Gerenciamento de Receitas</span>
                    </div>

                    <Link to="/receita/novo" className={style.botao_novo}>+ Nova Receita</Link>
                </div>

                <div className={style.pesquisa}>
                    <MdSearch />

                    <input
                        type="text"
                        placeholder="Buscar por produto"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        maxLength={100}
                    />
                </div>

                {carregando && <p className={style.aviso}>Carregando receitas...</p>}

                <div className={style.tabela}>
                    <table>
                        <thead>
                            <tr>
                                <th>Produto</th>

                                <th>Data</th>

                                <th className={style.numero}>Quantidade</th>

                                <th className={style.numero}>Preço unitário</th>

                                <th className={style.numero}>Total</th>
                                
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {receitasFiltradas.map((receita) => (
                                <tr key={receita.id}>
                                    <td>{nomeProduto(receita.produtoId)}</td>
                                    <td>{formatarData(receita.dataReceita)}</td>
                                    <td className={style.numero}>{receita.quantidade}</td>
                                    <td className={style.numero}>{formatarMoeda(receita.precoUnitario)}</td>
                                    <td className={style.numero}>
                                        {formatarMoeda(receita.quantidade * receita.precoUnitario)}
                                    </td>

                                    <td>
                                        <Link
                                            to={`/receita/editar/${receita.id}`}
                                            className={style.botao_editar}
                                            title="Editar"
                                            aria-label="Editar receita"
                                        >
                                            <MdEdit />
                                        </Link>

                                        <button
                                            className={style.botao_excluir}
                                            onClick={() => handleClickExcluir(receita)}
                                            title="Excluir"
                                            aria-label="Excluir receita"
                                        >
                                            <MdDelete />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {!carregando && receitasFiltradas.length === 0 && (
                                <tr>
                                    <td colSpan={6} className={style.vazio}>
                                        Nenhuma receita encontrada.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <Modal show={mostrarModal} onHide={handleFecharModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmar</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Tem certeza que deseja excluir a receita de {receitaSelecionada && nomeProduto(receitaSelecionada.produtoId)}?
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleFecharModal}>
                            Cancelar
                        </Button>

                        <Button variant="danger" onClick={handleExcluir}>
                            Excluir
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={mostrarModalSucesso} onHide={() => setMostrarModalSucesso(false)}>
                    <Modal.Header>
                        <Modal.Title>Sucesso</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Receita excluída com sucesso.
                    </Modal.Body>
                </Modal>
            </Topbar>
        </Sidebar>
    );
}
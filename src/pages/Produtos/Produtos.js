import { useEffect, useState } from "react";
import { MdSearch, MdEdit, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import style from "./Produtos.module.css";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Topbar } from "../../components/Topbar/Topbar";
import ProdutoService from "../../services/ProdutoService";
import { Modal, Button } from "react-bootstrap";

const formatarMoeda = (valor) => Number(valor ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarModalSucesso, setMostrarModalSucesso] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [busca, setBusca] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function carregarProdutos() {
        try {
            setCarregando(true);
            const lista = await ProdutoService.listarAsync();

            setProdutos(Array.isArray(lista) ? lista : []);
        }
        catch (error) {
            console.error("Erro ao carregar produtos.", error);
        }
        finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarProdutos();
    }, []);

    const handleClickExcluir = (produto) => {
        setProdutoSelecionado(produto);
        setMostrarModal(true);
    };

    const handleFecharModal = () => {
        setMostrarModal(false);
        setProdutoSelecionado(null);
    };

    const handleExcluir = async () => {
        if (!produtoSelecionado) {
            return;
        }

        try {
            await ProdutoService.deletarAsync(produtoSelecionado.id);
            await carregarProdutos();

            handleFecharModal();
            setMostrarModalSucesso(true);

            setTimeout(() => {
                setMostrarModalSucesso(false);
            }, 1300);
        }
        catch (error) {
            console.error("Erro ao excluir produto", error);
        }
    };

    const produtosFiltrados = produtos.filter((produto) => {
        const textoBusca = busca.toLowerCase();

        return produto.ativo && (produto.nome?.toLowerCase().includes(textoBusca) || produto.descricao?.toLowerCase().includes(textoBusca));
    });

    return (
        <Sidebar>
            <Topbar>
                <div className={style.pagina_conteudo}>

                    <div className={style.pagina_cabecalho}>
                        <h3>Produtos</h3>

                        <span>Gerenciamento de produtos</span>
                    </div>

                    <Link to="/produto/novo" className={style.botao_novo}>+ Novo Produto</Link>
                </div>
                <div className={style.pesquisa}>
                    <MdSearch />

                    <input
                        type="text"
                        placeholder="Buscar produto por nome ou descrição"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        maxLength={100}
                    />
                </div>

                {carregando && <p className={style.aviso}>Carregando Produtos...</p>}

                <div className={style.tabela}>
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>

                                <th>Descrição</th>

                                <th className={style.numero}>Preço de custo</th>

                                <th className={style.numero}>Preço de venda</th>

                                <th className={style.numero}>Estoque</th>

                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {produtosFiltrados.map((produto) => (

                                <tr key={produto.id}>

                                    <td>
                                        {produto.nome}
                                    </td>

                                    <td>
                                        {produto.descricao}
                                    </td>

                                    <td className={style.numero}>
                                        {formatarMoeda(produto.precoCusto)}
                                    </td>

                                    <td className={style.numero}>
                                        {formatarMoeda(produto.precoVenda)}
                                    </td>

                                    <td className={style.numero}>
                                        {produto.estoque}
                                    </td>

                                    <td>
                                        <Link to={`/produto/editar/${produto.id}`} className={style.botao_editar}
                                            title="Editar"
                                            aria-label="Editar produto"
                                        >
                                            <MdEdit />

                                        </Link>

                                        <button className={style.botao_excluir} onClick={() => handleClickExcluir(produto)}
                                            title="Excluir"
                                            aria-label="Excluir produto"
                                        >
                                            <MdDelete />

                                        </button>
                                    </td>
                                </ tr>
                            ))}

                            {!carregando && produtosFiltrados.length === 0 && (
                                <tr>
                                    <td colSpan={6} className={style.vazio}>
                                        Nenhum produto encontrado.
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
                        Tem certeza que deseja excluir o produto {produtoSelecionado?.nome}?
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
                        Produto excluído com sucesso.
                    </Modal.Body>
                </Modal>
            </Topbar>
        </Sidebar>
    );
}
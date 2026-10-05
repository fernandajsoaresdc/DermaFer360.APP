import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import style from "./EditarProduto.module.css";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Topbar } from "../../components/Topbar/Topbar";
import ProdutoService from "../../services/ProdutoService";
import { Modal } from "react-bootstrap";



export function EditarProduto() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [precoCusto, setPrecoCusto] = useState("");
    const [precoVenda, setPrecoVenda] = useState("");
    const [estoque, setEstoque] = useState("");
    const [ativo, setAtivo] = useState(true);
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(true);
    const [naoEncontrado, setNaoEncontrado] = useState(false);
    const [salvando, setSalvando] = useState(false);
    const [mostrarModalSucesso, setMostrarModalSucesso] = useState(false);

    useEffect(() => {
        const carregarProduto = async () => {
            try {
                const produto = await ProdutoService.obterAsync(id);

                if (!produto || !produto.id) {
                    setNaoEncontrado(true);
                    return;
                }

                setNome(produto.nome);
                setDescricao(produto.descricao ?? "");
                setPrecoCusto(String(produto.precoCusto));
                setPrecoVenda(String(produto.precoVenda));
                setEstoque(String(produto.estoque));
                setAtivo(produto.ativo);
            }
            catch (error) {
                console.error("Erro ao carregar produto.", error);
            }
            finally {
                setCarregando(false);
            }
        };

        carregarProduto();

    }, [id]);

    const handleSalvar = async (e) => {
        e.preventDefault();
        setErro("");

        if (!nome || precoCusto === "" || precoVenda === "" || estoque === "") {
            setErro("Nome, precos e estoque não podem ficar vazios.");
            return;
        }

        if (Number(precoCusto) < 0 || Number(precoVenda) < 0 || Number(estoque) < 0) {
            setErro("Preços e estoque não podem ser negativos.");
            return;
        }

        try {
            setSalvando(true);
            await ProdutoService.atualizarAsync(Number(id), nome, descricao, precoCusto, precoVenda, estoque, ativo);

            setMostrarModalSucesso(true);

            setTimeout(() => {
                navigate("/produtos");
            }, 1300);
        }
        catch (error) {
            console.error("Erro ao atualizar o produto.");
        }
        finally {
            setSalvando(false);
        }
    };


    return (
        <Sidebar>
            <Topbar>
                <div className={style.pagina_conteudo}>
                    <div className={style.pagina_cabecalho}>
                        <h3>Editar Produto</h3>

                        <span>Atualização de dados do produto</span>
                    </div>

                    <Link to="/produtos" className={style.botao_voltar}>
                        <MdArrowBack />
                        Voltar
                    </Link>
                </div>

                <form className={style.formulario} onSubmit={handleSalvar}>
                    <div className={style.campo}>
                        <label htmlFor="nome">Nome</label>
                        <input
                        id="nome"
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        />
                    </div>

                    <div className={style.campo}>
                        <label htmlFor="descricao">Descrição</label>
                        <textarea
                        id="descricao"
                        rows={3}
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        />
                    </div>

                    <div className={style.campo}>
                        <label htmlFor="precoCusto">Preço de custo (R$)</label>
                        <input
                        id="precoCusto"
                        type="number"
                        min="0"
                        step="0.01"
                        value={precoCusto}
                        onChange={(e) => setPrecoCusto(e.target.value)}
                        />
                    </div>

                    <div className={style.campo}>
                        <label htmlFor="precoVenda">Preço de venda (R$)</label>
                        <input
                        id="precoVenda"
                        type="number"
                        min="0"
                        step="0.01"
                        value={precoVenda}
                        onChange={(e) => setPrecoVenda(e.target.value)}
                        />
                    </div>

                    <div className={style.campo}>
                        <label htmlFor="estoque">Estoque(unidades)</label>
                        <input
                        id="estoque"
                        type="number"
                        min="0"
                        step="1"
                        value={estoque}
                        onChange={(e) => setEstoque(e.target.value)}
                        />
                    </div>

                     {erro && <p className={style.erro}>{erro}</p>}

                      <div className={style.acoes}>
                        <Link to="/produtos" className={style.botao_cancelar}>
                            Cancelar
                        </Link>

                        <button type="submit" className={style.botao_salvar} disabled={salvando}>
                            {salvando ? "Salvando..." : "Salvar"}
                        </button>
                    </div>
                </form>

                <Modal show={mostrarModalSucesso} onHide={() => navigate("/produtos")}>
                    <Modal.Header>
                        <Modal.Title>Sucesso</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Produto atualizado com sucesso.
                    </Modal.Body>
                </Modal>   
            </Topbar>
        </Sidebar>
    )
}
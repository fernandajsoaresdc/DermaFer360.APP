import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import style from "./NovoProduto.module.css";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Topbar } from "../../components/Topbar/Topbar";
import ProdutoService from "../../services/ProdutoService";
import { Modal } from "react-bootstrap";


export function NovoProduto() {
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [precoCusto, setPrecoCusto] = useState("");
    const [precoVenda, setPrecoVenda] = useState("");
    const [erro, setErro] = useState("");
    const [estoque, setEstoque] = useState("");
    const [salvando, setSalvando] = useState(false);
    const [mostrarModalSucesso, setMostrarModalSucesso] = useState(false);

    const handleSalvar = async (e) => {
        e.preventDefault();
        setErro("");

        if (!nome || precoCusto === "" || precoVenda === "") {
            setErro("Preencha nome, preço de custo e preço de venda.");
            return;
        }

        if (Number(precoCusto) < 0 || Number(precoVenda) < 0 || Number(estoque) < 0){
            setErro("Os preços não podem ser negativos.");
            return;
        }

        const usuarioId = localStorage.getItem("usuarioId");

        if (!usuarioId) {
            setErro("Não foi possível identificar o usuário logado. Faça login novamente.");
            return;
        }

        try {
            setSalvando(true);
            await ProdutoService.criarAsync(nome, descricao, precoCusto, precoVenda, usuarioId, estoque);

            setMostrarModalSucesso(true);

            setTimeout(() => {
                navigate("/produtos");
            }, 1300);
        }
        catch (error) {
            console.error("Erro ao criar produto.", error);
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
                        <h3>Novo Produto</h3>

                        <span>Cadastro de Produto</span>
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
                            maxLength={100}
                            placeholder="Digite o nome do produto."
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>

                    <div className={style.campo}>
                        <label htmlFor="descricao">Descrição</label>
                        <textarea
                            id="descricao"
                            rows={3}
                            placeholder="Digite a descrição do produto."
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                    </div>

                    <div className={style.linha}>
                        <div className={style.campo}>
                            <label htmlFor="precoCusto">Preço de custo (R$)</label>
                            <input
                                id="precoCusto"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="0,00"
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
                                placeholder="0,00"
                                value={precoVenda}
                                onChange={(e) => setPrecoVenda(e.target.value)}
                            />
                        </div>

                        <div className={style.campo}>
                            <label htmlFor="estoque">Estoque (unidades)</label>
                            <input
                                id="estoque"
                                type="number"
                                min="0"
                                step="1"
                                placeholder="0"
                                value={estoque}
                                onChange={(e) => setEstoque(e.target.value)}
                            />
                        </div>
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
                        Produto cadastrado com sucesso.
                    </Modal.Body>
                </Modal>
            </Topbar>
        </Sidebar>
    );
}





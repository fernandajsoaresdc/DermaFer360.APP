import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import style from "./NovaReceita.module.css";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Topbar } from "../../components/Topbar/Topbar";
import ReceitaService from "../../services/ReceitaService";
import ProdutoService from "../../services/ProdutoService";
import { Modal } from "react-bootstrap";


export function NovaReceita() {

    const navigate = useNavigate();

    const [produtos, setProdutos] = useState([]);
    const [produtoId, setProdutoId] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [precoUnitario, setPrecoUnitario] = useState("");
    const [dataReceita, setDataReceita] = useState("");
    const [erro, setErro] = useState("");
    const [salvando, setSalvando] = useState(false);
    const [mostrarModalSucesso, setMostrarModalSucesso] = useState(false);


    useEffect(() => {

        async function carregarProdutos() {

            try {

                const lista = await ProdutoService.listarAsync();

                setProdutos(Array.isArray(lista) ? lista : []);

            } catch (error) {

                console.error("Erro ao carregar produtos.", error);
            }
        }

        carregarProdutos();

    }, []);

    const selecionarProduto = (e) => {
        const id = e.target.value;

        setProdutoId(id);

        const produtoSelecionado = produtos.find(
            (produto) => produto.id === Number(id)
        );

        if(produtoSelecionado)
        {
            setPrecoUnitario(produtoSelecionado.precoVenda);
        }
        else
        {
            setPrecoUnitario("");
        }
    }

    const handleSalvar = async (e) => {
        e.preventDefault();
        setErro("");

        if (!produtoId || !quantidade || !precoUnitario || !dataReceita) {

            setErro("Preencha todos os campos.");

            return;
        }

        const usuarioId = localStorage.getItem("usuarioId");

        if (!usuarioId) {

            setErro(
                "Não foi possível identificar o usuário logado. Faça login novamente."
            );

            return;
        }


        try {
            setSalvando(true);
            await ReceitaService.criarAsync(produtoId, quantidade, precoUnitario, dataReceita, usuarioId);

            setMostrarModalSucesso(true);

            setTimeout(() => {
                navigate("/receitas");
            }, 1300);


        } catch (error) {

            console.error("Erro ao criar receita.", error);


        } finally {

            setSalvando(false);
        }
    };


    return (

        <Sidebar>

            <Topbar>

                <div className={style.pagina_conteudo}>
                    <div className={style.pagina_cabecalho}>
                        <h3>Nova Receita</h3>

                        <span>Cadastro de Receita</span>

                    </div>

                    <Link to="/receitas" className={style.botao_voltar}>
                        <MdArrowBack />
                        Voltar
                    </Link>

                </div>

                <form className={style.formulario} onSubmit={handleSalvar}>

                    <div className={style.campo}>
                        <label htmlFor="produtoId">Produto</label>
                        <select
                            id="produtoId"
                            value={produtoId}
                            onChange={selecionarProduto}
                        >
                            <option value="">Selecione um produto</option>

                            {produtos.map((produto) => (

                                <option
                                    key={produto.id}
                                    value={produto.id}
                                >
                                    {produto.nome}
                                </option>

                            ))}

                        </select>

                    </div>

                    <div className={style.campo}>
                        <label htmlFor="quantidade">Quantidade</label>
                        <input
                            id="quantidade"
                            type="number"
                            min="1"
                            placeholder="Digite a quantidade do produto."
                            value={quantidade}
                            onChange={(e) => setQuantidade(e.target.value)}
                        />

                    </div>

                    <div className={style.campo}>
                        <label htmlFor="precoUnitario">Preço unitário (R$)</label>
                        <input
                            id="precoUnitario"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0,00"
                            value={precoUnitario}
                            onChange={(e) => setPrecoUnitario(e.target.value)}
                        />

                    </div>


                    <div className={style.campo}>
                        <label htmlFor="dataReceita">Data da receita</label>
                        <input
                            id="dataReceita"
                            type="date"
                            value={dataReceita}
                            onChange={(e) => setDataReceita(e.target.value)}
                        />

                    </div>



                    {erro && (<p className={style.erro}>{erro}</p>)}

                    <div className={style.acoes}>
                        <Link to="/receitas" className={style.botao_cancelar}>
                            Cancelar
                        </Link>


                        <button type="submit" className={style.botao_salvar} disabled={salvando}>

                            {salvando ? "Salvando..." : "Salvar"}
                        </button>
                    </div>
                </form>

                <Modal show={mostrarModalSucesso} onHide={() => navigate("/receitas")}
                >
                    <Modal.Header>
                        <Modal.Title>
                            Sucesso
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Receita cadastrada com sucesso.
                    </Modal.Body>
                </Modal>
            </Topbar>
        </Sidebar>
    );
}





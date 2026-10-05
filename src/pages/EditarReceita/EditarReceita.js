import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import style from "./EditarReceita.module.css";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Topbar } from "../../components/Topbar/Topbar";
import ReceitaService from "../../services/ReceitaService";
import ProdutoService from "../../services/ProdutoService";
import { Modal } from "react-bootstrap";


export function EditarReceita() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [produtos, setProdutos] = useState([]);
    const [produtoId, setProdutoId] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [precoUnitario, setPrecoUnitario] = useState("");
    const [dataReceita, setDataReceita] = useState("");
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(true);
    const [naoEncontrado, setNaoEncontrado] = useState(false);
    const [salvando, setSalvando] = useState(false);
    const [mostrarModalSucesso, setMostrarModalSucesso] = useState(false);


    useEffect(() => {

        const carregarDados = async () => {

            try {
            
                const lista = await ProdutoService.listarAsync();
                setProdutos(Array.isArray(lista) ? lista : []);

                const receita = await ReceitaService.obterAsync(id);

                if (!receita || !receita.id) {
                    setNaoEncontrado(true);
                    return;
                }

                setProdutoId(String(receita.produtoId));
                setQuantidade(String(receita.quantidade));
                setPrecoUnitario(String(receita.precoUnitario));
                setDataReceita(receita.dataReceita ? receita.dataReceita.substring(0, 10): "");

            }
            catch (error) {

                console.error("Erro ao carregar receita.", error);
            }
            finally {

                setCarregando(false);
            }
        };

        carregarDados();

    }, [id]);


    const handleSalvar = async (e) => {
        e.preventDefault();
        setErro("");

        if (!produtoId || !quantidade || !precoUnitario || !dataReceita) {

            setErro("Preencha todos os campos.");
            return;
        }

        if (Number(quantidade) <= 0 || Number(precoUnitario) < 0) {

            setErro("A quantidade deve ser maior que zero e o preço não pode ser negativo.");
            return;
        }

        const usuarioId = localStorage.getItem("usuarioId");

        if (!usuarioId) {

            setErro("Não foi possível identificar o usuário logado. Faça login novamente.");
            return;
        }

        try {
            setSalvando(true);
            await ReceitaService.atualizarAsync(Number(id), produtoId, quantidade, precoUnitario, dataReceita, usuarioId);

            setMostrarModalSucesso(true);

            setTimeout(() => {
                navigate("/receitas");
            }, 1300);
        }
        catch (error) {

            console.error("Erro ao atualizar a receita.", error);
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
                        <h3>Editar Receita</h3>

                        <span>Atualização de dados da Receita</span>
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
                        type="number"
                        value={produtoId}
                        onChange={(e) => setProdutoId(e.target.value)}
                        >
                            <options value="">
                                Selecione um produto
                            </options>

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
                        step="1"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        />
                    </div>

                    <div className={style.campo}>
                        <label htmlFor="precoUnitario">Preço Unitário (R$)</label>
                        <input
                        id="precoUnitario"
                        type="number"
                        min="0"
                        step="0.01"
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

                     {erro && <p className={style.erro}>{erro}</p>}

                      <div className={style.acoes}>
                        <Link to="/receitas" className={style.botao_cancelar}>
                            Cancelar
                        </Link>

                        <button type="submit" className={style.botao_salvar} disabled={salvando}>
                            {salvando ? "Salvando..." : "Salvar"}
                        </button>
                    </div>
                </form>

                <Modal show={mostrarModalSucesso} onHide={() => navigate("/receitas")}>
                    <Modal.Header>
                        <Modal.Title>Sucesso</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Receita atualizada com sucesso.
                    </Modal.Body>
                </Modal>   
            </Topbar>
        </Sidebar>
    )
}


       
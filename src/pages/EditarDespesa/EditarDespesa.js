import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import style from "./EditarDespesa.module.css";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Topbar } from "../../components/Topbar/Topbar";
import DespesaService from "../../services/DespesaService";
import { Modal } from "react-bootstrap";


export function EditarDespesa() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [dataDespesa, setDataDespesa] = useState("");
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(true);
    const [naoEncontrado, setNaoEncontrado] = useState(false);
    const [salvando, setSalvando] = useState(false);
    const [mostrarModalSucesso, setMostrarModalSucesso] = useState(false);


    useEffect(() => {

        async function carregarDespesa() {

            try {
                setCarregando(true);
                setErro("");

                const despesa = await DespesaService.obterAsync(Number(id));

                if (!despesa) {

                    setNaoEncontrado(true);
                    return;
                }

                setDescricao(despesa.descricao || "");

                setValor(despesa.valor || "");

                if (despesa.dataDespesa) {

                    setDataDespesa(
                        despesa.dataDespesa.substring(0, 10)
                    );
                }

            } catch (error) {

                console.error("Erro ao carregar a despesa.", error);
                setNaoEncontrado(true);

            } finally {

                setCarregando(false);
            }
        }
        carregarDespesa();
    }, [id]);


    const handleSalvar = async (e) => {
        e.preventDefault();
        setErro("");

        if (!descricao || !valor || !dataDespesa) {

            setErro("Preencha todos os campos.");
            return;
        }

        if (new Date(dataDespesa) < new Date().setHours(0, 0, 0, 0)) {
            setErro("A data da despesa não pode ser retroativa.");
            return;
        }

        if (Number(valor) < 0) {

            setErro("O valor não pode ser negativo.");
            return;
        }

        const usuarioId = localStorage.getItem("usuarioId");

        if (!usuarioId) {

            setErro("Não foi possível identificar o usuário logado. Faça login novamente.");
            return;
        }

        try {
            setSalvando(true);
            await DespesaService.atualizarAsync(Number(id), descricao, valor, dataDespesa, usuarioId);

            setMostrarModalSucesso(true);

            setTimeout(() => {
                navigate("/despesas");
            }, 1300);
        }
        catch (error) {

            console.error("Erro ao atualizar a despesa.", error);
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
                        <h3>Editar Despesa</h3>

                        <span>Atualização de dados da Despesa</span>
                    </div>

                    <Link to="/despesas" className={style.botao_voltar}>
                        <MdArrowBack />
                        Voltar
                    </Link>
                </div>

                <form className={style.formulario} onSubmit={handleSalvar}>
                    <div className={style.campo}>
                        <label htmlFor="descricao">Descricao</label>
                        <input
                            id="descricao"
                            type="text"
                            placeholder="Digite a descrição da despesa"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        >
                        </input>
                    </div>

                    <div className={style.campo}>
                        <label htmlFor="valor">Valor (R$)</label>
                        <input
                            id="valor"
                            type="number"
                            min="0"
                            step="0.01"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                        />
                    </div>

                    <div className={style.campo}>
                        <label htmlFor="dataDespesa">Data da despesa</label>
                        <input
                            id="dataDespesa"
                            type="date"
                            value={dataDespesa}
                            onChange={(e) => setDataDespesa(e.target.value)}
                        />
                    </div>

                    {erro && <p className={style.erro}>{erro}</p>}

                    <div className={style.acoes}>
                        <Link to="/despesas" className={style.botao_cancelar}>
                            Cancelar
                        </Link>

                        <button type="submit" className={style.botao_salvar} disabled={salvando}>
                            {salvando ? "Salvando..." : "Salvar"}
                        </button>
                    </div>
                </form>

                <Modal show={mostrarModalSucesso} onHide={() => navigate("/despesas")}>
                    <Modal.Header>
                        <Modal.Title>Sucesso</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Despesa atualizada com sucesso.
                    </Modal.Body>
                </Modal>
            </Topbar>
        </Sidebar>
    );
}













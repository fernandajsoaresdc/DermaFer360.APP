import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Topbar } from "../../components/Topbar/Topbar";
import DespesaService from "../../services/DespesaService";
import style from "./NovaDespesa.module.css";
import { Modal } from "react-bootstrap";

export function NovaDespesa() {
    const navigate = useNavigate();

    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [dataDespesa, setDataDespesa] = useState("");
    const [erro, setErro] = useState("");
    const [salvando, setSalvando] = useState(false);
    const [mostrarModalSucesso, setMostrarModalSucesso] = useState(false);

    async function handleSalvar(e) {
        e.preventDefault();
        setErro("");

        if (!descricao) {
            setErro("Informe a descrição da despesa.");
            return;
        }

        if (!valor || Number(valor) <= 0) {
            setErro("Informe um valor válido.");
            return;
        }

        if (!dataDespesa) {
            setErro("Informe a data da despesa.");
            return;
        }

        try {

            setSalvando(true);

            const usuarioId = localStorage.getItem("usuarioId");

            await DespesaService.criarAsync(descricao, valor, dataDespesa, usuarioId);

            navigate("/despesas");

        } catch (error) {

            console.error(error);

            setErro("Não foi possível cadastrar a despesa, coloque uma data válida.");


        } finally {

            setSalvando(false);
        }
    };

    return (

        <Sidebar>

            <Topbar>

                <div className={style.pagina_conteudo}>
                    <div className={style.pagina_cabecalho}>
                        <h3>Nova Despesa</h3>

                        <span>Cadastro de Despesa</span>

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
                            placeholder="Digite a descrição da despesa."
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                    </div>

                    <div className={style.campo}>
                        <label htmlFor="valor">Valor (R$)</label>
                        <input
                            id="valor"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0,00"
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

                    {erro && (<p className={style.erro}>{erro}</p>)}

                    <div className={style.acoes}>
                        <Link to="/despesas" className={style.botao_cancelar}>
                            Cancelar
                        </Link>


                        <button type="submit" className={style.botao_salvar} disabled={salvando}>

                            {salvando ? "Salvando..." : "Salvar"}
                        </button>
                    </div>
                </form>

                <Modal show={mostrarModalSucesso} onHide={() => navigate("/despesas")}
                >
                    <Modal.Header>
                        <Modal.Title>
                            Sucesso
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Despesa cadastrada com sucesso.
                    </Modal.Body>
                </Modal>
            </Topbar>
        </Sidebar>
    );
}

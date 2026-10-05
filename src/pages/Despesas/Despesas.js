import { useEffect, useState } from "react";
import { MdSearch, MdEdit, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import style from "./Despesa.module.css";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Topbar } from "../../components/Topbar/Topbar";
import DespesaService from "../../services/DespesaService";
import { Modal, Button } from "react-bootstrap";


const formatarMoeda = (valor) => Number(valor ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const formatarData = (valor) => {
    if (!valor) {
        return "";
    }

    const [ano, mes, dia] = valor.slice(0, 10).split("-");
    return `${dia}/${mes}/${ano}`;
};


export function Despesas() {

    const [despesas, setDespesas] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarModalSucesso, setMostrarModalSucesso] = useState(false);
    const [despesaSelecionada, setDespesaSelecionada] = useState(null);
    const [busca, setBusca] = useState("");
    const [carregando, setCarregando] = useState(false);


    async function carregarDados() {
        try {
            setCarregando(true);

            const listaDespesas = await DespesaService.listarAsync();
           

            setDespesas(Array.isArray(listaDespesas) ? listaDespesas : []);
           
        }
        catch (error) {
            console.error("Erro ao carregar despesas.", error);
        }
        finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarDados();
    }, []);

    const handleClickExcluir = (despesa) => {
        setDespesaSelecionada(despesa);
        setMostrarModal(true);
    };

    const handleFecharModal = () => {
        setMostrarModal(false);
        setDespesaSelecionada(null);
    };

    const handleExcluir = async () => {
        if (!despesaSelecionada) {
            return;
        }

        try {
            await DespesaService.deletarAsync(despesaSelecionada.id);
            await carregarDados();

            handleFecharModal();
            setMostrarModalSucesso(true);

            setTimeout(() => {
                setMostrarModalSucesso(false);
            }, 1300);
        }
        catch (error) {
            console.error("Erro ao excluir despesa.", error);
        }
    };

    const despesasFiltradas = despesas.filter((despesa) => {
        const textoBusca = busca.toLowerCase();

        return despesa.ativo && despesa.descricao.includes(textoBusca);
    });

    return (
        <Sidebar>
            <Topbar>
                <div className={style.pagina_conteudo}>
                    <div className={style.pagina_cabecalho}>
                        <h3>Despesas</h3>

                        <span>Gerenciamento de Despesas</span>
                    </div>

                    <Link to="/despesa/novo" className={style.botao_novo}>+ Nova Despesa</Link>
                </div>

                <div className={style.pesquisa}>
                    <MdSearch />

                    <input
                        type="text"
                        placeholder="Buscar por despesa"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                </div>

                {carregando && <p className={style.aviso}>Carregando despesas...</p>}

                <div className={style.tabela}>
                    <table>
                        <thead>
                            <tr>
                                <th>Descricao</th>

                                <th>Data</th>

                                <th className={style.numero}>Valor</th>

                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {despesasFiltradas.map((despesa) => (
                                <tr key={despesa.id}>
                                    <td>{despesa.descricao}</td>
                                    <td>{formatarData(despesa.dataDespesa)}</td>
                                    <td className={style.numero}>{formatarMoeda(despesa.valor)}</td>

                                    <td>
                                        <Link
                                            to={`/despesa/editar/${despesa.id}`}
                                            className={style.botao_editar}
                                            title="Editar"
                                            aria-label="Editar despesa"
                                        >
                                            <MdEdit />
                                        </Link>

                                        <button
                                            className={style.botao_excluir}
                                            onClick={() => handleClickExcluir(despesa)}
                                            title="Excluir"
                                            aria-label="Excluir despesa"
                                        >
                                            <MdDelete />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {!carregando && despesasFiltradas.length === 0 && (
                                <tr>
                                    <td colSpan={4} className={style.vazio}>
                                        Nenhuma despesa encontrada.
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
                        Tem certeza que deseja excluir a despesa de {despesaSelecionada && `"${despesaSelecionada.descricao}"`}?
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
                        Despesa excluída com sucesso.
                    </Modal.Body>
                </Modal>
            </Topbar>
        </Sidebar>
    );
}




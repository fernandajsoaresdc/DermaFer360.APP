import { useEffect, useState } from "react";
import { MdSearch, MdEdit, MdDelete, MdPerson, MdRestore } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import style from "./Usuarios.module.css";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Topbar } from "../../components/Topbar/Topbar";
import UsuarioService from "../../services/UsuarioService";
import { Modal, Button } from "react-bootstrap";



export function Usuarios() {
    const navgate = useNavigate();

    const [usuarios, setUsuarios] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarModalSucesso, setMostrarModalSucesso] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
    const [busca, setBusca] = useState("");
    const [carregando, setCarregando] = useState(false);


    async function carregarUsuarios() {
        try {
            setCarregando(true);
            const lista = await UsuarioService.listarAsync();

            setUsuarios(lista ?? []);
        }
        catch (error) {
            console.error("Erro ao carregar usuários.", error);
        }
        finally {
            setCarregando(false);
        }
    }

    useEffect(() => {

        carregarUsuarios();
    }, []);

    const handleClickDeletar = (usuario) => {
        setUsuarioSelecionado(usuario)
        setMostrarModal(true);
    }

    const handleDeletar = async () => {

        if (!usuarioSelecionado) {
            return;
        }

        try {
            await UsuarioService.deletarAsync(usuarioSelecionado.id);
            await carregarUsuarios();

            handleFecharModal();

            setMostrarModalSucesso(true);

            setTimeout(() => {
                setMostrarModalSucesso(false);
            }, 1300);
        }
        catch (error) {
            console.error("erro ao deletar usuário.", error);
        }
    };

    const handleRestaurar = async (usuario) => {
        try {
            await UsuarioService.restaurarAsync(usuario.id);
            await carregarUsuarios();
        }
        catch (error) {
            console.error("Erro ao restaurar usuário.", error);
        }
    };

    const handleFecharModal = () => {
        setMostrarModal(false);
        setUsuarioSelecionado(null);
    };

    const handleFecharModalSucesso = () => {
        setMostrarModalSucesso(false);
    };

    const usuariosFiltrados = usuarios.filter((usuario) => {
        const textoBusca = busca.toLowerCase();

        return (usuario.nome?.toLowerCase().includes(textoBusca)) || usuario.email?.toLowerCase().includes(textoBusca)
    })




    return (
        <Sidebar>
            <Topbar>
                <div className={style.pagina_conteudo}>
                    <div className={style.pagina_cabecalho}>
                        <h3>Usuários</h3>

                        <span>Gerenciamento de Usuários</span>

                    </div>

                    <Link to='/usuario/novo' className={style.botao_novo}>+ Novo Usuário</Link>

                </div>


                <div className={style.pesquisa}>

                    <MdSearch />

                    <input
                        type="text"
                        placeholder="Buscar por nome ou e-mail"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />

                </div>


                <div className={style.tabela}>

                    <table>

                        <thead>

                            <tr>

                                <th>Nome</th>

                                <th>E-mail</th>

                                <th>Cargo</th>

                                <th>Status</th>

                                <th>Ações</th>

                            </tr>

                        </thead>


                        <tbody>

                            {usuariosFiltrados.map((usuario) => (

                                <tr key={usuario.id}>

                                    <td>
                                        {usuario.nome}
                                    </td>

                                    <td>
                                        {usuario.email}
                                    </td>

                                    <td>
                                        {usuario.cargo}
                                    </td>

                                    <td>

                                        {usuario.ativo ? "Ativo" : "Inativo"}

                                    </td>

                                    <td>

                                        <Link to={`/usuario/editar/${usuario.id}`} className={style.botao_editar}
                                            title="Editar"
                                            aria-label="Editar usuário"
                                        >
                                            <MdEdit />
                                        </Link>


                                        {usuario.ativo ? (

                                            <button
                                                className={style.botao_excluir} onClick={() => handleClickDeletar(usuario)}
                                                title="Excluir"
                                                aria-label="Excluir usuário"
                                            >
                                                <MdDelete />
                                            </button>

                                        ) : (

                                            <button className={style.botao_restaurar} onClick={() => handleRestaurar(usuario)}
                                                title="Restaurar"
                                                aria-label="Restaurar usuário"
                                            >
                                                <MdRestore />
                                            </button>

                                        )}

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                <Modal show={mostrarModal} onHide={handleFecharModal}>
                    <Modal.Header closeButton>

                        <Modal.Title>Confirmar</Modal.Title>

                    </Modal.Header>


                    <Modal.Body>

                        Tem certeza que deseja desativar o usuário{" "} {usuarioSelecionado?.nome}?

                    </Modal.Body>


                    <Modal.Footer>

                        <Button variant="secondary" onClick={handleFecharModal}>
                            Cancelar
                        </Button>

                        <Button variant="danger" onClick={handleDeletar}>
                            Desativar
                        </Button>

                    </Modal.Footer>

                </Modal>

                <Modal show={mostrarModalSucesso} onHide={(handleFecharModalSucesso) => setMostrarModalSucesso(false)}>

                    <Modal.Header>

                        <Modal.Title>Sucesso</Modal.Title>

                    </Modal.Header>

                    <Modal.Body>

                        Usuário desativado com sucesso.

                    </Modal.Body>

                </Modal>
            </Topbar >
        </Sidebar >
    );
}

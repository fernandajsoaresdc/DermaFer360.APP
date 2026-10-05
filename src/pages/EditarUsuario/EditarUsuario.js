import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import style from "./EditarUsuario.module.css";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Topbar } from "../../components/Topbar/Topbar";
import UsuarioService from "../../services/UsuarioService";
import { Modal } from "react-bootstrap";


export function EditarUsuario() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cargo, setCargo] = useState("");
    const [ativo, setAtivo] = useState(true);
    const [cargos, setCargos] = useState([]);
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [mostrarModalSucesso, setMostrarModalSucesso] = useState(false);
    const [naoEncontrado, setNaoEncontrado] = useState(false);

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const listarCargos = await UsuarioService.listarCargosAsync();
                setCargos(listarCargos ?? []);

                const usuario = await UsuarioService.obterAsync(id);

                setNome(usuario.nome);
                setEmail(usuario.email);
                setCargo(String(usuario.cargo));
                setAtivo(usuario.ativo);
            }
            catch (error) {

                console.error("Erro ao carregar usuário.", error);
            }
            finally {
                setCarregando(false);
            }
        };

        carregarDados();
        
    }, [id]);

    const handleSalvar = async (e) => {
        e.preventDefault();

        if (!nome || !email || !cargo) {
            setErro("Preencha os campos a serem modificados.");
            return;
        }
        try {
            setSalvando(true);
            await UsuarioService.atualizarAsync(Number(id), nome, email, cargo, ativo);

            setMostrarModalSucesso(true);

            setTimeout(() => {
                navigate("/usuarios");
            }, 1300);
        }
        catch (error) {
            console.error("Erro ao atualizar usuário.", error);
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
                        <h3>Editar Usuário</h3>

                        <span>Atualização de dados do usuário</span>
                    </div>

                    <Link to="/usuarios" className={style.botao_voltar}>
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
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className={style.campo}>
                        <label htmlFor="cargo">Cargo</label>
                        <select
                            id="cargo"
                            value={cargo}
                            onChange={(e) => setCargo(e.target.value)}
                        >
                            <option value="">Selecione o cargo a ser editado</option>
                            {cargos.map((c) => (<option key={c.id} value={c.id}>
                                {c.nome}
                            </option>
                            ))}
                        </select>
                    </div>

                    {erro && <p className={style.erro}>{erro}</p>}

                    <div className={style.acoes}>
                        <Link to="/usuarios" className={style.botao_cancelar}>
                            Cancelar
                        </Link>

                        <button type="submit" className={style.botao_salvar} disabled={salvando}>
                            {salvando ? "Salvando..." : "Salvar"}
                        </button>
                    </div>
                </form>

                <Modal show={mostrarModalSucesso} onHide={() => navigate("/usuarios")}>
                    <Modal.Header>
                        <Modal.Title>Sucesso</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Usuário atualizado com sucesso.
                    </Modal.Body>
                </Modal>
            </Topbar>
        </Sidebar>
    )

}
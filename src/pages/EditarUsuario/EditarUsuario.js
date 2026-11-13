import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import style from "./EditarUsuario.module.css";
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
                setCarregando(true);
                setNaoEncontrado(false);

                const listarCargos = await UsuarioService.listarCargosAsync();
                setCargos(listarCargos ?? []);

                const usuario = await UsuarioService.obterAsync(id);

                if (!usuario) {
                    setNaoEncontrado(true);
                    return;
                }

                setNome(usuario.nome);
                setEmail(usuario.email);
                setCargo(String(usuario.cargo));
                setAtivo(usuario.ativo);
            }
            catch (error) {

                console.error("Erro ao carregar usuário.", error);
                setNaoEncontrado(true);
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
            setErro("Não foi possível atualizar o usuário.Tente novamente.")
        }
        finally {
            setSalvando(false);
        }
    };

    if (carregando) {
        return (<div className={style.mensagem_estado}>Carregando dados do usuário...</div>);
    }

    if (naoEncontrado) {
        return (<div className={style.mensagem_estado}><h3>Usuário não encontrado</h3>
            <p>Não foi possível localizar os dados deste usuário.</p>

            <Link to="/usuarios" className={style.botao_voltar}>
                <MdArrowBack />
                Voltar para usuários
            </Link>
        </div>
        );
    }

    return (
        <div className={style.pagina_conteudo}>
            <div className={style.pagina_cabecalho}>
                <div className={style.titulo}>
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
                        maxLength={100}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>

                <div className={style.campo}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Digite o e-mail do usuário"
                        value={email}
                        maxLength={100}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className={style.campo}>
                    <label htmlFor="cargo">Cargo</label>
                    <select
                        id="cargo"
                        value={cargo}
                        maxLength={100}
                        onChange={(e) => setCargo(e.target.value)}
                        required
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

            <Modal show={mostrarModalSucesso} onHide={() => navigate("/usuarios")} centered>

                <Modal.Header>
                    <Modal.Title>Sucesso</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Usuário atualizado com sucesso.
                </Modal.Body>
            </Modal>
        </div>

    );

}
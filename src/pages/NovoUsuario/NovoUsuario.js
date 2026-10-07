import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import style from "./NovoUsuario.module.css";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Topbar } from "../../components/Topbar/Topbar";
import UsuarioService from "../../services/UsuarioService";
import { Modal } from "react-bootstrap";


export function NovoUsuario() {
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [cargo, setCargo] = useState("");
    const [cargos, setCargos] = useState([]);
    const [erro, setErro] = useState("");
    const [salvando, setSalvando] = useState(false);
    const [mostrarModalSucesso, setMostrarModalSucesso] = useState(false);


    useEffect(() => {
        const carregarCargos = async () => {
            try {
                const lista = await UsuarioService.listarCargosAsync();
                setCargos(lista ?? []);
            }
            catch (error) {
                console.error("Erro ao carregar cargos.", error);
            }
        };

        carregarCargos();
    }, []);

    const handleSalvar = async (e) => {
        e.preventDefault();

        if (!nome || !email || !senha || !cargo) {
            setErro("Preencha todos os campos.");
            return;
        }

        if (senha !== confirmarSenha) {
            setErro("As senhas não conferem.");
            return;
        }

        try {
            setSalvando(true);
            await UsuarioService.criarAsync(nome, email, senha, cargo);

            setMostrarModalSucesso(true);

            setTimeout(() => {
                navigate("/usuarios");
            }, 1300);
        }
        catch (error) {
            console.error("Erro ao criar usuário.", error)
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
                        <h3>Novo Usuário</h3>

                        <span>Cadastro de Usuários</span>
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
                            maxLength={100}
                            placeholder="Digite o nome do usuário."
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>

                    <div className={style.campo}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="text"
                            maxLength={254}
                            placeholder="Digite o email do usuário."
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
                            <option value="">Selecione o cargo</option>
                            {cargos.map((c) => (<option key={c.id} value={c.id}>
                                {c.nome}
                            </option>
                            ))}
                        </select>
                    </div>

                    <div className={style.linha}>
                        <div className={style.campo}>
                            <label htmlFor="senha">Senha</label>
                            <input
                                id="senha"
                                type="password"
                                placeholder="Digite a senha do usuário."
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </div>

                        <div className={style.campo}>
                            <label htmlFor="confirmarSenha">Confirmar senha</label>
                            <input
                                id="confirmarSenha"
                                type="password"
                                placeholder="Digite a senha novamente."
                                value={confirmarSenha}
                                onChange={(e) => setConfirmarSenha(e.target.value)}
                            />
                        </div>
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
                        Usuário cadastrado com sucesso.
                    </Modal.Body>
                </Modal>
            </Topbar>
        </Sidebar>
    )
}
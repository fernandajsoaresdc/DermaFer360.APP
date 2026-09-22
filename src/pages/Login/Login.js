import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import DermaFer360 from "../../assets/DermaFer360.png";
import AutenticacaoService from "../../services/AutenticacaoService";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";




export function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);


    const handleEntrar = async (e) => {
        e.preventDefault();
        setErro('');
        setCarregando(true);

        try {
            const resposta = await AutenticacaoService.LoginAsync(email, senha);
            localStorage.setItem("token", resposta.token);

            setMostrarModal(true);

            setTimeout(() => {
                setMostrarModal(false);
                navigate('/dashboard')
            }, 1300);

        } catch (error) {
            console.error(error)
            setErro('E-mail ou senha inválidos');
        }
        finally {
            setCarregando(false);
        }

    };



    return (
        <div className={styles.pagina}>

            <div className={styles.conteudo}>
                <form className={styles.formulario} onSubmit={handleEntrar}>


                    <img src={DermaFer360} alt=" Logo DermaFer360" className={styles.logoImagem} />

                   

                    <p className={styles.eyebrow}>Acesso à plataforma- Setor Financeiro</p>


                    {erro && <p className={styles.mensagemErro}>{erro}</p>}

                    <div className={styles.form}>
                        <div className={styles.campo}><label className={styles.label}>Email</label>

                            <input
                                type="email"
                                className={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className={styles.campo}><label className={styles.label}>Senha</label>

                            <input
                                type="password"
                                className={styles.input}
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </div>


                        <button type="submit" className={styles.botaoEntrar} disabled={carregando}>
                            {carregando ? "Entrando..." : "Entrar"}
                        </button>

                    </div>

                    <p className={styles.rodape}>© 2026 DermaFer360</p>
                </form>
            </div>
            <Modal show={mostrarModal}>
                <Modal.Header>
                    <Modal.Title>Entrando</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Acessando a plataforma DermaFer360...
                </Modal.Body>
            </Modal>
        </div>

    );
}
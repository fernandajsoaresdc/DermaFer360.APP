import style from "./Topbar.module.css";
import { MdLogout, MdAccountCircle, MdMenu, MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export function Topbar({ aoAlternarMenu, menuAberto }) {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        navigate("/");
    };

    const usuario = localStorage.getItem("usuario") || "Administrador Financeiro";

    return (
        
            <header className={style.topbar}>

            <button className={style.botaoMenu} onClick={aoAlternarMenu} aria-label="Alternar menu lateral" aria-expanded={menuAberto}>
                {menuAberto ? <MdClose /> : <MdMenu />}
            </button>

                <div className={style.usuarioArea}>

                    <MdAccountCircle className={style.usuarioIcone} />

                    <span className={style.usuarioNome}>{usuario}</span>

                    <button
                        className={style.botaoLogout} onClick={logout}>
                        <MdLogout />
                        Sair
                    </button>
                </div>

            </header>

    );
}
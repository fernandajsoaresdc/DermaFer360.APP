import style from "./Topbar.module.css";
import { MdLogout, MdAccountCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export function Topbar() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        navigate("/");
    };

    const usuario = localStorage.getItem("usuario") || "Administrador Financeiro";

    return (
        <header className={style.topbar}>

            <div className={style.informacoesEmpresa}>

                <h1>DermaFer360</h1>

                <span>Departamento Financeiro - Dermocosméticos</span>

            </div>

            <div className={style.usuarioArea}><MdAccountCircle className={style.usuarioIcone}/>

                <span className={style.usuarioNome}>{usuario}</span>

                <button
                    className={style.botaoLogout}
                    onClick={logout}
                >
                    <MdLogout />
                    Sair
                </button>

            </div>

        </header>
    );
}
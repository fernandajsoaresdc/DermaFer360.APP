import { Outlet } from 'react-router-dom';
import {Sidebar} from '../Sidebar/Sidebar';
import {Topbar} from '../Topbar/Topbar';
import style from './Layout.module.css';
import { useState } from 'react';

export function Layout() {

    const [menuAberto, setMenuAberto] = useState(true);

    const alternarMenu = () => {setMenuAberto((estadoAtual) => !estadoAtual);};


    return (
        <div className={style.layout}>

            <Sidebar aberta={menuAberto} />

            <div className={`${style.conteudo} ${menuAberto? style.conteudoAberto : style.conteudoRecolhido}`}>

                <Topbar aoAlternarMenu={alternarMenu} menuAberto={menuAberto} />

                <main className={style.pagina}>
                    <Outlet />
                </main>

            </div>

        </div>
    );
}
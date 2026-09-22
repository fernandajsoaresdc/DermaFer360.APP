import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar';
import style from './Layout.module.css';

export function Layout() {
    return (
        <div className={style.layout}>

            <Sidebar />

            <div className={style.conteudo}>

                <Topbar />

                <main className={style.pagina}>
                    <Outlet />
                </main>

            </div>

        </div>
    );
}
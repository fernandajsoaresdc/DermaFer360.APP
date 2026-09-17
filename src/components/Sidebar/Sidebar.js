
import { Link } from 'react-router-dom';
import style from './Sidebar.module.css';
import { MdOutlineDashboard, MdGroup, MdInventory2, MdAttachMoney, MdMoneyOff, MdAssessment } from 'react-icons/md';
import SidebarItem from '../SidebarItem/SidebarItem';
import Logo from '../../assets/DermaFer360.png';

export function Sidebar({ children }) {

    return (
        <div>

            <div className={style.sidebar_conteudo}>

                <div className={style.sidebar_header}>

                    <Link to="/dashboard">
                        <img src={Logo} alt="Logo-DermaFer360" className={style.logo} /></Link>
                    <hr className={style.linha} />
                </div>

                <div className={style.sidebar_corpo}>

                    <SidebarItem texto="Dashboard" link="/dashboard" logo={<MdOutlineDashboard />} />
                </div>

                <div className={style.sidebar_corpo}>

                    <SidebarItem texto="Usuários" link="/usuarios" logo={<MdGroup />} />
                </div>

                <div className={style.sidebar_corpo}>

                    <SidebarItem texto="Produtos" link="/produtos" logo={<MdInventory2 />} />
                </div>

                <div className={style.sidebar_corpo}>

                    <SidebarItem texto="Receitas" link="/receitas" logo={<MdAttachMoney />} />
                </div>

                <div className={style.sidebar_corpo}>

                    <SidebarItem texto="Despesas" link="/despesas" logo={<MdMoneyOff />} />
                </div>

                <div className={style.sidebar_corpo}>

                    <SidebarItem texto="Relatório Financeiro" link="/relatorio-financeiro" logo={<MdAssessment />} />
                </div>

            </div>

            <div className={style.pagina_conteudo}>

                {children}
            </div>
        </div>
    );
}


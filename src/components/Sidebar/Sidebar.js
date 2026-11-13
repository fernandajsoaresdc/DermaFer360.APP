
import { Link } from 'react-router-dom';
import style from './Sidebar.module.css';
import { MdOutlineDashboard, MdGroup, MdInventory2, MdAttachMoney, MdMoneyOff, MdAssessment, MdSmartToy } from 'react-icons/md';
import { SidebarItem } from "../SidebarItem/SidebarItem";
import Logo from '../../assets/DermaFer360.2.png';

export function Sidebar({ aberta }) {

    const texto = (nome) => aberta ? nome : "";

    return (

        <aside className={`${style.sidebar_conteudo} ${aberta ? style.sidebar_aberta : style.sidebar_recolhida}`}>


            <div>
                <div className={style.sidebar_header}>

                    <Link to="/dashboard">
                        <img src={Logo} alt="Logo-DermaFer360" className={style.logo} />
                        </Link>
                    <hr className={style.linha} />
                </div>

                <div className={style.sidebar_corpo}>

                    <SidebarItem texto={texto("Dashboard")} link="/dashboard" logo={<MdOutlineDashboard />} />
                </div>

                <div className={style.sidebar_corpo}>

                    <SidebarItem texto={texto("Usuários")} link="/usuarios" logo={<MdGroup />} />
                </div>

                <div className={style.sidebar_corpo}>

                    <SidebarItem texto={texto("Produtos")} link="/produtos" logo={<MdInventory2 />} />
                </div>

                <div className={style.sidebar_corpo}>

                    <SidebarItem texto={texto("Receitas")} link="/receitas" logo={<MdAttachMoney />} />
                </div>

                <div className={style.sidebar_corpo}>

                    <SidebarItem texto={texto("Despesas")} link="/despesas" logo={<MdMoneyOff />} />
                </div>

                <div className={style.sidebar_corpo}>

                    <SidebarItem texto={texto("Relatório Financeiro")} link="/relatorio-financeiro" logo={<MdAssessment />} />
                </div>

                <div className={style.sidebar_corpo}>

                    <SidebarItem texto={texto("DermaFer IA")} link="/ia" logo={<MdSmartToy />} />
                </div>

            </div>

        </aside >
    );
}


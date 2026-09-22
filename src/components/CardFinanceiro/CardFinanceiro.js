import style from "./CardFinanceiro.module.css";

export function CardFinanceiro({ titulo, valor, icone, cor }) {
    return (

        <div className={`${style.card} ${style[cor]}`}>

            <div className={style.topo}>

                <span>{icone}</span>

            </div>

            <h4>{titulo}</h4>

            <strong>{valor}</strong>
        </div>
    );
}
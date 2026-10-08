import style from "./UltimasReceitas.module.css";

export function UltimasReceitas({ receitas }) {

    return (

        <div className={style.card}>

            <h3>Últimas Receitas</h3>

            <div className={style.listaReceitas}>

                {receitas.map((receita, index) => (
                    <div key={index} className={style.itemReceita}>

                        <div className={style.informacoes}>
                            <strong>{receita.produto}</strong>
                            <span>{new Date(receita.dataReceita).toLocaleDateString("pt-BR")}</span>
                        </div>

                        <div className={style.valor}>
                            {receita.valorTotal.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
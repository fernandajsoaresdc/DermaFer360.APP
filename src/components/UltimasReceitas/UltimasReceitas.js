import style from "./UltimasReceitas.module.css";

export function UltimasReceitas({ receitas }) {

    return (

        <div className={style.card}>

            <h3>Últimas Receitas</h3>

            <div className={style.listaReceitas}>

                {receitas.map((receita) => (
                    <div key={receita.id} className={style.itemReceita}>

                        <div className={style.informacoes}>
                            <strong>{receita.produto}</strong>
                            <span>{receita.data}</span>
                        </div>
                        <div className={style.valor}>
                            R${receita.valor}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
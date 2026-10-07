import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import style from "./GraficoFinanceiro.module.css";



export function GraficoFinanceiro({ dados }) {

    return (
        <div className={style.card}>

            <h3>Receitas x Despesas</h3>

            <div className={style.containerGrafico}>

                <ResponsiveContainer width="100%" height="100%">

                    <LineChart data={dados}
                        margin={{
                            top: 10,
                            right: 15,
                            left: 0,
                            bottom: 5
                        }}
                    >

                        <CartesianGrid
                            stroke="#333333"
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey="mes"
                            stroke="#FFFFFF"
                            tick={{ fill: "#FFFFFF",fontSize: 12 }}
                        />

                        <YAxis
                            stroke="#FFFFFF"
                            tick={{ fill: "#FFFFFF", fontSize: 12 }}
                        />

                        <Tooltip />

                        <Line
                            type="linear"
                            dataKey="receita"
                            stroke="#00FF66"
                            strokeWidth={3}
                            dot={{ r: 3, fill: "#00FF66 "}}
                            activeDot={{ r: 6, fill: "#00FF66" }}
                        />

                        <Line
                            type="linear"
                            dataKey="despesa"
                            stroke="#FF3030"
                            strokeWidth={3}
                            dot={{ r: 3, fill: "#FF3030" }}
                            activeDot={{ r: 6, fill: "#FF3030"}}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

            <div className={style.legenda}>

                <div>
                    <span className={style.pontoReceita}></span>
                    Receita
                </div>

                <div>
                    <span className={style.pontoDespesa}></span>
                    Despesa
                </div>

            </div>

        </div>
    );
}
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, CartesianGrid } from "recharts";
import style from "./GraficoFinanceiro.module.css";

export function GraficoFinanceiro({ dados }) {

     return (
    <div className={style.card}>

      <h3>Receitas x Despesas</h3>

      <div className={style.containerGrafico}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dados}>

            <CartesianGrid stroke="#2E2E2E" strokeDasharray="3 3" />

            <XAxis dataKey="mes" stroke="#BFBFBF" />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="receita"
              stroke="#E5E5E5"
              fill="#CFCFCF"
              fillOpacity={0.45}
            />

            <Area
              type="monotone"
              dataKey="despesa"
              stroke="#7A7A7A"
              fill="#505050"
              fillOpacity={0.35}
            />

          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className={style.legenda}>

        <div className={style.itemLegenda}>
          <div className={style.corReceita}></div>
          <span>Receita</span>
        </div>

        <div className={style.itemLegenda}>
          <div className={style.corDespesa}></div>
          <span>Despesa</span>
        </div>

      </div>

    </div>
  );
}
   
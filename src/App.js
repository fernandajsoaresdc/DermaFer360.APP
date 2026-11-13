import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Usuarios } from "./pages/Usuarios/Usuarios";
import { NovoUsuario } from "./pages/NovoUsuario/NovoUsuario";
import { EditarUsuario } from "./pages/EditarUsuario/EditarUsuario";
import { Produtos } from "./pages/Produtos/Produtos";
import { NovoProduto } from "./pages/NovoProduto/NovoProduto";
import { EditarProduto } from "./pages/EditarProduto/EditarProduto";
import { Receitas } from "./pages/Receitas/Receitas";
import { NovaReceita } from "./pages/NovaReceita/NovaReceita";
import { EditarReceita } from "./pages/EditarReceita/EditarReceita";
import { Despesas } from "./pages/Despesas/Despesas";
import { NovaDespesa } from "./pages/NovaDespesa/NovaDespesa";
import { EditarDespesa } from "./pages/EditarDespesa/EditarDespesa";
import { RelatorioFinanceiro } from "./pages/RelatorioFinanceiro/RelatorioFinanceiro";
import { IA } from "./pages/InteligenciaArtificial/IA";
import { RotaPrivada } from "./components/RotaPrivada/RotaPrivada";
import { Layout } from "./components/Layout/Layout";


function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Login />} />
                <Route element={<RotaPrivada><Layout /></RotaPrivada>}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/usuario/novo" element={<NovoUsuario />} />
                <Route path="/usuario/editar/:id" element={<EditarUsuario />} />
                <Route path="/produtos" element={<Produtos />} />
                <Route path="/produto/novo" element={<NovoProduto />} />
                <Route path="/produto/editar/:id" element={<EditarProduto />} />
                <Route path="/receitas" element={<Receitas />} />
                <Route path="/receita/novo" element={<NovaReceita />} />
                <Route path="/receita/editar/:id" element={<EditarReceita />} />
                <Route path="/despesas" element={<Despesas />} />
                <Route path="/despesa/novo" element={<NovaDespesa />} />
                <Route path="/despesa/editar/:id" element={<EditarDespesa />} />
                <Route path="/relatorio-financeiro" element={<RelatorioFinanceiro />} />
                <Route path="/ia" element={<IA />} />

                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;
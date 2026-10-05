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
import { RotaPrivada } from "./components/RotaPrivada/RotaPrivada";


function App() {

    return (

        <BrowserRouter>

            <Routes>
                <Route path= "/" element={<Login />} />
                <Route path="/dashboard" element={<RotaPrivada><Dashboard /></RotaPrivada>} />
                <Route path="/usuarios" element={<RotaPrivada><Usuarios/></RotaPrivada>}/>
                <Route path="/usuario/novo" element={<RotaPrivada><NovoUsuario/></RotaPrivada>}/>
                <Route path="/usuario/editar/:id" element={<RotaPrivada><EditarUsuario/></RotaPrivada>}/>
                <Route path="/produtos" element={<RotaPrivada><Produtos/></RotaPrivada>}/>
                <Route path="/produto/novo" element={<RotaPrivada><NovoProduto/></RotaPrivada>}/>
                <Route path="/produto/editar/:id"element={<RotaPrivada><EditarProduto/></RotaPrivada>}/>
                <Route path="/receitas" element={<RotaPrivada><Receitas/></RotaPrivada>}/>
                <Route path="/receita/novo" element={<RotaPrivada><NovaReceita/></RotaPrivada>}/>
                <Route path="/receita/editar/:id" element={<RotaPrivada><EditarReceita/></RotaPrivada>}/>
                <Route path="/despesas" element={<RotaPrivada><Despesas/></RotaPrivada>}/>
                <Route path="/despesa/novo" element={<RotaPrivada><NovaDespesa/></RotaPrivada>}/>
                <Route path="/despesa/editar/:id" element={<RotaPrivada><EditarDespesa/></RotaPrivada>}/>
                <Route path="/relatorio-financeiro" element={<RotaPrivada><RelatorioFinanceiro/></RotaPrivada>}/>
            </Routes>

        </BrowserRouter>

    );
}

export default App;

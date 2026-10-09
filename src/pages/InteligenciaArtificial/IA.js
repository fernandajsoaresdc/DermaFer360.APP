import { useState } from "react";
import { MdSend, MdDeleteOutline, MdSmartToy } from "react-icons/md";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Topbar } from "../../components/Topbar/Topbar";
import IAService from "../../services/IAService";
import style from "./IA.module.css";

export function IA() {
    const [pergunta, setPergunta] = useState("");
    const [mensagens, setMensagens] = useState([]);
    const [carregando, setCarregando] = useState(false);


    async function enviarPergunta() {

        if (!pergunta || carregando) {
        return;
    }

        const perguntaEnviada = pergunta;

        setMensagens((anteriores) => [...anteriores, { tipo: "usuario", texto: perguntaEnviada }]);

        setPergunta("");

        setCarregando(true);

        try {
            const resposta = await IAService.perguntarAsync(perguntaEnviada);

            setMensagens((anteriores) => [...anteriores, { tipo: "ia", texto: resposta }]);
        }
        catch (error) {
            console.error("Erro ao conversar com a IA:", error);

            setMensagens((anteriores) => [...anteriores, { tipo: "erro", texto: "Não foi possível obter uma resposta da DermaFer IA." }]);
        }
        finally {
            setCarregando(false);
        }
    }

    function pressionarEnter(event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            enviarPergunta();
        }
    }

    function limparConversa() {
        setMensagens([]);
    }

    return (

        <div className={style.pagina}>
            <Sidebar />

            <div className={style.conteudo}>
                <Topbar />

                <main className={style.principal}>

                    <div className={style.cabecalho}>
                        <div>
                            <h1>DermaFer IA</h1>

                            <p>Assistente de governança financeira especializada em dermocosméticos.</p>
                        </div>

                        {mensagens.length > 0 && (
                            <button className={style.botaoLimpar} onClick={limparConversa}>
                                <MdDeleteOutline />
                                Limpar conversa
                            </button>
                        )}
                    </div>

                    <section className={style.chat}>

                        <div className={style.areaMensagens}>

                            {mensagens.length === 0 && (
                                <div className={style.mensagemInicial}>

                                    <div className={style.iconeIA}>
                                        <MdSmartToy />
                                    </div>

                                    <h2>Olá! Eu sou a DermaFer IA.</h2>

                                    <p>
                                        Posso ajudar você a entender conceitos
                                        de gestão financeira e governança
                                        aplicados a empresas de dermocosméticos.
                                    </p>

                                    <div className={style.sugestoes}>

                                        <button onClick={() => setPergunta("O que é margem de lucro?")}>
                                            O que é margem de lucro?
                                        </button>

                                        <button onClick={() => setPergunta("Qual a diferença entre custo e despesa?")}>
                                            Custo x despesa
                                        </button>

                                        <button onClick={() => setPergunta("O que é markup na precificação de produtos?")}>
                                            O que é markup?
                                        </button>

                                    </div>

                                </div>
                            )}

                            {mensagens.map((mensagem, index) => (
                                <div key={index} className={mensagem.tipo === "usuario" ? style.linhaUsuario : style.linhaIA}>

                                    <div className={mensagem.tipo === "usuario" ? style.mensagemUsuario : mensagem.tipo === "erro" ? style.mensagemErro : style.mensagemIA}>

                                        {mensagem.tipo === "ia" && (
                                            <div className={style.tituloIA}>
                                                <MdSmartToy />
                                                DermaFer IA
                                            </div>
                                        )}

                                        {mensagem.texto.split("\n").map((linha, indice) => (<span key={indice}>{linha || "\u00A0"}<br /></span>))}

                                    </div>

                                </div>
                            ))}

                            {carregando && (
                                <div className={style.linhaIA}>
                                    <div className={style.mensagemIA}>
                                        <div className={style.tituloIA}>
                                            <MdSmartToy />
                                            DermaFer IA
                                        </div>

                                        <div className={style.carregando}>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>

                        <div className={style.areaEntrada}>

                            <textarea
                                value={pergunta} onChange={(event) => setPergunta(event.target.value)
                                }
                                onKeyDown={pressionarEnter}
                                placeholder="Digite sua pergunta sobre gestão financeira..."
                                disabled={carregando}
                            />

                            <button
                                className={style.botaoEnviar}
                                onClick={enviarPergunta}
                                disabled={!pergunta || carregando}
                            >
                                <MdSend />
                                Enviar
                            </button>

                        </div>

                        <div className={style.aviso}>
                            A DermaFer IA fornece orientações e análises.
                            Sempre valide decisões financeiras com os dados
                            oficiais da empresa.
                        </div>

                    </section>

                </main>
            </div>
        </div>
    );
}
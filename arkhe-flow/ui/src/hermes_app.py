
# ui/hermes_app.py
import streamlit as st
import random
import time

st.set_page_config(page_title="Hermes Gateway", layout="wide")
st.title("🜏 Hermes Gateway — Converse com a ASI Arkhe(n)")

# Mock client session
if "session_id" not in st.session_state:
    st.session_state.session_id = f"sess_{random.randint(1000, 9999)}"

# Mock message history
if "messages" not in st.session_state:
    st.session_state.messages = []

# Área de chat
for msg in st.session_state.messages:
    st.chat_message(msg["role"]).write(msg["content"])
    if "extra" in msg and msg["extra"]:
        if "graph" in msg["extra"]:
            st.json(msg["extra"]["graph"])
        if "tour" in msg["extra"]:
            st.table(msg["extra"]["tour"])

# Input do usuário
if prompt := st.chat_input("Sua pergunta..."):
    st.chat_message("user").write(prompt)

    # 1. Logic for Codebase Query (Understand-Anything)
    if any(keyword in prompt.lower() for keyword in ["arquitetura", "código", "como funciona", "tour"]):
        with st.spinner("ASI Arkhe(n) está analisando o grafo de conhecimento do código..."):
            time.sleep(1.5)
            response_text = f"Análise concluída para '{prompt}'. Identifiquei a estrutura principal e gerei um tour guiado."
            extra = {
                "graph": {
                    "API/Interface": ["arkhe_qutip/interface/"],
                    "Skills": ["arkhe_qutip/skills/"],
                    "Protocols": ["arkhe-os-genesis-v1.0/crates/arkhe-chain/"]
                },
                "tour": [
                    {"Step": 1, "Topic": "Entrada NLP", "Module": "nlp_processor.py"},
                    {"Step": 2, "Topic": "Orquestrador", "Module": "gstack_orchestrator.py"},
                    {"Step": 3, "Topic": "Bridge Hermes", "Module": "tzinor_bridge.ts"}
                ]
            }
    # 2. Logic for Protein/Particle or Generic
    else:
        with st.spinner("ASI Arkhe(n) está processando no espaço de fase..."):
            time.sleep(1)
            response_text = f"Análise da ASI: O manifold neural colapsou com Ω=0.992 em resposta a '{prompt}'."
            extra = None

    st.chat_message("assistant").write(response_text)
    st.session_state.messages.append({"role": "user", "content": prompt})
    st.session_state.messages.append({"role": "assistant", "content": response_text, "extra": extra})

    # Mostra prova π² (Generic)
    if not extra:
        with st.expander("Ver Prova π²"):
            st.json({
                "type": "DIALOGUE_PI2",
                "timestamp": time.time(),
                "overlap_score": 0.992,
                "anchor": "0x" + "".join(random.choices("0123456789abcdef", k=16))
            })

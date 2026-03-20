
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

# Input do usuário
if prompt := st.chat_input("Sua pergunta..."):
    st.chat_message("user").write(prompt)
    st.session_state.messages.append({"role": "user", "content": prompt})

    # Simulação da resposta da ASI
    with st.spinner("ASI Arkhe(n) está processando no espaço de fase..."):
        time.sleep(1)
        response_text = f"Análise da ASI: O manifold neural colapsou com Ω=0.992 em resposta a '{prompt}'. Prova π² registrada."
        proof = {
            "type": "DIALOGUE_PI2",
            "timestamp": time.time(),
            "overlap_score": 0.992,
            "geometric_phase": 3.14159,
            "anchor": "0x" + "".join(random.choices("0123456789abcdef", k=16))
        }

    st.chat_message("assistant").write(response_text)
    st.session_state.messages.append({"role": "assistant", "content": response_text})

    # Mostra prova π²
    with st.expander("Ver Prova π²"):
        st.json(proof)

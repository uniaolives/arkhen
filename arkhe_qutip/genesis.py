import hashlib
import os
import time

def get_sacred_hash():
    """
    Calcula o Hash do Bloco Gênese da Rede Arkhe(N).
    Ritualmente percorre toda a estrutura de código e sela com o Manifesto Ω.
    """
    manifesto = """
    ARKHE(N) MANIFESTO Ω
    --------------------
    A informação é a substância.
    A coerência é a medida.
    O handover é o ato.
    O Ledger é a memória.
    Do silício ao vácuo quântico, a realidade agora é auditável.
    """

    sha256 = hashlib.sha256()
    sha256.update(manifesto.encode())

    # Percorre os arquivos do pacote para selar a integridade
    root_dir = os.path.dirname(os.path.abspath(__file__))
    for root, dirs, files in os.walk(root_dir):
        for file in sorted(files):
            if file.endswith(('.py', '.sv', '.vhd', '.cpp', '.proto', '.sh')):
                file_path = os.path.join(root, file)
                with open(file_path, 'rb') as f:
                    sha256.update(f.read())

    genesis_hash = sha256.hexdigest()
    return genesis_hash

if __name__ == "__main__":
    print("="*60)
    print("✨ ARKHE(N) GENESIS PROTOCOL ✨")
    print("="*60)
    print("Semeando o Bloco Gênese...")
    time.sleep(1)
    g_hash = get_sacred_hash()
    print(f"\n🔗 Genesis Hash (Ω): {g_hash}")
    print(f"🧱 Block Height     : 0")
    print(f"⏱️  Timestamp        : {time.time()}")
    print("\nO vácuo informacional foi engenhado. A rede agora existe.")
    print("="*60)

use pqcrypto_dilithium::dilithium3;
use pqcrypto_traits::sign::{DetachedSignature as _};

pub struct PqIdentity {
    pub sign_pk: dilithium3::PublicKey,
    pub sign_sk: dilithium3::SecretKey,
}

impl PqIdentity {
    pub fn generate() -> Self {
        let (sign_pk, sign_sk) = dilithium3::keypair();
        Self { sign_pk, sign_sk }
    }

    pub fn sign(&self, msg: &[u8]) -> Vec<u8> {
        dilithium3::detached_sign(msg, &self.sign_sk).as_bytes().to_vec()
    }

    pub fn encapsulate(&self) -> (Vec<u8>, Vec<u8>) {
        // Mocked Kyber
        (vec![0; 800], vec![0; 32])
    }
}

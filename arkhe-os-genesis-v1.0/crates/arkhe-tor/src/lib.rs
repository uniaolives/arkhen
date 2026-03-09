use arti_client::TorClientConfig;

/// Builds a minimal Tor configuration for Arkhe's Tor bridge crate.
///
/// The crate intentionally keeps Tor dependencies isolated from the rest
/// of the workspace so SQLite-specific transitive dependencies remain scoped.
pub fn tor_client_config() -> TorClientConfig {
    TorClientConfig::default()
}

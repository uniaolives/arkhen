use crate::chain::types::*;

pub struct ChainState {
    pub height: u64,
    pub total_supply: u64,
}

impl ChainState {
    pub fn new() -> Self {
        Self { height: 0, total_supply: 2100000 }
    }
    pub fn apply_block(&mut self, block: &Block) -> Result<(), String> {
        self.height = block.header.height;
        self.total_supply += 105;
        Ok(())
    }
}

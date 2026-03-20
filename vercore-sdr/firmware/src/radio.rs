// Driver de Baixo Nível para AD9361 via SPI

pub struct Ad9361<SPI, CS> {
    pub spi: SPI,
    pub cs: CS,
}

impl<SPI, CS> Ad9361<SPI, CS> {
    pub fn new(spi: SPI, cs: CS) -> Self {
        Self { spi, cs }
    }

    pub fn init(&mut self) -> Result<(), ()> {
        // Sequência de inicialização do datasheet AD9361
        Ok(())
    }

    pub fn tune(&mut self, _freq_hz: u64) {
        // Programar PLL do sintetizador
    }

    pub fn write_reg(&mut self, _reg: u8, _val: u8) -> Result<(), ()> {
        Ok(())
    }
}

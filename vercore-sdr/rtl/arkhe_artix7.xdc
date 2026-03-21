# =============================================================================
# ARKHE(N) v4.2 - Constraints File for Artix-7 (VerCore-SDR Node)
# Target Device: XC7A35T-FGG484-1
# =============================================================================

# -----------------------------------------------------------------------------
# 1. CLOCK DEFINITIONS
# -----------------------------------------------------------------------------
# Clock principal do sistema (100 MHz oscilador cristal)
set_property PACKAGE_PIN E3  [get_ports clk_100mhz]
set_property IOSTANDARD LVCMOS33 [get_ports clk_100mhz]
create_clock -period 10.000 -name sys_clk [get_ports clk_100mhz]

# Clock de referência do GPS (1 PPS)
set_property PACKAGE_PIN B4  [get_ports gps_pps]
set_property IOSTANDARD LVCMOS33 [get_ports gps_pps]

# -----------------------------------------------------------------------------
# 2. RESET E CONTROLE
# -----------------------------------------------------------------------------
set_property PACKAGE_PIN C2  [get_ports rst_n]
set_property IOSTANDARD LVCMOS33 [get_ports rst_n]

# -----------------------------------------------------------------------------
# 3. INTERFACE SPI (SDR AD9361)
# -----------------------------------------------------------------------------
set_property PACKAGE_PIN D13 [get_ports spi_clk]
set_property IOSTANDARD LVCMOS33 [get_ports spi_clk]

set_property PACKAGE_PIN D14 [get_ports spi_mosi]
set_property IOSTANDARD LVCMOS33 [get_ports spi_mosi]

set_property PACKAGE_PIN E14 [get_ports spi_miso]
set_property IOSTANDARD LVCMOS33 [get_ports spi_miso]

set_property PACKAGE_PIN D15 [get_ports spi_cs_n]
set_property IOSTANDARD LVCMOS33 [get_ports spi_cs_n]

# -----------------------------------------------------------------------------
# 5. TZINOR LINK (Interface Bexorg - UART/SPI)
# -----------------------------------------------------------------------------
set_property PACKAGE_PIN J15 [get_ports bexorg_tx]
set_property IOSTANDARD LVCMOS33 [get_ports bexorg_tx]

set_property PACKAGE_PIN J16 [get_ports bexorg_rx]
set_property IOSTANDARD LVCMOS33 [get_ports bexorg_rx]

set_false_path -from [get_ports bexorg_rx] -to [get_clocks sys_clk]

# -----------------------------------------------------------------------------
# 6. STATUS LEDs (Ontologia Visual)
# -----------------------------------------------------------------------------
set_property PACKAGE_PIN H5  [get_ports led_status]
set_property IOSTANDARD LVCMOS33 [get_ports led_status]
set_property PACKAGE_PIN J5  [get_ports led_error]
set_property IOSTANDARD LVCMOS33 [get_ports led_error]

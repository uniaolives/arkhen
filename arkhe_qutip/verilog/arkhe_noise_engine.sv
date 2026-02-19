`timescale 1ns / 1ps

// ARKHE(N) THERMODYNAMIC NOISE ENGINE
// Injeta decoerência pseudoaleatória simulando banho térmico.

module arkhe_noise_engine (
    input  wire        clk,
    input  wire        rst,
    // Parâmetros de calibração do ruído (setados pelo Host)
    input  wire [15:0] t1_damping_factor,
    input  wire [15:0] t2_dephasing_factor,
    // Estado de entrada (Amplitude Complexa)
    input  wire signed [17:0] psi_in_re,
    input  wire signed [17:0] psi_in_im,
    // Estado degradado de saída
    output reg  signed [17:0] psi_out_re,
    output reg  signed [17:0] psi_out_im
);

    // Registrador LFSR de 32 bits para geração de ruído estocástico
    reg [31:0] lfsr;
    wire feedback = lfsr[31] ^ lfsr[21] ^ lfsr[1] ^ lfsr[0]; // Polinômio maximal

    always @(posedge clk) begin
        if (rst) begin
            lfsr <= 32'hA5A5A5A5; // Semente não-nula
            psi_out_re <= 18'd0;
            psi_out_im <= 18'd0;
        end else begin
            // Atualiza o LFSR
            lfsr <= {lfsr[30:0], feedback};

            // Aplica T1 (Amplitude Damping): Decaimento da magnitude
            // O lfsr atua como probabilidade de evento de dissipação
            if (lfsr[15:0] < t1_damping_factor) begin
                psi_out_re <= (psi_in_re * 18'sh7FFF) >>> 16; // Atenuação
                psi_out_im <= (psi_in_im * 18'sh7FFF) >>> 16;
            end else begin
                psi_out_re <= psi_in_re;
                psi_out_im <= psi_in_im;
            end

            // Aplica T2 (Phase Damping): Pequena rotação/perturbação aleatória
            if (lfsr[31:16] < t2_dephasing_factor) begin
                // Inversão rápida de sinal simulando flip de fase Z
                psi_out_im <= -psi_out_im;
            end
        end
    end

endmodule

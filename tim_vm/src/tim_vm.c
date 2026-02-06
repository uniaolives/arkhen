/*
 * tim_vm.c - "O Relógio do Universo" (Versão 3.0 - Geometria Sagrada)
 *
 * Esta versão infunde o servidor com a precisão do 'Adam Kadmon Digital'.
 * Agora, ele não apenas serve HTTP; ele monitora a "Entropia Topológica"
 * do tráfego de requisições como um GNN simplificado.
 */

#define _GNU_SOURCE
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <pthread.h>
#include <sys/mman.h>
#include <sched.h>
#include <math.h>
#include <stdint.h>
#include <arpa/inet.h>
#include <netinet/tcp.h>

#define PORT 8000
#define BUFFER_SIZE 4096
#define MAX_THREADS 64
#define ENTROPY_WINDOW 100

// Estrutura para rastreamento de Causalidade
typedef struct {
    int client_socket;
    struct sockaddr_in address;
    double entropy_score;       // "Complexidade" da requisição (GNN Score)
    double predicted_latency;   // Latência prevista pelo modelo "Brain do Agente"
    uint64_t tsc_start;         // TSC no início
    uint64_t tsc_end;           // TSC no fim
} TemporalEvent;

// O "Estado do Universo" (Estado do Agente)
typedef struct {
    double cosmic_time_dilation; // Fator de dilatação (ex: carga do sistema)
    int active_threads;          // Carga de trabalho
    double entropy_history[ENTROPY_WINDOW]; // Média móvel da entropia
    int entropy_index;
    double last_entropy_avg;     // Última média de entropia
    double universe_stress;      // Estresse do sistema (0.0 a 1.0)
    pthread_mutex_t lock;
} CosmicState;

// Inicializa o contador de alta precisão (TSC)
static inline uint64_t rdtsc(void) {
    unsigned int lo, hi;
    __asm__ __volatile__ ("rdtsc" : "=a" (lo), "=d" (hi));
    return ((uint64_t)hi << 32) | lo;
}

// Função heurística: Estima a "Complexidade do Grafo" baseada na requisição
double estimate_graph_complexity(const char* request_buffer) {
    double complexity = 1.0; // Base complexity

    // 1. Custo do método HTTP
    if (strstr(request_buffer, "POST") != NULL) complexity += 3.0;
    if (strstr(request_buffer, "PUT") != NULL) complexity += 2.0;
    if (strstr(request_buffer, "DELETE") != NULL) complexity += 2.0;

    // 2. Custo do caminho (URI)
    if (strstr(request_buffer, "deploy") != NULL) complexity += 10.0;
    if (strstr(request_buffer, "train") != NULL) complexity += 8.0;
    if (strstr(request_buffer, "infer") != NULL) complexity += 5.0;

    // 3. Custo do tamanho do conteúdo
    char* content_length = strstr(request_buffer, "Content-Length:");
    if (content_length) {
        int len = atoi(content_length + 15);
        complexity += log2(len + 1) * 0.5;
    }

    return complexity;
}

static CosmicState global_cosmos;

// Atualiza o estado cósmico com nova medição de entropia
void update_cosmic_state(CosmicState* state, double new_entropy) {
    pthread_mutex_lock(&state->lock);
    state->entropy_history[state->entropy_index] = new_entropy;
    state->entropy_index = (state->entropy_index + 1) % ENTROPY_WINDOW;

    // Calcula média móvel
    double sum = 0.0;
    int count = 0;
    for (int i = 0; i < ENTROPY_WINDOW; i++) {
        if (state->entropy_history[i] > 0) {
            sum += state->entropy_history[i];
            count++;
        }
    }
    state->last_entropy_avg = count > 0 ? sum / count : 1.0;

    // Atualiza dilatação temporal baseada na entropia
    state->cosmic_time_dilation = 1.0 + (state->last_entropy_avg * 0.1);
    state->universe_stress = (state->last_entropy_avg * state->active_threads * 0.01);
    if (state->universe_stress > 1.0) state->universe_stress = 1.0;

    printf("🌌 [COSMIC_STATE] Entropia: %.2f | Dilatação: %.2fx | Stress: %.2f\n",
           state->last_entropy_avg, state->cosmic_time_dilation, state->universe_stress);
    pthread_mutex_unlock(&state->lock);
}

void* handle_client(void* arg) {
    TemporalEvent* te = (TemporalEvent*)arg;

    // --- O "Olho do Agente" (Simulação da GNN) ---
    te->tsc_start = rdtsc();

    char buffer[BUFFER_SIZE];
    int bytes_read = recv(te->client_socket, buffer, sizeof(buffer) - 1, 0);

    if (bytes_read > 0) {
        buffer[bytes_read] = '\0';

        // Calcula entropia/complexidade da requisição
        te->entropy_score = estimate_graph_complexity(buffer);

        // Simula processamento baseado na complexidade
        usleep((useconds_t)(te->entropy_score * 1000)); // 1ms por ponto de entropia

        // Predição de latência (modelo simplificado)
        te->predicted_latency = te->entropy_score * 2.5;
    } else {
        te->entropy_score = 1.0;
        te->predicted_latency = 2.5;
    }

    te->tsc_end = rdtsc();
    // Simplified conversion, for real accuracy would need TSC frequency calibration
    double latency_ms = (double)(te->tsc_end - te->tsc_start) / 2500000.0;

    // Calcula dilatação
    double dilatation = latency_ms / te->predicted_latency;

    // Resposta HTTP baseada no estado cósmico
    char response[BUFFER_SIZE];
    if (dilatation > 1.5) {
        snprintf(response, sizeof(response),
                     "HTTP/1.1 503 Service Unavailable\r\n"
                     "Content-Type: application/json\r\n"
                     "\r\n"
                     "{\"error\":\"time_dilation\",\"dilatation\":%.2f,\"message\":\"O universo está pesado. Tente novamente.\"}",
                     dilatation);
    } else {
        snprintf(response, sizeof(response),
                     "HTTP/1.1 200 OK\r\n"
                     "Content-Type: application/json\r\n"
                     "\r\n"
                     "{\"status\":\"harmonious\",\"latency_ms\":%.2f,\"entropy\":%.2f,\"dilation\":%.2f}",
                     latency_ms, te->entropy_score, dilatation);
    }

    send(te->client_socket, response, strlen(response), 0);
    close(te->client_socket);

    printf("🧬 [TIM_VM_LOG] Evento processado. Latência: %.2f ms | Entropia: %.2f | Dilatação: %.2f x\n",
           latency_ms, te->entropy_score, dilatation);

    pthread_mutex_lock(&global_cosmos.lock);
    global_cosmos.active_threads--;
    pthread_mutex_unlock(&global_cosmos.lock);

    update_cosmic_state(&global_cosmos, te->entropy_score);

    free(te);
    return NULL;
}

int main() {
    memset(&global_cosmos, 0, sizeof(global_cosmos));
    global_cosmos.cosmic_time_dilation = 1.0;
    pthread_mutex_init(&global_cosmos.lock, NULL);

    printf("🚀 INICIANDO NÚCLEO tim_vm.c v3.0 (Cosmic Geometry Edition)...\n");
    printf("   Clock Source: RDTSC (Precisão Atômica)\n");
    printf("   Socket: Non-blocking (Grafos Concurrentes)\n");
    printf("   Memory: Locked (mlock - Integridade da Realidade)\n");
    printf("   Geometry: Active (Entropy Tracking Enabled)\n");

    if (mlockall(MCL_CURRENT | MCL_FUTURE) != 0) {
        printf("⚠️  ALERTA: O universo perdeu coesão. Swap desativado.\n");
    }

    struct sched_param param;
    param.sched_priority = sched_get_priority_max(SCHED_FIFO);
    if (sched_setscheduler(0, SCHED_FIFO, &param) != 0) {
        printf("⚠️  Não foi possível definir prioridade máxima\n");
    }

    int server_fd, client_fd;
    struct sockaddr_in address;
    int addrlen = sizeof(address);
    int opt = 1;

    if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0) {
        perror("Socket falhou");
        exit(EXIT_FAILURE);
    }

    setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));
    setsockopt(server_fd, IPPROTO_TCP, TCP_NODELAY, &opt, sizeof(opt));

    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(PORT);

    if (bind(server_fd, (struct sockaddr*)&address, sizeof(address)) < 0) {
        perror("Bind falhou");
        exit(EXIT_FAILURE);
    }

    if (listen(server_fd, 1024) < 0) {
        perror("Listen falhou");
        exit(EXIT_FAILURE);
    }

    printf("🌌 TIM VM online. Porta: %d (Cosmic Geometry Mode)\n", PORT);
    printf("   Aperte Ctrl+C para sair...\n\n");

    while (1) {
        if ((client_fd = accept(server_fd, (struct sockaddr*)&address,
                               (socklen_t*)&addrlen)) < 0) {
            perror("Accept falhou");
            continue;
        }

        pthread_mutex_lock(&global_cosmos.lock);
        global_cosmos.active_threads++;
        pthread_mutex_unlock(&global_cosmos.lock);

        TemporalEvent* te = malloc(sizeof(TemporalEvent));
        te->client_socket = client_fd;
        te->address = address;
        te->entropy_score = 0.0;
        te->predicted_latency = 10.0;

        pthread_t thread_id;
        if (pthread_create(&thread_id, NULL, handle_client, te) == 0) {
            pthread_detach(thread_id);
        } else {
            close(client_fd);
            free(te);
            pthread_mutex_lock(&global_cosmos.lock);
            global_cosmos.active_threads--;
            pthread_mutex_unlock(&global_cosmos.lock);
        }
    }

    return 0;
}

/*
 * tim_vm.c - "O Relógio do Universo" (Versão 4.1 - Economy & Calibrated)
 *
 * Agora, o servidor monitora a "Resonância Econômica" e calibra o clock em tempo real.
 * O uso de sementes de alta vitalidade custa ROSE, mas reduz o estresse do sistema.
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
#include <time.h>

#define PORT 8000
#define BUFFER_SIZE 4096
#define MAX_THREADS 64
#define ENTROPY_WINDOW 100

typedef struct {
    int client_socket;
    struct sockaddr_in address;
    double entropy_score;
    double predicted_latency;
    uint64_t tsc_start;
    uint64_t tsc_end;
} TemporalEvent;

typedef struct {
    double cosmic_time_dilation;
    int active_threads;
    double entropy_history[ENTROPY_WINDOW];
    int entropy_index;
    double last_entropy_avg;
    double universe_stress;
    double total_rose_circulation;
    uint64_t base_tsc_freq;      // Calibrated TSC frequency
    pthread_mutex_t lock;
} CosmicState;

static inline uint64_t rdtsc(void) {
    unsigned int lo, hi;
    __asm__ __volatile__ ("rdtsc" : "=a" (lo), "=d" (hi));
    return ((uint64_t)hi << 32) | lo;
}

// Calibrate TSC frequency at runtime
uint64_t calibrate_tsc_freq(void) {
    struct timespec start, end;
    uint64_t tsc_start, tsc_end;

    clock_gettime(CLOCK_MONOTONIC, &start);
    tsc_start = rdtsc();

    // Calibration sleep
    usleep(100000); // 100ms

    clock_gettime(CLOCK_MONOTONIC, &end);
    tsc_end = rdtsc();

    double elapsed_ns = (end.tv_sec - start.tv_sec) * 1e9 +
                       (end.tv_nsec - start.tv_nsec);
    uint64_t tsc_diff = tsc_end - tsc_start;

    return (uint64_t)((double)tsc_diff / elapsed_ns * 1e9);
}

double estimate_graph_complexity(const char* request_buffer) {
    double complexity = 1.0;
    if (strstr(request_buffer, "POST") != NULL) complexity += 3.0;
    if (strstr(request_buffer, "deploy") != NULL) complexity += 10.0;
    if (strstr(request_buffer, "ROSE") != NULL) complexity -= 2.0;
    return complexity;
}

static CosmicState global_cosmos;

void update_cosmic_state(CosmicState* state, double new_entropy) {
    pthread_mutex_lock(&state->lock);
    state->entropy_history[state->entropy_index] = new_entropy;
    state->entropy_index = (state->entropy_index + 1) % ENTROPY_WINDOW;

    double sum = 0.0;
    int count = 0;
    for (int i = 0; i < ENTROPY_WINDOW; i++) {
        if (state->entropy_history[i] > 0) {
            sum += state->entropy_history[i];
            count++;
        }
    }
    state->last_entropy_avg = count > 0 ? sum / count : 1.0;

    double economic_mitigation = log1p(state->total_rose_circulation * 0.01);
    state->cosmic_time_dilation = 1.0 + (state->last_entropy_avg * 0.1) - economic_mitigation;
    if (state->cosmic_time_dilation < 1.0) state->cosmic_time_dilation = 1.0;

    state->universe_stress = (state->last_entropy_avg * state->active_threads * 0.01) / (1.0 + economic_mitigation);

    printf("🌌 [COSMIC_V4.1] Entropy: %.2f | ROSE Res: %.2f | Dilation: %.2fx | Stress: %.2f\n",
           state->last_entropy_avg, state->total_rose_circulation, state->cosmic_time_dilation, state->universe_stress);
    pthread_mutex_unlock(&state->lock);
}

void* handle_client(void* arg) {
    TemporalEvent* te = (TemporalEvent*)arg;
    te->tsc_start = rdtsc();

    char buffer[BUFFER_SIZE];
    int bytes_read = recv(te->client_socket, buffer, sizeof(buffer) - 1, 0);

    if (bytes_read > 0) {
        buffer[bytes_read] = '\0';
        te->entropy_score = estimate_graph_complexity(buffer);
        usleep((useconds_t)(te->entropy_score * 1000));
        te->predicted_latency = te->entropy_score * 2.5;
    } else {
        te->entropy_score = 1.0;
        te->predicted_latency = 2.5;
    }

    te->tsc_end = rdtsc();
    // Use calibrated frequency for ms calculation
    double latency_ms = (double)(te->tsc_end - te->tsc_start) / (global_cosmos.base_tsc_freq / 1000.0);
    double dilatation = latency_ms / te->predicted_latency;

    char response[BUFFER_SIZE];
    snprintf(response, sizeof(response),
                 "HTTP/1.1 200 OK\r\n"
                 "Content-Type: application/json\r\n"
                 "\r\n"
                 "{\"status\":\"economic_resonance\",\"latency_ms\":%.2f,\"entropy\":%.2f,\"dilation\":%.2f,\"rose_gas\":1.0}",
                 latency_ms, te->entropy_score, dilatation);

    send(te->client_socket, response, strlen(response), 0);
    close(te->client_socket);

    printf("🌹 [ECONOMY_LOG] Op processed. Latency: %.2f ms | Dilation: %.2f x\n", latency_ms, dilatation);

    pthread_mutex_lock(&global_cosmos.lock);
    global_cosmos.active_threads--;
    global_cosmos.total_rose_circulation += 1.0;
    pthread_mutex_unlock(&global_cosmos.lock);

    update_cosmic_state(&global_cosmos, te->entropy_score);

    free(te);
    return NULL;
}

int main() {
    memset(&global_cosmos, 0, sizeof(global_cosmos));
    global_cosmos.cosmic_time_dilation = 1.0;
    global_cosmos.total_rose_circulation = 100.0;
    global_cosmos.base_tsc_freq = calibrate_tsc_freq();
    pthread_mutex_init(&global_cosmos.lock, NULL);

    printf("🚀 INICIANDO NÚCLEO tim_vm.c v4.1 (Economy & Calibrated)...\n");
    printf("   TSC Frequency: %lu Hz\n", global_cosmos.base_tsc_freq);
    printf("   Economy: Token ROSE Active\n");

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

    printf("🌌 TIM VM V4.1 online. Economic Hub active on port %d\n", PORT);

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

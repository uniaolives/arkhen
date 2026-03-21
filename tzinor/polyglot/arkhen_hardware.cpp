#include <cmath>
#include <cstdint>
#include <iostream>
#include <vector>

struct ComplexCoherence {
    double amplitude;
    double phase;
    bool is_resonant() const { return amplitude >= 0.9 && std::abs(phase - M_PI_2) < 0.1; }
};

class IMEAInterface {
public:
    virtual ~IMEAInterface() = default;
    virtual std::vector<double> readLFP(uint64_t duration_ms) = 0;
};

class BiologicalController {
    IMEAInterface& mea;
public:
    explicit BiologicalController(IMEAInterface& m) : mea(m) {}
    ComplexCoherence measureCoherence() {
        auto lfp = mea.readLFP(1000);
        double p = 0.0; for (double v : lfp) p += v * v;
        p = lfp.empty() ? 0.0 : std::sqrt(p / lfp.size());
        return {std::tanh(p / 0.5), M_PI_2 * (1.0 - std::exp(-p / 10.0))};
    }
};

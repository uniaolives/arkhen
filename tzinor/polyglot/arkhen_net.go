package main

import (
	"context"
	"crypto/sha256"
	"fmt"
	"math"
	"time"
)

type ComplexCoherence struct {
	Amplitude float64 `json:"amplitude"`
	Phase     float64 `json:"phase"`
}

func (c ComplexCoherence) IsResonant() bool {
	return c.Amplitude >= 0.9 && math.Abs(c.Phase-math.Pi/2) < 0.1
}

type Proof struct {
	ID        string           `json:"id"`
	StateHash string           `json:"state_hash"`
	Coherence ComplexCoherence `json:"coherence"`
	Timestamp int64            `json:"timestamp"`
}

type TzinorNode struct {
	ID          string
	KnownProofs map[string]Proof
	PeerNodes   []*TzinorNode
}

func NewTzinorNode(id string) *TzinorNode {
	return &TzinorNode{ID: id, KnownProofs: make(map[string]Proof)}
}

func (n *TzinorNode) Compile(ctx context.Context, initialState []byte) (*Proof, error) {
	select {
	case <-ctx.Done():
		return nil, ctx.Err()
	default:
		coh := ComplexCoherence{Amplitude: 0.95, Phase: math.Pi / 2}
		if !coh.IsResonant() {
			return nil, fmt.Errorf("no resonance")
		}
		h := sha256.Sum256(initialState)
		return &Proof{ID: fmt.Sprintf("%x", h[:8]), StateHash: fmt.Sprintf("%x", h), Coherence: coh, Timestamp: time.Now().Unix()}, nil
	}
}

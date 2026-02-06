import os
from dataclasses import dataclass
from typing import Optional

@dataclass
class Config:
    """Central configuration for all environments"""

    # Environment
    ENV: str = os.getenv("ENV", "development")
    DEBUG: bool = ENV == "development"

    # GitHub
    GITHUB_TOKEN: Optional[str] = os.getenv("GITHUB_TOKEN")
    GITHUB_WEBHOOK_SECRET: Optional[str] = os.getenv("GITHUB_WEBHOOK_SECRET")

    # Economy Settings
    ROSE_TOKEN_ID: str = "rose-hip-01-token"
    RESONANCE_THRESHOLD: float = 1.85
    DIRICHLET_REWARD_K: float = 100.0

    @classmethod
    def from_env(cls):
        """Load configuration from environment variables"""
        return cls()

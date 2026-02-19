from setuptools import setup, find_packages

setup(
    name="arkhe_qutip",
    version="1.2.0",
    packages=find_packages(),
    install_requires=[
        "qutip",
        "qutip-qip",
        "numpy",
        "matplotlib",
        "networkx",
        "grpcio",
        "grpcio-tools",
        "boto3",
        "nbformat",
        "nbconvert",
        "ipykernel",
    ],
    author="Avalon Architects",
    description="Quantum Hypergraph paradigm for memory-aware quantum objects.",
)

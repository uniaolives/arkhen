# infrastructure/arkhe-os/configuration.nix
{ config, pkgs, modulesPath, ... }:

{
  imports = [
    "${modulesPath}/installer/cd-dvd/installation-cd-minimal.nix"
  ];

  # Node Identity and Network
  networking.hostName = "arkhe-node";
  networking.networkmanager.enable = true;

  # High-Throughput Kernel Optimizations (BBR + RMEM)
  boot.kernel.sysctl = {
    "net.core.rmem_max" = 16777216;
    "net.core.wmem_max" = 16777216;
    "net.ipv4.tcp_rmem" = "4096 87380 16777216";
    "net.ipv4.tcp_wmem" = "4096 65536 16777216";
    "net.ipv4.tcp_congestion_control" = "bbr";
  };

  # 1. Silicon Activation (NVIDIA / CUDA)
  hardware.opengl = {
    enable = true;
    driSupport = true;
    driSupport32Bit = true;
  };

  services.xserver.videoDrivers = [ "nvidia" ];
  hardware.nvidia = {
    modesetting.enable = true;
    open = false; # Proprietary drivers for max performance
    nvidiaSettings = false;
    package = config.boot.kernelPackages.nvidiaPackages.production;
  };

  # 2. Container Layer (Podman)
  virtualisation.podman = {
    enable = true;
    dockerCompat = true;
    enableNvidia = true;
    defaultNetwork.settings.dns_enabled = true;
  };

  # 3. Essential System Packages
  environment.systemPackages = with pkgs; [
    git htop tmux vim jq curl
    nvtopPackages.nvidia
    podman-compose
    python311
    python311Packages.cryptography
  ];

  # 4. Resonance Ignition (Systemd Service)
  systemd.services.arkhe-ignition = {
    description = "Arkhe(n) Node Auto-Ignition Sequence";
    wantedBy = [ "multi-user.target" ];
    after = [ "network-online.target" ];
    path = [ pkgs.podman pkgs.curl pkgs.python311 ];
    script = ''
      echo "🜏 Starting Arkhe(n) node ignition..."

      # Check for Nostr private key in shared memory (injected by udev)
      ENV_FILE="/dev/shm/arkhe_node.env"
      if [ -f "$ENV_FILE" ]; then
        source "$ENV_FILE"
      else
        echo "⚠️ Identity not found. Running in observer mode."
        export NOSTR_PRIVATE_KEY="OBSERVER"
      fi

      # Deployment of the Podman pod
      # In production, this would pull from a secure source
      POD_SPEC="/etc/arkhe/arkhe-node-pod.yaml"
      if [ -f "$POD_SPEC" ]; then
         podman play kube "$POD_SPEC"
      fi
    '';
    serviceConfig = {
      Type = "oneshot";
      RemainAfterExit = true;
    };
  };

  # Security: The root password must be set during initial setup.
  # Using 'mutableUsers = false' and providing a hashed password for deployment is recommended.
  # For the genesis install, use 'passwd' or provide a hashed string here.
  users.mutableUsers = true;

  system.stateVersion = "23.11";
}

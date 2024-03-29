{
  description = "My Development Environment";

  inputs.nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";

  outputs = { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        buildInputs = [
          pkgs.git
          pkgs.nodejs-18_x
          pkgs.yarn-berry
          pkgs.neovim
          pkgs.zsh
          pkgs.ripgrep
          pkgs.lazygit
          pkgs.gdu
          pkgs.bottom
          pkgs.python3
        ];

        shellHook = ''
          export SHELL=${pkgs.zsh}/bin/zsh
          eval "$__ETC_PROFILE_SETUP"
        '';

        # Set some environment variables for convenience
        # EDITOR = "nvim";
        # VISUAL = "nvim";
      };
    };
}



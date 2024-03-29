{
  description = "A development environment for my project";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };
      in {
        devShell = pkgs.mkShell {
          buildInputs = with pkgs; [
            git 
            nodejs-18_x
            yarn-berry
            neovim

            # shell environment
            zsh

            # astronvim requirements
            ripgrep
            lazygit
            gdu
            bottom
            python3
          ];

          shellHook = ''
            export SHELL=${pkgs.zsh}/bin/zsh
            eval "$__ETC_PROFILE_SETUP"
          '';
        };
      }
    );
}

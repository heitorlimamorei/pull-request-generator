# Pull Request Generator AI

Este projeto é uma ferramenta automatizada que baixa os commits de diferença entre uma `base branch` e uma `head branch` no GitHub. Ele usa o GPT-4omini para criar descrições de pull request baseadas nos textos desses commits.

## Funcionalidades

- Baixar commits entre duas branches no GitHub
- Enviar o texto dos commits para a API do GPT-4omini
- Criar uma descrição detalhada para um pull request

## Pré-requisitos

- Node.js instalado
- Conta no GitHub com token de acesso
- Conta no OpenAI com chave de acesso

## Instalação

1. Clone o repositório
``SH
git clone <NOME_DO_REPOSITÓRIO>
cd <NOME_DO_DIRETÓRIO_CLONADO>
``
3. 2. Crie um arquivo `.env` na raiz do projeto e adicione suas chaves da API:

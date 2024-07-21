# Pull Request Generator AI

Este projeto é uma ferramenta automatizada que baixa os commits de diferença entre uma `base branch` e uma `head branch` no GitHub. Ele usa o GPT-4o-mini para criar descrições de pull request baseadas nos textos desses commits.

## Funcionalidades

- Baixar commits entre duas branches no GitHub
- Enviar o texto dos commits para a API do GPT-4o-mini
- Criar uma descrição detalhada para um pull request
- Publicar o pull request criado no repository

## Pré-requisitos

- Node.js instalado
- Conta no GitHub com token de acesso
- Conta no OpenAI com chave de acesso

## Instalação

1. Clone o repositório:

```SH
git clone <NOME_DO_REPOSITÓRIO>
cd <NOME_DO_DIRETÓRIO_CLONADO>
```

2. Crie um arquivo `.env` na raiz do projeto e adicione suas chaves da API:
```env
GIT_HUB_TOKEN=seutoken_github
OPEN_AI_KEY=suachave_openai
```

## Configuração

### 1. Adicionar Caminho do Diretório ao ZSH

Adicione o diretório onde você clonou o repositório ao seu `PATH`. Abra o terminal e edite seu arquivo `.zshrc`:

```sh
nano ~/.zshrc
```

Adicione a seguinte linha, substituindo `<CAMINHO_DO_DIRETÓRIO>` pelo caminho real do diretório clonado:

```sh
export PATH=$PATH:DODIRETÓRIO>
```

Salve e feche o arquivo, depois recarregue as configurações do ZSH:

```sh
source ~/.zshrc
```

### 2. Criar Alias Global no ZSH

Ainda no arquivo `.zshrc`, adicione a seguinte linha para criar um alias global que executa `npm start` no diretório do projeto:

```sh
alias generate-pr="(cd ~/<CAMINHO_DO_DIRETÓRIO> && npm start)"
```

Substitua `<CAMINHO_DO_DIRETÓRIO>` pelo caminho real do diretório clonado. Salve, feche o arquivo e recarregue as configurações do ZSH novamente:

```sh
source ~/.zshrc
```

## Uso

Para iniciar a aplicação, simplesmente execute o alias criado:

```sh
generate-pr
```
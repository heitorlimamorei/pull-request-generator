# Pull Request Generator AI

Este projeto é uma ferramenta automatizada que baixa os commits de diferença entre uma `base branch` e uma `head branch` no GitHub. Ele usa o GPT-4o-mini para criar descrições de pull request baseadas nos textos desses commits.

## Sumário

- [Funcionalidades](#funcionalidades)
- [Recomendação para Commits Detalhados](#recomendação-para-commits-detalhados)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
  - [Configuração para ZSH](#configuração-para-zsh)
  - [Configuração para Bash](#configuração-para-usuários-do-bash)
- [Uso](#uso)
- [Llama3](#llama3)

## Funcionalidades

- Baixar commits entre duas branches no GitHub
- Enviar o texto dos commits para a API do GPT-4o-mini
- Criar uma descrição detalhada para um pull request
- Publicar o pull request criado no repositório
- **Análise do código adicionado** para gerar insights adicionais
- **Detecção automática da branch e do repositório** para facilitar o fluxo

## Recomendacão para Commits Detalhados

Para obter melhores resultados com a IA, mantenha tanto o **título** quanto as **descrições** dos commits detalhados. Isso ajuda a IA a entender o contexto do código adicionado e gerar descrições mais precisas e informativas.

## Pré-requisitos

- Node.js instalado
- Conta no GitHub com token de acesso
- Conta no OpenAI com chave de acesso
- (Opcional) Ollama

## Instalação

1. Clone o repositório:

```sh
git clone https://github.com/heitorlimamorei/pull-request-generator
cd pull-request-generator
```

2. Crie um arquivo `.env` na raiz do projeto e adicione suas chaves da API:

```env
GIT_HUB_TOKEN=seutoken_github
OPEN_AI_KEY=suachave_openai
```

## Configuração

### Configuração para ZSH

#### 1. Adicionar Caminho do Diretório ao ZSH

Adicione o diretório onde você clonou o repositório ao seu `PATH`. Abra o terminal e edite seu arquivo `.zshrc`:

```sh
nano ~/.zshrc
```

Adicione a seguinte linha, substituindo `<CAMINHO_DO_DIRETÓRIO>` pelo caminho real do diretório clonado:

```sh
export PATH=$PATH:<CAMINHO_DO_DIRETÓRIO>
```

Salve e feche o arquivo, depois recarregue as configurações do ZSH:

```sh
source ~/.zshrc
```

#### 2. Criar Alias Global no ZSH

Ainda no arquivo `.zshrc`, adicione a seguinte linha para criar um alias global que executa `npm start` no diretório do projeto:

```sh
alias generate-pr='(original_dir=$(pwd); cd <CAMINHO_DO_DIRETÓRIO>; npm start -- --original-dir="$original_dir")'
```

Substitua `<CAMINHO_DO_DIRETÓRIO>` pelo caminho real do diretório clonado. Salve, feche o arquivo e recarregue as configurações do ZSH novamente:

```sh
source ~/.zshrc
```

### Configuração para Usuários do Bash

1. Abra o terminal e edite o arquivo `.bashrc`:

```sh
nano ~/.bashrc
```

2. Adicione o caminho do diretório clonado ao `PATH`:

```sh
export PATH=$PATH:<CAMINHO_DO_DIRETÓRIO>
```

3. Adicione um alias para executar o projeto:

```sh
alias generate-pr='(original_dir=$(pwd); cd <CAMINHO_DO_DIRETÓRIO>; npm start -- --original-dir="$original_dir")'
```

4. Salve e feche o arquivo. Recarregue as configurações do Bash:

```sh
source ~/.bashrc
```

## Uso

Para iniciar a aplicação, simplesmente execute o alias criado:

```sh
generate-pr
```

## Llama3

Para rodar o PR Generator usando o Llama LLM localmente, é preciso instalar o Ollama: [Download Ollama](https://ollama.com/download)

### Executando o Llama3

Antes de utilizar, é preciso rodar o servidor do Llama na sua máquina:

```sh
ollama run llama3
```

Para que o Pull Request Generator use o Llama, no ato de gerar o PR você deve selecionar o Llama3 como modelo de IA desejado.

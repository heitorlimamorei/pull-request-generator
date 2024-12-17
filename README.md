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

Copie e cole o seguinte comando no terminal para instalar e configurar tudo automaticamente:

```sh
git clone https://github.com/heitorlimamorei/pull-request-generator.git && cd pull-request-generator && echo 'GIT_HUB_TOKEN=seutoken_github
OPEN_AI_KEY=suachave_openai' > .env && echo 'alias generate-pr="(cd $(pwd) && npm start)"' >> ~/.zshrc && source ~/.zshrc
```

### Para Usuários do Bash

Se você usa Bash, substitua `~/.zshrc` por `~/.bashrc`:

```sh
git clone https://github.com/heitorlimamorei/pull-request-generator.git && cd pull-request-generator && echo 'GIT_HUB_TOKEN=seutoken_github
OPEN_AI_KEY=suachave_openai' > .env && echo 'alias generate-pr="(cd $(pwd) && npm start)"' >> ~/.bashrc && source ~/.bashrc
```

**Substitua `seutoken_github` e `suachave_openai` com suas chaves reais.**

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

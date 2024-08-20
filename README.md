### Descrição do Projeto

Este projeto implementa uma aplicação de desenho interativa em um canvas HTML, utilizando conceitos de programação reativa. A aplicação foi criada com o intuito de replicar funcionalidades semelhantes ao RxJS, mas usando apenas as APIs padrão do Node.js e do JavaScript moderno, sem dependência de bibliotecas externas.

### Funcionalidades

- **Desenho Dinâmico no Canvas:**

  - O usuário pode desenhar no canvas com o mouse ou através de toques em dispositivos móveis. O código captura eventos como `mousedown`, `mousemove`, `mouseup` e seus equivalentes para toque, permitindo que linhas sejam desenhadas conforme o movimento do cursor ou do dedo.

- **Programação Reativa Customizada:**

  - A lógica reativa do projeto é implementada utilizando operadores personalizados que "clonam" a funcionalidade do RxJS, como `fromEvent`, `map`, `merge`, `switchMap` e `takeUntil`. Esses operadores gerenciam os fluxos de eventos de maneira reativa, combinando e transformando-os para permitir uma interação fluida e responsiva no canvas.

- **Armazenamento e Limpeza de Traços:**

  - Cada traço desenhado no canvas é armazenado em um banco de dados local (`store`). O usuário pode limpar o canvas clicando em um botão dedicado, que ativa uma animação suave onde os traços são redesenhados com uma cor de fundo antes de serem removidos completamente.

- **Compatibilidade com Dispositivos Touch:**
  - O código inclui uma lógica para converter eventos de toque em eventos de mouse, garantindo que a interface funcione tanto em dispositivos móveis quanto em desktops.

### Objetivos do Projeto

O principal objetivo deste projeto é demonstrar como é possível aplicar a programação reativa em um contexto prático, sem depender de bibliotecas externas como o RxJS. Ao implementar operadores reativos manualmente e utilizando apenas as APIs nativas do JavaScript e Node.js, o projeto oferece uma compreensão mais profunda dos conceitos reativos e como eles podem ser utilizados para criar aplicações interativas e responsivas.

### Como Funciona

1. **Inicialização do Canvas:**

   - O canvas é configurado para ajustar sua altura e largura com base nas dimensões da janela, e o contexto de desenho (`ctx`) é preparado para receber os comandos de desenho.

2. **Captura de Eventos:**

   - Eventos de mouse e toque são monitorados através de operadores reativos personalizados, que combinam e transformam os eventos para permitir o desenho no canvas.

3. **Desenho no Canvas:**

   - À medida que o usuário interage com o canvas, as posições do cursor ou do dedo são rastreadas e usadas para desenhar linhas que seguem o movimento.

4. **Limpeza com Animação:**
   - Quando o botão de limpar é acionado, o código reproduz uma animação que apaga os traços armazenados, seguindo o fluxo reativo para limpar o canvas de maneira suave.

### Tecnologias Utilizadas

- **JavaScript Moderno**: Para a implementação da lógica e manipulação do DOM.
- **Node.js**: Utilização das APIs padrão para replicar funcionalidades do RxJS.
- **HTML5 Canvas**: Para renderizar os desenhos no navegador.

### Contribuição

Sinta-se à vontade para explorar, modificar e melhorar o projeto. Sugestões e melhorias são sempre bem-vindas!

---

Este projeto é ideal para quem deseja aprender mais sobre programação reativa e como criar aplicações interativas sem depender de bibliotecas externas, utilizando apenas os recursos nativos do JavaScript e do Node.js.

### Créditos

Este projeto foi inspirado por conteúdos e ensinamentos do [@ErickWendel](https://github.com/ErickWendel), que compartilha conhecimento valioso sobre JavaScript, Node.js e programação reativa. Agradecimentos especiais por sua contribuição à comunidade de desenvolvedores!

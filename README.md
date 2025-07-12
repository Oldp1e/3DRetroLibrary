# 3D Fun - Biblioteca Retrô de Jogos 3D

Um projeto interativo 3D que apresenta cartuchos de jogos flutuantes em uma estética retrô neon arcade.

## 🎮 Características

- **Interface 3D Interativa**: Cartuchos de jogos flutuando com animações suaves
- **Estética Retrô**: Cores neon vibrantes, fontes de arcade e efeitos luminosos
- **Animações GSAP**: Transições fluidas e efeitos visuais impressionantes
- **React Three Fiber**: Renderização 3D poderosa integrada ao React
- **5 Jogos Icônicos**: Hearthstone, Star Wars Battlefront 2, Minecraft, Jurassic World Evolution e Zelda

## 🎨 Paleta de Cores

- **Rosa Neon**: `#ff00ff` - Hearthstone
- **Azul Neon**: `#0066ff` - Star Wars Battlefront 2  
- **Verde Neon**: `#39ff14` - Minecraft
- **Magenta**: `#ff00ff` - Jurassic World Evolution
- **Ciano**: `#00ffff` - The Legend of Zelda

## 🚀 Como Executar

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Iniciar o servidor de desenvolvimento**:
   ```bash
   npm start
   ```

3. **Abrir no navegador**:
   - O projeto abrirá automaticamente em `http://localhost:3000`

## 🎯 Como Usar

1. **Visualização 3D**: Os 5 cartuchos flutuam automaticamente na tela
2. **Interação**: Clique em qualquer cartucho para ver suas informações
3. **Animação**: O cartucho desce animado até o console
4. **Card Informativo**: Aparece um card com detalhes do jogo
5. **Navegação**: Use o mouse para rotacionar a câmera (OrbitControls)

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **React Three Fiber** - Integração Three.js + React
- **@react-three/drei** - Helpers e utilitários 3D
- **Three.js** - Biblioteca 3D
- **GSAP** - Animações avançadas
- **CSS3** - Estilização e efeitos visuais

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── GameCartridge.tsx    # Cartucho 3D interativo
│   ├── Console.tsx          # Console base
│   ├── GameCard.tsx         # Card de informações
│   └── GameCard.css         # Estilos do card
├── data/
│   └── games.ts             # Dados dos jogos
├── App.tsx                  # Componente principal
├── App.css                  # Estilos principais
└── index.css                # Estilos globais
```

## 🎨 Fontes Utilizadas

- **Press Start 2P** - Textos principais retrô
- **VT323** - Textos de interface
- **Orbitron** - Títulos principais
- **Rubik Mono One** - Títulos alternativos

## ✨ Funcionalidades

### Cartuchos 3D
- Animação de flutuação contínua
- Efeito hover com brilho
- Rotação suave automática
- Animação de descida ao console

### Cards Informativos
- Aparição com efeito 3D
- Informações detalhadas dos jogos
- Botões interativos
- Efeitos neon e cantos decorativos

### Console
- Design minimalista
- Slot para cartucho
- Luzes indicadoras
- Efeito de "respiração" luminosa

## 🎯 Melhorias Futuras

- [ ] Adicionar mais jogos
- [ ] Implementar sons retrô
- [ ] Adicionar partículas de fundo
- [ ] Criar modo VR
- [ ] Adicionar achievements
- [ ] Sistema de favoritos

## 📝 Licença

Este projeto é open source e está disponível sob a licença MIT.

---

**Desenvolvido com ❤️ e muito neon! 🌈**

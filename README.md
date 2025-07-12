# 🎮 3D Retro Library

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-Latest-000000?style=for-the-badge&logo=three.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React Three Fiber](https://img.shields.io/badge/React_Three_Fiber-8.15.12-FF6B6B?style=for-the-badge&logo=react&logoColor=white)

**Uma experiência interativa 3D inspirada nos consoles retrô dos anos 80/90**

[🚀 Demo Live](#) • [📖 Documentação](#features) • [🛠️ Instalação](#installation) • [🎨 Contribuir](#contributing)

</div>

---

## 🌟 Sobre o Projeto

O **3D Retro Library** é um projeto experimental que explora as possibilidades do **Three.js** e **React Three Fiber** para criar uma experiência nostálgica e interativa. Imagine um arcade dos anos 80 em sua tela, onde cartuchos de jogos flutuam no espaço e você pode interagir com eles em uma experiência completamente 3D!

### 🎯 Objetivo

Este projeto foi criado como um **playground** para experimentar com:
- **Renderização 3D** no navegador
- **Animações complexas** com GSAP
- **Interfaces retrô/cyberpunk** 
- **Interatividade** em tempo real
- **Sistemas de áudio** imersivos

---

## ✨ Features

### 🎮 **Experiência 3D Interativa**
- **Cartuchos flutuantes** com física e animações suaves
- **Console 3D** com slot funcional e luzes neon
- **Inserção cinematográfica** dos cartuchos no console
- **Rotação e hover effects** responsivos

### 🎬 **Sistema de Câmera Cinematográfica**
- **Câmera animada** que segue a inserção dos cartuchos
- **Zoom dinâmico** durante a experiência
- **Toggle manual** para ativar/desativar o modo cinemático
- **Transições suaves** entre diferentes ângulos

### 🎵 **Sistema de Áudio Imersivo**
- **Música de fundo** em loop (synthwave/retrô)
- **Efeitos sonoros** de inserção de cartucho
- **Controle de volume** com design retrô
- **Feedback auditivo** para interações

### 🌈 **Visual Cyberpunk/Neon**
- **Paleta neon** (magenta, cyan, verde limão)
- **Efeitos de glow** e bloom
- **Starfield animado** de fundo
- **Scanlines** estilo CRT
- **Gradientes dinâmicos**

### 🎯 **Interface Retro**
- **Cards informativos** dos jogos
- **Tipografia pixel-perfect**
- **Animações de texto** com efeitos neon
- **Layout responsivo**

---

## 🛠️ Tecnologias Utilizadas

### Core
- **[React 18.2.0](https://reactjs.org/)** - Framework base
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Vite](https://vitejs.dev/)** - Build tool

### 3D & Animações
- **[Three.js](https://threejs.org/)** - Engine 3D
- **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber)** - React renderer para Three.js
- **[@react-three/drei](https://github.com/pmndrs/drei)** - Utilitários Three.js
- **[GSAP](https://greensock.com/gsap/)** - Animações profissionais

### Styling
- **CSS3** com Custom Properties
- **Flexbox** e **Grid** layouts
- **Keyframe animations**
- **Gradient backgrounds**

---

## 🚀 Installation

### Pré-requisitos
- Node.js 16+
- npm ou yarn

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/Oldp1e/3DRetroLibrary.git
cd 3DRetroLibrary
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure os arquivos de áudio** (opcional)
```bash
# Adicione seus arquivos MP3 em public/audio/
# - retro-theme.mp3 (música de fundo)
# - start.mp3 (som de inserção)
```

4. **Execute o projeto**
```bash
npm run dev
# ou
yarn dev
```

5. **Abra no navegador**
```
http://localhost:3000
```

---

## � Como Usar

### 🕹️ **Controles Básicos**
- **Clique** nos cartuchos para inseri-los no console
- **Arraste** para rotacionar a cena (modo manual)
- **Scroll** para zoom in/out

### 📹 **Modo Câmera Cinematográfica**
1. Ative o **toggle de câmera** no canto superior direito
2. Clique em qualquer cartucho
3. Observe a **sequência cinematográfica** automática

### 🔊 **Controles de Áudio**
- Use o **controle de volume** retrô
- A música inicia após a primeira interação
- Sons de efeito são reproduzidos nas ações

---

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes React
│   ├── AnimatedCamera.tsx    # Sistema de câmera cinemática
│   ├── Console.tsx           # Console 3D com visor
│   ├── GameCard.tsx          # Cards informativos
│   ├── GameCartridge.tsx     # Cartuchos 3D interativos
│   ├── CameraToggle.tsx      # Toggle da câmera
│   └── VolumeControl.tsx     # Controle de volume
├── data/
│   └── games.ts             # Dados dos jogos
├── utils/
│   └── AudioManager.ts      # Sistema de áudio
├── App.tsx                  # Componente principal
├── App.css                  # Estilos principais
└── index.tsx               # Entry point

public/
├── audio/                   # Arquivos de áudio
│   ├── retro-theme.mp3     # Música de fundo
│   ├── start.mp3           # Som de inserção
│   └── README.md           # Instruções de áudio
└── images/
    └── cartridges/         # Texturas dos cartuchos
```

---

## 🎨 Customização

### 🎮 **Adicionando Novos Jogos**
Edite `src/data/games.ts`:
```typescript
export const gameData: Game[] = [
  {
    id: 'meu-jogo',
    title: 'Meu Jogo Retro',
    year: 1985,
    genre: 'Platform',
    description: 'Descrição do jogo...',
    cartridgeColor: '#FF6B6B',
    cartridgeImage: '/images/cartridges/meu-jogo.jpg'
  }
];
```

### 🎨 **Modificando Cores**
Ajuste as variáveis CSS em `src/index.css`:
```css
:root {
  --neon-pink: #ff00ff;
  --neon-cyan: #00ffff;
  --neon-green: #39ff14;
  /* ... */
}
```

### 🎵 **Personalizando Áudio**
Substitua os arquivos em `public/audio/`:
- `retro-theme.mp3` - Música de fundo
- `start.mp3` - Som de inserção

---

## 🌟 Destaques Técnicos

### 🎯 **Otimizações**
- **Lazy loading** de texturas
- **Instanced materials** para performance
- **RAF-based animations** suaves
- **Memory management** para áudio

### 🔧 **Patterns Utilizados**
- **Singleton** para AudioManager
- **Component composition** para flexibilidade
- **Custom hooks** para lógica reutilizável
- **Type-safe** APIs com TypeScript

### 🎨 **Efeitos Avançados**
- **Drop shadows** para profundidade
- **Emissive materials** para glow
- **Multi-layer lighting** para atmosfera
- **CSS blend modes** para efeitos especiais

---

## 🤝 Contributing

Contribuições são sempre bem-vindas! Este é um projeto experimental e estou aberto a:

- 🐛 **Bug reports**
- 💡 **Feature requests** 
- 🎨 **Visual improvements**
- 🔧 **Performance optimizations**
- 📚 **Documentation**

### Como contribuir:
1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

---

## 📝 Roadmap

### 🚀 **Próximas Features**
- [ ] **VR Support** com WebXR
- [ ] **Physics engine** para interações realistas
- [ ] **Multiplayer** com WebRTC
- [ ] **Particle systems** para efeitos visuais
- [ ] **Loading screens** temáticos
- [ ] **Mobile optimization**

### 🎮 **Ideias Futuras**
- [ ] **Mini-games** jogáveis nos cartuchos
- [ ] **Customização** de console
- [ ] **Achievement system**
- [ ] **Share screenshots**

---

## � License

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🙏 Agradecimentos

- **[Three.js](https://threejs.org/)** pela incrível engine 3D
- **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber)** pela integração perfeita
- **[GSAP](https://greensock.com/)** pelas animações profissionais
- **[80s/90s gaming culture](https://en.wikipedia.org/wiki/Golden_age_of_arcade_video_games)** pela inspiração

---

<div align="center">

**🎮 Feito com ❤️ e muito Three.js**

[⬆️ Voltar ao topo](#-3d-retro-library)

</div>

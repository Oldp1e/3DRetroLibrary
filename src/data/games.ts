export interface Game {
  id: string;
  name: string;
  description: string;
  year: string;
  genre: string;
  color: string;
  accentColor: string;
  features: string[];
  cartridgeImage?: string; // Caminho para a imagem do cartucho
}

export const gameData: Game[] = [
  {
    id: 'hearthstone',
    name: 'HEARTHSTONE',
    description: 'Um jogo de cartas estratégico ambientado no universo de Warcraft. Construa seu deck, invoque criaturas poderosas e domine a taverna!',
    year: '2014',
    genre: 'Card Game / Strategy',
    color: '#ff6600',
    accentColor: '#ffaa44',
    cartridgeImage: '/images/cartridges/hearthstone.jpg',
    features: [
      'Batalhas de cartas épicas',
      'Múltiplas classes de heróis',
      'Modos PvP e PvE',
      'Coleção infinita de cartas'
    ]
  },
  {
    id: 'battlefront2',
    name: 'STAR WARS BATTLEFRONT 2',
    description: 'Entre na guerra galáctica! Lute como herói ou vilão icônico em batalhas épicas em planetas distantes da galáxia Star Wars.',
    year: '2017',
    genre: 'Action / Shooter',
    color: '#0066ff',
    accentColor: '#3388ff',
    cartridgeImage: '/images/cartridges/bf2.jpg',
    features: [
      'Heróis e vilões icônicos',
      'Batalhas galácticas épicas',
      'Campanha single-player',
      'Multiplayer massivo'
    ]
  },
  {
    id: 'minecraft',
    name: 'MINECRAFT',
    description: 'Construa, explore e sobreviva em mundos infinitos! Libere sua criatividade em um universo de blocos sem limites.',
    year: '2011',
    genre: 'Sandbox / Survival',
    color: '#39ff14',
    accentColor: '#66ff44',
    cartridgeImage: '/images/cartridges/minecraft.jpg',
    features: [
      'Mundos infinitos para explorar',
      'Modo criativo e sobrevivência',
      'Multiplayer cooperativo',
      'Mods e personalização'
    ]
  },
  {
    id: 'jurassic',
    name: 'JURASSIC WORLD EVOLUTION',
    description: 'Construa e gerencie seu próprio parque de dinossauros! Crie espécies extintas através de bioengenharia e mantenha visitantes seguros.',
    year: '2018',
    genre: 'Simulation / Management',
    color: '#ff00ff',
    accentColor: '#ff44ff',
    cartridgeImage: '/images/cartridges/jurassic.jpg',
    features: [
      'Criação de dinossauros',
      'Gestão de parque temático',
      'Bioengenharia avançada',
      'Contratos e missões'
    ]
  },
  {
    id: 'zelda',
    name: 'THE LEGEND OF ZELDA',
    description: 'Embarque em uma aventura épica como Link! Explore Hyrule, resolva puzzles complexos e salve a princesa Zelda das forças do mal.',
    year: '1986-2023',
    genre: 'Action / Adventure',
    color: '#00ffff',
    accentColor: '#44ffff',
    cartridgeImage: '/images/cartridges/zelda.jpg',
    features: [
      'Exploração de mundo aberto',
      'Puzzles desafiadores',
      'Combate épico com espadas',
      'História rica e envolvente'
    ]
  }
];

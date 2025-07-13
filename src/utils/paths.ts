// Utilitário para gerenciar caminhos de assets
// Funciona tanto localmente quanto no GitHub Pages

const getBasePath = (): string => {
  // Detectar se estamos no GitHub Pages pela URL
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;
    
    // Se estamos no GitHub Pages
    if (hostname === 'oldp1e.github.io' || pathname.startsWith('/3DRetroLibrary')) {
      return '/3DRetroLibrary';
    }
  }
  
  // Para build de produção mas não GitHub Pages, ou desenvolvimento
  return '';
};

export const getAssetPath = (relativePath: string): string => {
  const basePath = getBasePath();
  return `${basePath}${relativePath}`;
};

// Funções específicas para diferentes tipos de assets
export const getImagePath = (imagePath: string): string => {
  return getAssetPath(`/images/${imagePath}`);
};

export const getAudioPath = (audioPath: string): string => {
  return getAssetPath(`/audio/${audioPath}`);
};

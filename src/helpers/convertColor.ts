
export default function colorToHex(colorName:string) {
    switch (colorName.toLowerCase()) {
      case 'чорний':
        return '#000000';
      case 'зелений':
        return '#00ff00';
      case 'сірий':
        return '#808080';
      case 'червоний':
        return '#ff0000';
      case 'синій':
        return '#0000ff';
      case 'жовтий':
        return '#ffff00';
      case 'рожевий':
        return '#ff69b4';
      case 'білий':
        return '#ffffff';
      case 'оранжевий':
        return '#ffa500';
      case 'фіолетовий':
        return '#800080';
      case 'коричневий':
        return '#a52a2a';
      case 'блакитний':
        return '#add8e6';
      case 'жовто-зелений':
        return '#adff2f';
      case 'синьо-зелений':
        return '#2e8b57';
      case 'сіро-блакитний':
        return '#4682b4';
      case 'лаймовий':
        return '#00ff00';
      // Додайте інші кольори за необхідністю
      default:
        return '#000000';
    }
  }
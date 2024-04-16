export interface Tradition {
  id: number;
  volume: number;
  title: string;
  arabic: string;
  english: string;
  references: string[];
  notes: string[];
}

const traditionsData: Tradition[] = require('../assets/fom.json');

class TraditionDataService {
  constructor(private traditions: Tradition[] = traditionsData) {}

  getAllTraditions(): Tradition[] {
    return this.traditions;
  }

  getTraditionsByVolume(volume: number): Tradition[] {
    return this.traditions.filter(tradition => tradition.volume === volume);
  }

  getTraditionById(id: number): Tradition | undefined {
    return this.traditions.find(tradition => tradition.id === id);
  }
}

export default TraditionDataService;

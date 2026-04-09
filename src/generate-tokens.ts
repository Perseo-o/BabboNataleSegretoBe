import 'reflect-metadata';
import { EncryptionService } from './encryption/encryption.service';
import * as fs from 'fs';

const encryption = new EncryptionService();

const names = [
   "Rita",
    "Sandra",
    "Michela",
    "Chiara (geggi)",
    "Teodoro",
    "Teresa",
    "Valeria",
    "Samuele",
    "Alan",
    "Chiara (Lori)",
    "Gianfranco",
    "Beatrice",
    "Maristella",
    "Ramon",
    "Antonio",
    "Marcello",
    "Ilaria",
    "Lorenzo",
    "Francesco",
    "Noemi",
    "Diego",
    "Giuseppe"
];

const tokens: Record<string, string> = {};

names.forEach((name) => {
  const token = encryption.encrypt(name);
  tokens[name] = token;
});

console.log('Token generati:', tokens);

fs.writeFileSync('tokens.json', JSON.stringify(tokens, null, 2));
console.log('Token salvati su tokens.json');

import { Injectable, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';

interface HistoryRecord {
  year: number;
  target: string;
}

interface Person {
  name: string;
  group?: string;
  history?: HistoryRecord[];
}

interface DataFile {
  people: Person[];
  assignments: Record<string, string>;
}

@Injectable()
export class DrawService {
  private filePath = 'src/draw/names.json';

  private loadData(): DataFile {
    return JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
  }

  private saveData(data: DataFile) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  }

  private shuffle<T>(array: T[]): T[] {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  private getRecentTargets(person: Person, currentYear: number): string[] {
    if (!person.history) return [];

    return person.history
      .filter((h) => h.year >= currentYear - 3)
      .map((h) => h.target);
  }

  private isValidMatch(
  giver: Person,
  receiver: Person,
  currentYear: number,
): boolean {
  if (giver.name === receiver.name) return false;

  if (
    giver.group &&
    receiver.group &&
    giver.group === receiver.group
  ) {
    return false;
  }

  const recentTargets = this.getRecentTargets(giver, currentYear);
  if (recentTargets.includes(receiver.name)) return false;

  return true;
}

  private generateAssignments(
    people: Person[],
    currentYear: number,
  ): Record<string, string> {
    const givers = this.shuffle([...people]);
    const receivers = [...people];

    const assignments: Record<string, string> = {};

    const backtrack = (index: number): boolean => {
      if (index === givers.length) return true;

      const giver = givers[index];

      const options = this.shuffle(
        receivers.filter(
          (r) =>
            !Object.values(assignments).includes(r.name) &&
            this.isValidMatch(giver, r, currentYear),
        ),
      );

      for (const receiver of options) {
        assignments[giver.name] = receiver.name;

        if (backtrack(index + 1)) return true;

        delete assignments[giver.name];
      }

      return false;
    };

    for (let i = 0; i < 200; i++) {
      if (backtrack(0)) return assignments;
    }

    throw new BadRequestException(
      'Non è stato possibile generare un match valido. Controlla gruppi e storico!',
    );
  }

  generateAll() {
    const data = this.loadData();
    const currentYear = new Date().getFullYear();

    const assignments = this.generateAssignments(data.people, currentYear);

    for (const giverName in assignments) {
      const giver = data.people.find((p) => p.name === giverName);
      if (!giver) continue;

      if (!giver.history) giver.history = [];

      giver.history.push({
        year: currentYear,
        target: assignments[giverName],
      });

      giver.history = giver.history.filter(
        (h) => h.year >= currentYear - 3,
      );
    }

    data.assignments = assignments;
    this.saveData(data);

    return assignments;
  }

  getMyMatch(name: string) {
    const data = this.loadData();

    if (!data.assignments[name]) {
      throw new BadRequestException('Match non generato o nome errato.');
    }

    return {
      target: data.assignments[name],
    };
  }

  allName() {
    const data = this.loadData();
    return data.people.map((p) => p.name);
  }
}
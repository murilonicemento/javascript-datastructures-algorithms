// import { defaultToString } from '../util';
// import { ValuePair } from './models/value-pair';

/**
 * • put(key,value): esse método adiciona um novo item à tabela hash (ou pode atualizá-la também).
 * • remove(key): esse método remove o value da tabela hash usando key.
 * • get(key): esse método devolve um value específico encontrado com key.
*/

function defaultToString(item) {
  if (item === null) {
    return 'NULL';
  } if (item === undefined) {
    return 'UNDEFINED';
  } if (typeof item === 'string' || item instanceof String) {
    return `${item}`;
  }
  return item.toString();
}

class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

  toString() {
    return `[#${this.key}: ${this.value}]`;
  }
}

class HashTable {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }

  loseloseHashCode(key) {
    if (typeof key === 'number') return key; // {1}

    const tableKey = this.toStrFn(key); // {2}
    let hash = 0; // {3}

    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i); // {4}
    }

    return hash % 37; // {5}
  }

  hashCode(key) {
    return this.loseloseHashCode(key);
  }

  put(key, value) {
    if (key != null && value != null) { // {1}
      const position = this.hashCode(key); // {2}
      this.table[position] = new ValuePair(key, value); // {3}

      return true;
    }

    return false;
  }

  get(key) {
    const valuePair = this.table[this.hashCode(key)];

    return valuePair == null ? undefined : valuePair.value;
  }

  remove(key) {
    const hash = this.hashCode(key); // {1}
    const valuePair = this.table[hash]; // {2}

    if (valuePair != null) {
      delete this.table[hash]; // {3}
      return true;
    }
    return false;
  }
}

const hashTable = new HashTable();

hashTable.put('Gandalf', 'gandalf@email.com');
hashTable.put('John', 'johnsnow@email.com');
hashTable.put('Tyrion', 'tyrion@email.com');

console.log(`${hashTable.hashCode('Gandalf')} - Gandalf`);
console.log(`${hashTable.hashCode('John')} - John`);
console.log(`${hashTable.hashCode('Tyrion')} - Tyrion`);
console.log(hashTable.get('Gandalf')); // gandalf@email.com
console.log(hashTable.get('Loiane')); // undefined

hashTable.remove('Gandalf');

console.log(hashTable.get('Gandalf'));

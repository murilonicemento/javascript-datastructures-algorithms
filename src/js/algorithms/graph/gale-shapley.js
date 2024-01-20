class Person {
  constructor(id, gender, ranks, rankIndex, status = 'single') {
    this.id = id;
    this.gender = gender;
    this.ranks = ranks;
    this.i = rankIndex;
    this.status = status;
    this.partner = null;
  }
}

// function galeShapley(proposers, reviewers) {
//   const perfectMatching = new Map();
//   for (const [pid, p] of proposers) {
//     while (p.i < p.ranks.length) {
//       const rid = p.ranks[p.i];
//       const r = reviewers.get(rid);
//       p.i++;
//       if (r.status === 'single') {
//         r.status = 'engaged';
//         r.partner = p;
//         p.partner = r;
//         perfectMatching.set(pid, rid);
//         proposers.delete(pid);
//         break;
//       } else if (r.status === 'engaged' && r.ranks.get(pid) < r.ranks.get(r.partner.id)) {
//         perfectMatching.delete(r.partner.id);
//         proposers.set(r.partner.id, r.partner);
//         proposers.delete(pid);
//         r.partner.partner = null;
//         r.partner = p;
//         p.partner = r;
//         perfectMatching.set(pid, rid);
//         break;
//       }
//     }
//   }
//   return perfectMatching;
// }

// fisher-yates shuffle O(n)
function shuffle(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

const men = new Map();
const women = new Map();
// O(n^2)
function createPeople(n, gender, set) {
  for (let i = 0; i < n; i++) {
    const id = i;
    const rankIndex = 0;
    const g = gender;
    const ranks = new Array(n);
    let p;
    for (let j = 0; j < n; j++) ranks[j] = j;
    shuffle(ranks);
    if (gender === 'w') {
      const wRanks = new Map();
      for (let k = 0; k < n; k++) wRanks.set(k, ranks[k]);
      p = new Person(id, g, wRanks, null);
    } else {
      p = new Person(id, g, ranks, rankIndex);
    }
    set.set(i, p);
  }
}

createPeople(4, 'm', men);
createPeople(4, 'w', women);
// const stableMatching = galeShapley(men, women);
// console.log(stableMatching);

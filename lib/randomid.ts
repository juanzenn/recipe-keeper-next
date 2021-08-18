function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function createRandomID(): string {
  let letters =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';
  let id = '';

  for (let i = 0; i < 7; i++) {
    id += letters[getRandomIntInclusive(0, 63)];
  }

  return id;
}

function strToSlug(str: string): string {
  return str.toLowerCase().replace(/\s/g, '-');
}

console.log(strToSlug('hello friends lets try this one'));

export { createRandomID, strToSlug };

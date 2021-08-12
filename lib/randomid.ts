function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

export default function createRandomID(): string {
  let letters = 'abcdefg';
  let id = '';

  for (let i = 0; i < 7; i++) {
    id += letters[getRandomIntInclusive(0, 6)];
  }

  return id;
}

export { createRandomID };

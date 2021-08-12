export default function removeElement(element: any[], id: string | number) {
  const index = element.indexOf(id);

  if (index < 0) {
    console.log('Error');
    return null;
  }

  const firstHalf = element.slice(0, index);
  const secondHalf = element.slice(index + 1);

  return firstHalf.concat(secondHalf);
}

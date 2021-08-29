import { getRandomIntInclusive } from '../utils/common';
import { getRandomArrayItem, shuffleArray } from '../utils/array';

const CITIES = ['Rome', 'Paris', 'Prague', 'London', 'Istanbul', 'Amsterdam', 'Barcelona', 'Saint Petersburg', 'Dubrovnik', 'Berlin', 'Vienna', 'Athens', 'Lisbon', 'Warsaw', 'Stockholm', 'Tallinn', 'Venice', 'Seville', 'Belgrade', 'Bruges', 'Budapest', 'Brasov', 'Edinburgh', 'Copenhagen', 'Dublin'];
const DESCRIPTIONS = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget.', 'Fusce tristique felis at fermentum pharetra.', 'Aliquam id orci ut lectus varius viverra.', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.', 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.', 'Sed sed nisi sed augue convallis suscipit in sed felis.', 'Aliquam erat volutpat.', 'Nunc fermentum tortor ac porta dapibus.', 'In rutrum ac purus sit amet tempus.'];

const DescriptionSizeRestrict = {
  MIN: 1,
  MAX: 5,
};

const PictureCountRestrict = {
  MIN: 1,
  MAX: 10,
};

const getRandomDescription = () => {
  const length = getRandomIntInclusive(DescriptionSizeRestrict.MIN, DescriptionSizeRestrict.MAX);
  return length ? shuffleArray(DESCRIPTIONS).slice(0, length).join(' ') : null;
};

const getRandomPictures = () => {
  const picturesCount = getRandomIntInclusive(PictureCountRestrict.MIN, PictureCountRestrict.MAX);

  if (picturesCount) {
    return Array.from(new Array(picturesCount), () => ({
      src: `http://picsum.photos/248/152?r=${Math.random()}`,
      description: getRandomArrayItem(DESCRIPTIONS),
    }));
  }

  return null;
};

const getMockDestination = (name) => {
  const description = getRandomDescription();
  const pictures = getRandomPictures();
  return { description, name, pictures };
};

export const getMockDestinations = () => new Map(CITIES.map((city) => [city, getMockDestination(city)]));

function getAgeRange(age) {
  const ageRange = [
    {
      min: 0, // 1
      max: 2.9,
    },
    {
      min: 3, // 2
      max: 5.9,
    },
    {
      min: 6, // 3
      max: 8.9,
    },
    {
      min: 9, // 4
      max: 11.9,
    },
    {
      min: 12, // 5
      max: 17.9,
    },
    {
      min: 18, // 6
      max: 20.9,
    },
    {
      min: 21, // 7
      max: 23.9,
    },
    {
      last: true,
    }
  ];

  let result = 'belum-dimuat';

  ageRange.forEach(({ last, min, max }, index) => {
    if (!last) {
      if (min <= age && max >= age) {
        result = index+1;
        return;
      }
    }
  });
  return result;
}

module.exports = getAgeRange;

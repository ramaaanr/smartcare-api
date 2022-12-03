const getChild = require("../helper/get-child");

describe('Child Route Testing', () => { 
  it('should get data if id is right', async () => {
    const data = await getChild({
      id: 'baby1',
    });
    expect(data).toEqual({
      error: false,
      data: {
        birthDate: 20221212,
        name: 'udin',
        weight: 30,
        healthStatus: { development: 'normal', growth: 'normal' },
        gender: 'male',
        headLength: 10,
        height: 10
      }
    })
  });
})
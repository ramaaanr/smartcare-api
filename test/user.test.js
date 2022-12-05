const getUser = require("../helper/get-user");

describe('User Route Testing', () => { 
  it('should get data if id is right', async () => {
    const data = await getUser({
      id: 'Ui7vY2Ky1Dqwh0eHYkXs',
    });
    expect(data).toEqual({
      data: {
        username: 'tester',
        childs: [ 'baby1', 'baby2' ],     
        email: 'tester@gmail.com'        
      },
      error: false,
    });
  });
})
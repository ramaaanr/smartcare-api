const { setUser, getUser } = require("../helper/user-handler");

describe('User Route Testing', () => { 
  it('should get data if id is right', async () => {
    const id = `tester${+new Date()}`
    await setUser({
      id,
      username: "tester",
      email: "tester@gmail.com",
    });

    const data = await getUser({
      id,
    });
    expect(data).toEqual({
      data: {
        username: 'tester',
        childs: [],     
        email: 'tester@gmail.com'        
      },
      error: false,
    });
  });
})
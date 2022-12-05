const { setUser } = require("../helper/user-handler");
const signUpHandler = require("../helper/sign-up-handler");

function makePassword(length) {
    let result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

describe('Sign Up Testing', () => {
  it('should add data if input is right', async () => {
    const response = await signUpHandler("tester", `tester${+new Date()}@gmail.com`, makePassword(Math.floor((Math.random() * 10) + 6)));
    expect(response).toEqual({
      "error": false,
    })
  });
})

describe('Set User', () => {
  it('should succes if response is true with data', async () => {
    const response = await setUser({
      id: `tester${+new Date()}`,
      username: "tester",
      email: "tester@gmail.com",
    })
    

    expect(response).toEqual({
      "error": false
    })
  });
})
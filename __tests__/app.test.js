/* Imports the necessary dependencies: 'chai', 'chai-http', and 'chai-string'. */
import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiString from 'chai-string';
import app from '../app.js';

chai.use(chaiHttp);
chai.use(chaiString);
const expect = chai.expect;

/**
 * The response from the server is then checked
 * for various assertions using Chai's 'expect' function. 
 * it checks if the response has a 200 status code, 
 * if the response is in JSON format, 
 * and if the 'avatar_url' property in the response starts with a specific URL. 
 */
describe('GET /api/users/ftloksy', () => {

  it('Get ftloksy profile in git', (done) => {

    chai.request(app)
      .get('/api/users/ftloksy')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        const obj = JSON.parse(res.text);
        console.log(obj);
        console.log(obj.boa);
        expect(obj.avatar_url).to.startsWith('https://avatars.githubusercontent.com');
        done();
      });
  });

});



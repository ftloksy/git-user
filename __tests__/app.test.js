import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiString from 'chai-string';
import app from '../app.js';

chai.use(chaiHttp);
chai.use(chaiString);
const expect = chai.expect;

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



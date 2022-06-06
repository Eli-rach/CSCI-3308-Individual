// Imports the server.js file to be tested.
const server = require("../server");
// Assertion (Test Driven Development) and Should,  Expect(Behaviour driven 
// development) library
const chai = require("chai");
// Chai HTTP provides an interface for live integration testing of the API's.
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
const { assert, expect } = chai;

describe("Server!", () => {
  // Sample test case given to test / endpoint.
  it("Server is up", (done) => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Validate that save is happening", (done) => {
      const drink={
        drinkName:"Water",
        drinkImg:"H20.water.jpg",
        drinkCategory:"Nonalcoholic",
        drinkIsAlc: "NO!",
        directions: "Go to tap",
      }
    chai
        .request(server)
        .post("/main")
        .send(drink)
        .end((err, res) => {
          expect(res).to.have.status(200);
          // assert.strictEqual(res.body.message, "Success!");
          done();
        });
  });

  it("Validate that load is occuring on search history", (done) => {
    chai
        .request(server)
        .get("/searches")
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });

        
  });



});

// docker-compose run web npm test
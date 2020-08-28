const Employee = require('../employees.model');
const expect = require('chai').expect;


const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');


describe('Employee', () => {

  before(async () => {

    try {
      const fakeDB = new MongoMemoryServer();

      const uri = await fakeDB.getConnectionString();

      mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

    } catch (err) {
      console.log(err);
    }

  });

  describe('Reading data', () => {

    before(async () => {
      const testEmplOne = new Employee({
        firstName: 'John',
        lastName: 'Doe',
        department: 'Department #1'
      });
      await testEmplOne.save();

      const testEmplTwo = new Employee({
        firstName: 'Jane',
        lastName: 'Smith',
        department: 'Department #2'
      });
      await testEmplTwo.save();
    });

    after(async () => {
      await Employee.deleteMany();
    });

    it('should return all the data with "find" method', async () => {

      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return a proper document by "lastName" with "findOne" method', async () => {
      const employee = await Employee.findOne({
        lastName: 'Smith'
      });
      const expectedName = 'Smith';
      expect(employee.lastName).to.be.equal(expectedName);
    });

  });

  describe('Creating data', () => {

    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employee({ 
        firstName: 'Jane',
        lastName: 'Smith',
        department: 'Department #2'
       });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

});
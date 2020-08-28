const Employee = require('../employees.model');
const expect = require('chai').expect;


const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');

let fakeDB;

describe('', () => {

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

  after(async () => {
    await mongoose.disconnect();
    await fakeDB.stop();
  });

});


describe('Employee', ()=> {
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

  describe('Update data', () => {

    beforeEach(async () => {
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

    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne({lastName: 'Smith'}, {$set: {lastName: 'Black'}});
      const updatedEmployee = await Employee.findOne({lastName: 'Black'});
      expect(updatedEmployee).not.to.be.null

    });

    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({lastName: 'Smith'});
      employee.lastName = 'Black';
      await employee.save();

      const updatedEmployee = await Employee.findOne({lastName: 'Black'})
      expect(updatedEmployee).not.to.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, {$set: {department: 'Updated Department'}});
      const employees = await Employee.find({department: 'Updated Department'});

      expect(employees[0].department).to.be.equal('Updated Department');
      expect(employees[1].department).to.be.equal('Updated Department');
    });
  });

  describe('Remove data', () => {
    beforeEach( async ()=> {
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
    afterEach(async ()=> {
      await Employee.deleteMany();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({firstName: 'John'});
      const employee = await Employee.findOne({firstName: 'John'});
      expect(employee).to.be.null;
    });

    it('should properly remove one document with "remove" method', async ()=> {
      const employee = await Employee.findOne({firstName: 'Jane'});
      await employee.remove();
      const deletedEmployee = await Employee.findOne({firstName: 'Jane'});
      expect(deletedEmployee).to.be.null;
    })

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();
      const deletedEmployees = await Employee.find();
      expect(deletedEmployees.length).to.be.equal(0);
    })
  })
})
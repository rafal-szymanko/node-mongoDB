const Employee = require('../employees.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');


describe('Employee', () => {

    it('should throw an error if no "firstName", "lastName", "department" args', () => {
        const empl = new Employee({});

        empl.validate(err => {
            expect(err.errors.firstName).to.exist;
        });

        empl.validate(err => {
            expect(err.errors.lastName).to.exist;
        });

        empl.validate(err => {
            expect(err.errors.department).to.exist;
        });
    });

    it('should throw an error if there is no 1 arg', () => {

        const empl1 = new Employee({
            firstName: 'John',
            lastName: 'Doe'
        });

        empl1.validate(err => {
            expect(err.errors.department).to.exist;
        });

        const empl2 = new Employee({
            firstName: 'John',
            department: 'Management',
        });

        empl2.validate(err => {
            expect(err.errors.lastName).to.exist;
        });

        const empl3 = new Employee({
            lastName: 'Doe',
            department: 'Management',
        });

        empl3.validate(err => {
            expect(err.errors.firstName).to.exist;
        });
    });

    it('should throw an error if there is no 2 args', () => {

        const empl1 = new Employee({
            firstname: 'John'
        });
    
        empl1.validate(err => {
            expect(err.errors.lastName).to.exist;
        });
    
        empl1.validate(err => {
            expect(err.errors.department).to.exist;
        });
    
        const empl2 = new Employee({
            lastName: 'Doe'
        });
    
        empl2.validate(err => {
            expect(err.errors.firstName).to.exist;
        });
    
        empl2.validate(err => {
            expect(err.errors.department).to.exist;
        });
    
    
        const empl3 = new Employee({
            department: 'Management',
        });
    
        empl3.validate(err => {
            expect(err.errors.firstName).to.exist;
        });
    
        empl3.validate(err => {
            expect(err.errors.lastName).to.exist;
        });
    });

    it('should throw an error if args are not a string', () => {

        const cases = [{},[]];

        for (let firstName of cases) {
            const dep = new Employee({
                firstName
            });

            dep.validate(err => {
                expect(err.errors.firstName).to.exist;
            });
        };

        for (let lastName of cases) {
            const dep = new Employee({
                lastName
            });

            dep.validate(err => {
                expect(err.errors.lastName).to.exist;
            });
        }

        for (let department of cases) {
            const dep = new Employee({
                department
            });

            dep.validate(err => {
                expect(err.errors.department).to.exist;
            });
        }
    });

    it('should not throw an error if "firstName", "lastName", "department" are okay', () => {

          const empl = new Employee({firstName: 'John', lastName: 'Doe', department: 'Management'});
      
          empl.validate(err => {
            expect(err).to.not.exist;
          });
      });
});
const Employee = require('../models/employees.model');

exports.getAllEmployees = async (req, res) => {
  try {
    res.json(await Employee.find().populate('department'));
  } catch (err) {
    res.status(500).json({
      message: err
    });
  }
};


exports.getRandomEmployee = async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const employee = await Employee.findOne().skip(rand);
    if (!employee) res.status(404).json({
      message: 'Not found'
    })
    else res.json(employee);
  } catch (err) {
    res.status(500).json({
      message: err
    })
  }

};

exports.getEmployeeByID = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) res.status(404).json({
      message: 'Not found'
    })
    else res.json(employee);
  } catch (err) {
    res.status(500).json({
      message: err
    })
  }
}

exports.postNewEmployee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      department
    } = req.body;

    const newEmployee = new Employee({
      firstName: firstName,
      lastName: lastName,
      department: department
    });
    await newEmployee.save();
    res.json(await Employee.find())
  } catch (err) {
    res.status(500).json({
      message: err
    })
  };
}

exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
      await Employee.updateOne({
        _id: req.params.id
      }, {
        $set: {
          firstName: firstName,
          lastName: lastName,
          department: department
        }
      })
      res.json(await Employee.find())

    } else {
      res.status(404).json({
        message: 'Not found'
      })
    }
  } catch (err) {
    res.status(500).json({
      message: err
    })
  }
}

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
      await Employee.deleteOne({
        _id: req.params.id
      });
      res.json(await Employee.find())
    } else {
      res.status(404).json({
        message: 'Not found'
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err
    })
  }
}
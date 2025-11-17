const Salary = require('../models/Salary');

// POST /api/salaries
exports.createSalary = async (req, res) => {
  try {
    const { employeeId, employeeName, month, basic = 0, hra = 0, allowances = 0, deductions = 0, notes } = req.body;
    const netPay = (Number(basic) + Number(hra) + Number(allowances)) - Number(deductions);

    const salary = new Salary({ employeeId, employeeName, month, basic, hra, allowances, deductions, netPay, notes });
    await salary.save();
    return res.status(201).json(salary);
  } catch (err) {
    console.error('createSalary error', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/salaries  (optionally ?employeeId=... or ?month=...)
exports.getSalaries = async (req, res) => {
  try {
    const filter = {};
    if (req.query.employeeId) filter.employeeId = req.query.employeeId;
    if (req.query.month) filter.month = req.query.month;

    const salaries = await Salary.find(filter).sort({ createdAt: -1 });
    return res.json(salaries);
  } catch (err) {
    console.error('getSalaries error', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/salaries/:id
exports.getSalaryById = async (req, res) => {
  try {
    const salary = await Salary.findById(req.params.id);
    if (!salary) return res.status(404).json({ message: 'Salary record not found' });
    return res.json(salary);
  } catch (err) {
    console.error('getSalaryById error', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// PUT /api/salaries/:id
exports.updateSalary = async (req, res) => {
  try {
    const { basic = 0, hra = 0, allowances = 0, deductions = 0, month, notes } = req.body;
    const netPay = (Number(basic) + Number(hra) + Number(allowances)) - Number(deductions);

    const updated = await Salary.findByIdAndUpdate(
      req.params.id,
      { basic, hra, allowances, deductions, netPay, month, notes },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Salary record not found' });
    return res.json(updated);
  } catch (err) {
    console.error('updateSalary error', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// DELETE /api/salaries/:id
exports.deleteSalary = async (req, res) => {
  try {
    const deleted = await Salary.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Salary record not found' });
    return res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('deleteSalary error', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

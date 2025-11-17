const mongoose = require('mongoose');

const SalarySchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  employeeName: { type: String, required: true },
  month: { type: String, required: true },             // e.g. "2025-11" or "November 2025"
  basic: { type: Number, required: true, default: 0 },
  hra: { type: Number, default: 0 },
  allowances: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  netPay: { type: Number, required: true },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Salary', SalarySchema);

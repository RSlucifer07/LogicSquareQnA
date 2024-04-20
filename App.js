import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Initial states
  const [employees, setEmployees] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [n, setN] = useState('');
  const [d, setD] = useState('');
  const [dept, setDept] = useState('');
  const [age, setAge] = useState('');
  const [editId, setEditId] = useState(null);
  const [totalEmps, setTotalEmps] = useState(0);
  const [availableEmps, setAvailableEmps] = useState(0);

  useEffect(() => {
    // Load employees from local storage on initial render
    const storedEmployees = JSON.parse(localStorage.getItem('employees'));
    if (storedEmployees) {
      setEmployees(storedEmployees);
      setTotalEmps(storedEmployees.length);
      const available = storedEmployees.filter(employee => employee.available);
      setAvailableEmps(available.length);
    }
  }, []);

  useEffect(() => {
    // Update local storage when employees state changes
    localStorage.setItem('employees', JSON.stringify(employees));
    setTotalEmps(employees.length);
    const available = employees.filter(employee => employee.available);
    setAvailableEmps(available.length);
  }, [employees]);

  // Add new employee
  const a = () => {
    if (!n || !d || !dept || !age) {
      alert('Please fill all fields');
      return;
    }
    const newEmployee = {
      id: new Date().getTime(),
      n,
      d,
      dept,
      age,
      available: true,
    };
    setEmployees([...employees, newEmployee]);
    setShowAddModal(false);
    setN('');
    setD('');
    setDept('');
    setAge('');
  };

  // Edit employee
  const b = () => {
    if (!n || !d || !dept || !age) {
      alert('Please fill all fields');
      return;
    }
    const updatedEmployees = employees.map(employee =>
      employee.id === editId
        ? {
            ...employee,
            n,
            d,
            dept,
            age,
          }
        : employee
    );
    setEmployees(updatedEmployees);
    setShowEditModal(false);
    setN('');
    setD('');
    setDept('');
    setAge('');
    setEditId(null);
  };

  // Toggle employee availability
  const t = id => {
    const updatedEmployees = employees.map(employee =>
      employee.id === id ? { ...employee, available: !employee.available } : employee
    );
    setEmployees(updatedEmployees);
  };

  // Delete employee
  const del = id => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      const updatedEmployees = employees.filter(employee => employee.id !== id);
      setEmployees(updatedEmployees);
      alert('Employee deleted successfully!');
    }
  };

  // Edit employee details
  const e = employee => {
    setN(employee.n);
    setD(employee.d);
    setDept(employee.dept);
    setAge(employee.age);
    setEditId(employee.id);
    setShowEditModal(true);
  };

  return (
    <div className="A">
      <header className="A-header">
        <img src="https://logisquare.com/assets/images/logo/logo.png" alt="Logo" className="l" />
        <h1 className="h">
          <span className="g">Web. Mobile. Cloud Solutions.</span>
        </h1>
        <button onClick={() => setShowAddModal(true)}>Add Employee</button>
      </header>
      <div className="c">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Age</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.id}>
                <td>{employee.n}</td>
                <td>{employee.d}</td>
                <td>{employee.dept}</td>
                <td>{employee.age}</td>
                <td>{employee.available ? 'Available' : 'Not Available'}</td>
                <td>
                  <button onClick={() => t(employee.id)}>
                    {employee.available ? 'Make Unavailable' : 'Make Available'}
                  </button>
                  <button onClick={() => e(employee)}>Edit</button>
                  <button onClick={() => del(employee.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="ec">Total Employees: {totalEmps}</div>
        <div className="ec">Available Employees: {availableEmps}</div>
      </div>

      {showAddModal && (
        <div className="m">
          <div className="mc">
            <span className="x" onClick={() => setShowAddModal(false)}>
              &times;
            </span>
            <h2>Add Employee</h2>
            <label>Name:</label>
            <input type="text" value={n} onChange={e => setN(e.target.value)} />
            <label>Designation:</label>
            <input type="text" value={d} onChange={e => setD(e.target.value)} />
            <label>Department:</label>
            <select value={dept} onChange={e => setDept(e.target.value)}>
              <option value="">Select Department</option>
              <option value="Frontend Development">Frontend Development</option>
              <option value="Backend Development">Backend Development</option>
              <option value="Testing">Testing</option>
              <option value="Deployment">Deployment</option>
            </select>
            <label>Age:</label>
            <input type="number" value={age} onChange={e => setAge(e.target.value)} />
            <button onClick={a}>Add</button>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="m">
          <div className="mc">
            <span className="x" onClick={() => setShowEditModal(false)}>
              &times;
            </span>
            <h2>Edit Employee</h2>
            <label>Name:</label>
            <input type="text" value={n} onChange={e => setN(e.target.value)} />
            <label>Designation:</label>
            <input type="text" value={d} onChange={e => setD(e.target.value)} />
            <label>Department:</label>
            <select value={dept} onChange={e => setDept(e.target.value)}>
              <option value="">Select Department</option>
              <option value="Frontend Development">Frontend Development</option>
              <option value="Backend Development">Backend Development</option>
              <option value="Testing">Testing</option>
              <option value="Deployment">Deployment</option>
            </select>
            <label>Age:</label>
            <input type="number" value={age} onChange={e => setAge(e.target.value)} />
            <button onClick={b}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './App.css';

const defaultPlans = [
  { name: 'Standard', rate: 0.0134, fee: 0 },
  { name: 'Plus', rate: 0.0134, fee: 47.88 },
  { name: 'Premium', rate: 0.0168, fee: 107.88 },
  { name: 'Metal', rate: 0.0201, fee: 191.88 },
  { name: 'Ultra', rate: 0.0235, fee: 660.00 }
];

export default function App() {
  const [amount, setAmount] = useState(0);
  const [plans, setPlans] = useState(defaultPlans);
  const [editing, setEditing] = useState(null);
  const [editedRate, setEditedRate] = useState(null);

  const startEditing = (name, currentRate) => {
    setEditing(name);
    setEditedRate(currentRate);
  };

  const saveRate = (name) => {
    const updatedPlans = plans.map(plan =>
      plan.name === name ? { ...plan, rate: parseFloat(editedRate) } : plan
    );
    setPlans(updatedPlans);
    setEditing(null);
    setEditedRate(null);
  };

  const rows = plans.map(plan => {
    const netReturn = (amount * plan.rate) - plan.fee;
    return { ...plan, netReturn };
  });

  const bestReturn = Math.max(...rows.map(r => r.netReturn));

  return (
    <div className="container">
      <h1>Revolut Savings Calculator</h1>

      <div>
        <label>Enter amount in savings (€):</label>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          onFocus={() => {
            if (amount === 0) setAmount('');
          }}
          onBlur={() => {
            if (amount === '') setAmount(0);
          }}
          placeholder="e.g. 10000"
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Rate</th>
            <th>Net Return (€/year)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(plan => (
            <tr
              key={plan.name}
              className={plan.netReturn === bestReturn ? 'highlight' : ''}
            >
              <td>{plan.name}</td>
              <td>
                {editing === plan.name ? (
                  <div className="flex-row">
                    <input
                      type="number"
                      step="0.0001"
                      value={editedRate}
                      onChange={(e) => setEditedRate(e.target.value)}
                      className="input-small"
                    />
                    <button
                      onClick={() => saveRate(plan.name)}
                      className="btn btn-green"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex-row">
                    <span>{plan.rate.toFixed(4)}</span>
                    <button
                      onClick={() => startEditing(plan.name, plan.rate)}
                      className="btn btn-blue"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </td>
              <td>€{plan.netReturn.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="ad">
        <em>Advertisement</em>
        <div className="my-2">
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
            data-ad-slot="xxxxxxxxxx"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
      </div>
    </div>
  );
}

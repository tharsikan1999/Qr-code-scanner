import React, { useState, ChangeEvent, FormEvent } from "react";
import * as XLSX from "xlsx";
import "./App.css"; // Import the CSS file

function App() {
  const [inputs, setInputs] = useState({
    date: "",
    material: "",
    spaBatch: "",
    supplierBatch: "",
    qty: "",
    location: "",
    startWidth: "",
    middleWidth: "",
    endWidth: "",
    length: "",
    notes: "",
  });

  const [submissions, setSubmissions] = useState<any[]>([]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmissions((prevSubmissions) => {
      const newSubmissions = [...prevSubmissions, inputs];

      const worksheet = XLSX.utils.json_to_sheet(newSubmissions);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      XLSX.writeFile(workbook, "form_data.xlsx");

      return newSubmissions;
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="date"
            name="date"
            value={inputs.date}
            onChange={handleChange}
            placeholder="Date"
          />
          <input
            type="text"
            name="material"
            value={inputs.material}
            onChange={handleChange}
            placeholder="Material"
          />
          <input
            type="text"
            name="spaBatch"
            value={inputs.spaBatch}
            onChange={handleChange}
            placeholder="Spa Batch"
          />
          <input
            type="text"
            name="supplierBatch"
            value={inputs.supplierBatch}
            onChange={handleChange}
            placeholder="Supplier Batch"
          />
          <input
            type="text"
            name="qty"
            value={inputs.qty}
            onChange={handleChange}
            placeholder="Qty"
          />
          <input
            type="text"
            name="location"
            value={inputs.location}
            onChange={handleChange}
            placeholder="Location"
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            name="startWidth"
            value={inputs.startWidth}
            onChange={handleChange}
            placeholder="Start Width"
          />
          <input
            type="text"
            name="middleWidth"
            value={inputs.middleWidth}
            onChange={handleChange}
            placeholder="Middle Width"
          />
          <input
            type="text"
            name="endWidth"
            value={inputs.endWidth}
            onChange={handleChange}
            placeholder="End Width"
          />
        </div>
        <div>
          <input
            type="text"
            name="length"
            value={inputs.length}
            onChange={handleChange}
            placeholder="Length"
          />
          <textarea
            name="notes"
            value={inputs.notes}
            onChange={handleChange}
            placeholder="Notes"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;

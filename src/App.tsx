import { useState, ChangeEvent, FormEvent } from "react";
import "./App.css";
import { QrReader } from "react-qr-reader";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function App() {
  const [inputs, setInputs] = useState({
    hu_code: "",
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

  const [formHistory, setFormHistory] = useState<any[]>([]); // Array to store form data history

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const [showQr, setShowQr] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(inputs);

    // Add current inputs to form history
    setFormHistory([...formHistory, inputs]);

    // Generate and download Excel file
    convertToExcel();

    // You can add more logic here to handle form submission, such as API calls
  };

  const handleRefresh = () => {
    setInputs({
      hu_code: "",
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
  };

  const handleShowqr = () => {
    setShowQr(!showQr);
  };

  // Function to convert input data to XLSX format
  const convertToExcel = () => {
    // Combine current inputs with form history
    const allFormData = [...formHistory, inputs];

    // Convert inputs to a suitable format for XLSX
    const data = allFormData.map((formData, index) => ({
      ...formData,
      // Add a sequence number for reference if needed
      seq: index + 1,
    }));

    // Define worksheet
    const ws = XLSX.utils.json_to_sheet(data);

    // Define workbook and add the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Generate Excel file and download it using FileSaver
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
    const fileName = "form-data.xlsx";
    const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });

    saveAs(blob, fileName);
  };

  // Function to convert string to array buffer
  const s2ab = (s: string) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  };

  return (
    <>
      {showQr && (
        <div className="qr-reader-container">
          <QrReader
            onResult={(result, error) => {
              if (result) {
                setInputs(JSON.parse(result.text));
              }

              if (error) {
                console.error(error);
              }
            }}
          />
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="hu_code"
            value={inputs.hu_code}
            onChange={handleChange}
            placeholder="Hu code"
          />
          <div className="button-box">
            <button type="button" onClick={handleShowqr}>
              {showQr ? "Hide Scanner" : "Show Scanner"}
            </button>
            <button type="button" className="button1" onClick={handleRefresh}>
              Refresh
            </button>
          </div>
        </div>
        <div className="form-row">
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

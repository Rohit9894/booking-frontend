import axios from "axios";
import * as React from "react";

export function SelectVehicle({ handleChange, wheels }) {
  
  const [data, setData] = React.useState([]);
  async function getData() {
    try {
      const res = await axios.get(
        `http://localhost:3000/vehicle?wheels=${wheels}`
      );
      setData(res?.data);
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    getData();
  });

  return (
    <select className="input-style" name="vehicleId" onChange={handleChange} required>
      {data.map((item) => (
        <option value={item._id}>{item?.subtype}</option>
      ))}
    </select>
  );
}

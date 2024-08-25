import { React, useState } from "react";
import { data } from "../Components/data.js";
import Events from "../Components/Events.js";
import { InputSearchu } from "../Components/Input.js";
import Select from "react-dropdown-select";
import { CiSearch } from "react-icons/ci";

const Upcoming = () => {
  const styles = {
    fontSize: 14,
    border: "none",
    color: "black",
    borderRadius: "10px",
    fontcolor: "black",
  };
  const optionsGroup = [
    {
      value: 1,
      label: "Srilankan",
    },
    {
      value: 2,
      label: "Filipino",
    },
    {
      value: 3,
      label: "Indian",
    },
    {
      value: 4,
      label: "Pakistani",
    },
  ];
  const optionsType = [
    {
      value: 1,
      label: "Workshop",
    },
    {
      value: 2,
      label: "Therapy",
    },
    {
      value: 3,
      label: "Gathering",
    },
  ];
  const [datas, setDatas] = useState(data);
  const filterType = (type) => {
    const filteredData = data.filter((item) => {
      return item.Type === type[0].label;
    });
    setDatas(filteredData);
  };

  const filterGroup = (group) => {
    const filteredGroup = data.filter((item) => {
      return item.label === group[0].label;
    });
    setDatas(filteredGroup);
  };
  return (
    <div className="w-full">
      <div className="w-full">
        <div className="w-full justify-content">
        <InputSearchu type={"text"} name={"Search Event..."}></InputSearchu>

        <button className="mr-[12%] mt-[1%] h-[40px] w-[310px] bg-black text-white rounded-xl px-4">
          View my registrations
        </button>
        </div>
      </div>
      
      <div className="flex">
        <div className="font-poppins font-semibold text-3xl mt-[3%]">
          Upcoming Events
        </div>
        <div className="mt-[3%] gap-3 ml-[40%] flex w-[300px]">
          <Select
            options={optionsGroup}
            onChange={(values) => filterGroup(values)}
            placeholder="Target Group"
            className="bg-[#F2F2F2] placeholder-black rounded-2xl mr-[2%] w-[300px] font-poppins   text-black"
            style={styles}
          ></Select>
          <Select
            options={optionsType}
            onChange={(values) => filterType(values)}
            placeholder="Event Type"
            className="bg-[#F2F2F2]  w-[300px]   text-black"
            style={styles}
          ></Select>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-6">
        {datas.map((item, index) => (
          <Events item={item} key={index}></Events>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Upcoming;

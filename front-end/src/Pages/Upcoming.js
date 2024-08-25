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
    <div className="font-poppins w-full m-[64px]">
      <div class="flex justify-between">
        <div class="flex-1">
          <input type="text" class="w-[250px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Search Event..." />
        </div>
        <div class="ml-4">
          <button class="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300">
            View my registrations
          </button>
        </div>
      </div>
      
      <div className="flex w-full justify-between mt-[28px]">
        <div className="font-poppins font-semibold text-3xl">
          Upcoming Events
        </div>
        <div className="flex space-x-[8px]">
          <Select
            options={optionsGroup}
            onChange={(values) => filterGroup(values)}
            placeholder="Target Group"
            className="bg-[#F2F2F2] placeholder-black rounded-2xl font-poppins   text-black"
            style={styles}
          ></Select>
          <Select
            options={optionsType}
            onChange={(values) => filterType(values)}
            placeholder="Event Type"
            className="bg-[#F2F2F2] text-black"
            style={styles}
          ></Select>
        </div>
      </div>
      <div className="w-full h-full">
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

import { React, useState } from "react";
import { data } from "../Components/data.js";
import Events from "../Components/Events.js";
import { InputSearchu } from "../Components/Input.js";
import Select from "react-dropdown-select";

const Upcoming = () => {
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
    setDatas(
      data.filter((item) => {
        return item.Type === type;
      })
    );
  };

  const filterGroup = (group) => {
    setDatas(
      data.filter((item) => {
        return item.label === group;
      })
    );
  };
  return (
    <div>
      <div className="flex justify-end mt-[3%]">
        <InputSearchu type={"text"} name={"search"}></InputSearchu>
        <button className="mr-[12%] w-[310px] bg-black text-white rounded-3xl px-4">
          View my registrations
        </button>
      </div>
      <div>
        <h1 className="font-poppins font-semibold text-3xl mt-[3%] ml-[12%]">
          Upcoming Events
        </h1>
        <Select
          options={optionsGroup}
          onChange={(values) => filterGroup(values)}
        ></Select>
        <Select
          options={optionsType}
          onChange={(values) => filterType(values)}
        ></Select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-6 w-[80%]">
        {data.map((item, index) => (
          <Events item={item} key={index}></Events>
        ))}
      </div>
    </div>
  );
};

export default Upcoming;

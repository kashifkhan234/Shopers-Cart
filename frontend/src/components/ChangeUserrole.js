import React, { useState } from "react";
import ROLE from "../Commen/role";
import { IoMdClose } from "react-icons/io";
import SummryApi from "../Commen";
import { toast } from "react-toastify";

const ChangeUserrole = ({ name, email, role, userId, onClose, callFunc }) => {
  const [useRole, setUseRole] = useState(role);

  const handleOnChange = (e) => {
    setUseRole(e.target.value);
  };

  const updateUserRole = async () => {
    const fetchResponse = await fetch(SummryApi.update_user.url, {
      method: SummryApi.update_user.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: useRole,
      }),
    });
    const Responsedata = await fetchResponse.json();

    if (Responsedata.success) {
      toast.success(Responsedata.message);
      onClose();
      callFunc();
    }

    console.log("Role updated", Responsedata);
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50">
      <div className="mx-auto bg-white shadow-sm p-4 w-full max-w-sm">
        <button className="block ml-auto" onClick={onClose}>
          <IoMdClose />
        </button>
        <h1 className="text-lg font-medium pb-4"> Change User Role</h1>
        <p>Name : {name}</p>
        <p>Email : {email}</p>
        <div className="flex item-center justify-between my-4">
          <p>Role :</p>
          <select
            className="border px-4 py-1"
            value={useRole}
            onChange={handleOnChange}
          >
            {Object.values(ROLE).map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>
        <button
          className="w-fit mx-auto block py-1 px-3 rounded-full bg-red-600 hover:bg-red-700 text-white"
          onClick={updateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserrole;

import React, { useEffect, useState } from "react";
import SummryApi from "../Commen";
import { toast } from "react-toastify";
import moment from "moment";
import { MdEdit } from "react-icons/md";
import ChangeUserrole from "../components/ChangeUserrole";

const AllUsers = () => {
  const [allusers, setAllusers] = useState([]);
  const [openRole, setOpenRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    name: "",
    email: "",
    role: "",
    _id: "",
  });

  const fetchAllusers = async () => {
    const fetchdata = await fetch(SummryApi.all_users.url, {
      method: SummryApi.all_users.method,
      credentials: "include",
    });

    const dataResponse = await fetchdata.json();

    if (dataResponse.success) {
      setAllusers(dataResponse.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };
  useEffect(() => {
    fetchAllusers();
  }, []);

  return (
    <div className="bg-white pb-4">
      <table className="w-full usertable">
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>CreateDate</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="">
          {allusers.map((el, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td className="capitalize">{el?.name}</td>
                <td>{el?.email}</td>
                <td>{el?.role}</td>
                <td>{moment(el?.createdate).format("ll")}</td>
                <td>
                  <button
                    className="bg-red-200 hover:bg-red-500 hover:text-white p-2 rounded-full curser-pointer"
                    onClick={() => {
                      setUpdateUserDetails(el);
                      setOpenRole(true);
                    }}
                  >
                    <MdEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {openRole && (
        <ChangeUserrole
          onClose={() => setOpenRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllusers}
        />
      )}
    </div>
  );
};

export default AllUsers;

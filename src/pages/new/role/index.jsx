//importing animations
import { motion } from "framer-motion";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

//importing components
import { toast } from "react-toastify";

//importing services
import { addRole } from "../../../api/roles";

//importing icons
import { GrClose } from "react-icons/gr";

const NewRole = ({ onClick }) => {
  const [roles, setRole] = useState({
    name: "",
    permissions: {
      employee: {
        _view: { state: false, id: 1 },
        _create: { state: false, id: 2 },
        _edit: { state: false, id: 3 },
        _delete: { state: false, id: 4 },
      },
      department: {
        _view: { state: false, id: 5 },
        _create: { state: false, id: 6 },
        _edit: { state: false, id: 7 },
        _delete: { state: false, id: 8 },
      },
      shifts: {
        _view: { state: false, id: 9 },
        _create: { state: false, id: 10 },
        _edit: { state: false, id: 11 },
        _delete: { state: false, id: 12 },
      },
      roles: {
        _view: { state: false, id: 16 },
        _create: { state: false, id: 17 },
        _edit: { state: false, id: 18 },
        _delete: { state: false, id: 19 },
      },
    },
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeField, setActiveField] = useState(false);
  const handleBlur = () => setActiveField(null);
  const handleFocus = (e) => setActiveField(e.target.name);
  const handleChange = (e) =>
    setRole((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const mutateRoles = useMutation({
    mutationFn: () => addRole(roles),
    onSuccess: () => {
      onClick();
      navigate("/settings/roles");
      toast.success("Role created");
      queryClient.invalidateQueries("ROLES");
    },
    onError: (e) => {
      onClick();
      navigate("/settings/roles");
      toast.error("An error occurred");
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    mutateRoles.mutate();
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 250 }}
      exit={{ opacity: 0, y: 100 }}
    >
      <div className="bg-white w-[90%] mx-auto mt-[200px] max-w-[750px] rounded-lg relative p-6">
        <GrClose
          className="bg-white absolute top-[-5%] right-[-2%] text-4xl p-2 rounded-full text-gray-500 hover:text-gray-900 cursor-pointer hover:bg-gray-100"
          onClick={onClick}
        />
        <form onSubmit={handleSubmit}>
          <div className="w-full mt-6">
            <h3 className="text-xl text-gray-800 mt-4">Permissions</h3>
          </div>
          {/* Permission Name */}
          <div>
            <div className="flex flex-col gap-1 mt-4">
              <label className="text-sm">Role name</label>
              <input
                name={"name"}
                type={"text"}
                value={roles.name}
                placeholder="Role name"
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{
                  borderColor: activeField === "name" && "#21c55d",
                }}
                disabled={mutateRoles.isLoading}
                className="outline-none text-sm border py-2 px-2 rounded-sm transition"
                required
              />
            </div>
          </div>
          {/* Permissions */}
          <div className="overflow-y-scroll scroll-smooth gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-h-[280px] mt-6">
            <div className="flex-1 border px-4 py-4 rounded-lg">
              <p className="font-poppins">Employees</p>
              <ul className="mt-2 flex flex-col gap-1">
                <li className="text-sm font-medium flex items-center justify-between">
                  <div>view</div>
                  <span>
                    <input
                      type={"checkbox"}
                      className="hover:cursor-pointer"
                      checked={roles.permissions.employee._view.state}
                      disabled={mutateRoles.isLoading}
                      onChange={() =>
                        setRole((prev) => ({
                          ...prev,
                          permissions: {
                            ...prev.permissions,
                            employee: {
                              ...prev.permissions.employee,
                              _view: {
                                ...prev.permissions.employee._view,
                                state: !prev.permissions.employee._view.state,
                              },
                            },
                          },
                        }))
                      }
                    />
                  </span>
                </li>
                <li className="text-sm font-medium flex items-center justify-between">
                  <div>create</div>
                  <span>
                    <input
                      type={"checkbox"}
                      className="hover:cursor-pointer"
                      checked={roles.permissions.employee._create.state}
                      disabled={mutateRoles.isLoading}
                      onChange={() =>
                        setRole((prev) => ({
                          ...prev,
                          permissions: {
                            ...prev.permissions,
                            employee: {
                              ...prev.permissions.employee,
                              _create: {
                                ...prev.permissions.employee._create,
                                state: !prev.permissions.employee._create.state,
                              },
                            },
                          },
                        }))
                      }
                    />
                  </span>
                </li>
                <li className="text-sm font-medium flex items-center justify-between">
                  <div>edit</div>
                  <span>
                    <input
                      type={"checkbox"}
                      className="hover:cursor-pointer"
                      checked={roles.permissions.employee._edit.state}
                      disabled={mutateRoles.isLoading}
                      onChange={() =>
                        setRole((prev) => ({
                          ...prev,
                          permissions: {
                            ...prev.permissions,
                            employee: {
                              ...prev.permissions.employee,
                              _edit: {
                                ...prev.permissions.employee._edit,
                                state: !prev.permissions.employee._edit.state,
                              },
                            },
                          },
                        }))
                      }
                    />
                  </span>
                </li>
                <li className="text-sm font-medium flex items-center justify-between">
                  <div>delete</div>
                  <span>
                    <input
                      type={"checkbox"}
                      className="hover:cursor-pointer"
                      checked={roles.permissions.employee._delete.state}
                      disabled={mutateRoles.isLoading}
                      onChange={() =>
                        setRole((prev) => ({
                          ...prev,
                          permissions: {
                            ...prev.permissions,
                            employee: {
                              ...prev.permissions.employee,
                              _delete: {
                                ...prev.permissions.employee._delete,
                                state: !prev.permissions.employee._delete.state,
                              },
                            },
                          },
                        }))
                      }
                    />
                  </span>
                </li>
              </ul>
            </div>
            <div className="flex-1 border px-4 py-4 rounded-lg">
              <p className="font-poppins">Departments</p>
              <ul className="mt-2 flex flex-col gap-1">
                <li className="text-sm font-medium flex items-center justify-between">
                  <div>view</div>
                  <span>
                    <input
                      type={"checkbox"}
                      className="hover:cursor-pointer"
                      checked={roles.permissions.department._view.state}
                      disabled={mutateRoles.isLoading}
                      onChange={() =>
                        setRole((prev) => ({
                          ...prev,
                          permissions: {
                            ...prev.permissions,
                            department: {
                              ...prev.permissions.department,
                              _view: {
                                ...prev.permissions.department._view,
                                state: !prev.permissions.department._view.state,
                              },
                            },
                          },
                        }))
                      }
                    />
                  </span>
                </li>
                <li className="text-sm font-medium flex items-center justify-between">
                  <div>create</div>
                  <span>
                    <input
                      type={"checkbox"}
                      className="hover:cursor-pointer"
                      checked={roles.permissions.department._create.state}
                      disabled={mutateRoles.isLoading}
                      onChange={() =>
                        setRole((prev) => ({
                          ...prev,
                          permissions: {
                            ...prev.permissions,
                            department: {
                              ...prev.permissions.department,
                              _create: {
                                ...prev.permissions.department._create,
                                state:
                                  !prev.permissions.department._create.state,
                              },
                            },
                          },
                        }))
                      }
                    />
                  </span>
                </li>
                <li className="text-sm font-medium flex items-center justify-between">
                  <div>edit</div>
                  <span>
                    <input
                      type={"checkbox"}
                      className="hover:cursor-pointer"
                      checked={roles.permissions.department._edit.state}
                      disabled={mutateRoles.isLoading}
                      onChange={() =>
                        setRole((prev) => ({
                          ...prev,
                          permissions: {
                            ...prev.permissions,
                            department: {
                              ...prev.permissions.department,
                              _edit: {
                                ...prev.permissions.department._edit,
                                state: !prev.permissions.department._edit.state,
                              },
                            },
                          },
                        }))
                      }
                    />
                  </span>
                </li>
                <li className="text-sm font-medium flex items-center justify-between">
                  <div>delete</div>
                  <span>
                    <input
                      type={"checkbox"}
                      className="hover:cursor-pointer"
                      checked={roles.permissions.department._delete.state}
                      disabled={mutateRoles.isLoading}
                      onChange={() =>
                        setRole((prev) => ({
                          ...prev,
                          permissions: {
                            ...prev.permissions,
                            department: {
                              ...prev.permissions.department,
                              _delete: {
                                ...prev.permissions.department._delete,
                                state:
                                  !prev.permissions.department._delete.state,
                              },
                            },
                          },
                        }))
                      }
                    />
                  </span>
                </li>
              </ul>
            </div>
            <div className="flex-1 border px-4 py-4 rounded-lg">
              <p className="font-poppins">Shifts</p>
              <ul className="mt-2 flex flex-col gap-1">
                <li className="text-sm font-medium flex items-center justify-between">
                  <div>view</div>
                  <span>
                    <input
                      type={"checkbox"}
                      className="hover:cursor-pointer"
                      checked={roles.permissions.shifts._view.state}
                      disabled={mutateRoles.isLoading}
                      onChange={() =>
                        setRole((prev) => ({
                          ...prev,
                          permissions: {
                            ...prev.permissions,
                            shifts: {
                              ...prev.permissions.shifts,
                              _view: {
                                ...prev.permissions.shifts._view,
                                state: !prev.permissions.shifts._view.state,
                              },
                            },
                          },
                        }))
                      }
                    />
                  </span>
                </li>
                <li className="text-sm font-medium flex items-center justify-between">
                  <div>create</div>
                  <span>
                    <input
                      type={"checkbox"}
                      className="hover:cursor-pointer"
                      checked={roles.permissions.shifts._create.state}
                      disabled={mutateRoles.isLoading}
                      onChange={() =>
                        setRole((prev) => ({
                          ...prev,
                          permissions: {
                            ...prev.permissions,
                            shifts: {
                              ...prev.permissions.shifts,
                              _create: {
                                ...prev.permissions.shifts._create,
                                state: !prev.permissions.shifts._create.state,
                              },
                            },
                          },
                        }))
                      }
                    />
                  </span>
                </li>
                <li className="text-sm font-medium flex items-center justify-between">
                  <div>edit</div>
                  <span>
                    <input
                      type={"checkbox"}
                      className="hover:cursor-pointer"
                      checked={roles.permissions.shifts._edit.state}
                      disabled={mutateRoles.isLoading}
                      onChange={() =>
                        setRole((prev) => ({
                          ...prev,
                          permissions: {
                            ...prev.permissions,
                            shifts: {
                              ...prev.permissions.shifts,
                              _edit: {
                                ...prev.permissions.shifts._edit,
                                state: !prev.permissions.shifts._edit.state,
                              },
                            },
                          },
                        }))
                      }
                    />
                  </span>
                </li>
                <li className="text-sm font-medium flex items-center justify-between">
                  <div>delete</div>
                  <span>
                    <input
                      type={"checkbox"}
                      className="hover:cursor-pointer"
                      checked={roles.permissions.shifts._delete.state}
                      disabled={mutateRoles.isLoading}
                      onChange={() =>
                        setRole((prev) => ({
                          ...prev,
                          permissions: {
                            ...prev.permissions,
                            shifts: {
                              ...prev.permissions.shifts,
                              _delete: {
                                ...prev.permissions.shifts._delete,
                                state: !prev.permissions.shifts._delete.state,
                              },
                            },
                          },
                        }))
                      }
                    />
                  </span>
                </li>
              </ul>
            </div>
            <div className="flex-1 border px-4 py-4 rounded-lg">
              <p className="font-poppins">Users</p>
              <ul className="mt-2 flex flex-col gap-1">
                <li className="text-sm font-medium flex items-center justify-between">
                  <div>view</div>
                  <span>
                    <input type={"checkbox"} className="hover:cursor-pointer" />
                  </span>
                </li>
                <li className="text-sm font-medium flex items-center justify-between">
                  <div>create</div>
                  <span>
                    <input type={"checkbox"} className="hover:cursor-pointer" />
                  </span>
                </li>
                <li className="text-sm font-medium flex items-center justify-between">
                  <div>edit</div>
                  <span>
                    <input type={"checkbox"} className="hover:cursor-pointer" />
                  </span>
                </li>
                <li className="text-sm font-medium flex items-center justify-between">
                  <div>delete</div>
                  <span>
                    <input type={"checkbox"} className="hover:cursor-pointer" />
                  </span>
                </li>
              </ul>
            </div>
            <div className="flex-1 border px-4 py-4 rounded-lg">
              <p className="font-poppins">Roles</p>
              <ul className="mt-2 flex flex-col gap-1">
                <li className="text-sm font-medium flex items-center justify-between">
                  <div>view</div>
                  <span>
                    <input
                      type={"checkbox"}
                      className="hover:cursor-pointer"
                      checked={roles.permissions.roles._view.state}
                      disabled={mutateRoles.isLoading}
                      onChange={() =>
                        setRole((prev) => ({
                          ...prev,
                          permissions: {
                            ...prev.permissions,
                            roles: {
                              ...prev.permissions.roles,
                              _view: {
                                ...prev.permissions.roles._view,
                                state: !prev.permissions.roles._view.state,
                              },
                            },
                          },
                        }))
                      }
                    />
                  </span>
                </li>
                <li className="text-sm font-medium flex items-center justify-between">
                  <div>create</div>
                  <span>
                    <input
                      type={"checkbox"}
                      className="hover:cursor-pointer"
                      checked={roles.permissions.roles._create.state}
                      disabled={mutateRoles.isLoading}
                      onChange={() =>
                        setRole((prev) => ({
                          ...prev,
                          permissions: {
                            ...prev.permissions,
                            roles: {
                              ...prev.permissions.roles,
                              _create: {
                                ...prev.permissions.roles._create,
                                state: !prev.permissions.roles._create.state,
                              },
                            },
                          },
                        }))
                      }
                    />
                  </span>
                </li>
                <li className="text-sm font-medium flex items-center justify-between">
                  <div>edit</div>
                  <span>
                    <input
                      type={"checkbox"}
                      className="hover:cursor-pointer"
                      checked={roles.permissions.roles._edit.state}
                      disabled={mutateRoles.isLoading}
                      onChange={() =>
                        setRole((prev) => ({
                          ...prev,
                          permissions: {
                            ...prev.permissions,
                            roles: {
                              ...prev.permissions.roles,
                              _edit: {
                                ...prev.permissions.roles._edit,
                                state: !prev.permissions.roles._edit.state,
                              },
                            },
                          },
                        }))
                      }
                    />
                  </span>
                </li>
                <li className="text-sm font-medium flex items-center justify-between">
                  <div>delete</div>
                  <span>
                    <input
                      type={"checkbox"}
                      className="hover:cursor-pointer"
                      checked={roles.permissions.roles._delete.state}
                      disabled={mutateRoles.isLoading}
                      onChange={() =>
                        setRole((prev) => ({
                          ...prev,
                          permissions: {
                            ...prev.permissions,
                            roles: {
                              ...prev.permissions.roles,
                              _delete: {
                                ...prev.permissions.roles._delete,
                                state: !prev.permissions.roles._delete.state,
                              },
                            },
                          },
                        }))
                      }
                    />
                  </span>
                </li>
              </ul>
            </div>
          </div>
          {/* Action buttons */}
          <div className="flex justify-between w-full mt-8">
            <button
              type={"button"}
              className="border py-2 px-4 rounded-lg hover:bg-gray-100 transition"
              onClick={onClick}
            >
              Discard
            </button>
            <button
              type={"submit"}
              className="border py-2 px-6 bg-green-500 text-white rounded-lg transition hover:bg-green-600"
              style={{
                cursor: mutateRoles.isLoading ? "not-allowed" : "pointer",
              }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};
export default NewRole;

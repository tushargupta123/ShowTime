import React, { useEffect, useState } from "react";
import Button from "../../components/Button.js";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loaderSlice.js";
import { message, Table } from "antd";
import TheatreForm from "./TheatreForm.js";
import { DeleteTheatre, GetAllTheatresByOwner } from "../../apicalls/theatres";
import Shows from "./Show.js";

function TheatresList() {
    const { user } = useSelector((state) => state.users);
    const [showTheatreFormModal = false, setShowTheatreFormModal] =
        useState(false);
    const [selectedTheatre, setSelectedTheatre] = useState(null);
    const [formType, setFormType] = useState("add");
    const [theatres, setTheatres] = useState([]);
    const [openShowsModal, setOpenShowsModal] = useState(false);

    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetAllTheatresByOwner({
                owner: user._id,
            });
            if (response.success) {
                setTheatres(response.data);
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    const handleDelete = async (theatreId) => {
        try {
            dispatch(ShowLoading());
            const response = await DeleteTheatre(theatreId);
            if (response.success) {
                message.success(response.message);
                getData();
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Address",
            dataIndex: "address",
        },
        {
            title: "Phone",
            dataIndex: "phone",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Status",
            dataIndex: "isActive",
            render: (isActive) => {
                if (isActive) {
                    return "Approved";
                } else {
                    return "Pending / Blocked";
                }
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (_, rowData) => {
                return (
                    <div className="flex gap-1 items-center">
                        <i
                            className="ri-delete-bin-line"
                            onClick={() => {
                                handleDelete(rowData._id);
                            }}
                        ></i>
                        <i
                            className="ri-pencil-line"
                            onClick={() => {
                                setFormType("edit");
                                setSelectedTheatre(rowData);
                                setShowTheatreFormModal(true);
                            }}
                        ></i>

                        {rowData.isActive && (
                            <span
                                className="underline"
                                onClick={() => {
                                    setSelectedTheatre(rowData);
                                    setOpenShowsModal(true);
                                }}
                            >
                                Shows
                            </span>
                        )}
                    </div>
                );
            },
        },
    ];

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <div className="flex justify-end mb-1">
                <Button
                    variant="outlined"
                    title="Add Theatre"
                    onClick={() => {
                        setFormType("add");
                        setShowTheatreFormModal(true);
                    }}
                />
            </div>

            <Table columns={columns} dataSource={theatres} />

            {showTheatreFormModal && (
                <TheatreForm
                    setShowTheatreFormModal={setShowTheatreFormModal}
                    formType={formType}
                    selectedTheatre={selectedTheatre}
                    setSelectedTheatre={setSelectedTheatre}
                    getData={getData}
                />
            )}

            {openShowsModal && (
                <Shows
                    setOpenShowsModal={setOpenShowsModal}
                    theatre={selectedTheatre}
                />
            )}
        </div>
    );
}

export default TheatresList;
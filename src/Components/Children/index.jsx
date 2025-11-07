import React, { useEffect, useState } from "react";
import {
    Card,
    Typography,
    Button,
} from "@material-tailwind/react";
import { ChildrenApi } from "../../utils/Controllers/ChildrenApi";
import Create from "./_components/Create";
import Edit from "./_components/Edit";
import Delete from "./_components/Delete";
import Loading from "../UI/Loadings/Loading";
import { NavLink } from "react-router-dom";
import Eye from "../UI/Icons/Eye";
import AddGroups from "./_components/AddGroups";

export default function Children() {
    const [children, setChildren] = useState([]);
    const [loading, setLoading] = useState(true);

    const GetAllChildren = async () => {
        try {
            const response = await ChildrenApi.GetAllChildren();
            setChildren(response.data || []); // <-- сохраняем данные
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        GetAllChildren();
    }, []);

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <div className="">
                <div className="flex items-center justify-between mb-4">
                    <Typography variant="h4" className="font-bold">
                        Barcha bolalar ro'yxati
                    </Typography>
                    <Create refresh={GetAllChildren} />
                </div>
                <Card className="overflow-x-auto shadow-lg rounded-2xl">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-4">#</th>
                                <th className="p-4">Bola F.I.SH</th>
                                <th className="p-4">Ota-ona</th>
                                <th className="p-4">Ota-ona raqami</th>
                                <th className="p-4">Holat</th>
                                <th className="p-4">Yaratilgan sana</th>
                                <th className="p-4">Amallar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {children.length > 0 ? (
                                children.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className="border-b hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="p-4">{index + 1}</td>
                                        <td className="p-4 font-medium">{item.full_name}</td>
                                        <td className="p-4">{item.parents_full_name}</td>
                                        <td className="p-4">{item.parents_phone_number}</td>
                                        <td className="p-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-semibold ${item.status
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {item.status ? "Faol" : "Faol emas"}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <NavLink to={`/children/${item?.id}`}>
                                                    <Button
                                                        className="bg-blue-500 text-white p-2 min-w-[40px] rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                                                    >
                                                        <Eye size={18} />
                                                    </Button>
                                                </NavLink>
                                                <AddGroups studentData={item} refresh={GetAllChildren} />
                                                <Edit
                                                    editData={item}
                                                    refresh={GetAllChildren}
                                                />
                                                <Delete
                                                    deleteData={item}
                                                    refresh={GetAllChildren}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="text-center py-6 text-gray-500 font-medium"
                                    >
                                        Ma’lumot topilmadi
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Card>
            </div>
        </>
    );
}

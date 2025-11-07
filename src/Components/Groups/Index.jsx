import { useEffect, useState } from "react";
import { GroupsApi } from "../../utils/Controllers/GroupsApi";
import Create from "./_components/Create";
import { Typography, Card, CardBody, Button } from "@material-tailwind/react";
import { Users, Clock, Calendar, CheckCircle2, School, DollarSign } from "lucide-react";
import Delete from "./_components/Delete";
import EmptyData from "../UI/NoData/EmptyData";
import Edit from "./_components/Edit";
import { NavLink } from "react-router-dom";
import Eye from "../UI/Icons/Eye";

export default function Groups() {
    const [groups, setGroups] = useState([]);

    const getAllGroups = async () => {
        try {
            const response = await GroupsApi.GetAllGroups();
            setGroups(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllGroups();
    }, []);

    // Функция форматирования числа: 500000 → 500 000
    const formatNumber = (num) => {
        if (!num) return "0";
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    return (
        <div className="">
            <div className="flex items-center justify-between mb-6">
                <Typography variant="h4" className="font-bold">
                    Barcha guruhlar ro'yxati
                </Typography>
                <Create refresh={getAllGroups} />
            </div>

            {groups.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {groups.map((group) => (
                        <Card
                            key={group.id}
                            className="shadow-md rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all"
                        >
                            <CardBody>
                                <div className="flex items-center justify-between mb-3">
                                    <Typography variant="h5" className="font-semibold">
                                        {group.name}
                                    </Typography>
                                    <div className="flex items-center gap-[10px]">
                                        <NavLink to={`/group/${group?.id}`}>
                                            <Button
                                                className="bg-blue-500 text-white p-2 min-w-[40px] rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                                            >
                                                <Eye size={18} />
                                            </Button>
                                        </NavLink>
                                        <Edit editData={group} refresh={getAllGroups} />
                                        <Delete deleteData={group} refresh={getAllGroups} />
                                    </div>
                                </div>

                                <div className="flex items-center text-gray-600 text-sm mb-2">
                                    <Calendar size={18} className="mr-2 text-orange-500" />
                                    <span>{group.start_date}</span>
                                </div>

                                <div className="flex items-center text-gray-600 text-sm mb-2">
                                    <Clock size={18} className="mr-2 text-purple-500" />
                                    <span>
                                        {group.start_time} - {group.end_time}
                                    </span>
                                </div>

                                <div className="flex items-center text-gray-800 font-semibold mt-2">
                                    <DollarSign size={18} className="mr-2 text-green-600" />
                                    <span>{formatNumber(group.price)} so'm</span>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            ) : (
                <EmptyData text="Hozircha guruhlar mavjud emas" />
            )}
        </div>
    );
}

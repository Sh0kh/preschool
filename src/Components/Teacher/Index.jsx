import { useEffect, useState } from "react";
import { TeacherApi } from "../../utils/Controllers/TeacherApi";
import { Typography, Card, CardBody, CardHeader } from "@material-tailwind/react";
import Create from "./_components/Create";
import Delete from "./_components/Delete";
import Edit from "./_components/Edit";

export default function Teacher() {
    const [teachers, setTeachers] = useState([]);

    const getAllTeacher = async () => {
        try {
            const response = await TeacherApi.TeacherGetAll();
            // фильтруем только role === "teacher"
            const teacherOnly = response.data.filter((t) =>
                t.role?.includes("teacher")
            );
            setTeachers(teacherOnly);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllTeacher();
    }, []);

    return (
        <>
            <div>
                <div className="flex items-center justify-between mb-4">
                    <Typography variant="h4" className="font-bold">
                        Barcha tarbiyachilar ro'yxati
                    </Typography>
                    <Create refresh={getAllTeacher} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {teachers.map((teacher) => (
                        <Card key={teacher.id} className="shadow-lg border border-gray-200">
                            <CardBody className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <Typography
                                        variant="h6"
                                    >
                                        {teacher.full_name}
                                    </Typography>
                                    <div className="flex items-center gap-[10px]">
                                        <Edit teacherData={teacher} refresh={getAllTeacher} />
                                        <Delete deleteData={teacher} refresh={getAllTeacher} />
                                    </div>
                                </div>

                                <Typography variant="small" color="gray">
                                    Telefon: {teacher.phone_number}
                                </Typography>
                                <Typography variant="small" color="gray">
                                    Login: {teacher.login}
                                </Typography>
                                <Typography variant="small" color="gray">
                                    Roli: {teacher.role}
                                </Typography>
                                <Typography variant="small" color="gray">
                                    Oylik: {Number(teacher.salary).toLocaleString("ru-RU")} so‘m
                                </Typography>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}

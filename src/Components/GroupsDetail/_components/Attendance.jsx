import { useEffect, useState } from "react";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { Alert } from "../../../../../motor/src/utils/Alert";
import { AttendenceApi } from "../../../utils/Controllers/Attendance";

export default function Attendance({ data }) {
    const [students, setStudents] = useState([]);
    const [oldAttendance, setOldAttendance] = useState([]);
    const [refresh, setRefresh] = useState(false)

    // Получаем старые записи
    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const res = await AttendenceApi.GetAttendance();
                setOldAttendance(res.data);
            } catch (error) {
                console.error("Error fetching attendance:", error);
            }
        };
        fetchAttendance();
    }, [refresh]);

    // Инициализация студентов для текущего дня
    useEffect(() => {
        if (data?.student) {
            setStudents(
                data.student.map((s, i) => ({
                    number: i + 1,
                    student_id: s.student_id,
                    group_id: s.group_id,
                    name: `Bola ${i + 1}`,
                    status: false,
                }))
            );
        }
    }, [data]);

    // Меняем статус по кнопке
    const handleStatusChange = (id) => {
        setStudents((prev) =>
            prev.map((s) =>
                s.student_id === id ? { ...s, status: !s.status } : s
            )
        );
    };

    // Отправляем новые данные
    const handleSubmit = async () => {
        try {
            const payload = {
                list: students.map((s) => ({
                    school_id: data.school_id,
                    student_id: s.student_id,
                    group_id: s.group_id,
                    status: s.status,
                })),
            };

            await AttendenceApi.CreateAttendance(payload);
            Alert("Davomat saqlandi ✅", "success");
            setRefresh(!refresh)
        } catch (error) {
            console.error(error);
            Alert("Xatolik yuz berdi ❌", "error");
        }
    };

    // Преобразуем старые данные для отображения
    const formattedOld = oldAttendance
        .filter((a) => a.group_id === data.id) // только для текущей группы
        .sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map((item, index) => ({
            id: item.id,
            num: index + 1,
            studentName: item.student?.full_name || "-",
            groupName: item.group?.name || "-",
            date: new Date(item.createdAt).toLocaleString(),
            status: item.status,
        }));

    return (
        <div className="flex flex-col items-center p-6">
            <Card className="w-full  shadow-xl border border-gray-200">
                <CardBody>
                    <div className="text-center mb-6">
                        <Typography variant="h5" className="font-semibold">
                            Guruh: {data.name}
                        </Typography>
                        <Typography color="gray" className="text-sm mt-1">
                            {data.start_date} | {data.start_time} - {data.end_time}
                        </Typography>
                    </div>

                    <Typography variant="h6" className="mb-3">
                        Bugungi davomat:
                    </Typography>
                    <div className="overflow-x-auto mb-6">
                        <table className="min-w-full border border-gray-300 rounded-lg">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 border">#</th>
                                    <th className="px-4 py-2 border text-left">Ism</th>
                                    <th className="px-4 py-2 border text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student) => (
                                    <tr
                                        key={student.student_id}
                                        className="hover:bg-gray-50 transition"
                                    >
                                        <td className="border px-4 py-2 text-center font-medium">
                                            {student.number}
                                        </td>
                                        <td className="border px-4 py-2">{student.name}</td>
                                        <td className="border px-4 py-2 text-center">
                                            <Button
                                                onClick={() => handleStatusChange(student.student_id)}
                                                size="sm"
                                                className={`normal-case ${student.status
                                                    ? "bg-green-600 hover:bg-green-700"
                                                    : "bg-red-500 hover:bg-red-600"
                                                    }`}
                                            >
                                                {student.status ? "✅ Kelgan" : "❌ Yo‘q"}
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-center mb-8">
                        <Button
                            onClick={handleSubmit}
                            className="bg-black text-white normal-case hover:bg-gray-800 transition-colors"
                        >
                            Saqlash
                        </Button>
                    </div>

                    {/* ======= OLD DAVOMATLAR ======= */}
                    <Typography variant="h6" className="mb-3">
                        Oldingi davomatlar:
                    </Typography>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300 rounded-lg">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 border">#</th>
                                    <th className="px-4 py-2 border text-left">O‘quvchi</th>
                                    <th className="px-4 py-2 border text-left">Guruh</th>
                                    <th className="px-4 py-2 border text-center">Sana</th>
                                    <th className="px-4 py-2 border text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formattedOld.length > 0 ? (
                                    formattedOld.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-gray-50 transition"
                                        >
                                            <td className="border px-4 py-2 text-center font-medium">
                                                {item.num}
                                            </td>
                                            <td className="border px-4 py-2">{item.studentName}</td>
                                            <td className="border px-4 py-2">{item.groupName}</td>
                                            <td className="border px-4 py-2 text-center">
                                                {item.date}
                                            </td>
                                            <td className="border px-4 py-2 text-center">
                                                {item.status ? (
                                                    <span className="text-green-600 font-semibold">✅ Kelgan</span>
                                                ) : (
                                                    <span className="text-red-500 font-semibold">❌ Yo‘q</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="text-center py-4 text-gray-500"
                                        >
                                            Hozircha eski davomatlar yo‘q
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

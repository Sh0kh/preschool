import { useState, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
} from "@material-tailwind/react";
import { Alert } from "../../../utils/Alert";
import { TeacherApi } from "../../../utils/Controllers/TeacherApi";
import { Plus } from "lucide-react";
import { useParams } from "react-router-dom";

export default function AddTeacher({ refresh }) {
    const { id } = useParams()
    const [open, setOpen] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacherId, setSelectedTeacherId] = useState("");

    const handleOpen = () => setOpen(!open);

    // Загружаем только учителей
    const getTeachers = async () => {
        try {
            const res = await TeacherApi.TeacherGetAll();
            // Фильтруем только role = "teacher"
            const onlyTeachers = res.data.filter((t) => t.role.includes("teacher"));
            setTeachers(onlyTeachers);
        } catch (error) {
            console.log(error);
            Alert("Tarbiyachilarni olishda xatolik yuz berdi", "error");
        }
    };

    useEffect(() => {
        if (open) getTeachers();
    }, [open]);

    const handleSubmit = async () => {
        if (!selectedTeacherId) {
            Alert("Iltimos, tarbiyachini tanlang", "warning");
            return;
        }

        const selectedTeacher = teachers.find((t) => t.id === Number(selectedTeacherId));
        const data = {
            group_id: Number(id),
            employee_id: selectedTeacher.id,
            group_name: 'test',
        };

        try {
            await TeacherApi?.addTeacher(data); // здесь вызывается API добавления
            Alert("Talaba tarbiyachiga muvaffaqiyatli biriktirildi", "success");
            handleOpen();
            setSelectedTeacherId("");
            refresh();
        } catch (error) {
            console.log(error);
            Alert(
                `Xatolik: ${error.response?.data?.message || error.message || "Server xatosi"}`,
                "error"
            );
        }
    };

    return (
        <>
            {/* Кнопка открытия */}
            <Button
                color="blue-gray"
                size="sm"
                onClick={handleOpen}
                className="flex items-center gap-2 mb-2"
            >
                <Plus size={16} /> Tarbiyachi biriktirish
            </Button>

            {/* Модалка */}
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Talabani tarbiyachiga biriktirish</DialogHeader>

                <DialogBody className="space-y-4">


                    <div>
                        <Typography variant="small" className="text-gray-700 mb-2">
                            Tarbiyachini tanlang:
                        </Typography>

                        <select
                            value={selectedTeacherId}
                            onChange={(e) => setSelectedTeacherId(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 bg-white focus:ring-2 focus:ring-black focus:outline-none transition"
                        >
                            <option value="">— Tarbiyachi tanlang —</option>
                            {teachers.map((teacher) => (
                                <option key={teacher.id} value={teacher.id}>
                                    {teacher.full_name} — {teacher.phone_number}
                                </option>
                            ))}
                        </select>
                    </div>
                </DialogBody>

                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-2"
                    >
                        Bekor qilish
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        className="bg-green-500 text-white normal-case hover:bg-green-600 transition-colors"
                    >
                        Qo‘shish
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

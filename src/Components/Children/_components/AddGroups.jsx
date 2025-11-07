import { useState, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
} from "@material-tailwind/react";
import { Alert } from "../../../../../motor/src/utils/Alert";
import { GroupsApi } from "../../../utils/Controllers/GroupsApi";
import { Plus } from "lucide-react";

export default function AddStudentToGroupModal({ studentData, refresh }) {
    const [open, setOpen] = useState(false);
    const [groups, setGroups] = useState([]);
    const [selectedGroupId, setSelectedGroupId] = useState("");

    const handleOpen = () => setOpen(!open);

    // Загружаем все группы
    const fetchGroups = async () => {
        try {
            const res = await GroupsApi.GetAllGroups();
            setGroups(res.data);
        } catch (error) {
            console.log(error);
            Alert("Guruhlarni olishda xatolik yuz berdi", "error");
        }
    };

    useEffect(() => {
        if (open) fetchGroups();
    }, [open]);

    const handleSubmit = async () => {
        if (!selectedGroupId) {
            Alert("Iltimos, guruhni tanlang", "warning");
            return;
        }

        const selectedGroup = groups.find((g) => g.id === Number(selectedGroupId));
        const data = {
            student_id: studentData.id,
            group_id: selectedGroup.id,
            group_name: selectedGroup.name,
        };

        try {
            await GroupsApi.addGroups(data);
            Alert("Talaba guruhga muvaffaqiyatli qo‘shildi", "success");
            handleOpen();
            setSelectedGroupId("");
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
                onClick={handleOpen}
                className="bg-green-500 text-white p-2 min-w-[40px] rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
            >
                <Plus size={18} />
            </Button>

            {/* Модалка */}
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Talabani guruhga qo‘shish</DialogHeader>

                <DialogBody className="space-y-4">
                    {/* Уже добавленные группы */}
                    <div>
                        <Typography variant="small" className="text-gray-700 mb-2">
                            Talaba mavjud bo‘lgan guruhlar:
                        </Typography>

                        {studentData.group.length > 0 ? (
                            <ul className="list-disc ml-5 text-gray-800">
                                {studentData.group.map((g) => (
                                    <li key={g.id} className="text-sm">
                                        {g.group_name}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <Typography variant="small" color="gray">
                                Talaba hali hech qaysi guruhga biriktirilmagan.
                            </Typography>
                        )}
                    </div>

                    {/* Выбор группы */}
                    <div>
                        <Typography variant="small" className="text-gray-700 mb-2">
                            Guruhni tanlang:
                        </Typography>

                        <select
                            value={selectedGroupId}
                            onChange={(e) => setSelectedGroupId(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 bg-white focus:ring-2 focus:ring-black focus:outline-none transition"
                        >
                            <option value="">— Guruh tanlang —</option>
                            {groups.map((group) => (
                                <option key={group.id} value={group.id}>
                                    {group.name} — {Number(group.price).toLocaleString("ru-RU")} so‘m
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

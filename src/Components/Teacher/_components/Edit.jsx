import { useState, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
} from "@material-tailwind/react";
import { TeacherApi } from "../../../utils/Controllers/TeacherApi";
import { Alert } from "../../../../../motor/src/utils/Alert";
import EditIcon from "../../UI/Icons/EditIcon";

export default function Edit({ teacherData, refresh }) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        school_id: 1,
        full_name: "",
        phone_number: "+998",
        login: "",
        password: "",
        role: "teacher",
        salary: "",
    });

    const handleOpen = () => {
        // при открытии модалки заполняем форму существующими данными
        setFormData({
            school_id: teacherData.school_id || 1,
            full_name: teacherData.full_name || "",
            phone_number: teacherData.phone_number || "+998",
            login: teacherData.login || "",
            password: "", // оставляем пустым
            role: teacherData.role || "teacher",
            salary: teacherData.salary || "",
        });
        setOpen(!open);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const dataToSend = { ...formData };
            // если пароль пустой, не отправляем его
            if (!dataToSend.password) delete dataToSend.password;

            await TeacherApi.EditTeacher(teacherData.id, dataToSend); // предполагается метод UpdateTeacher
            Alert("Tarbiyachi muvaffaqiyatli yangilandi", "success");
            setOpen(false);
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
            <Button
                onClick={handleOpen}
                className="bg-blue-500 text-white p-2 min-w-[40px] rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
            >
                <EditIcon size={20} />
            </Button>

            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Tarbiyachi ma'lumotlarini tahrirlash</DialogHeader>

                <DialogBody className="flex flex-col gap-4">
                    <Input
                        label="To‘liq ism"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                    />
                    <Input
                        label="Telefon raqam"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                    />
                    <Input
                        label="Login"
                        name="login"
                        value={formData.login}
                        onChange={handleChange}
                    />
                    <Input
                        label="Oylik (salary)"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        type="number"
                    />
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
                        className="bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    >
                        Saqlash
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

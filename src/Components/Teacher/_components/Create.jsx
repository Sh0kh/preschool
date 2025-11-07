import { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
} from "@material-tailwind/react";
import { TeacherApi } from "../../../utils/Controllers/TeacherApi";
import { Alert } from "../../../utils/Alert";

export default function Create({ refresh }) {
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

    const handleOpen = () => setOpen(!open);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            await TeacherApi.CreateTeacher(formData);
            Alert("Tarbiyachi muvaffaqiyatli yaratildi", "success");
            handleOpen();
            setFormData({
                school_id: 1,
                full_name: "",
                phone_number: "",
                login: "",
                password: "",
                role: "teacher",
                salary: "",
            });
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
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
                Tarbiyachi yaratish
            </Button>

            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Tarbiyachi yaratish</DialogHeader>

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
                        placeholder="+998901234567"
                    />
                    <Input
                        label="Login"
                        name="login"
                        value={formData.login}
                        onChange={handleChange}
                    />
                    <Input
                        label="Parol"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type="password"
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

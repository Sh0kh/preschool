import { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Switch,
} from "@material-tailwind/react";
import { Alert } from "../../../utils/Alert";
import { GroupsApi } from "../../../utils/Controllers/GroupsApi";
import EditIcon from "../../UI/Icons/EditIcon";

export default function Edit({ editData, refresh }) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: editData?.id || null,
        school_id: editData?.school_id || 1,
        name: editData?.name || "",
        price: editData?.price || "",
        start_date: editData?.start_date || "",
        start_time: editData?.start_time || "",
        end_time: editData?.end_time || "",
        status: editData?.status ?? true,
    });

    const handleOpen = () => setOpen(!open);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleStatusChange = () => {
        setFormData((prev) => ({
            ...prev,
            status: !prev.status,
        }));
    };

    const handleSubmit = async () => {
        try {
            await GroupsApi.EditGroup(formData.id, formData);
            handleOpen();
            refresh();
            Alert("Guruh muvaffaqiyatli yangilandi", "success");
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
            {/* Кнопка редактирования */}
            <Button
                onClick={handleOpen}
                className="bg-blue-500 text-white p-2 min-w-[40px] rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
            >
                <EditIcon size={20} />
            </Button>

            {/* Модалка */}
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Guruh ma’lumotlarini tahrirlash</DialogHeader>

                <DialogBody className="flex flex-col gap-4">
                    <Input
                        label="Guruh nomi"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <Input
                        label="Narxi (so‘m)"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        type="number"
                    />
                    <Input
                        label="Boshlanish sanasi"
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleChange}
                        type="date"
                    />
                    <div className="flex gap-4">
                        <Input
                            label="Boshlanish vaqti"
                            name="start_time"
                            value={formData.start_time}
                            onChange={handleChange}
                            type="time"
                        />
                        <Input
                            label="Tugash vaqti"
                            name="end_time"
                            value={formData.end_time}
                            onChange={handleChange}
                            type="time"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Holati:</span>
                        <Switch
                            checked={formData.status}
                            onChange={handleStatusChange}
                            label={formData.status ? "Faol" : "Faol emas"}
                        />
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
                        className="bg-blue-500 text-white normal-case hover:bg-blue-600 transition-colors"
                    >
                        Saqlash
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

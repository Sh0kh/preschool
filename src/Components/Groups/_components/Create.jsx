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

export default function Create({ refresh }) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        school_id: 1,
        name: "",
        price: "",
        start_date: "",
        start_time: "",
        end_time: "",
        status: true,
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
            await GroupsApi.CreateGroup(formData);
            handleOpen();
            setFormData({
                school_id: 1,
                name: "",
                price: "",
                start_date: "",
                start_time: "",
                end_time: "",
                status: true,
            });
            refresh();
            Alert("Guruh muvaffaqiyatli yaratildi", "success");
        } catch (error) {
            console.log(error);
            Alert(
                `Xatolik: ${error.response?.data?.message || error.message || "Server xatosi"
                }`,
                "error"
            );
        }
    };

    return (
        <>
            <Button
                onClick={handleOpen}
                className="bg-black text-white normal-case hover:bg-gray-800 transition-colors"
            >
                Yangi guruh qo'shish
            </Button>

            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Yangi guruh qo‘shish</DialogHeader>
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
                        className="bg-black text-white normal-case hover:bg-gray-800 transition-colors"
                    >
                        Saqlash
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

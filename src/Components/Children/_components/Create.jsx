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
import { ChildrenApi } from "../../../utils/Controllers/ChildrenApi";
import { Alert } from "../../../utils/Alert";

export default function Create({ refresh }) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        school_id: 1,
        parents_full_name: "",
        parents_phone_number: "+998",
        full_name: "",
        phone_number: "+998970101418",
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
            await ChildrenApi.CreateChildren(formData);
            handleOpen();
            setFormData({
                school_id: 1,
                parents_full_name: "",
                parents_phone_number: "",
                full_name: "",
                phone_number: "",
                status: true,
            });
            refresh()
            Alert("Kategoriya muvaffaqiyatli yaratildi", "success");
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
                className="bg-black text-white normal-case hover:bg-gray-800 transition-colors"
            >
                Bola qo'shish
            </Button>

            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Bola qo'shish</DialogHeader>
                <DialogBody className="flex flex-col gap-4">
                    <Input
                        label="Ota-onaning ismi"
                        name="parents_full_name"
                        value={formData.parents_full_name}
                        onChange={handleChange}
                    />
                    <Input
                        label="Ota-onaning telefon raqami"
                        name="parents_phone_number"
                        value={formData.parents_phone_number}
                        onChange={handleChange}
                    />
                    <Input
                        label="Bolani to‘liq ismi"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                    />
                    <div className="flex items-center justify-between">
                        <span>Holati:</span>
                        <Switch
                            checked={formData.status}
                            onChange={handleStatusChange}
                            label={formData.status ? "Faol" : "Nofaol"}
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

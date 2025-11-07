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
import { Alert } from "../../../../../motor/src/utils/Alert";
import EditIcon from "../../UI/Icons/EditIcon";

export default function Edit({ editData, refresh }) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        school_id: editData.school_id || 1,
        parents_full_name: editData.parents_full_name || "",
        parents_phone_number: editData.parents_phone_number || "",
        full_name: editData.full_name || "",
        phone_number: editData.phone_number || "",
        status: editData.status ?? true,
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
            await ChildrenApi.EditChildren(editData.id, formData);
            handleOpen();
            refresh();
            Alert("Ma'lumot muvaffaqiyatli yangilandi", "success");
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
            {/* Кнопка редактирования */}
            <Button
                onClick={handleOpen}
                className="bg-blue-500 text-white p-2 min-w-[40px] rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
            >
                <EditIcon size={20} />
            </Button>

            {/* Модал */}
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Ma'lumotni tahrirlash</DialogHeader>
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
                        className="bg-blue-500 text-white normal-case hover:bg-blue-600 transition-colors"
                    >
                        Yangilash
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

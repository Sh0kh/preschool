import { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Select,
    Option,
} from "@material-tailwind/react";
import { PaymentApi } from "../../../utils/Controllers/Payment";
import { Alert } from "../../../../../motor/src/utils/Alert";
import { useParams } from "react-router-dom";

export default function Payment({ studentData, groupData, refresh }) {
    const [open, setOpen] = useState(false);
    const { id } = useParams();
    const [formData, setFormData] = useState({
        school_id: 1,
        student_id: studentData?.student_id || "",
        group_id: Number(id),
        year: String(new Date().getFullYear()),
        month: "",
        method: "Terminal",
        discount: 0,
        price: 0,
        description: "",
    });

    const handleOpen = () => setOpen(!open);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value,
        }));
    };

    const handleSubmit = async () => {
        try {
            await PaymentApi.CreatePayment(formData);
            Alert("To‘lov muvaffaqiyatli yaratildi", "success");
            handleOpen();
            setFormData({
                school_id: 1,
                student_id: studentData?.id || "",
                group_id: groupData?.id || "",
                year: new Date().getFullYear(),
                month: "",
                method: "Terminal",
                discount: 0,
                price: 0,
                description: "",
            });
            if (refresh) refresh();
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
                color="green"
                onClick={handleOpen}
                className="normal-case"
            >
                To‘lov qilish
            </Button>

            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>To‘lov yaratish</DialogHeader>
                <DialogBody className="flex flex-col gap-4">
                    <Input
                        label="Yil"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        type="number"
                    />
                    <Select
                        label="Oy"
                        name="month"
                        value={formData.month}
                        onChange={(val) => setFormData((prev) => ({ ...prev, month: val }))}
                    >
                        {[
                            "January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"
                        ].map((m) => (
                            <Option key={m} value={m}>{m}</Option>
                        ))}
                    </Select>
                    <Select
                        label="To‘lov usuli"
                        name="method"
                        value={formData.method}
                        onChange={(val) => setFormData((prev) => ({ ...prev, method: val }))}
                    >
                        <Option value="Terminal">Terminal</Option>
                        <Option value="Naqd">Naqd</Option>
                        <Option value="Online">Online</Option>
                    </Select>
                    <Input
                        label="Narxi"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        type="number"
                    />
                    <Input
                        label="Chegirma"
                        name="discount"
                        value={formData.discount}
                        onChange={handleChange}
                        type="number"
                    />
                    <Input
                        label="Izoh"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
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
                        className="bg-green-500 text-white hover:bg-green-600 transition-colors"
                    >
                        Saqlash
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

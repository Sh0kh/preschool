import { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
} from "@material-tailwind/react";
import { ChildrenApi } from "../../../utils/Controllers/ChildrenApi";
import { Alert } from "../../../../../motor/src/utils/Alert";
import DeleteIcon from "../../UI/Icons/DeleteIcon";

export default function Delete({ deleteData, refresh }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    const handleDelete = async () => {
        try {
            await ChildrenApi.DeleteChildren(deleteData.id);
            handleOpen();
            refresh();
            Alert("Bola muvaffaqiyatli o'chirildi", "success");
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
            {/* Кнопка удаления */}
            <Button
                onClick={handleOpen}
                color="red"
                className="p-2 min-w-[40px] rounded-lg bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center"
            >
                <DeleteIcon size={20} />
            </Button>

            {/* Модал подтверждения удаления */}
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>O'chirishni tasdiqlang</DialogHeader>
                <DialogBody>
                    <Typography>
                        Siz haqiqatdan ham{" "}
                        <span className="font-semibold">{deleteData.full_name}</span>{" "}
                        ma’lumotini o‘chirmoqchimisiz?
                    </Typography>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="gray"
                        onClick={handleOpen}
                        className="mr-2"
                    >
                        Bekor qilish
                    </Button>
                    <Button
                        onClick={handleDelete}
                        className="bg-red-500 text-white normal-case hover:bg-red-600 transition-colors"
                    >
                        O‘chirish
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

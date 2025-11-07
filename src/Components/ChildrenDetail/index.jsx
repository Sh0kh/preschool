import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChildrenApi } from "../../utils/Controllers/ChildrenApi";
import {
    Typography,
    Card,
    CardBody,
    Button,
    Accordion,
    AccordionHeader,
    AccordionBody,
    Chip,
} from "@material-tailwind/react";
import {
    User,
    CalendarCheck,
    CreditCard,
    Users,
    Phone,
    School,
    MapPin,
    Calendar,
    DollarSign,
    CheckCircle,
    XCircle,
    Clock
} from "lucide-react";

export default function ChildrenDetail() {
    const { id } = useParams();
    const [child, setChild] = useState(null);
    const [openAttendance, setOpenAttendance] = useState(false);
    const [openPayments, setOpenPayments] = useState(false);
    const [openGroups, setOpenGroups] = useState(false);

    const getChildDetails = async () => {
        try {
            const response = await ChildrenApi.GetChildrenDetail(id);
            setChild(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getChildDetails();
    }, []);

    if (!child) return (
        <div className="flex justify-center items-center min-h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
    );

    const getStatusIcon = (status) => {
        return status ?
            <CheckCircle className="w-5 h-5 text-green-500" /> :
            <XCircle className="w-5 h-5 text-red-500" />;
    };

    const formatPrice = (price) => {
        return Number(price).toLocaleString("ru-RU") + " so'm";
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50/30 py-6 ">
            <div className=" mx-auto space-y-6">
                {/* Заголовок страницы */}
                <div className="flex items-center justify-between">
                    <div>
                        <Typography variant="h4" className="font-bold text-gray-900">
                            Talaba Ma'lumotlari
                        </Typography>
                        <Typography className="text-gray-600 mt-1">
                            Batafsil ma'lumot va faoliyat
                        </Typography>
                    </div>
                    <Chip
                        value={child.status ? "Faol" : "Nofaol"}
                        color={child.status ? "green" : "red"}
                        className="rounded-full"
                    />
                </div>

                {/* Основная информация карточка */}
                <Card className="shadow-xl border-0 overflow-hidden">
                    <CardBody className="p-6">
                        <div className="flex flex-col lg:flex-row items-start gap-6">
                            {/* Аватар */}
                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl w-24 h-24 flex items-center justify-center text-white shadow-lg">
                                <User size={40} />
                            </div>

                            {/* Основная информация */}
                            <div className="flex-1">
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                                    <div>
                                        <Typography variant="h3" className="font-bold text-gray-900 mb-2">
                                            {child.full_name}
                                        </Typography>
                                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                                            <User className="w-4 h-4" />
                                            <Typography className="font-medium">
                                                {child.parents_full_name}
                                            </Typography>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Phone className="w-4 h-4" />
                                            <Typography>{child.phone_number}</Typography>
                                        </div>
                                    </div>

                                    <div className="mt-4 lg:mt-0 flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                                        {getStatusIcon(child.status)}
                                        <Typography className={`font-semibold ${child.status ? "text-green-700" : "text-red-700"}`}>
                                            {child.status ? "Faol talaba" : "Nofaol talaba"}
                                        </Typography>
                                    </div>
                                </div>

                                {/* Информация о школе */}
                                <div className="bg-gray-50 rounded-xl p-4 mt-4">
                                    <Typography variant="h6" className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                        <School className="w-5 h-5 text-blue-600" />
                                        Maktab Ma'lumotlari
                                    </Typography>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div className="flex items-center gap-2">
                                            <School className="w-4 h-4 text-gray-500" />
                                            <Typography className="font-medium text-gray-700">
                                                {child.school.name}
                                            </Typography>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-gray-500" />
                                            <Typography className="text-gray-600">
                                                {child.school.address}
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Статистика */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg border-0">
                        <CardBody className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Typography className="font-semibold opacity-90">
                                        Guruhlar
                                    </Typography>
                                    <Typography variant="h3" className="font-bold">
                                        {child.group.length}
                                    </Typography>
                                </div>
                                <Users className="w-10 h-10 opacity-80" />
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg border-0">
                        <CardBody className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Typography className="font-semibold opacity-90">
                                        To'lovlar
                                    </Typography>
                                    <Typography variant="h3" className="font-bold">
                                        {child.payment.length}
                                    </Typography>
                                </div>
                                <CreditCard className="w-10 h-10 opacity-80" />
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg border-0">
                        <CardBody className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Typography className="font-semibold opacity-90">
                                        Davomat
                                    </Typography>
                                    <Typography variant="h3" className="font-bold">
                                        {child.attendance.length}
                                    </Typography>
                                </div>
                                <CalendarCheck className="w-10 h-10 opacity-80" />
                            </div>
                        </CardBody>
                    </Card>
                </div>

                {/* Аккордеоны с детальной информацией */}
                <div className="space-y-4">
                    {/* Группы */}
                    <Accordion
                        open={openGroups}
                        className="shadow-lg border-0 rounded-2xl overflow-hidden"
                    >
                        <AccordionHeader
                            onClick={() => setOpenGroups(!openGroups)}
                            className="px-6 py-4 bg-white hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-100 p-2 rounded-lg">
                                    <Users className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <Typography variant="h6" className="font-semibold">
                                        Guruhlar
                                    </Typography>
                                    <Typography className="text-sm text-gray-600">
                                        {child.group.length} ta guruh
                                    </Typography>
                                </div>
                            </div>
                        </AccordionHeader>
                        <AccordionBody className="px-6 py-4 bg-gray-50/50">
                            {child.group.length > 0 ? (
                                <div className="space-y-3">
                                    {child.group.map((g) => (
                                        <div key={g.id} className="bg-white rounded-xl p-4 shadow-sm border">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <Typography variant="h6" className="font-semibold text-gray-900">
                                                        {g.group_name}
                                                    </Typography>
                                                    <Typography className="text-gray-600 text-sm mt-1 flex items-center gap-1">
                                                        <Clock className="w-4 h-4" />
                                                        Qo'shilgan: {formatDate(g.createdAt)}
                                                    </Typography>
                                                </div>
                                                <Chip
                                                    value="Aktiv"
                                                    color="green"
                                                    size="sm"
                                                    className="rounded-full"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                    <Typography color="gray" className="font-medium">
                                        Talaba hali guruhga biriktirilmagan
                                    </Typography>
                                </div>
                            )}
                        </AccordionBody>
                    </Accordion>

                    {/* Платежи */}
                    <Accordion
                        open={openPayments}
                        className="shadow-lg border-0 rounded-2xl overflow-hidden"
                    >
                        <AccordionHeader
                            onClick={() => setOpenPayments(!openPayments)}
                            className="px-6 py-4 bg-white hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="bg-green-100 p-2 rounded-lg">
                                    <CreditCard className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <Typography variant="h6" className="font-semibold">
                                        To'lovlar
                                    </Typography>
                                    <Typography className="text-sm text-gray-600">
                                        {child.payment.length} ta to'lov
                                    </Typography>
                                </div>
                            </div>
                        </AccordionHeader>
                        <AccordionBody className="px-6 py-4 bg-gray-50/50">
                            {child.payment.length > 0 ? (
                                <div className="space-y-3">
                                    {child.payment.map((p) => (
                                        <div key={p.id} className="bg-white rounded-xl p-4 shadow-sm border">
                                            <div className="flex items-center justify-between mb-2">
                                                <Typography variant="h6" className="font-semibold text-gray-900">
                                                    {p.month} {p.year}
                                                </Typography>
                                                <Chip
                                                    value={p.status}
                                                    color={p.status === "create" ? "green" : "yellow"}
                                                    size="sm"
                                                    className="rounded-full"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <DollarSign className="w-4 h-4 text-green-500" />
                                                    <span className="font-semibold text-gray-700">
                                                        {formatPrice(p.price)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <CreditCard className="w-4 h-4 text-blue-500" />
                                                    <span className="text-gray-600">To'lov usuli: {p.method}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-purple-500" />
                                                    <span className="text-gray-600">
                                                        {formatDate(p.createdAt)}
                                                    </span>
                                                </div>
                                            </div>
                                            {p.description && (
                                                <Typography className="text-gray-600 text-sm mt-2">
                                                    {p.description}
                                                </Typography>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                    <Typography color="gray" className="font-medium">
                                        Talaba hali to'lov qilmagan
                                    </Typography>
                                </div>
                            )}
                        </AccordionBody>
                    </Accordion>

                    {/* Davomat */}
                    <Accordion
                        open={openAttendance}
                        className="shadow-lg border-0 rounded-2xl overflow-hidden"
                    >
                        <AccordionHeader
                            onClick={() => setOpenAttendance(!openAttendance)}
                            className="px-6 py-4 bg-white hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="bg-purple-100 p-2 rounded-lg">
                                    <CalendarCheck className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <Typography variant="h6" className="font-semibold">
                                        Davomat
                                    </Typography>
                                    <Typography className="text-sm text-gray-600">
                                        {child.attendance.length} ta yozuv
                                    </Typography>
                                </div>
                            </div>
                        </AccordionHeader>
                        <AccordionBody className="px-6 py-4 bg-gray-50/50">
                            {child.attendance.length > 0 ? (
                                <div className="space-y-3">
                                    {child.attendance.map((a) => (
                                        <div key={a.id} className="bg-white rounded-xl p-4 shadow-sm border">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Calendar className="w-8 h-8 text-purple-500" />
                                                    <div>
                                                        <Typography className="font-semibold text-gray-900">
                                                            {formatDate(a.date)}
                                                        </Typography>
                                                        <Typography className="text-gray-600 text-sm">
                                                            Holat: {a.status}
                                                        </Typography>
                                                    </div>
                                                </div>
                                                <Chip
                                                    value={a.status}
                                                    color={a.status === "present" ? "green" : "red"}
                                                    size="sm"
                                                    className="rounded-full"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <CalendarCheck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                    <Typography color="gray" className="font-medium">
                                        Davomat ma'lumotlari mavjud emas
                                    </Typography>
                                </div>
                            )}
                        </AccordionBody>
                    </Accordion>
                </div>
            </div>
        </div>
    );
}
import { useEffect, useState } from "react";
import { GroupsApi } from "../../utils/Controllers/GroupsApi";
import { useParams } from "react-router-dom";
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Accordion,
    AccordionHeader,
    AccordionBody,
    Chip,
    Badge,
    Button,
} from "@material-tailwind/react";
import {
    Calendar,
    Clock,
    DollarSign,
    Users,
    UserCheck,
    School,
    MapPin,
    ChevronDown,
    UserCog,
    GraduationCap,
    Plus,
} from "lucide-react";
import AddTeacher from "./_components/AddTeacher";
import Payment from "./_components/Payment";
import Attendance from "./_components/Attendance";

export default function GroupsDetail() {
    const { id } = useParams();
    const [groupDetails, setGroupDetails] = useState(null);
    const [openAccordion, setOpenAccordion] = useState(1);

    const handleOpen = (value) => setOpenAccordion(openAccordion === value ? 0 : value);

    const getGroupDetails = async () => {
        try {
            const response = await GroupsApi.GetGroupDetails(id);
            console.log("Group Details:", response?.data); // <-- Tekshirish uchun
            setGroupDetails(response?.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getGroupDetails();
    }, []);

    if (!groupDetails) {
        return (
            <div className="flex justify-center items-center h-64">
                <Typography variant="h6" color="gray">
                    Ma'lumotlar yuklanmoqda...
                </Typography>
            </div>
        );
    }

    const formatDate = (dateString) => new Date(dateString).toLocaleDateString("uz-UZ");
    const formatTime = (timeString) => timeString.slice(0, 5);

    const addTarbiyachi = () => {
        alert("Tarbiyachi qo'shish funksiyasi shu yerda ishlaydi");
    };

    // Agar backenddan employee boshqa nom bilan kelsa, shu yerda tekshiring:
    const employees = groupDetails.employee || groupDetails.staff || [];

    return (
        <div className="container mx-auto  space-y-6">
            {/* Header Card */}
            <Card className="shadow-sm border border-gray-200 rounded-lg">
                <CardHeader floated={false} shadow={false} className="bg-white border-b border-gray-200 rounded-t-lg">
                    <div className="flex justify-between items-center">
                        <div>
                            <Typography variant="h4" className="mb-1 text-gray-900">
                                {groupDetails.name}
                            </Typography>
                            <div className="flex items-center gap-2 text-gray-600">
                                <School size={20} />
                                <Typography variant="h6">{groupDetails.school?.name || "Maktab nomi yo'q"}</Typography>
                            </div>
                        </div>
                        <Chip
                            value={groupDetails.status ? "Faol" : "Nofaol"}
                            color={groupDetails.status ? "green" : "red"}
                            className="text-white"
                        />
                    </div>
                </CardHeader>

                <CardBody className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Price */}
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-gray-100 rounded-full">
                                <DollarSign className="h-6 w-6 text-gray-700" />
                            </div>
                            <div>
                                <Typography variant="small" className="font-normal text-gray-500">
                                    Narxi
                                </Typography>
                                <Typography variant="h6" className="text-gray-900">
                                    {parseInt(groupDetails.price).toLocaleString()} so'm
                                </Typography>
                            </div>
                        </div>

                        {/* Start Date */}
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-gray-100 rounded-full">
                                <Calendar className="h-6 w-6 text-gray-700" />
                            </div>
                            <div>
                                <Typography variant="small" className="font-normal text-gray-500">
                                    Boshlanish sanasi
                                </Typography>
                                <Typography variant="h6" className="text-gray-900">
                                    {formatDate(groupDetails.start_date)}
                                </Typography>
                            </div>
                        </div>

                        {/* Time */}
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-gray-100 rounded-full">
                                <Clock className="h-6 w-6 text-gray-700" />
                            </div>
                            <div>
                                <Typography variant="small" className="font-normal text-gray-500">
                                    Dars vaqti
                                </Typography>
                                <Typography variant="h6" className="text-gray-900">
                                    {formatTime(groupDetails.start_time)} - {formatTime(groupDetails.end_time)}
                                </Typography>
                            </div>
                        </div>

                        {/* Students Count */}
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-gray-100 rounded-full">
                                <Users className="h-6 w-6 text-gray-700" />
                            </div>
                            <div>
                                <Typography variant="small" className="font-normal text-gray-500">
                                    Bolalar soni
                                </Typography>
                                <Typography variant="h6" className="text-gray-900">
                                    {groupDetails.student?.length || 0}
                                </Typography>
                            </div>
                        </div>
                    </div>

                    {/* School Address */}
                    <div className="flex items-center gap-3 mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-700">
                        <MapPin className="h-5 w-5" />
                        <Typography>{groupDetails.school?.address || "Manzil yo'q"}</Typography>
                    </div>
                </CardBody>
            </Card>

            {/* Students Accordion */}
            <Accordion open={openAccordion === 1} className="border border-gray-200 rounded-lg">
                <AccordionHeader
                    onClick={() => handleOpen(1)}
                    className="px-6 py-4 bg-gray-50 text-gray-900 flex justify-between items-center hover:bg-gray-100 rounded-t-lg"
                >
                    <div className="flex items-center gap-3">
                        <GraduationCap className="h-5 w-5" />
                        <Typography variant="h5">Guruh bolalari</Typography>
                        <Badge content={groupDetails.student?.length || 0} className="min-w-[20px]" />
                    </div>
                    <ChevronDown className={`h-5 w-5 transform transition-transform ${openAccordion === 1 ? "rotate-180" : ""}`} />
                </AccordionHeader>
                <AccordionBody className="px-6 py-4 bg-white">
                    {groupDetails.student?.length > 0 ? (
                        <div className="grid gap-3">
                            {groupDetails.student.map((student, index) => (
                                <Card key={student.id} className="shadow-sm border border-gray-200 rounded-lg">
                                    <CardBody className="py-3">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                                    <UserCheck className="h-4 w-4 text-gray-700" />
                                                </div>
                                                <div>
                                                    <Typography variant="h6" className="text-gray-900">
                                                        Bola #{student.student_id}
                                                    </Typography>
                                                    <Typography variant="small" className="text-gray-500 font-normal">
                                                        Qabul qilingan: {formatDate(student.createdAt)}
                                                    </Typography>
                                                </div>
                                            </div>
                                            <Payment studentData={student} />
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <Users className="h-12 w-12 mx-auto mb-3" />
                            Bu guruhda hali bolalar yo'q
                        </div>
                    )}
                </AccordionBody>
            </Accordion>

            {/* Employees Accordion */}
            <Accordion open={openAccordion === 2} className="border border-gray-200 rounded-lg">
                <AccordionHeader
                    onClick={() => handleOpen(2)}
                    className="px-6 py-4 bg-gray-50 text-gray-900 flex justify-between items-center hover:bg-gray-100 rounded-t-lg"
                >
                    <div className="flex items-center gap-3">
                        <UserCog className="h-5 w-5" />
                        <Typography variant="h5">O'qituvchilar va xodimlar</Typography>
                        <Badge content={employees.length} className="min-w-[20px]" />
                    </div>
                    <ChevronDown className={`h-5 w-5 transform transition-transform ${openAccordion === 2 ? "rotate-180" : ""}`} />
                </AccordionHeader>
                <AccordionBody className="px-6 py-4 bg-white space-y-3">
                    <AddTeacher refresh={getGroupDetails} />

                    {employees.length > 0 ? (
                        <div className="grid gap-3">
                            {employees.map((employee, index) => (
                                <Card key={employee.id} className="shadow-sm border border-gray-200 rounded-lg">
                                    <CardBody className="py-3">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                                    <UserCog className="h-4 w-4 text-gray-700" />
                                                </div>
                                                <div>
                                                    <Typography variant="h6" className="text-gray-900">
                                                        Xodim #{employee.employee_id}
                                                    </Typography>

                                                </div>
                                            </div>
                                            <Chip value={`#${index + 1}`} size="sm" color="gray" variant="outlined" />
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <UserCog className="h-12 w-12 mx-auto mb-3" />
                            Bu guruhda hali xodim tayinlanmagan
                        </div>
                    )}
                </AccordionBody>
            </Accordion>

            <Attendance data={groupDetails} />
        </div>
    );
}

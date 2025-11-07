import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import Logo from "../../../Images/Logo.png";
import { Card, Typography } from "@material-tailwind/react";

export default function Sidebar({ open }) {
    const [role] = useState("admin");
    const location = useLocation();

    const groupedMenuItems = [
        {
            section: "Asosiy",
            items: [
                {
                    id: 1,
                    title: "Bosh sahifa",
                    path: "/",
                    icon: (
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 9.75L12 3l9 6.75M4.5 10.5v9.75h5.25V15h4.5v5.25H19.5V10.5"
                            />
                        </svg>
                    ),
                },
                {
                    id: 1,
                    title: "Bolalar ro'yxati",
                    path: "/children",
                    icon: (
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width={27.5} height={22} viewBox="0 0 640 512"><path fill="currentColor" d="M160 0a64 64 0 1 1 0 128a64 64 0 1 1 0-128M88 480v-80H70.2c-10.9 0-18.6-10.7-15.2-21.1l31.1-93.4l-28.6 37.8c-10.7 14.1-30.8 16.8-44.8 6.2s-16.8-30.7-6.2-44.8L65.4 207c22.4-29.6 57.5-47 94.6-47s72.2 17.4 94.6 47l58.9 77.7c10.7 14.1 7.9 34.2-6.2 44.8s-34.2 7.9-44.8-6.2l-28.6-37.8l31.1 93.4c3.5 10.4-4.3 21.1-15.2 21.1H232v80c0 17.7-14.3 32-32 32s-32-14.3-32-32v-80h-16v80c0 17.7-14.3 32-32 32s-32-14.3-32-32M480 0a64 64 0 1 1 0 128a64 64 0 1 1 0-128m-8 384v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V300.5L395.1 321c-9.4 15-29.2 19.4-44.1 10s-19.4-29.2-10-44.1l51.7-82.1c17.6-27.9 48.3-44.9 81.2-44.9h12.3c33 0 63.7 16.9 81.2 44.9l51.7 82.2c9.4 15 4.9 34.7-10 44.1s-34.7 4.9-44.1-10l-13-20.6V480c0 17.7-14.3 32-32 32s-32-14.3-32-32v-96z"></path></svg>
                    ),
                },
                {
                    id: 1,
                    title: "Tarbiyachilar",
                    path: "/teacher",
                    icon: (
                        <svg xChannelSelector="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 20 20"><path fill="currentColor" d="M10 2a4 4 0 1 0 0 8a4 4 0 0 0 0-8m-4.991 9A2 2 0 0 0 3 13c0 1.691.833 2.966 2.135 3.797C6.417 17.614 8.145 18 10 18s3.583-.386 4.865-1.203C16.167 15.967 17 14.69 17 13a2 2 0 0 0-2-2z"></path></svg>)
                },
                {
                    id: 1,
                    title: "Gruhlar",
                    path: "/groups",
                    icon: (
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24"><path fill="currentColor" d="M12 12.75c1.63 0 3.07.39 4.24.9c1.08.48 1.76 1.56 1.76 2.73V17c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-.61c0-1.18.68-2.26 1.76-2.73c1.17-.52 2.61-.91 4.24-.91M4 13c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2m1.13 1.1c-.37-.06-.74-.1-1.13-.1c-.99 0-1.93.21-2.78.58A2.01 2.01 0 0 0 0 16.43V17c0 .55.45 1 1 1h3.5v-1.61c0-.83.23-1.61.63-2.29M20 13c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2m4 3.43c0-.81-.48-1.53-1.22-1.85A6.95 6.95 0 0 0 20 14c-.39 0-.76.04-1.13.1c.4.68.63 1.46.63 2.29V18H23c.55 0 1-.45 1-1zM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3s-3-1.34-3-3s1.34-3 3-3"></path></svg>),
                },

            ],
        },
    ];

    return (
        <Card
            className={`h-[95%] fixed top-[15px] left-[15px] z-50 shadow-xl bg-white/30 backdrop-blur-md border border-white/20 px-4 py-6 overflow-y-auto transition-all duration-500
        ${open ? "w-[100px]" : "w-[280px]"}`}
        >
            <div className="flex items-center justify-center mb-6">
                <h1 className="text-[25px] font-bold">
                    Golden Key
                </h1>
            </div>
            {/* Меню */}
            <div className="flex flex-col gap-6">
                {groupedMenuItems.map((group) => (
                    <div key={group.section}>
                        {!open && (
                            <Typography
                                variant="small"
                                color="gray"
                                className="mb-2 uppercase font-medium text-xs tracking-widest"
                            >
                                {group.section}
                            </Typography>
                        )}
                        <div className="flex flex-col gap-2">
                            {group.items.map((item) => (
                                <NavLink
                                    key={item.id}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center ${open && 'justify-center'} gap-3 w-full px-4 py-3 rounded-lg transition-all duration-300
                      ${isActive
                                            ? "bg-white/80 text-[#4DA057] font-semibold shadow-md"
                                            : "text-gray-700 hover:bg-white/40 hover:text-[#0A9EB3]"
                                        }`
                                    }
                                >
                                    <span className="w-6 h-6">{item.icon}</span>
                                    {!open && <span className="text-sm">{item.title}</span>}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}

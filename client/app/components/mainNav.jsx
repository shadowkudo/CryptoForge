import React from "react";
import { Link } from "react-router";
import { Switch } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";

export default function MainNav({ isDark, handleChange }) {
    return (
        <nav className="p-4 flex gap-4 items-center justify-between bg-[#9172FF] dark:text-black text-white border-b border-gray-300 dark:border-gray-700">
            <div className="flex gap-4">
                <Link to="/tool" className="font-bold hover:underline">
                    Tool
                </Link>
                <Link to="/about" className="font-bold hover:underline">
                    About
                </Link>
            </div>
            <div className="flex items-center gap-2">
                <Switch
                    checked={isDark ?? false}
                    onChange={handleChange}
                    checkedChildren={<SunOutlined style={{ fontSize: 20, color: "#000"}} />}
                    unCheckedChildren={<MoonOutlined style={{ fontSize: 20 }} />}
                    style={{
                        backgroundColor: isDark ? "#E0D7FF" : "#6B7280",
                        borderColor: "transparent",
                        transition: "background-color 0.3s ease",
                    }}
                />
            </div>
        </nav>
    );
}
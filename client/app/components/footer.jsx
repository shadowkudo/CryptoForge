import React from "react";
import {CopyrightOutlined} from "@ant-design/icons";
import {Link} from "react-router";

export default function Footer() {
    return (
        <footer className="bg-[#9172FF] text-white dark:text-black border-t border-gray-300 dark:border-gray-700 text-center p-4 text-sm">
            <div className="flex items-center justify-center gap-1">
                <strong>CryptoForge</strong>
                <CopyrightOutlined />
                <span>MIT License</span>
            </div>
        </footer>
    );
}
import React from "react";
import {CopyrightOutlined} from "@ant-design/icons";

export default function Footer() {
    return (
        <footer className="bg-[#9172FF] text-white dark:text-black border-t border-gray-300 dark:border-gray-700 text-sm h-16 flex items-center justify-center">
            <div className="flex items-center gap-1">
                <strong>CryptoForge</strong>
                <CopyrightOutlined className="text-base align-middle" />
                <span>MIT License</span>
            </div>
        </footer>
    );
}
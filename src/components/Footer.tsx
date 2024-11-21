import Link from "next/link";
import React from "react";

export default function Footer() {
    return (
        <footer className="max-w-[1320px] mx-auto flex justify-between border-t-[0.6px] border-[#292929] pt-4">
            <div>
                <p>All rights reserved © 2024 &nbsp; | &nbsp; Drukland.de</p>
            </div>
            <div className="flex gap-4">
                <Link href="/">Terms of Use</Link>
                <Link href="/">Sitemap</Link>
                <Link href="/">Company information</Link>
                <Link href="/">Cookie settings</Link>
            </div>
        </footer>
    );
}

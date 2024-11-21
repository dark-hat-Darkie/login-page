import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function TopBar() {
    return (
        <section className="bg-[#DDDDDD]">
            <div className="container mx-auto font-raleway text-xs flex justify-end items-center gap-3 h-12">
                <Link href="/" className="flex gap-1">
                    FAQ
                    <Image
                        src="/icons/faq.svg"
                        width={16}
                        height={16}
                        alt="FAQ Icon"
                    />
                </Link>
                <Link href="/" className="flex gap-1">
                    Send Inquiry
                    <Image
                        src="/icons/envelope.svg"
                        width={16}
                        height={16}
                        alt="Inquiry Icon"
                    />
                </Link>
                <Link href="/" className="flex gap-1">
                    Live Support
                    <Image
                        src="/icons/chat.svg"
                        width={16}
                        height={16}
                        alt="Chat Icon"
                    />
                </Link>
                <Link href="/" className="flex gap-1">
                    Contact
                    <Image
                        src="/icons/contact.svg"
                        width={16}
                        height={16}
                        alt="Contact Icon"
                    />
                </Link>
            </div>
        </section>
    );
}

import React from "react";
import NavItems from "./NavItems";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="h-[80px] bg-white border-b-[0.5px] border-[#292929]">
            <div className="max-w-[1320px] mx-auto flex justify-between items-center h-full gap-5">
                <Link
                    href="/"
                    className="text-[40px] font-semibold text-[#0B0B0B]"
                >
                    Drukland.de
                </Link>
                <div className="flex w-full max-w-[1200px] gap-4">
                    <div className="flex justify-center gap-4 grow">
                        <NavItems />
                        <div className="flex grow gap-2 items-center border-[0.5px] border-[#292929] rounded-[8px] px-2 text-sm">
                            <label htmlFor="search">
                                <Image
                                    src="/icons/search.svg"
                                    width={16}
                                    height={16}
                                    alt="Search"
                                />
                            </label>
                            <input
                                className="grow outline-none bg-transparent"
                                type="text"
                                id="search"
                                name="search"
                                placeholder="Search"
                            />
                        </div>
                    </div>
                    <div className="flex gap-3.5">
                        <Image
                            src="/icons/delivery.svg"
                            width={25}
                            height={25}
                            alt="Shippings"
                        />
                        <Image
                            src="/icons/user.svg"
                            width={25}
                            height={25}
                            alt="User Profile"
                        />
                        <Image
                            src="/icons/cart.svg"
                            width={25}
                            height={25}
                            alt="View Cart"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}

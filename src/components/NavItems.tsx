"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { FiArrowRight, FiBarChart2, FiHome, FiPieChart } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export default function NavItems() {
    return (
        <div className="flex justify-start text-neutral-100 md:justify-center">
            <Tabs />
        </div>
    );
}

const Tabs = () => {
    const [selected, setSelected] = useState<number | null>(null);
    const [dir, setDir] = useState<null | "l" | "r">(null);

    const handleSetSelected = (val: number | null) => {
        if (typeof selected === "number" && typeof val === "number") {
            setDir(selected > val ? "r" : "l");
        } else if (val === null) {
            setDir(null);
        }

        setSelected(val);
    };

    return (
        <div
            onMouseLeave={() => handleSetSelected(null)}
            className="relative flex h-fit gap-2"
        >
            {TABS.map((t) => {
                return (
                    <Tab
                        key={t.id}
                        selected={selected}
                        handleSetSelected={handleSetSelected}
                        tab={t.id}
                    >
                        {t.title}
                    </Tab>
                );
            })}

            <AnimatePresence>
                {selected && <Content dir={dir} selected={selected} />}
            </AnimatePresence>
        </div>
    );
};

const Tab = ({
    children,
    tab,
    handleSetSelected,
    selected,
}: {
    children: ReactNode;
    tab: number;
    handleSetSelected: (val: number | null) => void;
    selected: number | null;
}) => {
    return (
        <button
            id={`shift-tab-${tab}`}
            onMouseEnter={() => handleSetSelected(tab)}
            onClick={() => handleSetSelected(tab)}
            className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-base transition-colors ${
                selected === tab
                    ? " bg-neutral-800 text-neutral-100"
                    : "text-black"
            }`}
        >
            <span>{children}</span>
            <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill={selected === tab ? "white" : "black"}
                className={`transition-transform ${
                    selected === tab ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.64598 5.14601C1.69242 5.09945 1.7476 5.0625 1.80834 5.0373C1.86909 5.01209 1.93421 4.99911 1.99998 4.99911C2.06575 4.99911 2.13087 5.01209 2.19161 5.0373C2.25236 5.0625 2.30753 5.09945 2.35398 5.14601L7.99998 10.793L13.646 5.14601C13.6925 5.09952 13.7477 5.06264 13.8084 5.03749C13.8691 5.01233 13.9342 4.99938 14 4.99938C14.0657 4.99938 14.1308 5.01233 14.1916 5.03749C14.2523 5.06264 14.3075 5.09952 14.354 5.14601C14.4005 5.1925 14.4373 5.24769 14.4625 5.30842C14.4877 5.36916 14.5006 5.43426 14.5006 5.50001C14.5006 5.56575 14.4877 5.63085 14.4625 5.69159C14.4373 5.75233 14.4005 5.80752 14.354 5.85401L8.35398 11.854C8.30753 11.9006 8.25236 11.9375 8.19161 11.9627C8.13087 11.9879 8.06575 12.0009 7.99998 12.0009C7.93421 12.0009 7.86909 11.9879 7.80834 11.9627C7.7476 11.9375 7.69242 11.9006 7.64598 11.854L1.64598 5.85401C1.59942 5.80756 1.56247 5.75239 1.53727 5.69164C1.51206 5.6309 1.49908 5.56578 1.49908 5.50001C1.49908 5.43424 1.51206 5.36912 1.53727 5.30837C1.56247 5.24763 1.59942 5.19245 1.64598 5.14601Z"
                    fill={selected === tab ? "white" : "black"}
                />
            </svg>
        </button>
    );
};

const Content = ({
    selected,
    dir,
}: {
    selected: number | null;
    dir: null | "l" | "r";
}) => {
    return (
        <motion.div
            id="overlay-content"
            initial={{
                opacity: 0,
                y: 8,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            exit={{
                opacity: 0,
                y: 8,
            }}
            className="absolute left-0 top-[calc(100%_+_24px)] w-96 rounded-lg border border-neutral-600 bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-800 p-4"
        >
            <Bridge />
            <Nub selected={selected} />

            {TABS.map((t) => {
                return (
                    <div className="overflow-hidden" key={t.id}>
                        {selected === t.id && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    x:
                                        dir === "l"
                                            ? 100
                                            : dir === "r"
                                            ? -100
                                            : 0,
                                }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 0.25,
                                    ease: "easeInOut",
                                }}
                            >
                                <t.Component />
                            </motion.div>
                        )}
                    </div>
                );
            })}
        </motion.div>
    );
};

const Bridge = () => (
    <div className="absolute -top-[24px] left-0 right-0 h-[24px]" />
);

const Nub = ({ selected }: { selected: number | null }) => {
    const [left, setLeft] = useState(0);

    useEffect(() => {
        moveNub();
    }, [selected]);

    const moveNub = () => {
        if (selected) {
            const hoveredTab = document.getElementById(`shift-tab-${selected}`);
            const overlayContent = document.getElementById("overlay-content");

            if (!hoveredTab || !overlayContent) return;

            const tabRect = hoveredTab.getBoundingClientRect();
            const { left: contentLeft } =
                overlayContent.getBoundingClientRect();

            const tabCenter = tabRect.left + tabRect.width / 2 - contentLeft;

            setLeft(tabCenter);
        }
    };

    return (
        <motion.span
            style={{
                clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)",
            }}
            animate={{ left }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border border-neutral-600 bg-neutral-900"
        />
    );
};

const Products = () => {
    return (
        <div>
            <div className="flex gap-4">
                <div>
                    <h3 className="mb-2 text-sm font-medium">Startup</h3>
                    <a href="#" className="mb-1 block text-sm text-neutral-400">
                        Bookkeeping
                    </a>
                    <a href="#" className="block text-sm text-neutral-400">
                        Invoicing
                    </a>
                </div>
                <div>
                    <h3 className="mb-2 text-sm font-medium">Scaleup</h3>
                    <a href="#" className="mb-1 block text-sm text-neutral-400">
                        Live Coaching
                    </a>
                    <a href="#" className="mb-1 block text-sm text-neutral-400">
                        Reviews
                    </a>
                    <a href="#" className="block text-sm text-neutral-400">
                        Tax/VAT
                    </a>
                </div>
                <div>
                    <h3 className="mb-2 text-sm font-medium">Enterprise</h3>
                    <a href="#" className="mb-1 block text-sm text-neutral-400">
                        White glove
                    </a>
                    <a href="#" className="mb-1 block text-sm text-neutral-400">
                        SOX Compliance
                    </a>
                    <a href="#" className="block text-sm text-neutral-400">
                        Staffing
                    </a>
                    <a href="#" className="block text-sm text-neutral-400">
                        More
                    </a>
                </div>
            </div>

            <button className="ml-auto mt-4 flex items-center gap-1 text-sm text-indigo-300">
                <span>View more</span>
                <FiArrowRight />
            </button>
        </div>
    );
};

const Business = () => {
    return (
        <div className="grid grid-cols-3 gap-4 divide-x divide-neutral-700">
            <a
                href="#"
                className="flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50"
            >
                <FiHome className="mb-2 text-xl text-indigo-300" />
                <span className="text-xs">Startup</span>
            </a>
            <a
                href="#"
                className="flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50"
            >
                <FiBarChart2 className="mb-2 text-xl text-indigo-300" />
                <span className="text-xs">Scaleup</span>
            </a>
            <a
                href="#"
                className="flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50"
            >
                <FiPieChart className="mb-2 text-xl text-indigo-300" />
                <span className="text-xs">Enterprise</span>
            </a>
        </div>
    );
};

const AboutUs = () => {
    return (
        <div>
            <div className="grid grid-cols-2 gap-2">
                <a href="#">
                    <Image
                        className="mb-2 h-14 w-full rounded object-cover"
                        src="/about1.jpg"
                        alt="Placeholder image"
                        width={100}
                        height={100}
                    />
                    <h4 className="mb-0.5 text-sm font-medium">
                        Lorem ipsum dolor
                    </h4>
                    <p className="text-xs text-neutral-400">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Amet illo quidem eos.
                    </p>
                </a>
                <a href="#">
                    <Image
                        className="mb-2 h-14 w-full rounded object-cover"
                        src="/about2.jpg"
                        alt="Placeholder image"
                        width={100}
                        height={100}
                    />
                    <h4 className="mb-0.5 text-sm font-medium">
                        Lorem ipsum dolor
                    </h4>
                    <p className="text-xs text-neutral-400">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Amet illo quidem eos.
                    </p>
                </a>
            </div>
            <button className="ml-auto mt-4 flex items-center gap-1 text-sm text-indigo-300">
                <span>View more</span>
                <FiArrowRight />
            </button>
        </div>
    );
};

const TABS = [
    {
        title: "Business",
        Component: Business,
    },
    {
        title: "Products",
        Component: Products,
    },

    {
        title: "About Us",
        Component: AboutUs,
    },
].map((n, idx) => ({ ...n, id: idx + 1 }));

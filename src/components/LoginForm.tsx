"use client";
import { handleSubmit } from "@/actions";
import Image from "next/image";
import Link from "next/link";
import { FC, useActionState } from "react";

const LoginForm: FC = () => {
    const [errors, action] = useActionState(handleSubmit, null);
    return (
        <div className="p-8 bg-white rounded-2xl w-[400px] h-[521px]">
            <h2 className="text-[32px] font-medium mb-5 text-center">
                Drukland.de
            </h2>
            <p className="text-2xl text-center">Sign In to your account</p>
            <p className="text-sm text-center mb-7">
                Don&apos;t you have an account? &nbsp;
                <Link className="text-base font-medium" href="#">
                    Register
                </Link>
            </p>
            {errors?.message && (
                <p className="flex gap-1 justify-center items-center text-xs -my-1">
                    <Image
                        src="/icons/info.svg"
                        width={11}
                        height={11}
                        alt="Info"
                    />
                    {errors?.message}
                </p>
            )}
            <form action={action} className="space-y-1 pt-7">
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Email Address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full border-b border-[#0B0B0B] outline-none mb-8"
                    />
                    {errors?.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="w-full border-b border-[#0B0B0B] outline-none"
                    />
                    {errors?.password && (
                        <p className="text-red-500 text-sm">
                            {errors.password}
                        </p>
                    )}
                </div>

                <div className="flex items-center pt-6 ">
                    <input
                        id="agreeTerms"
                        name="agreeTerms"
                        type="checkbox"
                        required
                        className="mr-2 mb-1"
                    />
                    <label
                        htmlFor="agreeTerms"
                        className="text-sm text-gray-700 pb-0.5"
                    >
                        I agree to all{" "}
                        <Link href="#" className="font-medium">
                            Terms & Conditions
                        </Link>
                    </label>
                </div>
                {errors?.agreeTerms && (
                    <p className="text-red-500 text-sm">{errors.agreeTerms}</p>
                )}

                <button
                    type="submit"
                    className="w-full py-2 px-4 outline-none font-medium bg-[#0B0B0B] text-white rounded-md"
                >
                    Log In
                </button>
            </form>
            {/* Social Login buttons should be outside of actual form */}
            <div className="flex gap-2 items-center py-1.5">
                <div className="grow h-[0.34px] bg-[#0F0F0F]"></div>
                <p className="text-xs">or sign in with</p>
                <div className="grow h-[0.34px] bg-[#0F0F0F]"></div>
            </div>
            <div className="flex gap-2 justify-center items-center pt-1">
                <button>
                    <Image
                        src="/icons/in.svg"
                        width={21}
                        height={21}
                        alt="LinkedIn Login"
                    />
                </button>
                <button>
                    <Image
                        src="/icons/gg.svg"
                        width={21}
                        height={21}
                        alt="Google Login"
                    />
                </button>

                <button>
                    <Image
                        src="/icons/fb.svg"
                        width={21}
                        height={21}
                        alt="Facebook Login"
                    />
                </button>
            </div>
        </div>
    );
};

export default LoginForm;

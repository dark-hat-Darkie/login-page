import LoginForm from "@/components/LoginForm";

export default function Home() {
    return (
        <section className="max-w-[1320px] mx-auto flex justify-between items-center gap-10 min-h-[80vh]">
            <div className="relative h-[640px] w-[800px] bg-white rounded-2xl ">
                <h1 className="absolute text-[32px] w-[228px] leading-[39.36px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    Image or Video of our services
                </h1>
            </div>
            <LoginForm />
        </section>
    );
}

'use client'
import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import { ArrowRightIcon, MailIcon, UserIcon } from "lucide-react";
import { motion } from "motion/react";

export default function ContactSection() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
        alert("Please fill all fields ❗");
        return;
    }

    try {
        // 🔥 API call to backend (store in DB)
        await fetch("http://localhost:3000/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        alert("Message sent & stored successfully 🚀");

        // reset form
        setForm({ name: "", email: "", message: "" });

    } catch (error) {
        console.error(error);
        alert("Something went wrong ❌");
    }
};
    return (
        <div className="px-4 md:px-16 lg:px-24 xl:px-32">
            <SectionTitle 
                text1="Contact" 
                text2="Grow your channel" 
                text3="Have questions about our AI? Ready to scale your views? Let's talk." 
            />
            
            <form 
                onSubmit={handleSubmit} 
                className='grid sm:grid-cols-2 gap-3 sm:gap-5 max-w-2xl mx-auto text-slate-300 mt-16 w-full'
            >
                {/* Name */}
                <motion.div
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                >
                    <p className='mb-2 font-medium'>Your name</p>
                    <div className='flex items-center pl-3 rounded-lg border border-slate-700 focus-within:border-pink-500'>
                        <UserIcon className='size-5' />
                        <input 
                            name='name'
                            value={form.name}
                            onChange={handleChange}
                            type="text" 
                            placeholder='Enter your name' 
                            className='w-full p-3 outline-none bg-transparent' 
                        />
                    </div>
                </motion.div>

                {/* Email */}
                <motion.div
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
                >
                    <p className='mb-2 font-medium'>Email id</p>
                    <div className='flex items-center pl-3 rounded-lg border border-slate-700 focus-within:border-pink-500'>
                        <MailIcon className='size-5' />
                        <input 
                            name='email'
                            value={form.email}
                            onChange={handleChange}
                            type="email" 
                            placeholder='Enter your email' 
                            className='w-full p-3 outline-none bg-transparent' 
                        />
                    </div>
                </motion.div>

                {/* Message */}
                <motion.div 
                    className='sm:col-span-2'
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
                >
                    <p className='mb-2 font-medium'>Message</p>
                    <textarea 
                        name='message'
                        value={form.message}
                        onChange={handleChange}
                        rows={8} 
                        placeholder='Enter your message' 
                        className='focus:border-pink-500 resize-none w-full p-3 outline-none rounded-lg border border-slate-700 bg-transparent' 
                    />
                </motion.div>

                {/* Submit */}
                <motion.button 
                    type='submit' 
                    className='w-max flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-10 py-3 rounded-full'
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
                >
                    Submit
                    <ArrowRightIcon className="size-5" />
                </motion.button>
            </form>
        </div>
    );
}
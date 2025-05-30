import React from "react";
import "./SignUp.css";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../userdata"; 

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const { signup } = useUser();

    interface FormData {
        fullName: string;
        email: string;
        password: string;
        confirmPassword: string;
    }

    const schema: ZodType<FormData> = z.object({
        fullName: z.string().min(3).max(20),
        email: z.string().email(),
        password: z.string().min(8).max(20),
        confirmPassword: z.string().min(8).max(20),
    }).refine((data) => data.password === data.confirmPassword, {
            message: "Password do not match",
            path: ["confirmPassword"],
        });

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

    const submitData = (data: FormData) => {
        const userData = {
            fullName: data.fullName,
            email: data.email,
            password: data.password,
        };

        signup(userData);
        
        navigate("/login");
    };

    return (
        <>
            <div className="form-div">
                <form onSubmit={handleSubmit(submitData)}>
                    <label htmlFor="">Name</label>
                    <input type="text" {...register("fullName")} />
                    {errors.fullName && <span>{errors.fullName.message}</span>}
                    
                    <label htmlFor="">Email</label>
                    <input type="email" {...register("email")} />
                    {errors.email && <span>{errors.email.message}</span>}
                    
                    <label>Password</label>
                    <input type="password" {...register("password")} />
                    {errors.password && <span>{errors.password.message}</span>}
                    
                    <label>Confirm Password</label>
                    <input type="password" {...register("confirmPassword")} />
                    {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                    
                    <input className="sub-btn" type="submit" />
                    <p className="toggle">Already have an account... <Link to="/login">Login</Link> </p>
                </form>
            </div>
        </>
    );
};

export default SignUp;
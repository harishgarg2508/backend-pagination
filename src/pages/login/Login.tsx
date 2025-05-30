import React from "react";
import "./login.css";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../userdata"; 

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useUser();

    interface FormData {
        email: string;
        password: string;
    }

    const schema: ZodType<FormData> = z.object({
        email: z.string().email(),
        password: z.string().min(8).max(20),
    });

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

    const submitData = (data: FormData) => {
        const isLoggedIn = login(data.email, data.password);
        
        if (isLoggedIn) {
            // console.log(" successful");
            navigate("/home"); 
        }
    };

    return (
        <>
            <div className="form-div">
                <form onSubmit={handleSubmit(submitData)}>
                    <label htmlFor="">Email</label>
                    <input type="email" {...register("email")} />
                    {errors.email && <span>{errors.email.message}</span>}

                    <label>Password</label>
                    <input type="password" {...register("password")} />
                    {errors.password && <span>{errors.password.message}</span>}


                    <input className="sub-btn" type="submit" value="Login" />
                    <p className="toggle">Don't have an account... <Link to="/signup">SignUp</Link></p>
                </form>
            </div>
        </>
    );
};

export default Login;
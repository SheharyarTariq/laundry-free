'use client'
import axios from "axios";
import Button from "../common/primary-button";
import Input from "../common/input";
import apiCall from "@/lib/utils/api-call";
import toast from "react-hot-toast";
import { useState } from "react";
import { routes } from "@/lib/utils/routes";
import { setToken } from "@/app/actions";
import { useRouter } from "next/navigation";
import Spinner from "../common/spinner";

const SignIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  
  const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prev)=>({
      ...prev, 
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await apiCall({
      endpoint: routes.api.login,
      method: "POST",
      isProtected: false,
      data: {...formData}
    })
    if (response.status == 200) {
      await setToken(response.data.result.token, response.data.result.is_admin);
      toast.success("Login successful");
      router.push(routes.ui.areas);
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorMessage = String(Object.values(error?.response?.data.errors)[0]) || "Something went wrong"
      toast.error(errorMessage);
    } else {
      toast.error("An unexpected error occurred.");
    }
    } finally {
    setLoading(false);
  }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="shadow-custom-light rounded-[20px] w-xl">
        <div className="shadow-border px-6 py-8 rounded-[20px] w-xl">
          <h2 className="w-full flex py-8 text-center text-4xl font-semibold bg-gradient-to-t from-twilight-deep to-twilight-teal bg-clip-text text-transparent">
            Laundry free
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleFormData}
              required
              placeholder="Enter your email"
            />
            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleFormData}
              required
              placeholder="*******"
            /> 
            <Button type="submit" className="flex items-center justify-center gap-1">
              Log in {loading && <Spinner />}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;


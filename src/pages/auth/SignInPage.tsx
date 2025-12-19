import { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import { toast } from "react-hot-toast";
import api from "../../api/axios";
import { useAuth } from "../../auth/AuthContext";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data);

      toast.success("Logged in successfully!");
      if (res.data.role === "superadmin") {
        navigate("/dashboard");
      } else {
        navigate("/dashboard/products");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-violet-600">Sign In</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Welcome back! Please login to your account.
        </p>
      </div>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
        />
        <Button
          type="submit"
          loading={loading}
          className="w-full bg-violet-500 text-white py-2.5 rounded-sm text-sm hover:bg-violet-600 transition mt-3"
        >
          Sign In
        </Button>
      </form>

      <p className="mt-4 text-center text-gray-500 text-xs">
        Don’t have an account?{" "}
        <Link to="/register" className="text-violet-500 hover:underline">
          Sign Up
        </Link>
      </p>
    </AuthLayout>
  );
}

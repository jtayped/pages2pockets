// React Util
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// Firebase
import { signInWithGoogle } from "../firebase/functions";
import { AuthErrorCodes, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

// Images
import SignUpImage from "../assets/images/signup.jpg";

// Icons
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";

// JSX Components
import { Spinner } from "../components";

const Input = ({ type, placeholder, setFunction, error }) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword(event) {
    event.preventDefault();
    setShowPassword(!showPassword);
  }

  return (
    <div
      className={`w-full border ${
        error ? "border-red-500" : "border-black/20"
      } p-2 rounded ${type === "password" ? "flex justify-between" : null}`}
    >
      <input
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        placeholder={placeholder}
        onChange={(e) => setFunction(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full outline-none bg-transparent font-poppins"
      />
      {type === "password" && focused ? (
        <button onClick={(e) => toggleShowPassword(e)} className="mr-2">
          {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </button>
      ) : null}
    </div>
  );
};
const LogIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function preLogIn(event) {
    event.preventDefault();
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate("/"))
      .catch((err) => {
        if (err === AuthErrorCodes.UNVERIFIED_EMAIL) {
          setError("Tienes que verificar tu cuenta... Busca en tus emails!");
        } else if (err === AuthErrorCodes.INVALID_EMAIL) {
          setError("Tu email es invalido :(");
        } else {
          setError("No se lo que ha pasado! Prueba otra vez.");
        }
      });
    setLoading(false);
  }

  return (
    <div className="grid grid-cols-2 items-center min-h-screen w-full bg-background">
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col gap-5 w-[400px]">
          <button
            onClick={() => signInWithGoogle()}
            className="flex items-center justify-center gap-2 border border-gray-700/20 rounded py-2 font-poppins text-text/80 hover:bg-white/20 transition-colors duration-100"
          >
            <FcGoogle size={25} />
            Sign in with Google
          </button>
          <hr className="bg-black/90" />
          <div>
            <h1 className="text-2xl font-inter font-bold">
              ¡Te damos la bienvenida!
            </h1>
            <p className="">Lorem ipsum dolor sit amet consectetur.</p>
          </div>
          <form
            onSubmit={(e) => preLogIn(e)}
            className="flex flex-col gap-2 w-full"
          >
            <Input
              type="text"
              placeholder="Email"
              setFunction={setEmail}
              error={error.includes("email") || error.includes("No se")}
            />
            <Input
              type="password"
              placeholder="Tu contraseña"
              setFunction={setPassword}
              error={error.includes("contraseña") || error.includes("No se")}
            />
            <button
              type="submit"
              className="bg-primary text-white font-inter font-bold py-2 rounded flex justify-center"
            >
              {loading ? <Spinner /> : "Crear"}
            </button>
            {error ? (
              <p className="text-sm text-center font-bold font-inter text-red-500">
                {error}
              </p>
            ) : null}
            <p className="text-center text-sm">
              ¿No tienes cuenta?{" "}
              <Link to="/signup" className="font-bold hover:underline">
                Regístrate
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div className="relative h-full w-full flex items-end p-7 justify-center bg-black">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover object-center"
          src={SignUpImage}
          alt="Grupo de estudiantes alrededor de una mesa trabajando"
        />
        <div className="w-full bg-white/20 backdrop-blur-md border border-white/30 p-5 font-inter text-white rounded-lg">
          <h2 className="text-5xl font-bold">
            Usa Pages2Pockets para ahorrar en libros cada año!
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
            beatae illo pariatur ut natus culpa praesentium nulla autem quas
            repellendus!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;

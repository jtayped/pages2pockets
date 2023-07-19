// React Util
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// Firebase
import { createUser, signInWithGoogle, signUp } from "../firebase/functions";
import { AuthErrorCodes } from "firebase/auth";

// Images
import SignUpImage from "../assets/images/signup.jpg";

// Icons
import { FcGoogle } from "react-icons/fc";
import { FiUploadCloud } from "react-icons/fi";
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

const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [dragOver, setDragOver] = useState(false);
  const [draggedFile, setDraggedFile] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function preSignUp(event) {
    event.preventDefault();

    if (username === "") {
      setError("Te falta el nombre de usuario! :)");
      return;
    }

    if (password === confirmPassword) {
      setLoading(true);

      await signUp(email, password).catch((err) => {
        if (err === AuthErrorCodes.EMAIL_EXISTS) {
          setError("Este email ya existe...");
        } else if (err === AuthErrorCodes.INVALID_PASSWORD) {
          setError("La contraseña no es valida!");
        } else if (err === "Username taken!") {
          setError("El nombre de usuario esta en uso! Elige otro ;)");
        }
        setLoading(false);
        return;
      });
      await createUser(username, draggedFile);
      setLoading(false);

      navigate("/");
    } else {
      setError("Las contraseñas no son iguales :/");
    }
    setLoading(false);
  }

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setDraggedFile(file);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragOver(false);
  };

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
              ¡Crea tu nueva cuenta!
            </h1>
            <p className="">Lorem ipsum dolor sit amet consectetur.</p>
          </div>
          <form
            onSubmit={(e) => preSignUp(e)}
            className="flex flex-col gap-2 w-full"
          >
            <Input
              type="text"
              placeholder="Nombre"
              setFunction={setUsername}
              error={error.includes("usuario")}
            />
            <Input
              type="text"
              placeholder="Email"
              setFunction={setEmail}
              error={error.includes("email")}
            />
            <Input
              type="password"
              placeholder="Tu contraseña"
              setFunction={setPassword}
              error={error.includes("contraseña")}
            />
            <Input
              type="password"
              placeholder="Confirma tu contraseña"
              setFunction={setConfirmPassword}
              error={error.includes("contraseña")}
            />
            <div
              class="flex items-center justify-center w-full"
              onDragLeave={(e) => handleDragLeave(e)}
              onDragEnter={(e) => handleDragEnter(e)}
              onDragOver={(e) => handleDragOver(e)}
              onDrop={(e) => handleDrop(e)}
            >
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full border-2 border-primary border-dashed rounded-lg cursor-pointer bg-primary/50 hover:bg-primary/60 font-poppins"
              >
                {draggedFile ? (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500 dark:text-gray-400">
                    <h1 className="font-semibold text-lg">File Loaded!</h1>
                    <p className="text-sm">{draggedFile.name}</p>
                  </div>
                ) : (
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <FiUploadCloud size={35} className="text-white/80" />
                    <p class="mb-1 mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <span class="font-semibold">Click to upload</span> or drag
                      and drop
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      {dragOver ? "oisndfavbo`s" : "nuie"} SVG, PNG, JPG or GIF
                    </p>
                  </div>
                )}

                <input
                  id="dropzone-file"
                  type="file"
                  class="hidden"
                  onChange={(e) => setDraggedFile(e.target.files[0])}
                />
              </label>
            </div>
            <button type="submit" className="bg-primary text-white font-inter font-bold py-2 rounded flex justify-center">
              {loading ? <Spinner /> : "Crear"}
            </button>
            {error ? (
              <p className="text-sm text-center font-bold font-inter text-red-500">
                {error}
              </p>
            ) : null}
            <p className="text-center text-sm">
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="font-bold hover:underline">
                Inicia sessión
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

export default SignUp;

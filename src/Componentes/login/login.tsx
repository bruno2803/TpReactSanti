import { Button, Form } from "react-bootstrap";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import Usuario from "../../Entidades/Usuario";
import { useNavigate } from "react-router-dom";
import { Roles } from "../../Entidades/Roles";
import { getAllUsuarios } from "../../Servicios/FuncionesApi";
export const Login = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario>(new Usuario());
  const [isChecked, setIsChecked] = useState(false);
  const [txtValidacion, setTxtValidacion] = useState<string>("");

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const [Usuarios, setUsuarios] = useState<Usuario[]>([]);

  const getUsuarios = async () => {
    const datos: Usuario[] = await getAllUsuarios();
    setUsuarios(datos);
  };
  useEffect(() => {
    getUsuarios();
  }, []);

  const login = async () => {
    if (usuario?.usuario == undefined || usuario?.usuario === "") {
      setTxtValidacion("Ingrese el nombre de usuario");
      return;
    }
    if (usuario?.clave == undefined || usuario?.clave === "") {
      setTxtValidacion("Ingrese la clave");
      return;
    }

    {
      Usuarios.map((usu: Usuario) => {
        if (usuario?.usuario == usu.usuario && usuario?.clave == usu.clave) {
          if (usuario?.usuario == "nico") {
            usuario.rol = Roles.ADMIN;
          } else usuario.rol = Roles.USER;
          setUsuario(usuario);
          localStorage.setItem("usuario", JSON.stringify(usuario));
          navigate("/App", {
            replace: true,
            state: {
              logged: true,
              usuario: usuario,
            },
          });
        }
      });
    }
  };

  return (
    <div className={styles.containerForm}>
      <div>
        <span
          style={{ fontSize: "10vh" }}
          className="material-symbols-outlined"
        >
          account_circle
        </span>
      </div>
      <Form>
        <Form.Group
          style={{ width: "300px" }}
          className="mb-3"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            name="user"
            type="text"
            placeholder="Usuario"
            defaultValue={usuario?.usuario}
            onChange={(e) => (usuario.usuario = String(e.target.value))}
            onKeyDown={(e) => {
              if (e.key === "Enter") login();
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Constraseña"
            defaultValue={usuario?.clave}
            onChange={(e) => (usuario.clave = String(e.target.value))}
            onKeyDown={(e) => {
              if (e.key === "Enter") login();
            }}
          />
        </Form.Group>
        <Form.Check
          checked={isChecked}
          onChange={handleCheckboxChange}
          type="switch"
          id="custom-switch"
          label="Administrador"
        />
        <div className="d-flex justify-content-center align-item-center mt-40">
          <Button
            style={{ marginTop: "30px" }}
            variant="outline-primary"
            onClick={login}
          >
            Ingresar
          </Button>
        </div>
        <div>
          <p style={{ color: "red" }}>{txtValidacion}</p>
        </div>
      </Form>
    </div>
  );
};

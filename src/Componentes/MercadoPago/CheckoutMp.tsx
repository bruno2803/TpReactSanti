import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { createPreferenceMP } from "../../Servicios/FuncionesApi";
import { useState } from "react";
import PreferenceMP from "../../Entidades/PreferenceMp";
import DetallePedido from "../../Entidades/DetallePedido";
import { Button } from "react-bootstrap";
import "../styles.css";

function CheckoutMP({ montoCarrito = 0 }) {
  const [idPreference, setIdPreference] = useState<string>("");

  const getPreferenceMP = async () => {
    if (montoCarrito > 0) {
      const response: PreferenceMP = await createPreferenceMP({
        id: 0,
        titulo: "Pedido Buen Sabor",
        fecha: new Date(),
        totalPedido: montoCarrito,
        detalle: new DetallePedido(),
      });
      console.log("Preference id: " + response.id);
      if (response) setIdPreference(response.id);
    } else {
      alert("Agregue al menos un plato al carrito");
    }
  };

  //es la Public Key se utiliza generalmente en el frontend.
  initMercadoPago("TEST-f896a777-1ce7-4d32-8df9-4225b0783931", {
    locale: "es-AR",
  });

  //redirectMode es optativo y puede ser self, blank o modal
  return (
    <div>
      <Button
        onClick={getPreferenceMP}
        className="btMercadoPago"
        style={{ marginLeft: "auto" }}
      >
        Pagar
      </Button>
      <div className={idPreference ? "divVisible" : "divInvisible"}>
        <Wallet
          initialization={{ preferenceId: idPreference, redirectMode: "blank" }}
          customization={{ texts: { valueProp: "smart_option" } }}
        />
      </div>
    </div>
  );
}

export default CheckoutMP;

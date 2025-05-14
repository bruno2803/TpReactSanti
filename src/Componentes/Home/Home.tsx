import { Carrousel } from "../Carrousel/Carrousel";
import { NavBar } from "../Commons/NavBar";
import "../styles.css";
export const Home = () => {
  return (
    <>
      <NavBar />
      <div className="titleContainer"></div>
      <div>
        <h1>MUSIC STORE</h1>
      </div>
      <div className="carrouselContainer">
        <Carrousel/>
      </div>
    </>
  );
};

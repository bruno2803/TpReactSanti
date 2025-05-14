import { Carousel } from "react-bootstrap"


export const Carrousel = () => {
    return (
        <>
            <Carousel data-bs-theme="dark" className="carrousel">
                <Carousel.Item className="itemCarrousel">
                    <img
                        className="d-block w-100 imgCarrousel"
                        src="https://http2.mlstatic.com/D_NQ_NP_602949-MLA32297056646_092019-O.webp"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <p className="p">Music Store es una tienda de instrumentos musicales con ya más de 15 años de
                            experiencia. Tenemos el conocimiento y la capacidad como para informarte acerca de las
                            mejores elecciones para tu compra musical. </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="itemCarrousel">
                    <img
                        className="d-block w-100 imgCarrousel"
                        src="https://http2.mlstatic.com/D_NQ_NP_853533-MLA31040848888_062019-O.webp"
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <p className="p">Music Store es una tienda de instrumentos musicales con ya más de 15 años de
                            experiencia. Tenemos el conocimiento y la capacidad como para informarte acerca de las
                            mejores elecciones para tu compra musical. </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="itemCarrousel">
                    <img
                        className="d-block w-100 imgCarrousel"
                        src="https://http2.mlstatic.com/D_NQ_NP_989428-MLU71352892874_082023-O.webp"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <p className="p">Music Store es una tienda de instrumentos musicales con ya más de 15 años de
                            experiencia. Tenemos el conocimiento y la capacidad como para informarte acerca de las
                            mejores elecciones para tu compra musical. </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    )
}

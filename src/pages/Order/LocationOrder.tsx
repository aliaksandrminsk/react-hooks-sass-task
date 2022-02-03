import React, { useContext, useState } from "react";
import { OrderContext } from "../../context/order/orderContext";
import { YMaps, Map, Placemark } from "react-yandex-maps";

export const LocationOrder: React.FC = () => {
  const { setUserLocation } = useContext(OrderContext);

  const [state, setState] = useState<any>({
    coords: [53.9, 27.56],
    mapState: {
      center: [53.9, 27.56],
      zoom: 9,
    },
  });

  const clickOnMap = (e: any) => {
    const coords = e.get("coords");
    setState({ ...state, coords: coords });
  };

  const onSubmit = () => {
    setUserLocation({ location: state.coords });
  };

  return (
    <section className="locationOrder">
      <h1 className="locationOrder__title">Placing Order (3/3)</h1>

      <div className="locationOrder__ymaps">
        <YMaps
          query={{
            apikey: process.env.API_KEY,
          }}
        >
          <Map
            className="locationOrder__map"
            onClick={clickOnMap}
            state={state.mapState}
          >
            {state.coords ? (
              <Placemark
                geometry={state.coords}
                properties={{
                  iconCaption: "Choose delivery point!",
                }}
              />
            ) : null}
          </Map>
        </YMaps>
      </div>
      <div>
        <button type="submit" onClick={onSubmit} className="normalButton">
          Place your order
        </button>
      </div>
    </section>
  );
};

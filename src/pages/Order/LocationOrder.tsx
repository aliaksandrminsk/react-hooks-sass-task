import React, { useContext, useState } from "react";
import { OrderContext } from "../../context/order/orderContext";

import { YMaps, Map, Placemark, MapProps } from "react-yandex-maps";

interface IFormValues {
  location: string;
}

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

      <div className="locationOrder__map">
        <YMaps
          query={{
            apikey: process.env.API_KEY,
          }}
        >
          <Map
            width={"400px"}
            height={"400px"}
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
      <div className="locationOrder__button">
        <button type="submit" onClick={onSubmit}>
          Order
        </button>
      </div>
    </section>
  );
};

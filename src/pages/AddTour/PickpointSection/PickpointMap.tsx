import { FC, memo } from "react";
import { Coordinates } from "../../../types";
import { YMaps, Map, ZoomControl, Placemark } from "react-yandex-maps";
import { isEqual } from "lodash";

export const PickpointMap: FC<{
  center: Coordinates;
}> = memo(
  ({ center }) => {
    return (
      <YMaps>
        <Map width="100%" state={{ center, zoom: 15 }}>
          <ZoomControl />
          <Placemark geometry={center} />
        </Map>
      </YMaps>
    );
  },
  (prevProps, props) => isEqual(prevProps, props)
);

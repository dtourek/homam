import { IMapField } from "homam/modules/field/interfaces";
import {desertField, goldResourceField, grassField, heroPlayer1Field, mountainField, woodResourceField} from "homam/modules/field/utils";

export const initMapFields: IMapField[][] = [
  [
    { type: desertField },
    {type: mountainField },
    {type: mountainField },
    {type: grassField, onField: goldResourceField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: desertField },
    {type: desertField },
    {type: desertField },
  ],
  [
    {type: grassField },
    {type: grassField, onField: heroPlayer1Field },
    {type: grassField },
    {type: mountainField },
    {type: mountainField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: desertField },
    {type: desertField },
    {type: desertField },
  ],
  [
    {type: mountainField },
    {type: mountainField },
    {type: grassField },
    {type: mountainField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: mountainField },
    {type: mountainField },
    {type: mountainField },
  ],
  [
    {type: mountainField },
    {type: grassField },
    {type: grassField },
    {type: mountainField },
    {type: grassField },
    {type: mountainField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: mountainField },
    {type: mountainField },
    {type: mountainField },
  ],
  [
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: mountainField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: mountainField },
    {type: mountainField },
    {type: mountainField },
  ],
  [
    {type: mountainField },
    {type: mountainField },
    {type: grassField },
    {type: grassField },
    {type: mountainField },
    {type: mountainField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: mountainField },
    {type: mountainField },
    {type: mountainField },
  ],
  [
    {type: mountainField },
    {type: mountainField },
    {type: grassField },
    {type: grassField },
    {type: mountainField },
    {type: mountainField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: desertField },
    {type: desertField },
    {type: grassField },
  ],
  [
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: desertField },
    {type: grassField, onField: woodResourceField },
    {type: grassField },
  ],
  [
    {type: mountainField },
    {type: mountainField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: desertField },
    {type: desertField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
  ],
  [
    {type: mountainField },
    {type: mountainField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: desertField },
    {type: desertField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
  ],
  [
    {type: mountainField },
    {type: mountainField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
  ],
  [
    {type: mountainField },
    {type: mountainField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
    {type: grassField },
  ],
];

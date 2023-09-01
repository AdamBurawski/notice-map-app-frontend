import React from "react";
import { Btn } from "../common/Btn";

export const Header = () => {
  return (
    <header>
      <h1>
        <strong>Mega</strong> Ogłoszenia
      </h1>
      <Btn text="Dodaj ogłoszenie" />
      <div className="search">
        <input type="text" /> <Btn text="🔎" />
      </div>
    </header>
  );
};

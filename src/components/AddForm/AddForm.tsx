import React, { SyntheticEvent, useState } from "react";
import { Btn } from "../common/Btn";
import { geocode } from "../../utils/geocoding";
import { apiUrl } from "../config/api";

export const AddFrom = () => {
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    url: "",
    address: "",
  });

  const saveAd = async (e: SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { lat, lon } = await geocode(form.address);
      const res = await fetch(`${apiUrl}/ad`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          lat,
          lon,
        }),
      });
      const data = await res.json();
      setId(data.id);
    } finally {
      setLoading(false);
    }
  };

  const updateFrom = (key: string, value: any) => {
    setForm((form) => ({
      ...form,
      [key]: value,
    }));
  };

  if (loading) {
    return <h2>Trwa dodawanie ogłoszenia...</h2>;
  }

  if (id) {
    return (
      <h2>
        Twoje ogłoszenie "{form.name}" zostało poprawnie dodane do serwisu pod
        ID:{id}
      </h2>
    );
  }

  return (
    <form className="add-form" action="" onSubmit={saveAd}>
      <h1>Dodawanie ogłoszenia</h1>
      <p>
        <label>
          Nazwa: <br />
          <input
            type="text"
            name="name"
            required
            maxLength={99}
            value={form.name}
            onChange={(e) => updateFrom("name", e.target.value)}
          />
        </label>
      </p>
      <p>
        <label>
          Opis: <br />
          <textarea
            name="description"
            id=""
            maxLength={999}
            value={form.description}
            onChange={(e) => updateFrom("description", e.target.value)}
          ></textarea>
        </label>
      </p>
      <p>
        <label>
          Cena: <br />
          <input
            type="number"
            name="price"
            required
            maxLength={99}
            value={form.price}
            onChange={(e) => updateFrom("price", Number(e.target.value))}
          />{" "}
          <br />
          <em>Pozostaw zero w polu, aby nie wyświetlać ceny</em>
        </label>
      </p>
      <p>
        <label>
          Adres URL: <br />
          <input
            type="url"
            name="url"
            maxLength={99}
            value={form.url}
            onChange={(e) => updateFrom("url", e.target.value)}
          />
        </label>
      </p>
      <p>
        <label>
          Adres fizyczny na mapie: <br />
          <input
            type="text"
            name="address"
            placeholder="Miasto, Ulica"
            required
            maxLength={99}
            value={form.address}
            onChange={(e) => updateFrom("address", e.target.value)}
          />
        </label>
      </p>
      <Btn text="Zapisz" />
    </form>
  );
};

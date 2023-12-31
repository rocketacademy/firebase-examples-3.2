import { onChildAdded, ref } from "firebase/database";
import { realTimeDatabase } from "../firebase";
import { useState, useEffect } from "react";

const REALTIME_DATABASE_KEY = "fruits";

export default function FruitList() {
  const [fruits, setFruits] = useState([]);

  useEffect(() => {
    const fruitListRef = ref(realTimeDatabase, REALTIME_DATABASE_KEY);

    onChildAdded(fruitListRef, (data) => {
      setFruits((prevstate) => [
        ...prevstate,
        { key: data.key, val: data.val() },
      ]);
    });
  }, []);

  return (
    <div>
      <ol>
        {fruits && fruits.length > 0
          ? fruits.map((fruitItem) => (
              <li key={fruitItem.key}>
                <div>
                  <h2>
                    {fruitItem.val.name} - {fruitItem.val.date}
                  </h2>
                  <p>{fruitItem.val.description}</p>
                </div>
              </li>
            ))
          : null}
      </ol>
    </div>
  );
}

import React, { useState } from "react";
import { dbService } from "fbase";

const Home = () => {
  const [nweet, setNweet] = useState("");

  const onChange = (event) => {
    setNweet(event.target.value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();

    const db = dbService.getFirestore();

    const collection = dbService.collection(db, "nweets");
    await dbService.addDoc(collection, {
      nweet,
      createdAt: Date.now(),
    });

    setNweet("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          value={nweet}
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
    </div>
  );
};
export default Home;

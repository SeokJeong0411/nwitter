import React, { useEffect, useState } from "react";
import { dbService } from "fbase";

const Home = ({ auth }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const db = dbService.getFirestore();

  const getNweets = async () => {
    const a = dbService.onSnapshot(
      dbService.collection(db, "nweets"),
      (snapshot) => {
        const nweetObject = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setNweets(nweetObject);
      }
      // (snapshot) => {
      //   snapshot.forEach((doc) => {
      //     const nweetObject = {
      //       ...doc.data(),
      //       id: doc.id,
      //     };
      //     setNweets((prev) => [nweetObject, ...prev]);
      //   });
      // }
    );

    // const q = dbService.query(dbService.collection(db, "nweets"));
    // const querySnapshot = await dbService.getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   const nweetObject = {
    //     ...doc.data(),
    //     id: doc.id,
    //   };
    //   setNweets((prev) => [nweetObject, ...prev]);
    // });
  };

  useEffect(() => {
    getNweets();
  }, []);

  const onChange = (event) => {
    setNweet(event.target.value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();

    const collection = dbService.collection(db, "nweets");
    await dbService.addDoc(collection, {
      text: nweet,
      createdAt: Date.now(),
      creatorId: auth.currentUser.uid,
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
      <div>
        {nweets.map((nweet) => (
          <div key={nweet.id}>
            <h4>{nweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;

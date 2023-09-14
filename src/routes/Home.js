import React, { useEffect, useState } from "react";
import { dbService, authService } from "fbase";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

const Home = () => {
  // default parameter
  const auth = authService.getAuth();
  const db = dbService.getFirestore();
  const [nweets, setNweets] = useState([]);

  // function : get Nweets from database
  const getNweets = async () => {
    dbService.onSnapshot(
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

  // get Nweets first one time
  useEffect(() => {
    getNweets();
  }, []);

  return (
    <div className="container">
      <NweetFactory />
      <div style={{ marginTop: 30 }}>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === auth.currentUser.uid}
          ></Nweet>
        ))}
      </div>
    </div>
  );
};
export default Home;

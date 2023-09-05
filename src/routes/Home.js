import React, { useEffect, useState } from "react";
import { dbService, storageService } from "fbase";
import Nweet from "components/Nweet";
import { v4 as uuid } from "uuid";

const Home = ({ auth }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState();
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

    const storage = storageService.getStorage();
    const fileRef = storageService.ref(
      storage,
      `${auth.currentUser.uid}/${uuid()}`
    );
    const response = await storageService.uploadString(
      fileRef,
      attachment,
      "data_url"
    );
    console.log(response);

    // const collection = dbService.collection(db, "nweets");
    // await dbService.addDoc(collection, {
    //   text: nweet,
    //   createdAt: Date.now(),
    //   creatorId: auth.currentUser.uid,
    // });

    // setNweet("");
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishiedEvent) => {
      const {
        currentTarget: { result },
      } = finishiedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearPhotoClick = () => {
    setAttachment(null);
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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearPhotoClick}>Clear</button>
          </div>
        )}
      </form>
      <div>
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

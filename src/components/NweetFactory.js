import { storageService, dbService, authService } from "fbase";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";

const NweetFactory = () => {
  // default parameter
  const auth = authService.getAuth();
  const db = dbService.getFirestore();
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");

  // apply the Nweet on state
  const onChange = (event) => {
    setNweet(event.target.value);
  };
  // submit Nweet
  const onSubmit = async (event) => {
    event.preventDefault(); // prevent default submit function
    // validation check
    if (nweet === "") {
      alert("U must fill any text");
      return;
    }

    // if attachment exist then Upload Attachment
    let attachmentUrl = "";
    if (attachment !== "") {
      const storage = storageService.getStorage();
      const fileRef = storageService.ref(
        storage,
        `${auth.currentUser.uid}/${uuid()}`
      );
      // upload into Firebase Storage
      const response = await storageService.uploadString(
        fileRef,
        attachment,
        "data_url"
      );

      attachmentUrl = await storageService.getDownloadURL(response.ref);
    }

    // upload Nweet info into Firebase Database
    const collection = dbService.collection(db, "nweets");
    await dbService.addDoc(collection, {
      text: nweet,
      createdAt: Date.now(),
      creatorId: auth.currentUser.uid,
      attachmentUrl,
    });

    // init states
    setNweet("");
    setAttachment("");
  };

  // show attachment image
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    // if attachment exist show image
    if (theFile) {
      const reader = new FileReader();
      reader.onloadend = (finishiedEvent) => {
        const {
          currentTarget: { result },
        } = finishiedEvent;
        setAttachment(result);
      };
      reader.readAsDataURL(theFile);
    }
  };

  // init attachment image
  const onClearPhotoClick = () => {
    setAttachment("");
  };

  return (
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
  );
};

export default NweetFactory;

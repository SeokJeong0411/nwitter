import { dbService, storageService } from "fbase";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  // default parameter
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const db = dbService.getFirestore();
  const storage = storageService.getStorage();

  // delete Nweet
  const onDeleteClick = () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      const a = dbService.doc(db, `nweets/${nweetObj.id}`);
      dbService.deleteDoc(a);
      const delRef = storageService.ref(storage, nweetObj.attachmentUrl);
      if (nweetObj.attachmentUrl) storageService.deleteObject(delRef);
    }
  };

  // save Nweet at database
  const onSubmit = (event) => {
    event.preventDefault();
    const a = dbService.doc(db, `nweets/${nweetObj.id}`);
    dbService.updateDoc(a, { text: newNweet });
    setEditing(false);
  };

  const onChenge = (event) => {
    setNewNweet(event.target.value);
  };
  const toggleEditing = () => setEditing((prev) => !prev);

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              onChange={onChenge}
              type="text"
              placeholder="Edit your Nweet"
              value={newNweet}
              required
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img src={nweetObj.attachmentUrl} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;

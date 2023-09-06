import { dbService } from "fbase";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const db = dbService.getFirestore();

  const onDeleteClick = () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      const a = dbService.doc(db, `nweets/${nweetObj.id}`);
      dbService.deleteDoc(a);
    }
  };
  const onSubmit = (event) => {
    event.preventDefault();
    const a = dbService.doc(db, `nweets/${nweetObj.id}`);
    dbService.updateDoc(a, { text: newNweet });
    setEditing(false);
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onChenge = (event) => {
    setNewNweet(event.target.value);
  };

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

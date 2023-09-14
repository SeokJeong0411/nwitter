import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              onChange={onChenge}
              type="text"
              placeholder="Edit your Nweet"
              value={newNweet}
              required
              autoFocus
              className="formInput"
            />
            <input type="submit" value="Update Nweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;

// Package import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import { Link } from "react-router-dom";

const ModalComic = ({ comicID, setIsModalOpen }) => {
  useLockBodyScroll();
  console.log(comicID);

  return (
    <section className="modal-comic">
      <article>
        <div>
          <FontAwesomeIcon
            icon="fa-solid fa-xmark"
            className="closeModal"
            style={{ color: "white" }}
            onClick={() => {
              setIsModalOpen(false);
            }}
          />
        </div>

        <img src={`${comicID.thumbnail.path}.jpg`} />
        <Link to={`/comic/${comicID._id}`}>See the comic</Link>
      </article>
    </section>
  );
};

export default ModalComic;

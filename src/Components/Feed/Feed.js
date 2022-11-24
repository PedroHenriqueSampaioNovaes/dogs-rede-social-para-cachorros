import React from 'react';
import FeedModal from './FeedModal';
import FeedPhotos from './FeedPhotos';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const Feed = ({ user }) => {
  const [modalPhoto, setModalPhoto] = React.useState(null);
  const [infinite, setInfinite] = React.useState(true);
  const [pages, setPages] = React.useState([1]);
  const { pathname } = useLocation();

  React.useEffect(() => {
    let wait = false;
    function infiniteScroll() {
      if (infinite && !wait) {
        const scroll = window.scrollY;
        const heightPage = document.body.offsetHeight - window.innerHeight;
        if (scroll > heightPage * 0.75) {
          setPages((pages) => [...pages, pages.length + 1]);
          wait = true;
          setTimeout(() => (wait = false), 500);
        }
      }
    }

    window.addEventListener('wheel', infiniteScroll);
    window.addEventListener('scroll', infiniteScroll);
    return () => {
      window.removeEventListener('wheel', infiniteScroll);
      window.removeEventListener('scroll', infiniteScroll);
    };
  }, [infinite]);

  return (
    <div>
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}
      {pages.map((page) => (
        <FeedPhotos
          key={page}
          user={user}
          setModalPhoto={setModalPhoto}
          page={page}
          infinte={infinite}
          setInfinite={setInfinite}
        />
      ))}
      {!infinite && pathname === '/' && (
        <p
          style={{
            textAlign: 'center',
            padding: '2rem 0 4rem',
            color: 'rgb(136, 136, 136)',
          }}
        >
          Não existe mais postagens.
        </p>
      )}
    </div>
  );
};

Feed.defaultProps = {
  user: 0,
};

Feed.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
};

export default Feed;

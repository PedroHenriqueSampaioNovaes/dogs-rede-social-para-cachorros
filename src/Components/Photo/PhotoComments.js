import React from 'react';
import { UserContext } from '../../UserContext';
import styles from './PhotoComments.module.css';
import PhotoCommentsForm from './PhotoCommentsForm';

const PhotoComments = (props) => {
  const [comments, setComments] = React.useState(props.comments);
  const listComments = React.useRef();
  const { login } = React.useContext(UserContext);

  React.useEffect(() => {
    listComments.current.scrollTop = listComments.current.scrollHeight;
  }, [comments]);

  return (
    <>
      <ul ref={listComments} className={styles.comments}>
        {comments.map((comment) => (
          <li key={comment.comment_ID}>
            <strong>{comment.comment_author}:</strong> {comment.comment_content}
          </li>
        ))}
      </ul>
      {login && (
        <PhotoCommentsForm
          setComments={setComments}
          id={props.id}
          single={props.single}
        />
      )}
    </>
  );
};

export default PhotoComments;

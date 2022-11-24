import React from 'react';
import styles from './PhotoCommentsForm.module.css';
import { ReactComponent as Enviar } from '../../Assets/enviar.svg';
import useFetch from '../../Hooks/useFetch';
import { COMMENT_POST } from '../../api';
import Error from '../Helper/Error';

const PhotoCommentForm = ({ id, setComments, single }) => {
  const { error, request } = useFetch();
  const [comment, setComment] = React.useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    if (comment !== '') {
      const { url, options } = COMMENT_POST(id, { comment });
      const { response, json } = await request(url, options);
      if (response.ok) {
        setComment('');
        setComments((comments) => [...comments, json]);
      }
    }
  }

  return (
    <form
      className={`${styles.form} ${single ? styles.single : ''}`}
      onSubmit={handleSubmit}
    >
      <textarea
        className={styles.textarea}
        id="comment"
        name="comment"
        placeholder="Comente..."
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button className={styles.button}>
        <Enviar />
      </button>
      {error && <Error error={error} />}
    </form>
  );
};

export default PhotoCommentForm;

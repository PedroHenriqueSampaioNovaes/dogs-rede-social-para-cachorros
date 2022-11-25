import React from 'react';
import styles from './UserPhotoPost.module.css';
import { PHOTO_POST } from '../../api';
import useForm from '../../Hooks/useForm';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import useFetch from '../../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import Error from '../Helper/Error';
import Head from '../Helper/Head';

const UserPhotoPost = () => {
  const nome = useForm();
  const peso = useForm();
  const idade = useForm();
  const { data, loading, error, request } = useFetch();
  const [img, setImg] = React.useState({});
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) navigate('/conta');
  }, [data, navigate]);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('img', img.raw);
    formData.append('nome', nome.value);
    formData.append('peso', peso.value);
    formData.append('idade', idade.value);

    const token = window.localStorage.getItem('token');
    const { url, options } = PHOTO_POST(formData, token);
    request(url, options);
  }

  function handleImgChange({ target }) {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head title="Poste sua foto" />

      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" {...nome} />
        <Input label="Peso" type="number" min="0" {...peso} />
        <Input label="Idade" type="number" min="0" {...idade} />
        <input
          className={styles.file}
          type="file"
          id="img"
          name="img"
          onChange={handleImgChange}
        />
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        <Error error={error} />
      </form>

      <div>
        <div
          className={styles.preview}
          style={{
            backgroundImage: `url(${img.preview})`,
          }}
        ></div>
      </div>
    </section>
  );
};

export default UserPhotoPost;

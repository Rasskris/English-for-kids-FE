/* eslint-disable react/jsx-props-no-spreading */
import { FC, useState } from 'react';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import classnames from 'classnames';
import { toast } from 'react-toastify';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatchWithReturn } from '../../../hooks';
import { createCategory } from '../../../redux/thunks';
import { ICON_PATH, TOAST_OPTIONS, TOAST_TEXT } from '../../../constants';
import { CategoryFiles, CategoryInputs } from '../../../interfaces';
import { CategoryForm } from './CategoryForm';
import styles from './CategoryAdminCard.module.scss';

const defaultValues = {
  name: '',
  coverImage: null,
  icon: null,
};

export const CategoryAddCard: FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [progress, setProgress] = useState(false);
  const [files, setFiles] = useState<CategoryFiles>({
    coverImage: null,
    icon: null,
  });
  const [dispatch] = useDispatchWithReturn();
  const methods = useForm<CategoryInputs>({
    mode: 'onSubmit',
    defaultValues,
  });

  const { handleSubmit, reset, trigger } = methods;
  const cardStyle = classnames(styles.card, {
    [styles.flipped]: isFlipped,
  });

  const onSubmit: SubmitHandler<CategoryInputs> = async (data) => {
    try {
      setProgress(true);
      await dispatch(
        createCategory({
          name: data.name,
          coverImage: files.coverImage,
          icon: files.icon,
        }),
      );
      toast.success(TOAST_TEXT.CATEGORY_ADDED, TOAST_OPTIONS);
      setProgress(false);
      setIsFlipped(false);
      reset(defaultValues);
    } catch (error) {
      toast.error(error.message, TOAST_OPTIONS);
      setProgress(false);
    }
  };

  const handleAddCategory = () => {
    setIsFlipped(true);
  };

  const handleClickCancel = () => {
    setIsFlipped(false);
    reset(defaultValues);
  };

  const handleChange = (inputFileName: string, file: File | null) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [inputFileName]: file,
    }));
  };

  const handleTriggerError = () => {
    trigger(['name', 'coverImage', 'icon']);
  };

  return (
    <div className={cardStyle}>
      <div className={styles.card__front}>
        <CardMedia component="img" alt="add category" width="80%" height="80%" image={ICON_PATH.CARD_ADD} />
        <CardActions>
          <button className={styles.btnAdd} type="button" onClick={handleAddCategory}>
            add new category
          </button>
        </CardActions>
      </div>
      <div className={styles.card__back}>
        {progress ? (
          <CircularProgress />
        ) : (
          <FormProvider {...methods}>
            <CategoryForm
              coverImageURL={ICON_PATH.IMAGE}
              iconURL={ICON_PATH.IMAGE}
              requiredInputFile
              onTriggerError={handleTriggerError}
              onChange={handleChange}
              onSubmit={handleSubmit(onSubmit)}
              onClickCancel={handleClickCancel}
            />
          </FormProvider>
        )}
      </div>
    </div>
  );
};

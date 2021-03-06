import { FC, memo } from 'react';
import Image from 'next/image';
import { PAGE_DEFAULT_CONTENT } from '../../constants';
import { PAGE } from '../../enums';
import styles from './DefaultContent.module.scss';
import { shimmer, toBase64 } from '../../utils';

interface DefaultContentProps {
  pageName: PAGE;
}

export const DefaultContent: FC<DefaultContentProps> = memo(({ pageName }) => {
  const { text, image } = PAGE_DEFAULT_CONTENT[pageName];

  return (
    <div className={styles.container}>
      <p className={styles.text}>{text}</p>
      <Image
        width={500}
        height={500}
        quality={100}
        placeholder="blur"
        blurDataURL={toBase64(shimmer(500, 500))}
        src={image}
      />
    </div>
  );
});

DefaultContent.displayName = 'DefaultContent';

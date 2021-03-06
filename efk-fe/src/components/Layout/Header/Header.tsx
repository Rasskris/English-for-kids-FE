import { FC } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector, useUser } from '../../../hooks';
import { signOut } from '../../../redux/thunks';
import { selectAuthStatus } from '../../../redux/selectors';
import { Switcher } from '../../Switcher';
import { Menu } from '../../Menu';
import { TOAST_OPTIONS } from '../../../constants';
import styles from './Header.module.scss';

export const Header: FC = () => {
  const { user } = useUser();
  const isAuth = useAppSelector(selectAuthStatus);
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
    toast.info('Good Bye!', TOAST_OPTIONS);
  };

  return (
    <header className={styles.header}>
      <Menu />
      <div className={styles.wrapper}>
        {isAuth ? (
          <button
            type="button"
            aria-label="Sign Out"
            className={`${styles.link} ${styles.link_signOut}`}
            data-tooltip="Sign Out"
            onClick={handleSignOut}
          />
        ) : (
          <Link href="/auth/signin">
            <a
              role="button"
              aria-label="Sign In"
              className={`${styles.link} ${styles.link_signIn}`}
              data-tooltip="Sign In"
            />
          </Link>
        )}
        <Switcher />
      </div>
    </header>
  );
};

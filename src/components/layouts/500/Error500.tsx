import NavLink from '@/components/nav/NavLink';

import ErrorContainer from '@/components/containers/ErrorContainer';

export default function Error500() {
  return (
    <ErrorContainer>
      <p>500 something went wrong</p>
      <NavLink
        title='home'
        href='/'
        list={false}
      />
    </ErrorContainer>
  );
}
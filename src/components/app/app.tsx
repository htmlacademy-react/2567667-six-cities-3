import MainPage from '../../pages/main-page/main-page';

type AppProps = {
  offerCount: number;
};

export default function App({ offerCount }: AppProps) {
  return <MainPage offerCount={offerCount} />;
}

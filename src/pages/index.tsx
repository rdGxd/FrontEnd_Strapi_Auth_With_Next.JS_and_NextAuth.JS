import { GetServerSideProps } from "next";

export default function Index() {
  return (
    <>
      <h1>Olá mundo</h1>
      <span>Oi</span>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

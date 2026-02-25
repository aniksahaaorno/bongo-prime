export const getBrandInfo = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/social`,
    {
      next: { revalidate: 0 },
    },
  );
  return res.json();
};

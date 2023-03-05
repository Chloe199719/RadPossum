const cookie =
  process.env.NODE_ENV === "production"
    ? `__Secure-next-auth.session-token`
    : ` next-auth.session-token`;

export default cookie;

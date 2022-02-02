interface Props {
  src: string;
  alt: string;
  className?: string;
}

const Avatar = ({ src, alt, className = "" }: Props) => {
  const classes = `rouded-full ${className}`;

  return (
    <>
      <img src={src} alt={alt} className={classes} />
    </>
  );
};

export default Avatar;
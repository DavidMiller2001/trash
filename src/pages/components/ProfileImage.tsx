import Image from "next/image";
export const ProfileImage = (props: { size?: number; src: string }) => {
  const { size, src } = props;
  return (
    <Image
      src={`${src}`}
      width={size ?? 16}
      height={size ?? 16}
      alt="Profile Picture"
      className="rounded-full"
    />
  );
};

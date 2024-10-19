import { useNavigate } from "react-router-dom";

const Card = ({ title, description, image, link }: {title: string, description: string, image: string, link: string}) => {
  return (
    <div className=" w-3/4 m-auto rounded-md">
      <img className="" src={image} alt="" />
      <h2 className="text-[#365f7b] text-2xl">{title}</h2>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

export default Card;
 
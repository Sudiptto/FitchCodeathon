const Card = ({ title, description, image, link }: { title: string, description: string, image: string, link: string }) => {
    return (
      <div
        className="w-3/4 m-auto rounded-md font-comfortaa cursor-pointer"
        onClick={() => {
          window.open(link, "_blank"); 
        }}
      >
        <img className="" src={image} alt={title} />
        <h2 className="text-[#365f7b] text-2xl mt-2">{title}</h2>
        <p className="text-gray-400">{description}</p>
      </div>
    );
  };
  
  export default Card;
  

/*
const data = [
    {
      title: 'OTHER OF PEARL',
      description: 'by Jenny Kendler Friday-Sunday through November 3',
      image: 'https://gov-island-site.s3.amazonaws.com/pages/_eventThumbnail/Schenck-Governors-Island-NRDC-Jenny-Kendler-2024_06_13-DSC_6628.png',
      link: 'https://www.govisland.com/things-to-do/public-art/other-of-pearl'
    },
    {
      title: 'BLAZING SADDLES BIKE RENTALS',
      description: '',
      image: 'https://gov-island-site.s3.amazonaws.com/pages/_eventThumbnail2x/blazing-saddles-grid-todd-barbee.jpg',
      link: 'https://www.govisland.com/things-to-do/recreation/bike-rentals'
    },
    {
      title: 'FAD MARKET',
      description: '2024 Pop-Ups October 19 + 20',
      image: 'https://gov-island-site.s3.amazonaws.com/pages/_eventThumbnail2x/FAD-Market-at-Gov-Island.jpeg',
      link: 'https://www.govisland.com/things-to-do/events/fad-market-2'
    },

  ]

  return (
    <>
    <div className='flex flex-col m-auto'>
      <div className='mt-10'>
      {
        data.map((item, index) => (
          <Card key={index} title={item.title} description={item.description} image={item.image} link={item.link} />
        ))
      }
    </div>
    </div>
      
    </>
  )

  */
 
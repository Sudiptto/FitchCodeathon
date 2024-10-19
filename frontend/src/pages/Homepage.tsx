import Card from "../components/card";

const Homepage = () => {
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
  ];

  return (
    <>
      <div className='flex flex-col m-auto mt-10 gap-y-5'>
        {
          data.map((item, index) => (
            <Card key={index} title={item.title} description={item.description} image={item.image} link={item.link} />
          ))
        }
      </div>
    </>
  );
};

export default Homepage;
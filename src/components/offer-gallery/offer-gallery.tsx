type OfferGalleryProps = {
  images: string[];
};

export default function OfferGallery({ images }: OfferGalleryProps) {
  return (
    <div className="offer__gallery">
      {images.map((image) => (
        <div className="offer__image-wrapper" key={image}>
          <img className="offer__image" src={image} alt="Photo studio" />
        </div>
      ))}
    </div>
  );
}

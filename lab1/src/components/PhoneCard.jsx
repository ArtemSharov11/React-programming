function PhoneCard({ image, title, text }) {
  return (
    <article className="phone-card">
      <figure className="phone-card__image-wrapper">
        <img src={image} alt={title} className="phone-card__image" />
      </figure>
      <h3 className="phone-card__title text-body-34">{title}</h3>
      <p className="phone-card__text text-body-30">{text}</p>
    </article>
  );
}

export default PhoneCard;
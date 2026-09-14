function FaqSection() {
  const questions = [
    "Сколько времени требуется для запуска приложения?",
    "Какой адрес будет иметь наше приложение?",
    "Что требуется от отеля для наполнения приложения контентом?",
    "Что требуется для кастомизации приложения?",
    "Что дает интеграция с PMS?",
    "Как происходит эквайринг в случае подключения онлайн-оплат?",
    "Какие способы онлайн-оплаты доступны для гостей?"
  ];

  return (
    <section className="faq-header" aria-label="Заголовок секции FAQ">
      <section className="faq-header__title" aria-label="Заголовок">
        <h2 className="text-h2">Отвечаем на вопросы</h2>
      </section>
      <section className="faq-header__questions" aria-label="Список вопросов">
        {questions.map((text, index) => (
          <article key={index} className="faq-question" aria-label="Вопрос">
            <p className="faq-question__text text-body-30">{text}</p>
            <img src="img/arrow-down.png" alt="Развернуть" className="faq-question__arrow" />
          </article>
        ))}
      </section>
    </section>
  );
}

export default FaqSection;
import './animation.css';
import './index3.css';
import './tablet.css';
import './phone.css';

import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import PhonesSection from './components/PhonesSection';
import ContentPromotion from './components/ContentPromotion';
import AdminSection from './components/AdminSection';
import TariffsSection from './components/TariffsSection';
import ReviewsSection from './components/ReviewsSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';

function App() {
  const companyName = "Hoteza Web";
  const heroTitle = "Все услуги вашего отеля сразу в телефоне гостя. Без установок.";

  const phonesData = [
    {
      id: 1,
      image: "img/phone-food.png",
      title: "Еда в номер",
      text: "Ознакомиться с меню, выбрать и оплатить блюда онлайн"
    },
    {
      id: 2,
      image: "img/phone-services.png",
      title: "Гостиничные услуги и бронирование",
      text: "Заказать уборку номера или постельные принадлежности. Забронировать столик в ресторане или сеанс в спа."
    },
    {
      id: 3,
      image: "img/phone-profile.png",
      title: "Профиль гостя, счёт и экспресс check-out",
      text: "Посмотреть дату и время выезда, счёт за услуги, а также быстро выехать, не создавая очереди на ресепшн."
    },
    {
      id: 4,
      image: "img/phone-messenger.png",
      title: "Мессенджер с персоналом",
      text: "Задать любой вопрос сотрудникам отеля с помощью встроенного мессенджера"
    },
    {
      id: 5,
      image: "img/phone-tv.png",
      title: "Мобильный пульт ТВ",
      text: "Управлять телевизором в номере прямо со смартфона"
    },
    {
      id: 6,
      image: "img/phone-grms.png",
      title: "«Умный» номер (GRMS)",
      text: "Настроить температуру и степень освещённости в номере"
    }
  ];

  return (
    <div>
      <Header companyName={companyName} />
      <main className="container">
        <Hero title={heroTitle} />
        <Features />

        <section className="info-banner color-gradient-cycle" aria-label="Информационный баннер">
          <p className="info-banner__text text-banner">
            Избавьтесь от устаревших бумажных папок гостя.
            Один QR-код заменяет всё. Гость может заказать и 
            оплатить любую услугу онлайн, что значительно
            ускоряет работу ресепшн.
          </p>
        </section>

        <PhonesSection items={phonesData} />
        <ContentPromotion />
        <AdminSection />
        <TariffsSection />
        <ReviewsSection />
        <FaqSection />
      </main>
      <Footer companyName={companyName} />
    </div>
  );
}

export default App;
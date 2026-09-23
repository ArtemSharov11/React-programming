import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addService, updateService, deleteService } from "../store/servicesSlice";
import "../Admin.css";

// Правила валидации точь-в-точь из оригинального admin.js
const serviceRules = {
  name: {
    validate: (value) => value.trim().length >= 3 && value.trim().length <= 80,
    message: "Название должно содержать от 3 до 80 символов."
  },
  category: {
    validate: (value) => value.trim().length >= 2 && value.trim().length <= 40,
    message: "Категория должна содержать от 2 до 40 символов."
  },
  price: {
    validate: (value) => {
      const num = Number(value);
      return !isNaN(num) && num > 0 && num <= 100000;
    },
    message: "Цена должна быть больше 0 и не превышать 100000."
  },
  image: {
    validate: (value) => {
      try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:";
      } catch {
        return false;
      }
    },
    message: "Введите корректную ссылку, начинающуюся с http:// или https://."
  },
  description: {
    validate: (value) => value.trim().length >= 10 && value.trim().length <= 500,
    message: "Описание должно содержать от 10 до 500 символов."
  }
};

const initialForm = {
  id: "",
  name: "",
  category: "",
  price: "",
  image: "",
  description: ""
};

export default function AdminPage() {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.services.items);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [touched, setTouched] = useState({});

  // Локальные отзывы для соответствия правому блоку admin.html
  const [reviews, setReviews] = useState([
    { id: "1", userName: "Александр", userId: "101", serviceName: "Завтрак в номер", serviceId: "1", text: "Отличный круассан, доставили горячим!" },
    { id: "2", userName: "Мария", userId: "102", serviceName: "Тайский массаж", serviceId: "2", text: "Прекрасный мастер, рекомендую!" }
  ]);
  const [filterId, setFilterId] = useState("");
  const [activeReviewFilter, setActiveReviewFilter] = useState({ type: "", value: "" });

  // Валидация полей
  const errors = useMemo(() => {
    const errs = {};
    Object.keys(serviceRules).forEach((field) => {
      const isValid = serviceRules[field].validate(String(formData[field] ?? ""));
      if (!isValid) {
        errs[field] = serviceRules[field].message;
      }
    });
    return errs;
  }, [formData]);

  const isFormValid = Object.keys(errors).length === 0;

  const handleOpenAdd = () => {
    setFormData(initialForm);
    setTouched({});
    setIsModalOpen(true);
  };

  const handleOpenEdit = (service) => {
    setFormData({
      id: service.id,
      name: service.name || "",
      category: service.category || "",
      price: service.price ?? "",
      image: service.image || "",
      description: service.description || ""
    });
    setTouched({});
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData(initialForm);
    setTouched({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleResetForm = () => {
    setFormData(initialForm);
    setTouched({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allTouched = Object.keys(serviceRules).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);

    if (!isFormValid) return;

    const payload = {
      ...formData,
      price: Number(formData.price),
      name: formData.name.trim(),
      category: formData.category.trim(),
      image: formData.image.trim(),
      description: formData.description.trim()
    };

    if (formData.id) {
      dispatch(updateService(payload));
      alert("Услуга обновлена.");
    } else {
      dispatch(addService(payload));
      alert("Услуга добавлена.");
    }

    handleCloseModal();
  };

  const handleDeleteService = (id) => {
    if (window.confirm("Удалить услугу из каталога?")) {
      dispatch(deleteService(id));
      alert("Услуга удалена.");
    }
  };

  const handleDeleteReview = (id) => {
    if (window.confirm("Удалить этот отзыв?")) {
      setReviews((prev) => prev.filter((r) => r.id !== id));
      alert("Отзыв удалён.");
    }
  };

  // Фильтрация отзывов
  const filteredReviews = useMemo(() => {
    const { type, value } = activeReviewFilter;
    if (!type || !value.trim()) return reviews;
    const v = value.trim().toLowerCase();
    return reviews.filter((r) => {
      if (type === "service") {
        return r.serviceId.toLowerCase() === v || r.serviceName.toLowerCase().includes(v);
      }
      if (type === "user") {
        return r.userId.toLowerCase() === v || r.userName.toLowerCase().includes(v);
      }
      return true;
    });
  }, [reviews, activeReviewFilter]);

  return (
    <main className="container" style={{ minHeight: "75vh", padding: "2rem 0" }}>
      <h1 className="text-h2">Панель администратора</h1>

      <div className="admin-layout">
        {/* ЛЕВАЯ КОЛОНКА: Управление услугами */}
        <section className="admin-section">
          <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
            <h2>Управление услугами</h2>
            <button type="button" className="cat-btn active" onClick={handleOpenAdd}>
              Добавить услугу
            </button>
          </div>

          <div id="admin-services-list">
            <h3>Все услуги</h3>
            {services.map((service) => (
              <article key={service.id} className="admin-item">
                <span>
                  {service.name} (${service.price})
                </span>
                <div className="admin-actions">
                  <button type="button" className="cat-btn" onClick={() => handleOpenEdit(service)}>
                    Редактировать
                  </button>
                  <button
                    type="button"
                    className="cat-btn danger"
                    onClick={() => handleDeleteService(service.id)}
                  >
                    Удалить
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ПРАВАЯ КОЛОНКА: Управление отзывами */}
        <section className="admin-section">
          <h2>Управление отзывами</h2>
          <div className="review-filters">
            <input
              type="text"
              placeholder="Введите ID или имя"
              value={filterId}
              onChange={(e) => setFilterId(e.target.value)}
            />
            <button
              type="button"
              className="cat-btn"
              onClick={() => setActiveReviewFilter({ type: "service", value: filterId })}
            >
              По услуге
            </button>
            <button
              type="button"
              className="cat-btn"
              onClick={() => setActiveReviewFilter({ type: "user", value: filterId })}
            >
              По пользователю
            </button>
            <button
              type="button"
              className="cat-btn"
              onClick={() => {
                setFilterId("");
                setActiveReviewFilter({ type: "", value: "" });
              }}
            >
              Сбросить
            </button>
          </div>

          <div id="admin-reviews-items">
            {filteredReviews.length === 0 ? (
              <p>Отзывы не найдены.</p>
            ) : (
              filteredReviews.map((r) => (
                <article key={r.id} className="admin-item">
                  <div>
                    <strong>{r.userName}</strong> (User ID: {r.userId})<br />
                    Услуга: {r.serviceName} (ID: {r.serviceId})<br />
                    <span>{r.text}</span>
                  </div>
                  <button
                    type="button"
                    className="cat-btn danger"
                    onClick={() => handleDeleteReview(r.id)}
                  >
                    Удалить
                  </button>
                </article>
              ))
            )}
          </div>
        </section>
      </div>

      {/* Модальное окно добавления/редактирования */}
      {isModalOpen && (
        <div className="interactive-modal is-open" onClick={handleCloseModal}>
          <section
            className="interactive-modal__dialog"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="interactive-modal__header">
              <h2 className="interactive-modal__title">
                {formData.id ? "Редактировать услугу" : "Добавить услугу"}
              </h2>
              <button
                type="button"
                className="interactive-modal__close"
                onClick={handleCloseModal}
                aria-label="Закрыть"
              >
                ×
              </button>
            </header>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="adm-name" className="required-label">
                  Название
                </label>
                <input
                  type="text"
                  id="adm-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.name && errors.name ? "invalid" : ""}
                  required
                />
                {touched.name && errors.name && (
                  <div className="error-msg">{errors.name}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="adm-cat" className="required-label">
                  Категория
                </label>
                <input
                  type="text"
                  id="adm-cat"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.category && errors.category ? "invalid" : ""}
                  required
                />
                {touched.category && errors.category && (
                  <div className="error-msg">{errors.category}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="adm-price" className="required-label">
                  Цена
                </label>
                <input
                  type="number"
                  id="adm-price"
                  name="price"
                  min="0.01"
                  max="100000"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.price && errors.price ? "invalid" : ""}
                  required
                />
                {touched.price && errors.price && (
                  <div className="error-msg">{errors.price}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="adm-img" className="required-label">
                  Ссылка на изображение
                </label>
                <input
                  type="url"
                  id="adm-img"
                  name="image"
                  placeholder="https://..."
                  value={formData.image}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.image && errors.image ? "invalid" : ""}
                  required
                />
                {touched.image && errors.image && (
                  <div className="error-msg">{errors.image}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="adm-desc" className="required-label">
                  Описание
                </label>
                <textarea
                  id="adm-desc"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.description && errors.description ? "invalid" : ""}
                  required
                />
                {touched.description && errors.description && (
                  <div className="error-msg">{errors.description}</div>
                )}
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "18px" }}>
                <button
                  type="submit"
                  className={`btn-reg ${isFormValid ? "active" : ""}`}
                  disabled={!isFormValid}
                >
                  {formData.id ? "Сохранить изменения" : "Добавить услугу"}
                </button>
                <button type="button" className="cat-btn" onClick={handleResetForm}>
                  Сбросить
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
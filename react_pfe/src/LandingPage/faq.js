import React, { useState, useEffect } from 'react';
import './faq.css';

const FaqSection = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedQuestions = await fetchQuestions();
      setQuestions(fetchedQuestions);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentIndex, questions]);

  const fetchQuestions = async () => {
    return [
      {
        question: "Qu'est-ce que cette application de traçabilité des produits agricoles ?",
        answer: "Notre application permet de retracer l'origine et le parcours des produits agricoles, assurant transparence et sécurité alimentaire."
      },
      {
        question: "Quels avantages offre cette application aux producteurs agricoles ?",
        answer: "Elle certifie la qualité des produits, renforce la confiance des consommateurs et simplifie la gestion des rappels de produits en cas de problèmes de sécurité."
      },
      {
        question: "Cette application est-elle accessible aux consommateurs ?",
        answer: "Oui, les consommateurs peuvent utiliser l'application ou scanner les codes QR sur les emballages des produits pour obtenir des informations détaillées."
      },
      {
        question: "Comment puis-je intégrer cette application dans mon entreprise agricole ?",
        answer: "Contactez-nous via notre site web ou par e-mail pour obtenir des informations sur nos services, les coûts associés et les étapes à suivre pour l'intégrer dans votre entreprise."
      }
    ];
  };

  return (
    <section id="Faq-section">
    <section className="faq-section">
    <h2><span style={{ color: '#00CC76' }}>Foire</span> <span style={{ color: '#FFFFFF' }}>aux questions</span></h2>
      <div className="faq-list">
        {questions.map((item, index) => (
          <div key={index} className={`faq-item ${index <= currentIndex ? 'show' : ''}`}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
    </section>
  );
};

export default FaqSection;
